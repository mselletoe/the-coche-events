<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Connect to DB
$conn = new mysqli("localhost", "root", "", "the_coche-events");
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Get user_id from query string
$user_id = isset($_GET["user_id"]) ? intval($_GET["user_id"]) : 0;

if ($user_id === 0) {
    echo json_encode(["error" => "Invalid user ID"]);
    exit;
}

// Fetch user's address (assuming only 1 address per user)
$sql = "SELECT * FROM user_address WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $row = $result->fetch_assoc()) {
    echo json_encode(["address" => [
        "address_line_1" => $row["address_line_1"],
        "address_line_2" => $row["address_line_2"],
        "region_id" => $row["region_name"],
        "province_id" => $row["province_name"],
        "city_id" => $row["city_name"],
        "barangay_id" => $row["barangay_name"],
        "zip_code" => $row["zip_code"]
    ]]);
} else {
    echo json_encode(["address" => null]);
}

$stmt->close();
$conn->close();
?>