<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$url = trim($_GET['url'] ?? '');
if (!preg_match('#^https?://#i', $url)) {
    $url = 'https://' . $url;
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_NOBODY, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 4);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$headers = [];
if ($response) {
    $lines = explode("\r\n", $response);
    foreach ($lines as $line) {
        if (strpos($line, ': ') !== false) {
            list($k, $v) = explode(': ', $line, 2);
            $headers[$k] = $v;
        }
    }
}

echo json_encode([
    'url' => $url,
    'statusCode' => $httpCode,
    'headers' => $headers,
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
