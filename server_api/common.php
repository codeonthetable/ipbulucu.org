<?php
// Shared API controls. Never store lookup inputs, addresses, URLs or raw responses.
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'common.php') { http_response_code(404); exit; }
require_once __DIR__ . '/usage.php';
function ipb_fail($status, $message) {
    http_response_code($status);
    echo json_encode(['success'=>false,'error'=>$message], JSON_UNESCAPED_UNICODE);
    exit;
}
function ipb_begin() {
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store'); header('X-LiteSpeed-Cache-Control: no-cache');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept, X-IPBulucu-Client, X-IPBulucu-Action, X-IPBulucu-Context');
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') { http_response_code(204); exit; }
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') ipb_fail(405, 'Only GET is supported.');
    if (!ipb_budget('tools-minute', 120, 60)) { header('Retry-After: 60'); ipb_fail(429, 'Request limit reached. Please retry later.'); }
}
function ipb_input($keys, $default='', $max=2048) {
    foreach ($keys as $key) if (isset($_GET[$key])) {
        if (!is_string($_GET[$key]) || strlen($_GET[$key]) > $max || preg_match('/[\x00-\x20\x7f]/', trim($_GET[$key]))) ipb_fail(400, 'Invalid input.');
        return trim($_GET[$key]);
    }
    return $default;
}
function ipb_host($input, $allowIp=true) {
    if ($input === '' || preg_match('/[\x00-\x20\x7f\\\\]/', $input)) ipb_fail(400, 'Enter a valid public domain or IP address.');
    if (filter_var($input, FILTER_VALIDATE_IP)) $host = $input;
    else {
        $parts = parse_url(strpos($input, '://') === false ? 'https://' . $input : $input);
        if (!$parts || isset($parts['user']) || isset($parts['pass']) || !in_array(strtolower($parts['scheme'] ?? ''), ['https','http'], true)) ipb_fail(400, 'Invalid host.');
        $host = trim($parts['host'] ?? '', '[]');
    }
    $host = strtolower(rtrim($host, '.'));
    if (filter_var($host, FILTER_VALIDATE_IP)) {
        if (!$allowIp) ipb_fail(400, 'Enter a domain name.');
    } elseif (strlen($host) > 253 || strpos($host, '.') === false || !filter_var($host, FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME)) ipb_fail(400, 'Invalid domain. Use its ASCII/Punycode form.');
    return $host;
}
function ipb_in_cidr($ip, $cidr) {
    [$base,$bits] = explode('/', $cidr);
    $a = @inet_pton($ip); $b = @inet_pton($base); $bits = (int)$bits;
    if ($a === false || $b === false || strlen($a) !== strlen($b)) return false;
    $bytes = intdiv($bits,8); $rest = $bits % 8;
    return substr($a,0,$bytes) === substr($b,0,$bytes) && (!$rest || ((ord($a[$bytes]) ^ ord($b[$bytes])) & (255 << (8-$rest))) === 0);
}
function ipb_public_ip($ip) {
    if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) return false;
    // Exclude special-use and transition ranges; never permit alternate encodings of local IPv4.
    $blocked = ['0.0.0.0/8','10.0.0.0/8','100.64.0.0/10','127.0.0.0/8','169.254.0.0/16','172.16.0.0/12','192.0.0.0/24','192.0.2.0/24','192.168.0.0/16','198.18.0.0/15','198.51.100.0/24','203.0.113.0/24','224.0.0.0/4','240.0.0.0/4','2001::/32','2001:db8::/32','2002::/16'];
    if (strpos($ip, ':') !== false && !ipb_in_cidr($ip, '2000::/3')) return false;
    foreach ($blocked as $range) if (ipb_in_cidr($ip, $range)) return false;
    return true;
}
function ipb_target($host) {
    if (filter_var($host, FILTER_VALIDATE_IP)) $addresses = [$host];
    else {
        $answers = @dns_get_record($host, DNS_A | DNS_AAAA);
        if (!is_array($answers)) ipb_fail(502, 'DNS resolution unavailable.');
        $addresses = [];
        foreach ($answers as $answer) if (isset($answer['ip']) || isset($answer['ipv6'])) $addresses[] = $answer['ip'] ?? $answer['ipv6'];
    }
    if (!$addresses) ipb_fail(422, 'No public IP address found.');
    foreach ($addresses as $address) if (!ipb_public_ip($address) || $address === '212.252.79.215') ipb_fail(400, 'Only public Internet targets are supported.');
    // Prefer IPv4 on this shared host. The returned address is pinned for the connection.
    usort($addresses, function($a,$b) { return (int)(strpos($a, ':') !== false) <=> (int)(strpos($b, ':') !== false); });
    return $addresses[0];
}
function ipb_budget($name, $limit, $period) {
    $dir = getenv('IPBULUCU_METRICS_DIR') ?: (isset($_SERVER['DOCUMENT_ROOT']) ? dirname($_SERVER['DOCUMENT_ROOT']) . '/ipbulucu-metrics' : '');
    $real = realpath($dir); $doc = realpath($_SERVER['DOCUMENT_ROOT'] ?? '');
    // Fail closed for bounded network operations if private storage is unavailable.
    if (!$real || !$doc || strpos($real . '/', $doc . '/') === 0 || !is_writable($real)) return false;
    $fp = @fopen($real . '/budget-' . $name . '.json','c+');
    if (!$fp || !flock($fp,LOCK_EX)) { if ($fp) fclose($fp); return false; }
    $bucket = intdiv(time(),$period); $data = json_decode(stream_get_contents($fp),true);
    if (!is_array($data) || ($data['bucket'] ?? null) !== $bucket) $data = ['bucket'=>$bucket,'count'=>0];
    $allowed = $data['count'] < $limit;
    if ($allowed) { $data['count']++; rewind($fp); ftruncate($fp,0); fwrite($fp,json_encode($data)); fflush($fp); }
    flock($fp,LOCK_UN); fclose($fp); return $allowed;
}
function ipb_http($url, $head=false, $timeoutMs=6500, $maxRedirects=3, $providerAttempt=0) {
    static $handles=[]; // Request-scoped connection reuse avoids a TLS handshake for every DNS record type.
    $GLOBALS['IPBULUCU_HTTP_ERROR_CODE']=null;
    $deadline = microtime(true) + $timeoutMs/1000;
    for ($hop=0; $hop <= $maxRedirects; $hop++) {
        if (strlen($url)>2048 || preg_match('/[\x00-\x20\x7f\\\\]/',$url)) ipb_fail(400,'Invalid URL.');
        $parts = parse_url($url);
        if (!$parts || !in_array($parts['scheme'] ?? '',['https','http'],true) || isset($parts['user']) || isset($parts['pass'])) ipb_fail(400,'Only HTTP/HTTPS URLs without credentials are supported.');
        $host = ipb_host($url); $port = $parts['port'] ?? ($parts['scheme']==='https' ? 443 : 80);
        if (!in_array($port,[80,443],true)) ipb_fail(400,'HTTP checks support ports 80 and 443.');
        // Fixed official DoH anycast addresses avoid repeated host-resolver lookups. TLS still verifies the original hostname.
        $providerPins=$providerAttempt===1
            ? ['dns.google'=>'8.8.4.4','cloudflare-dns.com'=>'1.0.0.1']
            : ['dns.google'=>'8.8.8.8','cloudflare-dns.com'=>'1.1.1.1'];
        $ip = $providerPins[$host] ?? ipb_target($host); $remaining = (int)(($deadline - microtime(true))*1000);
        if ($remaining < 1 || !function_exists('curl_init')) return null;
        $headers=[]; $body=''; $headerBytes=0;
        $handleKey=$parts['scheme'].'://'.$host.':'.$port.'@'.$ip;
        if (!isset($handles[$handleKey])) $handles[$handleKey]=curl_init($url);
        $curl=$handles[$handleKey];
        curl_setopt_array($curl,[
            CURLOPT_URL=>$url,
            CURLOPT_RETURNTRANSFER=>true, CURLOPT_NOBODY=>$head,
            CURLOPT_FOLLOWLOCATION=>false, CURLOPT_PROTOCOLS=>CURLPROTO_HTTP | CURLPROTO_HTTPS,
            CURLOPT_CONNECTTIMEOUT_MS=>min(2000,$remaining), CURLOPT_TIMEOUT_MS=>$remaining,
            CURLOPT_SSL_VERIFYPEER=>true, CURLOPT_SSL_VERIFYHOST=>2, CURLOPT_PROXY=>'',
            CURLOPT_RESOLVE=>[$host . ':' . $port . ':' . (strpos($ip,':')!==false ? '['.$ip.']' : $ip)],
            CURLOPT_USERAGENT=>'IPBulucu/1.1 (+https://ipbulucu.org/api-dokumantasyon)',
            CURLOPT_HTTPHEADER=>[in_array($host,['dns.google','cloudflare-dns.com'],true) ? 'Accept: application/dns-json' : 'Accept: application/rdap+json, application/json, */*'],
            CURLOPT_HEADERFUNCTION=>function($c,$line) use (&$headers,&$headerBytes) {
                $headerBytes += strlen($line); if ($headerBytes>65536) return 0;
                if (stripos($line,'HTTP/')===0) $headers=[];
                elseif (strpos($line,':')!==false) { [$k,$v]=explode(':',$line,2); $k=strtolower(trim($k)); if (!in_array($k,['set-cookie','authorization','proxy-authorization'],true)) $headers[$k]=trim($v); }
                return strlen($line);
            },
            CURLOPT_WRITEFUNCTION=>function($c,$chunk) use (&$body) { if(strlen($body)+strlen($chunk)>1048576) return 0; $body.=$chunk; return strlen($chunk); }
        ]);
        $ok=curl_exec($curl); $status=(int)curl_getinfo($curl,CURLINFO_HTTP_CODE); $GLOBALS['IPBULUCU_HTTP_ERROR_CODE']=curl_errno($curl);
        if ($ok===false || !$status) return null;
        if (!in_array($status,[301,302,303,307,308],true) || empty($headers['location']) || $hop===$maxRedirects) return ['status'=>$status,'headers'=>$headers,'body'=>$body,'url'=>$url];
        $location=$headers['location'];
        if (strpos($location,'//')===0) $url=$parts['scheme'].':'.$location;
        elseif (preg_match('~^[a-z][a-z0-9+.-]*:~i',$location)) $url=$location;
        else {
            $authority=$parts['scheme'].'://'.$parts['host'].(isset($parts['port']) ? ':'.$port : '');
            if (strpos($location,'/')===0) $url=$authority.$location;
            elseif (strpos($location,'?')===0) $url=$authority.($parts['path']??'/').$location;
            else $url=$authority.rtrim(dirname($parts['path']??'/'),'/').'/'.$location;
        }
        // Each redirect is parsed, resolved and checked again before a pinned connection.
    }
    return null;
}
function ipb_doh($name,$type,$resolver='google',$timeoutMs=1600) {
    $codes=['A'=>1,'AAAA'=>28,'MX'=>15,'TXT'=>16,'NS'=>2,'CNAME'=>5,'SOA'=>6,'CAA'=>257];
    if (!isset($codes[$type])) ipb_fail(400,'Unsupported DNS record type.');
    $base=$resolver==='cloudflare' ? 'https://cloudflare-dns.com/dns-query' : 'https://dns.google/resolve';
    $start=microtime(true);
    $url=$base.'?name='.rawurlencode($name).'&type='.$type.'&edns_client_subnet=0.0.0.0%2F0';
    $response=ipb_http($url,false,$timeoutMs,0);
    // One bounded retry uses the same provider's official secondary address.
    // Keep certificate validation and the original total time budget on both attempts.
    $remaining=(int)($timeoutMs-(microtime(true)-$start)*1000);
    if ($response===null && $remaining>100 && in_array($GLOBALS['IPBULUCU_HTTP_ERROR_CODE']??0,[5,6,7,28,35,52,55,56,92],true)) {
        $response=ipb_http($url,false,$remaining,0,1);
    }
    $ms=(int)round((microtime(true)-$start)*1000);
    $data=$response && $response['status']===200 ? json_decode($response['body'],true) : null;
    $rcode=is_array($data) && isset($data['Status']) && is_int($data['Status']) ? $data['Status'] : null;
    $answers=[];
    if ($rcode===0 && empty($data['TC'])) foreach (($data['Answer']??[]) as $r) if (($r['type']??null)===$codes[$type] && is_string($r['data']??null)) $answers[]=$r['data'];
    $status=$rcode===3 ? 'nxdomain' : ($rcode===0 && empty($data['TC']) ? ($answers ? 'resolved' : 'no-record') : 'unavailable');
    return ['status'=>$status,'rcode'=>$rcode,'records'=>array_values(array_unique($answers)),'responseTimeMs'=>$ms,'resolver'=>$resolver,'upstreamHttpStatus'=>$response['status']??null,'transportErrorCode'=>$GLOBALS['IPBULUCU_HTTP_ERROR_CODE']??null];
}
function ipb_txt($value) {
    // DNS JSON represents TXT character strings quoted; concatenate their chunks.
    if (!preg_match_all('/"((?:[^"\\\\]|\\\\.)*)"/', $value, $matches)) return $value;
    return implode('',array_map(function($part) { return stripcslashes($part); },$matches[1]));
}
function ipb_json($data) { echo json_encode($data,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); }
