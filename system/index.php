<?php
header('Content-Type: application/json');

$load = sys_getloadavg();
$cpu1 = $load[0];
$cpu5 = $load[1];
$cpu15 = $load[2];
$totalCPU = (int)trim(shell_exec("nproc"));
$ramInfo = file_get_contents("/proc/meminfo");
$disk = disk_total_space("/");
$diskFree = disk_free_space("/");
$diskUsed = $disk - $diskFree;
$diskTotalGig = $disk / (1024 * 1024 * 1024);
$diskUsedGig = $diskUsed / (1024 * 1024 * 1024);
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


$memTotalGig = $memTotal / 1024;
$availMemoryGig = $availMemory / 1024;
$ramPercent = round((1 - $availMemory / $memTotal) * 100, 2);
$cpuUsagePercent1 = ($cpu1 / $totalCPU) * 100;
$cpuUsagePercent5 = ($cpu5 / $totalCPU) * 100;
$cpuUsagePercent15 = ($cpu15 / $totalCPU) * 100;

echo json_encode([
    "cpu" => round($cpu1, 2),
    "cpu5" => round($cpu5, 2),
    "cpu15" => round($cpu15, 2),
    "memTotal" => round($memTotalGig, 2),
    "availMemory" => round($availMemoryGig, 2),
    "ramPercent" => $ramPercent,
    "cpuPercent1" => round($cpuUsagePercent1, 1),
    "cpuPercent5" => round($cpuUsagePercent5, 1),
    "cpuPercent15" => round($cpuUsagePercent15, 1),
    "diskTotal" => round($diskTotalGig, 2),
    "diskUsed" => round($diskUsedGig, 2),
    "diskFree" => round($diskFreeGig, 2),
    "diskUsagePercent" => $diskUsagePercent
], JSON_PRETTY_PRINT);
?>
