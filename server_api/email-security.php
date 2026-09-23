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

$txtRecords = @dns_get_record($domain, DNS_TXT);
$dmarcRecords = @dns_get_record('_dmarc.' . $domain, DNS_TXT);
$mxRecords = @dns_get_record($domain, DNS_MX);

$spf = null;
if ($txtRecords) {
    foreach ($txtRecords as $r) {
        if (isset($r['txt']) && stripos($r['txt'], 'v=spf1') !== false) {
            $spf = $r['txt'];
            break;
        }
    }
}

$dmarc = null;
if ($dmarcRecords) {
    foreach ($dmarcRecords as $r) {
        if (isset($r['txt']) && stripos($r['txt'], 'v=DMARC1') !== false) {
            $dmarc = $r['txt'];
            break;
        }
    }
}

echo json_encode([
    'domain' => $domain,
    'spf' => $spf ? ['valid' => true, 'raw' => $spf] : ['valid' => false],
    'dmarc' => $dmarc ? ['valid' => true, 'raw' => $dmarc] : ['valid' => false],
    'mx' => $mxRecords ?: [],
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
