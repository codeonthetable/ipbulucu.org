<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('X-LiteSpeed-Cache-Control: no-cache');
header('Cache-Control: no-store, no-cache, must-revalidate');

function get_target_domain() {
    $d = $_GET['domain'] ?? $_GET['host'] ?? $_GET['ip'] ?? $_GET['query'] ?? '';
    if (empty($d) && !empty($_SERVER['QUERY_STRING'])) {
        parse_str($_SERVER['QUERY_STRING'], $qs);
        $d = $qs['domain'] ?? $qs['host'] ?? $qs['ip'] ?? $qs['query'] ?? '';
    }
    return trim($d);
}

$domain = get_target_domain();
$domain = preg_replace('#^https?://#i', '', $domain);
$domain = preg_replace('#[/:?#].*$#', '', $domain);

if (empty($domain)) {
    echo json_encode(['error' => 'Alan adı belirtilmedi.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$g = stream_context_create(["ssl" => ["capture_peer_cert" => true, "verify_peer" => false, "verify_peer_name" => false]]);
$r = @stream_socket_client("ssl://$domain:443", $errno, $errstr, 4, STREAM_CLIENT_CONNECT, $g);

if (!$r) {
    echo json_encode(['domain' => $domain, 'valid' => false, 'error' => "SSL bağlantısı kurulamadı ($errstr)"], JSON_UNESCAPED_UNICODE);
    exit;
}

$cont = stream_context_get_params($r);
$cert = openssl_x509_parse($cont["options"]["ssl"]["peer_certificate"]);
fclose($r);

$validFrom = date('c', $cert['validFrom_time_t']);
$validTo = date('c', $cert['validTo_time_t']);
$daysRemaining = round(($cert['validTo_time_t'] - time()) / 86400);

echo json_encode([
    'domain' => $domain,
    'valid' => $daysRemaining > 0,
    'issuer' => $cert['issuer']['O'] ?? $cert['issuer']['CN'] ?? 'Bilinmiyor',
    'subject' => $cert['subject']['CN'] ?? $domain,
    'validFrom' => $validFrom,
    'validTo' => $validTo,
    'daysRemaining' => $daysRemaining,
    'serialNumber' => $cert['serialNumberHex'] ?? '',
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
