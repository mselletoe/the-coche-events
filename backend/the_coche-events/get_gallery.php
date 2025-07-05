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

$sql = "SELECT id, filename, caption FROM gallery ORDER BY id DESC";
$result = mysqli_query($conn, $sql);

$gallery = [];

while ($row = mysqli_fetch_assoc($result)) {
    $gallery[] = [
        "id" => $row['id'],
        "src" => $row['filename'], 
        "caption" => $row['caption'],
        "filename" => $row['filename'],
        "uploaded" => true
    ];
}

echo json_encode($gallery);