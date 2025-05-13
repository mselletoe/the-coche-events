<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "the_coche-events";

$conn = new mysqli($servername, $username, $password, $dbname);
$userId = 1;

$result = $conn->query("SELECT profile_picture FROM users WHERE id = $userId");
$row = $result->fetch_assoc();
$file = $row['profile_picture'];

if ($file && file_exists("../uploads/" . $file)) {
  unlink("../uploads/" . $file);
}

$conn->query("UPDATE users SET profile_picture = NULL WHERE id = $userId");

echo json_encode(["status" => "success"]);

$conn->close();
?>