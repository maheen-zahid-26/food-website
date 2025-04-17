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

    try {
        
        $stmt = $pdo->prepare('SELECT id, restaurant_name, email, logo FROM users'); 
        $stmt->execute();
        $restaurants = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($restaurants);

    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to fetch restaurants: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
