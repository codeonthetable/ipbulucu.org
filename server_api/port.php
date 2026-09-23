<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$host = trim($_GET['host'] ?? $_GET['ip'] ?? '');
$port = intval($_GET['port'] ?? 80);

if (empty($host)) {
    echo json_encode(['error' => 'Hedef adres belirtilmedi.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$start = microtime(true);
$fp = @fsockopen($host, $port, $errno, $errstr, 2);
$latency = round((microtime(true) - $start) * 1000);

if ($fp) {
    fclose($fp);
    echo json_encode([
        'host' => $host,
        'port' => $port,
        'status' => 'open',
        'isOpen' => true,
        'responseTimeMs' => $latency,
        'message' => "Port $port açık ve erişilebilir.",
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        'host' => $host,
        'port' => $port,
        'status' => 'closed',
        'isOpen' => false,
        'responseTimeMs' => $latency,
        'message' => "Port $port kapalı veya filtrelenmiş.",
    ], JSON_UNESCAPED_UNICODE);
}
