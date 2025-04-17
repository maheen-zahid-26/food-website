<?php


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}


header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['itemId'])) {
        echo json_encode(['status' => 'error', 'message' => 'Item ID is required']);
        exit;
    }

    $itemId = $input['itemId'];

    try {
     
        $stmt = $pdo->prepare('SELECT image_path FROM menu WHERE id = ?');
        $stmt->execute([$itemId]);
        $menuItem = $stmt->fetch();

        if ($menuItem) {
           
            $imagePath = $menuItem['image_path'];
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }

            $deleteStmt = $pdo->prepare('DELETE FROM menu WHERE id = ?');
            $deleteStmt->execute([$itemId]);

            echo json_encode(['status' => 'success', 'message' => 'Menu item deleted successfully!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Menu item not found']);
        }

    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete menu item: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
