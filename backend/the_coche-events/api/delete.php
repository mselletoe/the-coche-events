<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "the_coche-events");
if ($conn->connect_error) {
  die(json_encode(["status" => "error", "message" => "DB connection failed."]));
}

$input = json_decode(file_get_contents("php://input"), true);
$userId = isset($input['userId']) ? intval($input['userId']) : null;

if (!$userId) {
  echo json_encode(["status" => "error", "message" => "Missing userId."]);
  exit;
}

$result = $conn->query("SELECT filename FROM profile_pictures WHERE user_id = $userId");
$row = $result->fetch_assoc();
$file = $row['filename'] ?? null;

if ($file && file_exists("../uploads/" . $file)) {
  unlink("../uploads/" . $file);
}

$conn->query("DELETE FROM profile_pictures WHERE user_id = $userId");
echo json_encode(["status" => "success"]);

$conn->close();