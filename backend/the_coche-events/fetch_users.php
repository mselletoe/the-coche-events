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

$sql = "
    SELECT 
        u.id, 
        u.first_name, 
        u.last_name, 
        u.suffix, 
        u.email, 
        u.phone, 
        u.date_registered,
        a.region_name, 
        a.province_name, 
        a.city_name, 
        a.barangay_name, 
        a.address_line_1, 
        a.address_line_2, 
        a.zip_code
    FROM users u
    LEFT JOIN user_address a ON u.id = a.user_id
";
$result = mysqli_query($conn, $sql);

$users = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $users[] = $row;
    }
    echo json_encode([
        "users" => $users,
        "total" => count($users) 
    ]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Query failed"]);
}
?>
