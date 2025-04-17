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
   
    // Check if all required fields are present
    if (!isset($_POST['restaurantId'], $_POST['name'], $_POST['description'], $_POST['price'], $_POST['category'], $_FILES['image'])) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        exit;
    }

    // Get POST data
    $restaurantId = $_POST['restaurantId'];
    $name = trim($_POST['name']);
    $description = trim($_POST['description']);
    $price = $_POST['price'];
    $category = $_POST['category'];
    $image = $_FILES['image'];

    // Validate fields
    if (empty($restaurantId) || empty($name) || empty($description) || empty($price) || empty($category)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        exit;
    }

    if (!is_numeric($price) || $price <= 0) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid price value']);
        exit;
    }

    // Handle image upload
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $imageName = uniqid('menu_', true) . '.' . pathinfo($image['name'], PATHINFO_EXTENSION);
    $imagePath = $uploadDir . $imageName;

    if (!move_uploaded_file($image['tmp_name'], $imagePath)) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to upload image']);
        exit;
    }

    try {
        
        $stmt = $pdo->prepare('INSERT INTO menu (restaurant_id, name, description, price, category, image_path) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([$restaurantId, $name, $description, $price, $category, $imagePath]);

        echo json_encode(['status' => 'success', 'message' => 'Menu item added successfully!']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add menu item: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
