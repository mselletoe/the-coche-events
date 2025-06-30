<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Max-Age: 600");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
include '../database.php';

// Get User ID from the Request
$userId = isset($_GET['userId']) ? intval($_GET['userId']) : null;
if (!$userId) {
  echo json_encode(["status" => "error", "message" => "Missing userId."]);
  exit;
}

// Query the Database for Profile Picture
$result = $conn->query("SELECT filename FROM profile_pictures WHERE user_id = $userId");
$row = $result->fetch_assoc();

// Handle Missing Profile Picture
$image = $row && $row['filename'] ? $row['filename'] : null;
echo json_encode(["status" => "success", "image" => $image]);

$conn->close();