<?php
// Database Connection Setup
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'the_coche-events';

// Create connection
$conn = mysqli_connect($host, $user, $pass, $dbname);

// Check connection
if (!$conn) {
    header('Content-Type: application/json; charset=UTF-8');
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . mysqli_connect_error()]);
    exit();  // Important: stop execution so no other output happens
}
?>