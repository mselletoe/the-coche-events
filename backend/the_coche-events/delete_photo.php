<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Max-Age: 600");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'database.php';

$data = json_decode(file_get_contents("php://input"), true);
$filename = $data['filename'] ?? '';

if (!$filename) {
    http_response_code(400);
    echo json_encode(["error" => "Missing filename"]);
    exit();
}

// Delete DB entry
$stmt = mysqli_prepare($conn, "DELETE FROM gallery WHERE filename = ?");
mysqli_stmt_bind_param($stmt, "s", $filename);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

// Delete file from disk
if (file_exists($filename)) {
    unlink($filename);
}

echo json_encode(["status" => "deleted"]);
?>