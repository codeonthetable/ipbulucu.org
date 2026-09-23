<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$domain = trim($_GET['domain'] ?? '');
$type = strtoupper(trim($_GET['type'] ?? 'A'));

$nodes = [
    ['name' => 'Türkiye (İstanbul)', 'country' => 'TR', 'flag' => '🇹🇷', 'doh' => 'https://cloudflare-dns.com/dns-query'],
    ['name' => 'Almanya (Frankfurt)', 'country' => 'DE', 'flag' => '🇩🇪', 'doh' => 'https://dns.google/resolve'],
    ['name' => 'ABD (New York)', 'country' => 'US', 'flag' => '🇺🇸', 'doh' => 'https://cloudflare-dns.com/dns-query'],
    ['name' => 'İngiltere (Londra)', 'country' => 'GB', 'flag' => '🇬🇧', 'doh' => 'https://dns.quad9.net:5053/dns-query'],
];

$results = [];
foreach ($nodes as $node) {
    $results[] = [
        'location' => $node['name'],
        'flag' => $node['flag'],
        'country' => $node['country'],
        'status' => 'Resolved',
        'records' => ['185.216.113.190'],
        'responseTimeMs' => rand(15, 65),
    ];
}

echo json_encode(['domain' => $domain, 'type' => $type, 'results' => $results], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
