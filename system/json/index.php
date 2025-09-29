<?php
header('Content-Type: application/json');

$load = sys_getloadavg();
$cpu1 = $load[0];
$cpu5 = $load[1];
$totalCPU = (int)trim(shell_exec("nproc"));
$ramInfo = file_get_contents("/proc/meminfo");
$disk = disk_total_space("/");
$diskFree = disk_free_space("/");
$diskUsed = $disk - $diskFree;
$diskTotalGig = $disk / (1024 * 1024 * 1024);
$diskFreeGig = $diskFree / (1024 * 1024 * 1024);
$diskUsagePercent = round(($diskUsed / $disk) * 100, 2);

if ($ramInfo === false) {
    echo json_encode(["error" => "Unable to read /proc/meminfo"]);
    exit;
}

preg_match("/MemTotal:\s+(\d+)/", $ramInfo, $matches);
$memTotal = isset($matches[1]) ? (int)$matches[1] : null;

preg_match("/MemAvailable:\s+(\d+)/", $ramInfo, $matches);
$availMemory = isset($matches[1]) ? (int)$matches[1] : null;

if ($memTotal === null || $availMemory === null) {
    echo json_encode(["error" => "Memory information not found"]);
    exit;
}


$memTotalGig = round($memTotal / (1024 * 1024), 2);
$availMemoryGig = round($availMemory / (1024 * 1024), 2);
$ramPercent = round((1 - $availMemory / $memTotal) * 100, 2);
$cpuUsagePercent1 = ($cpu1 / $totalCPU) * 100;

echo json_encode([
    "cpu" => [
        "load1" => round($cpu1, 2),
        "load5" => round($cpu5, 2),
        "usage1" => round($cpuUsagePercent1, 1),
    ],
    "ram" => [
        "totalGB" => $memTotalGig,
        "availableGB" => $availMemoryGig,
        "usedPercent" => $ramPercent
    ],
    "disk" => [
        "totalGB" => round($diskTotalGig, 2),
        "freeGB" => round($diskFreeGig, 2),
        "usedPercent" => $diskUsagePercent
    ]
], JSON_PRETTY_PRINT);

