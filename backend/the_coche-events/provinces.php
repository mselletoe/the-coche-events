<?php
// get_provinces.php
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
