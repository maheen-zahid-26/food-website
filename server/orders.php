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
     
        $stmt = $pdo->prepare(
            'SELECT DISTINCT o.id, o.customer_name, o.order_status, o.contact_number, o.items, o.total_price, o.created_at
             FROM orders o
             WHERE EXISTS (
                 SELECT 1
                 FROM menu m
                 WHERE JSON_CONTAINS(o.items, JSON_OBJECT("id", m.id)) AND m.restaurant_id = ?
             )'
        );
        $stmt->execute([$restaurantId]);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        

        echo json_encode($orders);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to fetch orders: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

?>
