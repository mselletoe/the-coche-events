<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
$conn = new mysqli("localhost", "root", "", "the_coche-events");
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Parse JSON Input
$data = json_decode(file_get_contents("php://input"), true);

// Extract User Address Fields
$user_id = $data["user_id"];
$region_name = $data["region_name"];
$province_name = $data["province_name"];
$city_name = $data["city_name"];
$barangay_name = $data["barangay_name"];
$address_line_1 = $data["address_line_1"];
$address_line_2 = $data["address_line_2"];
$zip_code = $data["zip_code"];

// Check if address already exists
$check_sql = "SELECT id FROM user_address WHERE user_id = ?";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("i", $user_id);
$check_stmt->execute();
$check_stmt->store_result();

if ($check_stmt->num_rows > 0) {
    // Update existing address
    $update_sql = "UPDATE user_address SET 
        address_line_1 = ?, address_line_2 = ?, region_name = ?, 
        province_name = ?, city_name = ?, barangay_name = ?, zip_code = ?
        WHERE user_id = ?";
    $update_stmt = $conn->prepare($update_sql);
    $update_stmt->bind_param("sssssssi", $address_line_1, $address_line_2, $region_name, $province_name, $city_name, $barangay_name, $zip_code, $user_id);
    $update_stmt->execute();

    if ($update_stmt->affected_rows >= 0) {
        echo json_encode(["success" => true, "message" => "Address updated"]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to update address"]);
    }

    $update_stmt->close();
} else {
    // Insert new address
    $insert_sql = "INSERT INTO user_address 
        (user_id, address_line_1, address_line_2, region_name, province_name, city_name, barangay_name, zip_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $insert_stmt = $conn->prepare($insert_sql);
    $insert_stmt->bind_param("isssssss", $user_id, $address_line_1, $address_line_2, $region_name, $province_name, $city_name, $barangay_name, $zip_code);
    $insert_stmt->execute();

    if ($insert_stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Address added"]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to insert address"]);
    }

    $insert_stmt->close();
}

$check_stmt->close();
$conn->close();
?>