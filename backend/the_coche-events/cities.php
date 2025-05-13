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

$provinceId = $_GET['province_id'];

$sql = "SELECT * FROM cities WHERE province_id = '$provinceId'";
$result = mysqli_query($conn, $sql);

$cities = [];

while($row = mysqli_fetch_assoc($result)) {
    $cities[] = $row;
}

echo json_encode($cities);

mysqli_close($conn);
?>
