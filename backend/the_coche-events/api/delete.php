<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Allow POST requests with application/x-www-form-urlencoded or multipart/form-data
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Connect to database
$conn = new mysqli("localhost", "root", "", "the_coche-events");
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed."]);
    exit();
}

// Get userId from POST data
$userId = isset($_POST['userId']) ? intval($_POST['userId']) : 0;
if (!$userId) {
    echo json_encode(["status" => "error", "message" => "User ID not provided."]);
    exit();
}

// Fetch image filename from the profile_pictures table
$sql = "SELECT filename FROM profile_pictures WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row) {
    $filename = $row['filename'];
    $filePath = __DIR__ . "/../uploads/" . $filename;

    // Delete file from disk
    if (file_exists($filePath)) {
        unlink($filePath); // Delete image file
    }

    // Delete record from database
    $deleteStmt = $conn->prepare("DELETE FROM profile_pictures WHERE user_id = ?");
    $deleteStmt->bind_param("i", $userId);
    $deleteStmt->execute();
    $deleteStmt->close();

    echo json_encode(["status" => "success", "message" => "Image deleted successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "No image found for this user."]);
}

$stmt->close();
$conn->close();