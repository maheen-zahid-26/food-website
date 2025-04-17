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
    $data = json_decode(file_get_contents('php://input'), true);

    if (
        empty($data['customer_name']) ||
        empty($data['contact_number']) ||
        empty($data['cart'])
    ) {
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
        exit;
    }

    $customer_name = $data['customer_name'];
    $contact_number = $data['contact_number'];
    $cart = $data['cart'];

    // Calculate the total price
    $total_price = array_reduce($cart, function ($sum, $item) {
        return $sum + ($item['price'] * $item['quantity']);
    }, 0);

    // Convert the cart items to JSON
    $items_json = json_encode($cart);

    // Set the order status to "not ready" by default
    $order_status = 'not ready';

    try {
        // Insert the order into the database including the order_status
        $stmt = $pdo->prepare('INSERT INTO orders (customer_name, contact_number, items, total_price, order_status) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$customer_name, $contact_number, $items_json, $total_price, $order_status]);

        echo json_encode(['status' => 'success', 'message' => 'Order placed successfully']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to place order: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

?>
