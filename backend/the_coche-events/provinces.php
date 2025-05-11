<?php
// Allow requests from localhost:5173 (your React app's port)
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Preflight request handling (for OPTIONS requests)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

header('Content-Type: application/json');

include 'database.php';

$regionId = $_GET['region_id'];

$sql = "SELECT * FROM provinces WHERE region_id = '$regionId'";
$result = mysqli_query($conn, $sql);

$provinces = [];

while($row = mysqli_fetch_assoc($result)) {
    $provinces[] = $row;
}

echo json_encode($provinces);

mysqli_close($conn);
?>
