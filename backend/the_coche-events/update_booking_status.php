<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'database.php'; // ensures $conn is available

try {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['id'], $input['status'])) {
        throw new Exception("Missing 'id' or 'status' in request");
    }

    $id = intval($input['id']);
    $status = trim($input['status']);

    $stmt = $conn->prepare("UPDATE booking_form SET status = ? WHERE id = ?");
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("si", $status, $id);

    if (!$stmt->execute()) {
        throw new Exception("Execute failed: " . $stmt->error);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Booking status updated.'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>