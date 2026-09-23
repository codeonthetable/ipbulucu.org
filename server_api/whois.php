<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('X-LiteSpeed-Cache-Control: no-cache');
header('Cache-Control: no-store, no-cache, must-revalidate');

$domain = trim($_GET['domain'] ?? $_GET['query'] ?? '');
if (empty($domain)) {
    echo json_encode(['error' => 'Alan adı belirtilmedi.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$domain = strtolower(preg_replace('#^https?://#i', '', $domain));
$domain = preg_replace('#[/:?#].*$#', '', $domain);

$server = 'whois.verisign-grs.com';
$isTr = (bool)preg_match('/\.tr$/i', $domain);

if ($isTr) {
    $server = 'whois.trabis.gov.tr';
} elseif (preg_match('/\.org$/i', $domain)) {
    $server = 'whois.pir.org';
} elseif (preg_match('/\.io$/i', $domain)) {
    $server = 'whois.nic.io';
} elseif (preg_match('/\.de$/i', $domain)) {
    $server = 'whois.denic.de';
} elseif (preg_match('/\.uk$/i', $domain)) {
    $server = 'whois.nominet.uk';
}

$raw = '';
$fp = @fsockopen($server, 43, $errno, $errstr, 3);
if ($fp) {
    fputs($fp, $domain . "\r\n");
    stream_set_timeout($fp, 3);
    while (!feof($fp)) {
        $raw .= fgets($fp, 128);
    }
    fclose($fp);
}

if (!empty($raw)) {
    $raw = mb_convert_encoding($raw, 'UTF-8', 'UTF-8, ISO-8859-9, Windows-1254, ISO-8859-1');
}

$registrar = 'Bilinmiyor';
$createdDate = null;
$expiryDate = null;
$nameServers = [];

// Fallback to RDAP
if (empty(trim($raw)) || stripos($raw, 'Whois sunucusuna') !== false) {
    $rdapUrl = "https://rdap.org/domain/" . urlencode($domain);
    $ch = curl_init($rdapUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 4);
    curl_setopt($ch, CURLOPT_USERAGENT, 'ipbulucu.org-Whois/1.0');
    $rdapRaw = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($rdapRaw && $httpCode >= 200 && $httpCode < 300) {
        $rdap = json_decode($rdapRaw, true);
        if ($rdap) {
            $raw = json_encode($rdap, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            if (isset($rdap['entities'])) {
                foreach ($rdap['entities'] as $e) {
                    if (isset($e['roles']) && in_array('registrar', $e['roles'])) {
                        $registrar = $e['vcardArray'][1][1][3] ?? $e['handle'] ?? 'Bilinmiyor';
                    }
                }
            }
            if (isset($rdap['events'])) {
                foreach ($rdap['events'] as $ev) {
                    if ($ev['eventAction'] === 'registration') $createdDate = $ev['eventDate'];
                    if ($ev['eventAction'] === 'expiration') $expiryDate = $ev['eventDate'];
                }
            }
            if (isset($rdap['nameservers'])) {
                foreach ($rdap['nameservers'] as $ns) {
                    if (isset($ns['ldhName'])) $nameServers[] = strtolower($ns['ldhName']);
                }
            }
        }
    }
}

if (!empty($raw) && $registrar === 'Bilinmiyor') {
    if (preg_match('/(Registrar:|Registrar Name:|Organization Name:)\s*(.+)/i', $raw, $m)) {
        $registrar = trim($m[2]);
    }
    if (preg_match('/(Creation Date:|Created on:|Registration Time:|Created:)\s*(.+)/i', $raw, $m)) {
        $createdDate = trim($m[2]);
    }
    if (preg_match('/(Registry Expiry Date:|Expiration Date:|Expires on:|Expires:)\s*(.+)/i', $raw, $m)) {
        $expiryDate = trim($m[2]);
    }
    if (preg_match_all('/(Name Server:|nserver:)\s*([^\s]+)/i', $raw, $m)) {
        $nameServers = array_unique(array_map('trim', $m[2]));
    }
}

echo json_encode([
    'domain' => $domain,
    'server' => $server,
    'registrar' => $registrar,
    'createdDate' => $createdDate,
    'expiryDate' => $expiryDate,
    'nameServers' => array_values($nameServers),
    'raw' => $raw ?: "Whois verisi bulunamadı.",
    'isTr' => $isTr,
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_INVALID_UTF8_SUBSTITUTE);
