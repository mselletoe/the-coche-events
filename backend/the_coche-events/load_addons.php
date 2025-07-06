<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Content-Type: application/json; charset=UTF-8");

// Database connection
include 'database.php'; 

$menus = [];
$menuQuery = "SELECT id, label, status, price FROM addon_menus ORDER BY id";
$result = $conn->query($menuQuery);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $menu_id = intval($row['id']);
        $options = [];

        $optionQuery = "SELECT option_text AS value, price FROM addon_options WHERE menu_id = $menu_id";
        $optResult = $conn->query($optionQuery);

        if ($optResult && $optResult->num_rows > 0) {
            while ($opt = $optResult->fetch_assoc()) {
                $options[] = $opt;
            }
        }

        $menus[] = [
            "id" => $menu_id,
            "label" => $row['label'],
            "checked" => $row['status'] == 1,
            "price" => floatval($row['price']),
            "dropdownOptions" => $options
        ];
    }
}

echo json_encode($menus);
$conn->close();
?>
