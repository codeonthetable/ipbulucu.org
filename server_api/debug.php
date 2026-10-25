<?php
http_response_code(404);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['error'=>'not_found']);
