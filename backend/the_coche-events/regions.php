<?php
// get_regions.php
header('Content-Type: application/json');

include 'database.php';

$sql = "SELECT * FROM regions";
$result = mysqli_query($conn, $sql);

$regions = [];

while($row = mysqli_fetch_assoc($result)) {
    $regions[] = $row;
}

echo json_encode($regions);

mysqli_close($conn);
?>
