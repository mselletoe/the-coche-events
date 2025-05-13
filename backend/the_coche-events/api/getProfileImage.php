<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "the_coche-events";

// Validate user_id from GET parameters
$userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($userId <= 0) {
  echo json_encode(["status" => "error", "message" => "Invalid or missing user ID."]);
  exit;
}

// Connect to database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  echo json_encode(["status" => "error", "message" => "Database connection failed."]);
  exit;
}

// Fetch profile picture
$result = $conn->query("SELECT profile_picture FROM users WHERE id = $userId");
if ($row = $result->fetch_assoc()) {
  $image = $row['profile_picture'] ?? null;
  echo json_encode(["status" => "success", "image" => $image]);
} else {
  echo json_encode(["status" => "error", "message" => "User not found."]);
}

$conn->close();
?>
