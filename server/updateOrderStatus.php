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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $orderId = $input['orderId'] ?? null;
    $orderStatus = $input['orderStatus'] ?? null;

    if (!$orderId || $orderStatus === null) {
        echo json_encode(['status' => 'error', 'message' => 'Order ID and order status are required']);
        exit;
    }

    try {
        $stmt = $pdo->prepare('UPDATE orders SET order_status = ? WHERE id = ?');
        $stmt->execute([$orderStatus, $orderId]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Order status updated successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No order found with the given ID']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update order status: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

?>
