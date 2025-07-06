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

$userId = $_POST['user_id'] ?? null;

if (!$userId || !isset($_FILES['profile_picture'])) {
    echo json_encode(['success' => false, 'error' => 'Missing user_id or file.']);
    exit;
}

$file = $_FILES['profile_picture'];

// Check for file errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'error' => 'Upload error: ' . $file['error']]);
    exit;
}

// Check file type (security best practice)
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

if (!in_array($ext, $allowedExtensions)) {
    echo json_encode(['success' => false, 'error' => 'Invalid file type.']);
    exit;
}

// Prepare target path
$targetDir = "uploads/profile_pictures/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0755, true);
}

$filename = "user_" . $userId . "." . $ext;
$targetFile = $targetDir . $filename;

// Move uploaded file
if (move_uploaded_file($file["tmp_name"], $targetFile)) {
    $stmt = $conn->prepare("UPDATE users SET profile_picture = ? WHERE id = ?");
    $stmt->bind_param("si", $targetFile, $userId);
    $stmt->execute();

    echo json_encode(['success' => true, 'path' => $targetFile]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to move uploaded file.']);
}

?>