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

include 'database.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data['user_id']) {
    echo json_encode(['error' => 'Missing user_id']);
    exit;
}

// Update user info
$userSql = "
  UPDATE users 
  SET first_name = ?, last_name = ?, suffix = ?, email = ?, phone = ?
  WHERE id = ?
";
$userStmt = $conn->prepare($userSql);
$userStmt->bind_param("sssssi", $data['first_name'], $data['last_name'], $data['suffix'], $data['email'], $data['phone'], $data['user_id']);
$userSuccess = $userStmt->execute();

// Update or insert address
$checkSql = "SELECT id FROM user_address WHERE user_id = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("i", $data['user_id']);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();
$isEditing = $checkResult->num_rows > 0;

if ($isEditing) {
    $addrSql = "
      UPDATE user_address 
      SET region_name = ?, province_name = ?, city_name = ?, barangay_name = ?, address_line_1 = ?, address_line_2 = ?, zip_code = ?
      WHERE user_id = ?
    ";
    $stmt = $conn->prepare($addrSql);
    $stmt->bind_param("sssssssi", $data['region_name'], $data['province_name'], $data['city_name'], $data['barangay_name'], $data['address_line_1'], $data['address_line_2'], $data['zip_code'], $data['user_id']);
} else {
    $addrSql = "
      INSERT INTO user_address (user_id, region_name, province_name, city_name, barangay_name, address_line_1, address_line_2, zip_code)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ";
    $stmt = $conn->prepare($addrSql);
    $stmt->bind_param("isssssss", $data['user_id'], $data['region_name'], $data['province_name'], $data['city_name'], $data['barangay_name'], $data['address_line_1'], $data['address_line_2'], $data['zip_code']);
}

$addrSuccess = $stmt->execute();

if ($userSuccess && $addrSuccess) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Failed to save data.']);
}
?>