<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

function get_client_ip() {
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) return $_SERVER['HTTP_CF_CONNECTING_IP'];
    if (!empty($_SERVER['HTTP_X_REAL_IP'])) return $_SERVER['HTTP_X_REAL_IP'];
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($ips[0]);
    }
    return $_SERVER['REMOTE_ADDR'] ?? '81.213.153.20';
}

$ip = get_client_ip();
$token = $_GET['token'] ?? 'tr_demo';

echo json_encode([
    'success' => true,
    'token' => $token,
    'detectedIp' => $ip,
    'timestamp' => date('c'),
    'status' => 'IP aktif ve izleme listesinde güncellendi.',
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
