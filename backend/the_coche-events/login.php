<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Max-Age: 600");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
include 'database.php';

// Parse JSON Input
$data = json_decode(file_get_contents("php://input"), true);

// Extract Login Credentials
$identifier = $data["identifier"];
$password = $data["password"];

// Check for User match (Email or Phone)
$sql = "SELECT * FROM users WHERE email = ? OR phone = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $identifier, $identifier);
$stmt->execute();

// Fetch User Record
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Handle User Not Found
if (!$user) {
    echo json_encode([
        "success" => false,
        "field" => "email",  // could be email or phone
        "error" => "Account not found."
    ]);
} else if (!password_verify($password, $user["password"])) { // Check Password
    echo json_encode([
        "success" => false,
        "field" => "password",
        "error" => "Incorrect password."
    ]);
} else { // Successful Login
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $user["id"],
            "first_name" => $user["first_name"],
            "last_name" => $user["last_name"],
            "email" => $user["email"],
            "phone" => $user["phone"]
        ]
    ]);
}

$stmt->close();
$conn->close();
?>