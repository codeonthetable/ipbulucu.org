<?php
require_once __DIR__ . '/common.php';
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, X-IPBulucu-Client, X-IPBulucu-Action');
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') { http_response_code(204); exit; }
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') { http_response_code(405); echo json_encode(['success'=>false,'error'=>'method_not_allowed']); exit; }

$input = $_GET['ip'] ?? ($_SERVER['REMOTE_ADDR'] ?? '');
// Forwarded headers are trusted only after the hosting proxy has been explicitly configured.
if (!isset($_GET['ip']) && getenv('IPBULUCU_TRUST_PROXY_HEADERS') === '1') {
    $input = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_REAL_IP'] ?? $input;
}
if (!is_string($input) || strlen($input) > 253) { http_response_code(400); echo json_encode(['success'=>false,'error'=>'invalid_target']); exit; }
$ip = trim($input);
if (!filter_var($ip, FILTER_VALIDATE_IP)) {
    if (!filter_var($ip, FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME) || strpos($ip, '.') === false) {
        http_response_code(400); echo json_encode(['success'=>false,'error'=>'invalid_ip_or_domain']); exit;
    }
    $ip = gethostbyname($ip);
}
if (!ipb_public_ip($ip)) {
    http_response_code(400); echo json_encode(['success'=>false,'error'=>'public_ip_required']); exit;
}
$format = $_GET['format'] ?? '';
if (!is_string($format) || !in_array($format, ['', 'json', 'text'], true)) ipb_fail(400, 'invalid_format');
$accept = $_SERVER['HTTP_ACCEPT'] ?? '';
$isCli = preg_match('/curl|wget|httpie/i', $_SERVER['HTTP_USER_AGENT'] ?? '') === 1;
if ($format === 'text' || ($isCli && $format !== 'json' && stripos($accept, 'application/json') === false)) {
    header('Content-Type: text/plain; charset=utf-8'); echo $ip . "\n"; exit;
}
$data = null;
if (function_exists('curl_init') && ipb_budget('geolocation-day', 850, 86400)) {
    $ch = curl_init('https://ipwho.is/' . rawurlencode($ip));
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER=>true, CURLOPT_CONNECTTIMEOUT=>2, CURLOPT_TIMEOUT=>5, CURLOPT_SSL_VERIFYPEER=>true, CURLOPT_SSL_VERIFYHOST=>2, CURLOPT_USERAGENT=>'ipbulucu.org/1.1']);
    $raw = curl_exec($ch); $status = curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch);
    if ($raw !== false && $status === 200) $data = json_decode($raw, true);
}
$valid = is_array($data) && ($data['success'] ?? false) === true && ($data['ip'] ?? '') === $ip;
if (!$valid) $data = [];
function ipb_text($v) { return is_string($v) && $v !== '' ? $v : null; }
$asn = $data['connection']['asn'] ?? null;
$output = [
    'success'=>true, 'ip'=>$ip, 'version'=>strpos($ip, ':') !== false ? 'IPv6' : 'IPv4',
    'geoStatus'=>$valid ? 'available' : 'unavailable', 'source'=>$valid ? 'ipwho.is' : null,
    'country'=>ipb_text($data['country'] ?? null), 'countryCode'=>ipb_text($data['country_code'] ?? null),
    'city'=>ipb_text($data['city'] ?? null), 'region'=>ipb_text($data['region'] ?? null),
    'latitude'=>isset($data['latitude']) && is_numeric($data['latitude']) ? (float)$data['latitude'] : null,
    'longitude'=>isset($data['longitude']) && is_numeric($data['longitude']) ? (float)$data['longitude'] : null,
    'timezone'=>ipb_text($data['timezone']['id'] ?? null),
    'isp'=>ipb_text($data['connection']['isp'] ?? null), 'org'=>ipb_text($data['connection']['org'] ?? null),
    'asn'=>is_numeric($asn) ? 'AS'.$asn : null,
    // Unknown never means safe, residential, a measured speed, or a closed port.
    'isVpn'=>null, 'isProxy'=>null, 'isTor'=>null, 'isHosting'=>null, 'isCgnat'=>null,
    'securityScore'=>null, 'fraudScore'=>null, 'threatLevel'=>null, 'userPersona'=>null,
    'connectionType'=>null, 'lineSpeedTier'=>null, 'exposedServices'=>[], 'globalPings'=>[], 'gamePings'=>[],
    'limitations'=>['Geolocation is approximate.', 'VPN, CGNAT, speed, identity, reputation and ports are not measured by this endpoint.'],
    'checkedAt'=>gmdate('c')
];
echo json_encode($output, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
