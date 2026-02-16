<?php
session_start();
if (!isset($_SESSION['is_admin'])) { http_response_code(403); exit; }
require 'db.php';
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
if ($username && $password) {
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO employees (username, password) VALUES (?, ?)");
    try {
        $stmt->execute([$username, $hash]);
        echo json_encode(['success'=>true, 'message'=>'Employee added!']);
    } catch (PDOException $e) {
        echo json_encode(['success'=>false, 'message'=>'Username taken.']);
    }
} else {
    echo json_encode(['success'=>false, 'message'=>'Fill all fields.']);
}
?>