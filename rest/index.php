<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$response = file_get_contents('https://api.spacexdata.com/latest/capsules');

echo $response

?>