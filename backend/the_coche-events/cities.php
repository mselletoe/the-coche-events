<?php
// get_cities.php
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
