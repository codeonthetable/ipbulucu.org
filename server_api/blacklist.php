<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$ip = trim($_GET['ip'] ?? '');
if (empty($ip) || !filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
    echo json_encode(['error' => 'Geçerli bir IPv4 adresi belirtilmedi.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$reverseIp = implode('.', array_reverse(explode('.', $ip)));
$blacklists = [
    ['name' => 'Spamhaus (Zen)', 'host' => 'zen.spamhaus.org'],
    ['name' => 'Barracuda BRBL', 'host' => 'b.barracudacentral.org'],
    ['name' => 'SpamCop', 'host' => 'bl.spamcop.net'],
    ['name' => 'SORBS (DNSBL)', 'host' => 'dnsbl.sorbs.net'],
    ['name' => 'UCEPROTECT L1', 'host' => 'dnsbl-1.uceprotect.net'],
];

$results = [];
foreach ($blacklists as $bl) {
    $lookup = $reverseIp . '.' . $bl['host'];
    $listed = checkdnsrr($lookup, 'A');
    $results[] = [
        'name' => $bl['name'],
        'host' => $bl['host'],
        'isListed' => $listed,
        'status' => $listed ? 'Listed' : 'Clean',
    ];
}

echo json_encode([
    'ip' => $ip,
    'results' => $results,
    'isClean' => !in_array(true, array_column($results, 'isListed')),
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
