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

// Define time slots (must match frontend)
$timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

try {
    // Count bookings per date
    $stmt = $conn->prepare("SELECT schedule_date, COUNT(*) as count FROM booking_form GROUP BY schedule_date");
    $stmt->execute();
    $result = $stmt->get_result();

    $bookedDates = [];
    $fullyBookedDates = [];

    while ($row = $result->fetch_assoc()) {
        $date = $row['schedule_date'];
        $count = $row['count'];

        if ($count >= 2) {
            $fullyBookedDates[] = $date;
        } else if ($count > 0) {
            $bookedDates[] = $date;
        }
    }

    echo json_encode([
        'success' => true,
        'bookedDates' => $bookedDates,
        'fullyBookedDates' => $fullyBookedDates
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>