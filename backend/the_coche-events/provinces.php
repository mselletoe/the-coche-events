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
include 'database.php';

// Retrieves region_id
$regionId = $_GET['region_id'];

// SQL Query to Retrieve Provinces
$sql = "SELECT * FROM provinces WHERE region_id = '$regionId'";
$result = mysqli_query($conn, $sql); // Execute

// Fetch rows from the Database
$provinces = [];
while($row = mysqli_fetch_assoc($result)) {
    $provinces[] = $row;
}

// Return JSON Response
echo json_encode($provinces);

// Close Database Connection
mysqli_close($conn);
?>