<?php
header('Content-Type: application/json');

$services = [ /// add your services here and duplicate
    ["name"=>"SSH", "type"=>"tcp", "host"=>"localhost", "port"=>22], // TCP port
    ["name"=>"SSH Service", "type"=>"systemd", "service"=>"sshd"], // systemd service
];

$result = [];

foreach ($services as $s) {
    if ($s['type'] === 'tcp') {
        $fp = @fsockopen($s['host'], $s['port'], $errno, $errstr, 3);
        $result[] = ["name"=>$s['name'], "host"=>$s['host'], "port"=>$s['port'], "status"=> $fp ? "Online" : "Offline"];
        if ($fp) fclose($fp);
    } else {
        $status = trim(shell_exec("systemctl is-active {$s['service']} 2>&1"));
        if ($status === 'active') {
            $status = "Online";
        } else {
            $status = "Offline";
        }
        $result[] = ["name"=>$s['name'], "service"=>$s['service'],"status"=>$status];
    }
}

header('Content-Type: application/json');
echo json_encode($result, JSON_PRETTY_PRINT);

?>
