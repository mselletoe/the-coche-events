<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "the_coche-events");
if ($conn->connect_error) {
  die(json_encode(["status" => "error", "message" => "DB connection failed."]));
}

$userId = isset($_GET['userId']) ? intval($_GET['userId']) : null;
if (!$userId) {
  echo json_encode(["status" => "error", "message" => "Missing userId."]);
  exit;
}

$result = $conn->query("SELECT filename FROM profile_pictures WHERE user_id = $userId");
$row = $result->fetch_assoc();

$image = $row && $row['filename'] ? $row['filename'] : null;
echo json_encode(["status" => "success", "image" => $image]);

$conn->close();