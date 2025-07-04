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

$today = date('Y-m-d'); // store as real calendar date

$sql = "INSERT INTO website_visits (visit_date) VALUES (?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $today);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Visit tracked']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Tracking failed']);
}
?>