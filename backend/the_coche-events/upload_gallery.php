<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Max-Age: 600");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
include 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['images']) || !isset($_POST['captions'])) {
        http_response_code(400);
        echo json_encode(["error" => "Missing data."]);
        exit;
    }

    $files = $_FILES['images'];
    $captions = $_POST['captions'];

    $uploadDir = 'uploads/gallery/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $responses = [];

    foreach ($files['tmp_name'] as $i => $tmpPath) {
        $originalName = basename($files['name'][$i]);
        $targetPath = $uploadDir . uniqid() . '_' . $originalName;

        if (move_uploaded_file($tmpPath, $targetPath)) {
            $caption = mysqli_real_escape_string($conn, $captions[$i]);

            $sql = "INSERT INTO gallery (filename, caption) VALUES (?, ?)";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "ss", $targetPath, $caption);

            if (mysqli_stmt_execute($stmt)) {
                $responses[] = ["status" => "success", "file" => $targetPath];
            } else {
                $responses[] = ["status" => "db_error", "file" => $originalName];
            }

            mysqli_stmt_close($stmt);
        } else {
            $responses[] = ["status" => "upload_error", "file" => $originalName];
        }
    }

    echo json_encode($responses);
}
?>