<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$domain = trim($_GET['domain'] ?? '');
$type = strtoupper(trim($_GET['type'] ?? 'ALL'));

if (empty($domain)) {
    echo json_encode(['error' => 'Alan adı belirtilmedi.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$dnsTypeMap = [
    'A' => DNS_A,
    'AAAA' => DNS_AAAA,
    'MX' => DNS_MX,
    'TXT' => DNS_TXT,
    'NS' => DNS_NS,
    'CNAME' => DNS_CNAME,
    'SOA' => DNS_SOA,
    'ALL' => DNS_ALL,
];

$selectedType = $dnsTypeMap[$type] ?? DNS_ALL;
$records = @dns_get_record($domain, $selectedType);

echo json_encode([
    'domain' => $domain,
    'type' => $type,
    'records' => $records ?: [],
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
