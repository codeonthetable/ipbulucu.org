<?php
require_once __DIR__ . '/common.php';
ipb_begin();
$cidr = ipb_input(['cidr','ip']);
if ($cidr === '') ipb_fail(400, 'Enter an IPv4 CIDR block.');

// Default prefix /24 if omitted
if (strpos($cidr, '/') === false) {
    $cidr .= '/24';
}

list($ip, $prefix) = explode('/', $cidr, 2);
if (!preg_match('/^(?:[0-9]|[12][0-9]|3[0-2])$/', $prefix)) ipb_fail(400, 'Invalid prefix length.');
$prefix = intval($prefix);
$ip = trim($ip);

if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) || $prefix < 0 || $prefix > 32) {
    ipb_fail(400, 'Enter a valid IPv4 CIDR block.');
}

$ipLong = ip2long($ip);
$netmaskLong = -1 << (32 - $prefix);
if ($prefix === 0) $netmaskLong = 0;

$networkLong = $ipLong & $netmaskLong;
$broadcastLong = $networkLong | (~$netmaskLong & 0xFFFFFFFF);

$networkAddress = long2ip($networkLong);
$broadcastAddress = long2ip($broadcastLong);
$netmask = long2ip($netmaskLong);
$wildcardMask = long2ip(~$netmaskLong & 0xFFFFFFFF);

$totalHosts = pow(2, 32 - $prefix);
$usableHosts = $prefix >= 31 ? ($prefix === 31 ? 2 : 1) : max(0, $totalHosts - 2);

if ($prefix <= 30) {
    $firstHost = long2ip($networkLong + 1);
    $lastHost = long2ip($broadcastLong - 1);
    $usableHostRange = "$firstHost - $lastHost";
} elseif ($prefix === 31) {
    $usableHostRange = "$networkAddress - $broadcastAddress (Point-to-Point)";
} else {
    $usableHostRange = "$networkAddress (Tek Cihaz / Host)";
}

// IP Class
$firstOctet = intval(explode('.', $ip)[0]);
$ipClass = 'Bilinmiyor';
if ($firstOctet >= 1 && $firstOctet <= 126) $ipClass = 'A Sınıfı';
elseif ($firstOctet >= 128 && $firstOctet <= 191) $ipClass = 'B Sınıfı';
elseif ($firstOctet >= 192 && $firstOctet <= 223) $ipClass = 'C Sınıfı';
elseif ($firstOctet >= 224 && $firstOctet <= 239) $ipClass = 'D Sınıfı (Multicast)';
elseif ($firstOctet >= 240 && $firstOctet <= 255) $ipClass = 'E Sınıfı (Deneysel)';

$isPrivate = !filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE);
$ipType = $isPrivate ? 'Özel Ağ (Private)' : (ipb_public_ip($ip) ? 'Genel İnternet (Public)' : 'Özel amaç / Ayrılmış (Special-use / Reserved)');

$binaryIp = implode('.', array_map(function($o) { return str_pad(decbin(intval($o)), 8, '0', STR_PAD_LEFT); }, explode('.', $ip)));
$binaryNetmask = implode('.', array_map(function($o) { return str_pad(decbin(intval($o)), 8, '0', STR_PAD_LEFT); }, explode('.', $netmask)));

echo json_encode([
    'success' => true,
    'cidr' => "$ip/$prefix",
    'ipAddress' => $ip,
    'prefix' => $prefix,
    'netmask' => $netmask,
    'wildcardMask' => $wildcardMask,
    'networkAddress' => $networkAddress,
    'broadcastAddress' => $broadcastAddress,
    'usableHostRange' => $usableHostRange,
    'totalHosts' => $totalHosts,
    'usableHosts' => $usableHosts,
    'ipClass' => $ipClass,
    'isPrivate' => $isPrivate,
    'ipType' => $ipType,
    'binaryIp' => $binaryIp,
    'binaryNetmask' => $binaryNetmask,
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
