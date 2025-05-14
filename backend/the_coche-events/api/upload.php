<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
$conn = new mysqli("localhost", "root", "", "the_coche-events");
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Get userId from POST
$userId = isset($_POST['userId']) ? intval($_POST['userId']) : 0;
if (!$userId || !isset($_FILES['image'])) {
  echo json_encode(["status" => "error", "message" => "Missing data."]);
  exit();
}

// Check for old profile image
$stmt = $conn->prepare("SELECT filename FROM profile_pictures WHERE user_id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$oldImage = $result->fetch_assoc();
$stmt->close();

// Delete old file and db entry if it exists
if ($oldImage) {
  $oldFilePath = __DIR__ . "/../uploads/" . $oldImage['filename'];
  if (file_exists($oldFilePath)) {
    unlink($oldFilePath);
  }

  $delStmt = $conn->prepare("DELETE FROM profile_pictures WHERE user_id = ?");
  $delStmt->bind_param("i", $userId);
  $delStmt->execute();
  $delStmt->close();
}

// Upload new image
$imageName = uniqid() . "_" . basename($_FILES['image']['name']);
$targetDir = __DIR__ . "/../uploads/";
$targetFile = $targetDir . $imageName;

if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
  // Save new entry
  $insert = $conn->prepare("INSERT INTO profile_pictures (user_id, filename) VALUES (?, ?)");
  $insert->bind_param("is", $userId, $imageName);
  $insert->execute();
  $insert->close();

  echo json_encode(["status" => "success", "image" => $imageName]);
} else {
  echo json_encode(["status" => "error", "message" => "Failed to upload."]);
}

$conn->close();