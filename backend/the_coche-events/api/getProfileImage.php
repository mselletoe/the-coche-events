<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "the_coche-events";

$conn = new mysqli($servername, $username, $password, $dbname);
$userId = 1;

$result = $conn->query("SELECT profile_picture FROM users WHERE id = $userId");
$row = $result->fetch_assoc();

if ($row && $row['profile_picture']) {
  echo json_encode(["status" => "success", "image" => $row['profile_picture']]);
} else {
  echo json_encode(["status" => "success", "image" => null]);
}

$conn->close();
?>