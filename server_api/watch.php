<?php
require_once __DIR__ . '/usage.php';
http_response_code(501);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
echo json_encode(['success'=>false,'error'=>'monitoring_not_configured','message'=>'Server-side monitoring and push notifications are not available. The website offers monitoring while its tab remains open.']);
