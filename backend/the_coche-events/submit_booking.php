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

// =========================
// GET REQUEST: Fetch Bookings
// =========================
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $sql = "SELECT * FROM booking_form ORDER BY id DESC";
        $result = $conn->query($sql);

        $bookings = [];
        while ($row = $result->fetch_assoc()) {
            $row['addons'] = json_decode($row['addons'], true); // Decode JSON addons
            $bookings[] = $row;
        }

        echo json_encode([
            'success' => true,
            'data' => $bookings
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }

    exit();
}

// =========================
// POST REQUEST: Create Booking
// =========================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    function clean($input) {
        return htmlspecialchars(trim($input));
    }

    try {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            throw new Exception("Invalid or missing JSON input");
        }

        // Extract and sanitize inputs
        $user_id = intval($input['user_id']);
        $first_name = clean($input['first_name']);
        $last_name = clean($input['last_name']);
        $suffix = clean($input['suffix']);
        $email = clean($input['email']);
        $phone_number = clean($input['phone_number']);
        $social_media_link = clean($input['social_media_link']);
        $location = clean($input['location']);
        $schedule_date = $input['schedule_date'];
        $schedule_time = clean($input['schedule_time']);
        $note = clean($input['note']);
        $theme = clean($input['theme']);
        $banner_message = clean($input['banner_message']);
        $lightbox_message = clean($input['lightbox_message']);
        $colors = clean($input['colors']);
        $addons = json_encode($input['addons']);
        $mode_of_payment = clean($input['mode_of_payment']);
        $account_name = clean($input['account_name']);
        $account_number = clean($input['account_number']);
        $total_rate = floatval($input['total_rate']);
        $status = 'pending';

        $stmt = $conn->prepare("
            INSERT INTO booking_form (
                user_id, first_name, last_name, suffix, email, phone_number,
                social_media_link, location, schedule_date, schedule_time, note,
                theme, banner_message, lightbox_message, colors,
                addons, mode_of_payment, account_name, account_number, total_rate, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        if (!$stmt) {
            throw new Exception("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param(
            "issssssssssssssssssds",
            $user_id, $first_name, $last_name, $suffix, $email, $phone_number,
            $social_media_link, $location, $schedule_date, $schedule_time, $note,
            $theme, $banner_message, $lightbox_message, $colors,
            $addons, $mode_of_payment, $account_name, $account_number, $total_rate, $status
        );

        if (!$stmt->execute()) {
            throw new Exception("Execute failed: " . $stmt->error);
        }

        echo json_encode([
            'success' => true,
            'message' => 'Booking submitted successfully.'
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }

    exit();
}

// =========================
// Invalid Method
// =========================
http_response_code(405);
echo json_encode([
    'success' => false,
    'message' => 'Only GET and POST requests are allowed.'
]);
?>