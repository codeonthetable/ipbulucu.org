<?php
// Aggregate request counts only. No IP, lookup input, URL, token, raw UA, or identifier is stored.
// Provision a private sibling ipbulucu-metrics directory, or set IPBULUCU_METRICS_DIR.
// No directory is automatically created; metrics remain disabled until provisioned.
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'usage.php') { http_response_code(404); exit; }
$ipbMetricsDir = getenv('IPBULUCU_METRICS_DIR') ?: (isset($_SERVER['DOCUMENT_ROOT']) ? dirname($_SERVER['DOCUMENT_ROOT']) . '/ipbulucu-metrics' : false);
$ipbDocroot = realpath($_SERVER['DOCUMENT_ROOT'] ?? '') ?: '';
$ipbResolved = $ipbMetricsDir ? realpath($ipbMetricsDir) : false;
if ($ipbResolved && $ipbDocroot && strpos($ipbResolved . '/', $ipbDocroot . '/') !== 0 && is_writable($ipbResolved)) {
    $endpoint = basename($_SERVER['SCRIPT_FILENAME'] ?? '', '.php');
    if (!in_array($endpoint, ['ip','dns','whois','ssl','headers','port','blacklist','propagation','email-security','subnet','watch'], true)) return;
    $claimed = $_SERVER['HTTP_X_IPBULUCU_CLIENT'] ?? '';
    $client = in_array($claimed, ['web','chrome-extension','node-sdk','python-sdk'], true) ? $claimed . '_claimed' : 'unattributed';
    $ua = strtolower($_SERVER['HTTP_USER_AGENT'] ?? '');
    if ($client === 'unattributed' && preg_match('/gptbot|claudebot|google-extended|bytespider/', $ua)) $client = 'ai_crawler_claimed';
    elseif ($client === 'unattributed' && preg_match('/chatgpt-user|claude-user|perplexity-user|oai-searchbot|perplexitybot/', $ua)) $client = 'ai_agent_or_search_claimed';
    elseif ($client === 'unattributed' && preg_match('/googlebot|bingbot|ahrefsbot|semrushbot/', $ua)) $client = 'search_crawler_claimed';
    // Self-declared QA is separate from clients and people; never trust it as identity.
    if (($_SERVER['HTTP_X_IPBULUCU_CONTEXT'] ?? '') === 'operational_qa') $client = 'operational_qa_claimed';
    $action = $_SERVER['HTTP_X_IPBULUCU_ACTION'] ?? 'unspecified';
    if (!in_array($action, ['auto','user'], true)) $action = 'unspecified';
    register_shutdown_function(function () use ($ipbResolved, $endpoint, $client, $action) {
        $fp = @fopen($ipbResolved . '/' . gmdate('Y-m-d') . '.json', 'c+');
        if (!$fp) return;
        if (!flock($fp, LOCK_EX)) { fclose($fp); return; }
        $stats = json_decode(stream_get_contents($fp), true) ?: ['schema'=>1,'date_utc'=>gmdate('Y-m-d'),'counts'=>[]];
        $status = http_response_code() ?: 200;
        $key = $endpoint . '|' . $client . '|' . $action . '|' . (int)floor($status/100) . 'xx';
        $stats['counts'][$key] = ($stats['counts'][$key] ?? 0) + 1;
        rewind($fp); ftruncate($fp, 0); fwrite($fp, json_encode($stats)); fflush($fp); flock($fp, LOCK_UN); fclose($fp);
        // Keep provider outcomes separate from HTTP success and from the request-count schema.
        // Fixed labels only: no target, provider response, error string or user identifier.
        $outcome = $GLOBALS['ipbGeoOutcome'] ?? null;
        if ($endpoint !== 'ip' || !in_array($outcome, [
            'text_bypass', 'provider_available', 'provider_rate_limited', 'provider_http_error',
            'provider_timeout', 'provider_transport_error', 'provider_invalid_response',
            'provider_rejected', 'provider_ip_mismatch', 'provider_runtime_unavailable', 'budget_denied'
        ], true)) return;
        $fp = @fopen($ipbResolved . '/geo-outcomes-' . gmdate('Y-m-d') . '.json', 'c+');
        if (!$fp) return;
        if (!flock($fp, LOCK_EX)) { fclose($fp); return; }
        $stats = json_decode(stream_get_contents($fp), true) ?: ['schema'=>1,'date_utc'=>gmdate('Y-m-d'),'counts'=>[]];
        $stats['counts'][$outcome] = ($stats['counts'][$outcome] ?? 0) + 1;
        rewind($fp); ftruncate($fp, 0); fwrite($fp, json_encode($stats)); fflush($fp); flock($fp, LOCK_UN); fclose($fp);
    });
}
