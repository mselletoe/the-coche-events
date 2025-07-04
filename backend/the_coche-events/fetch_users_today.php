<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Max-Age: 600");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
include 'database.php';

$sql = "
    SELECT COUNT(*) AS count 
    FROM users 
    WHERE DATE(date_registered) = CURDATE()
";

$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

echo json_encode(['today_count' => $row['count']]);
?>