<?php
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}

header('Access-Control-Allow-Origin: *'); 
header('Content-Type: application/json');

require_once 'db.php';

$data = $_POST; // Handle POST request for non-JSON data
$logo = $_FILES['logo']; // Handle logo file

if (empty($data['restaurantName']) || empty($data['email']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode(['message' => 'All fields are required.']);
    exit;
}

$restaurantName = htmlspecialchars($data['restaurantName']);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$password = $data['password']; 

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid email format.']);
    exit;
}

if ($logo && $logo['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'uploads/';
    $uploadFile = $uploadDir . basename($logo['name']);
    if (move_uploaded_file($logo['tmp_name'], $uploadFile)) {
        $logoPath = $uploadFile;
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Logo upload failed.']);
        exit;
    }
} else {
    $logoPath = null; // Handle case where no logo is uploaded
}

try {
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);

    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['message' => 'Email already registered.']);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $pdo->prepare('INSERT INTO users (restaurant_name, email, password, logo) VALUES (:restaurant_name, :email, :password, :logo)');
    $stmt->execute([
        'restaurant_name' => $restaurantName,
        'email' => $email,
        'password' => $hashedPassword,
        'logo' => $logoPath,
    ]);

    echo json_encode(['message' => 'Signup successful!']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
}
?>
