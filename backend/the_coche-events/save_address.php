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

// Check if address already exists for the user
$checkSql = "SELECT id FROM user_address WHERE user_id = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("i", $user_id);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult && $checkResult->num_rows > 0) {
    // UPDATE if address exists
    $updateSql = "UPDATE user_address SET 
        address_line_1 = ?, 
        address_line_2 = ?, 
        region_name = ?, 
        province_name = ?, 
        city_name = ?, 
        barangay_name = ?, 
        zip_code = ? 
        WHERE user_id = ?";
    
    $updateStmt = $conn->prepare($updateSql);
    if ($updateStmt) {
        $updateStmt->bind_param("sssssssi", $address_line_1, $address_line_2, $region_name, $province_name, $city_name, $barangay_name, $zip_code, $user_id);
        $updateStmt->execute();

        if ($updateStmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Address updated successfully!"]);
        } else {
            echo json_encode(["success" => false, "error" => "No changes made or update failed."]);
        }
        $updateStmt->close();
    } else {
        echo json_encode(["success" => false, "error" => "Database error: unable to prepare update statement."]);
    }
} else {
    // INSERT new address if none exists
    $insertSql = "INSERT INTO user_address (user_id, address_line_1, address_line_2, region_name, province_name, city_name, barangay_name, zip_code)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $insertStmt = $conn->prepare($insertSql);
    if ($insertStmt) {
        $insertStmt->bind_param("isssssss", $user_id, $address_line_1, $address_line_2, $region_name, $province_name, $city_name, $barangay_name, $zip_code);
        $insertStmt->execute();

        if ($insertStmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Address saved successfully!"]);
        } else {
            echo json_encode(["success" => false, "error" => "Failed to save the address."]);
        }
        $insertStmt->close();
    } else {
        echo json_encode(["success" => false, "error" => "Database error: unable to prepare insert statement."]);
    }
}

$conn->close();
?>