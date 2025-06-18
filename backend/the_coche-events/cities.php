<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Max-Age: 600");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
include 'database.php';

// Retrieves province_id
$provinceId = $_GET['province_id'];

// SQL Query to Retrieve Municipalities
$sql = "SELECT * FROM cities WHERE province_id = '$provinceId'";
$result = mysqli_query($conn, $sql); // Execute

// Fetch rows from the Database
$cities = [];
while($row = mysqli_fetch_assoc($result)) {
    $cities[] = $row;
}

// Return JSON Response
echo json_encode($cities);

// Close Database Connection
mysqli_close($conn);
?>