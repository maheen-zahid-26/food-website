<?php


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $restaurantId = $_GET['restaurantId'] ?? null;

    if (!$restaurantId) {
        echo json_encode(['status' => 'error', 'message' => 'Restaurant ID is required']);
        exit;
    }

    try {
        
        $stmt = $pdo->prepare('SELECT id, name, description, price, category, image_path FROM menu WHERE restaurant_id = ?');
        $stmt->execute([$restaurantId]);
        $menuItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

       
        echo json_encode($menuItems);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to fetch menu items: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

?>
