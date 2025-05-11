<?php
// Allow requests from localhost:5173 (React dev server)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

header('Content-Type: application/json');

include 'database.php';

$cityId = $_GET['city_id'];

$sql = "SELECT * FROM barangays WHERE city_id = '$cityId'";
$result = mysqli_query($conn, $sql);

$barangays = [];

while($row = mysqli_fetch_assoc($result)) {
    $barangays[] = $row;
}

echo json_encode($barangays);

mysqli_close($conn);
?>
