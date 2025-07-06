<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Max-Age: 86400");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
include 'database.php'; // make sure this sets up $conn

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $date = isset($_GET['date']) ? $_GET['date'] : null;

    if (!$date) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing date parameter']);
        exit();
    }

    try {
        $stmt = $conn->prepare("SELECT schedule_time FROM booking_form WHERE schedule_date = ?");
        $stmt->bind_param("s", $date);
        $stmt->execute();
        $result = $stmt->get_result();

        $occupied = [];
        while ($row = $result->fetch_assoc()) {
            $occupied[] = $row['schedule_time'];
        }

        echo json_encode(['success' => true, 'occupied_times' => $occupied]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Only GET is allowed']);
?>