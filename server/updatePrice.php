<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['itemId'], $data['newPrice'])) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
        exit;
    }

    $itemId = $data['itemId'];
    $newPrice = $data['newPrice'];

    if (!is_numeric($newPrice) || $newPrice <= 0) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid price value']);
        exit;
    }

    try {
        $stmt = $pdo->prepare('UPDATE menu SET price = ? WHERE id = ?');
        $stmt->execute([$newPrice, $itemId]);

        echo json_encode(['status' => 'success', 'message' => 'Price updated successfully']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update price: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
