<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "the_coche-events";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$userId = 1; // Temporarily hardcoded user ID for testing

// Fetch existing profile picture
$result = $conn->query("SELECT profile_picture FROM users WHERE id = $userId");
$row = $result->fetch_assoc();
$oldFile = $row['profile_picture'];

if(isset($_FILES['image'])){
  $imageName = uniqid() . "_" . basename($_FILES['image']['name']);
  $targetDir = "../uploads/";
  $targetFile = $targetDir . $imageName;

  if(move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)){
    // Delete old image file
    if ($oldFile && file_exists($targetDir . $oldFile)) {
      unlink($targetDir . $oldFile);
    }

    // Update database
    $conn->query("UPDATE users SET profile_picture = '$imageName' WHERE id = $userId");

    echo json_encode(["status" => "success", "image" => $imageName]);
  } else {
    echo json_encode(["status" => "error", "message" => "Failed to upload."]);
  }
}

$conn->close();
?>
