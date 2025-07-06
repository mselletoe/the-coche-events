<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Max-Age: 600");
header("Content-Type: application/json; charset=UTF-8");

include 'database.php';

$result = $conn->query("SELECT * FROM addon_menus WHERE status = 1");

$addons = [];

while ($row = $result->fetch_assoc()) {
    $menuId = $row['id'];
    $optionsResult = $conn->query("SELECT option_text, price FROM addon_options WHERE menu_id = $menuId");

    $options = [];
    while ($opt = $optionsResult->fetch_assoc()) {
        $options[] = [
            'value' => $opt['option_text'],
            'price' => $opt['price']
        ];
    }

    $addons[] = [
        'id' => $menuId,
        'label' => $row['label'],
        'price' => $row['price'],
        'dropdownOptions' => $options
    ];
}

echo json_encode($addons);
$conn->close();
?>