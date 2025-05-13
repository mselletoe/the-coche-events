<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Connect to database
$conn = new mysqli("localhost", "root", "", "the_coche-events");

// Get and decode POST data
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"];
$region_name = $data["region_name"];
$province_name = $data["province_name"];
$city_name = $data["city_name"];
$barangay_name = $data["barangay_name"];
$address_line_1 = $data["address_line_1"];
$address_line_2 = $data["address_line_2"];
$zip_code = $data["zip_code"];

// Prepare the SQL query to insert the address
$sql = "INSERT INTO user_address (user_id, address_line_1, address_line_2, region_name, province_name, city_name, barangay_name, zip_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

// Prepare the statement
$stmt = $conn->prepare($sql);
if ($stmt) {
    // Bind parameters and execute the statement
    $stmt->bind_param("isssssss", $user_id, $address_line_1, $address_line_2, $region_name, $province_name, $city_name, $barangay_name, $zip_code);
    $stmt->execute();

    // Check if the insertion was successful
    if ($stmt->affected_rows > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Address saved successfully!"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => "Failed to save the address."
        ]);
    }
    $stmt->close();
} else {
    echo json_encode([
        "success" => false,
        "error" => "Database error: Unable to prepare statement."
    ]);
}

$conn->close();
?>