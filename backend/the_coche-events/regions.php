<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Max-Age: 86400");


// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
include 'database.php';

// SQL Query to Retrieve Regions
$sql = "SELECT * FROM regions";
$result = mysqli_query($conn, $sql); // Execute

// Fetch rows from the Database
$regions = [];
while($row = mysqli_fetch_assoc($result)) {
    $regions[] = $row;
}

// Return JSON Response
echo json_encode($regions);

// Close Database Connection
mysqli_close($conn);
?>