<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Connect to database
$conn = new mysqli("localhost", "root", "", "the_coche-events");

// Get and decode POST data
$data = json_decode(file_get_contents("php://input"), true);

$identifier = $data["identifier"];
$password = $data["password"];

$sql = "SELECT * FROM users WHERE email = ? OR phone = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $identifier, $identifier);
$stmt->execute();

$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode([
        "success" => false,
        "field" => "email",  // could be email or phone
        "error" => "Account not found."
    ]);
} else if (!password_verify($password, $user["password"])) {
    echo json_encode([
        "success" => false,
        "field" => "password",
        "error" => "Incorrect password."
    ]);
} else {
    echo json_encode([
        "success" => true,
        "user" => $user["first_name"]
    ]);
}
?>