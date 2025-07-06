<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Content-Type: application/json; charset=UTF-8");

// Database connection
include 'database.php'; 

$data = json_decode(file_get_contents("php://input"), true);

if (!is_array($data)) {
    echo json_encode(["success" => false, "error" => "Invalid input or empty data."]);
    exit;
}

$response = ["success" => true, "inserted_menus" => 0, "inserted_options" => 0, "errors" => []];

foreach ($data as $menu) {
    $menu_id = intval($menu['id']);
    $label = $conn->real_escape_string($menu['label'] ?? '');
    $status = $menu['checked'] ? 1 : 0;

    $price = isset($menu['dropdownOptions']) && count($menu['dropdownOptions']) > 0
        ? 0
        : floatval($menu['price'] ?? 0);

    // Insert or update menu
    $menuQuery = "
        INSERT INTO addon_menus (id, label, status, price)
        VALUES ($menu_id, '$label', $status, $price)
        ON DUPLICATE KEY UPDATE label = '$label', status = $status, price = $price;
    ";

    if (!$conn->query($menuQuery)) {
        $response['errors'][] = "Menu save error: " . $conn->error;
        continue;
    }

    // Delete previous options
    $conn->query("DELETE FROM addon_options WHERE menu_id = $menu_id");

    if (!empty($menu['dropdownOptions'])) {
        foreach ($menu['dropdownOptions'] as $opt) {
            $val = $conn->real_escape_string($opt['value'] ?? '');
            $price = floatval($opt['price'] ?? 0);
            $optQuery = "INSERT INTO addon_options (menu_id, option_text, price) VALUES ($menu_id, '$val', $price)";
            if (!$conn->query($optQuery)) {
                $response['errors'][] = "Option insert error for menu ID $menu_id: " . $conn->error;
            } else {
                $response['inserted_options']++;
            }
        }
    }

    $response['inserted_menus']++;
}

echo json_encode($response);
$conn->close();
?>