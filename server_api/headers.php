<?php
require_once __DIR__ . '/common.php';
ipb_begin();
$url = ipb_input(['url','host','domain']);
if ($url === '') ipb_fail(400, 'Enter a URL.');
if (strpos($url, '://') === false) $url = 'https://' . $url;
$start = microtime(true);
$response = ipb_http($url, true);
if (!$response) ipb_fail(502, 'HTTP response unavailable. Connection, timeout or TLS verification failed.');
$httpCode = $response['status'];
$effectiveUrl = $response['url'];
$responseTimeMs = (int)round((microtime(true) - $start) * 1000);
$headers = $response['headers'];
$lowerHeaders = $headers;

$securityHeadersDef = [
    [
        'name' => 'HSTS (Strict-Transport-Security)',
        'header' => 'Strict-Transport-Security',
        'key' => 'strict-transport-security',
        'desc' => 'Tüm bağlantıların şifreli HTTPS üzerinden yapılmasını zorunlu kılar.',
    ],
    [
        'name' => 'Content-Security-Policy (CSP)',
        'header' => 'Content-Security-Policy',
        'key' => 'content-security-policy',
        'desc' => 'Tarayıcı kaynak politikasını belirtir; koruma etkisi politikanın içeriğine bağlıdır.',
    ],
    [
        'name' => 'X-Frame-Options (Clickjacking)',
        'header' => 'X-Frame-Options',
        'key' => 'x-frame-options',
        'desc' => 'Sitenizin iframe içine gizlenerek kullanıcı tıklamalarının çalınmasını engeller.',
    ],
    [
        'name' => 'X-Content-Type-Options (MIME Sniffing)',
        'header' => 'X-Content-Type-Options',
        'key' => 'x-content-type-options',
        'desc' => 'Tarayıcının dosya türlerini yanlış yorumlayıp zararlı kod çalıştırmasını önler.',
    ],
    [
        'name' => 'Referrer-Policy',
        'header' => 'Referrer-Policy',
        'key' => 'referrer-policy',
        'desc' => 'Yönlendiren adresin paylaşımını belirler; etki başlığın değerine bağlıdır.',
    ],
    [
        'name' => 'Permissions-Policy',
        'header' => 'Permissions-Policy',
        'key' => 'permissions-policy',
        'desc' => 'Kamera, mikrofon ve konum gibi cihaz sensörlerinin izinsiz kullanımını kısıtlar.',
    ],
];

$securityAudit = [];
$passed = 0;

foreach ($securityHeadersDef as $sh) {
    $val = $lowerHeaders[$sh['key']] ?? null;
    $present = !empty($val);
    if ($present) $passed++;
    $securityAudit[] = [
        'name' => $sh['name'],
        'header' => $sh['header'],
        'present' => $present,
        'value' => $present ? $val : 'Tanımlanmamış',
        'description' => $sh['desc'],
    ];
}

$total = count($securityHeadersDef);
$grade = 'F';
if ($passed >= 5) $grade = 'A+';
elseif ($passed >= 4) $grade = 'A';
elseif ($passed >= 3) $grade = 'B';
elseif ($passed >= 2) $grade = 'C';
elseif ($passed >= 1) $grade = 'D';

$statusText = 'OK';
if ($httpCode >= 400 && $httpCode < 500) $statusText = 'Client Error';
elseif ($httpCode >= 500) $statusText = 'Server Error';
elseif ($httpCode >= 300 && $httpCode < 400) $statusText = 'Redirect';

echo json_encode([
    'success' => true,
    'assessment' => 'Header presence only; policy values and vulnerability protection are not validated.',
    'url' => $url,
    'finalUrl' => $effectiveUrl,
    'statusCode' => $httpCode,
    'statusText' => $statusText,
    'responseTimeMs' => $responseTimeMs,
    'headers' => $headers,
    'securityAudit' => $securityAudit,
    'scoreGrade' => $grade,
    'passedSecurityCount' => $passed,
    'totalSecurityHeaders' => $total,
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
