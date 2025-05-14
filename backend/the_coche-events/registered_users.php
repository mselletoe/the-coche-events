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

// Parse JSON Input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input fields
if (
    !isset($data['first_name']) || empty(trim($data['first_name'])) ||
    !isset($data['last_name']) || empty(trim($data['last_name'])) ||
    !isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL) ||
    !isset($data['phone']) || !preg_match('/^\d{10}$/', $data['phone']) ||
    !isset($data['password']) || strlen($data['password']) < 8 ||
    $data['password'] !== $data['confirmPassword']
) {
    echo json_encode(['success' => false, 'error' => 'Validation failed. Please check your input.']);
    exit();
}

// Sanitize user input to prevent SQL injection
$first_name = $conn->real_escape_string(trim($data['first_name']));
$last_name = $conn->real_escape_string(trim($data['last_name']));
$suffix = isset($data['suffix']) ? $conn->real_escape_string(trim($data['suffix'])) : '';
$email = $conn->real_escape_string(trim($data['email']));
$phone = $conn->real_escape_string(trim($data['phone']));
$password = password_hash($data['password'], PASSWORD_DEFAULT);

// Check if the email or phone already exists
$sql = "SELECT * FROM users WHERE email = '$email' OR phone = '$phone'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo json_encode(['success' => false, 'error' => 'Email or phone number already exists.']);
    exit();
}

// Insert the user data into the database
$sql = "INSERT INTO users (first_name, last_name, suffix, email, phone, password) 
        VALUES ('$first_name', '$last_name', '$suffix', '$email', '$phone', '$password')";

if ($conn->query($sql) === TRUE) {
    $user_id = $conn->insert_id; // Get last inserted ID
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $user_id,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'suffix' => $suffix,
            'email' => $email,
            'phone' => $phone
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Error: ' . $conn->error]);
}

// Close the connection
$conn->close();
?>