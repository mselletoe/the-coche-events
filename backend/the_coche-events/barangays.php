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

// Retrieves city_id
$cityId = $_GET['city_id'];

// SQL Query to Retrieve Barangays
$sql = "SELECT * FROM barangays WHERE city_id = '$cityId'";
$result = mysqli_query($conn, $sql); // Execute

// Fetch rows from the Database
$barangays = [];
while($row = mysqli_fetch_assoc($result)) {
    $barangays[] = $row;
}

// Return JSON Response
echo json_encode($barangays);

// Close Database Connection
mysqli_close($conn);
?>