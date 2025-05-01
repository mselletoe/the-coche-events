<?php
// get_barangays.php
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
