<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "the_coche-events");
if ($conn->connect_error) {
  die(json_encode(["status" => "error", "message" => "Database connection failed."]));
}

$userId = isset($_POST['userId']) ? intval($_POST['userId']) : null;
if (!$userId) {
  echo json_encode(["status" => "error", "message" => "Missing user ID."]);
  exit;
}

if (isset($_FILES['image'])) {
  $imageName = uniqid() . "_" . basename($_FILES['image']['name']);
  $targetDir = "../uploads/";
  $targetFile = $targetDir . $imageName;

  $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  $fileType = mime_content_type($_FILES['image']['tmp_name']);
  if (!in_array($fileType, $allowedTypes)) {
    echo json_encode(["status" => "error", "message" => "Invalid file type."]);
    exit;
  }

  // Delete old image if exists
  $result = $conn->query("SELECT filename FROM profile_pictures WHERE user_id = $userId");
  $row = $result->fetch_assoc();
  $oldFile = $row['filename'] ?? null;

  if ($oldFile && file_exists($targetDir . $oldFile)) {
    unlink($targetDir . $oldFile);
  }

  // Move new file
  if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
    // Upsert into profile_pictures table
    $stmt = $conn->prepare("
      INSERT INTO profile_pictures (user_id, filename)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE filename = VALUES(filename), uploaded_at = CURRENT_TIMESTAMP
    ");
    $stmt->bind_param("is", $userId, $imageName);
    $stmt->execute();

    echo json_encode(["status" => "success", "image" => $imageName]);
  } else {
    echo json_encode(["status" => "error", "message" => "Failed to move uploaded file."]);
  }
} else {
  echo json_encode(["status" => "error", "message" => "No file uploaded."]);
}

$conn->close();