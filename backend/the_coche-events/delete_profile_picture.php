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

// Database connection
include 'database.php';

// Parse raw JSON input
$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['user_id'] ?? null;

if (!$userId) {
    echo json_encode(['success' => false, 'error' => 'Missing user ID']);
    exit;
}

// Step 1: Get current picture path
$stmt = $conn->prepare("SELECT profile_picture FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);

if (!$stmt->execute()) {
    echo json_encode(['success' => false, 'error' => 'Select query failed: ' . $stmt->error]);
    exit;
}

$stmt->bind_result($path);
$stmt->fetch();
$stmt->close();

// Step 2: Delete file if it exists
if ($path && file_exists($path)) {
    if (!unlink($path)) {
        echo json_encode(['success' => false, 'error' => 'Could not delete file from disk.']);
        exit;
    }
}

// Step 3: Update DB to set profile_picture to NULL
$stmt = $conn->prepare("UPDATE users SET profile_picture = NULL WHERE id = ?");
$stmt->bind_param("i", $userId);

if (!$stmt->execute()) {
    echo json_encode(['success' => false, 'error' => 'Update query failed: ' . $stmt->error]);
    exit;
}

$stmt->close();
echo json_encode(['success' => true]);
?>