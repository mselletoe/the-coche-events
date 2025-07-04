<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'database.php';

// ✅ Parse incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

// ✅ Validate input
if (!isset($data['filename']) || !isset($data['caption'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing filename or caption."]);
    exit;
}

$filename = $data['filename'];
$caption = $data['caption'];

// ✅ Run update query
$sql = "UPDATE gallery SET caption = ? WHERE filename = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ss", $caption, $filename);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to update caption."]);
}

mysqli_stmt_close($stmt);
$conn->close();
?>