<?php
session_start();
if (!isset($_SESSION['is_admin'])) { http_response_code(403); exit; }
require 'db.php';

$id = intval($_POST['id'] ?? 0);
$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

if (!$id || !$username) {
    echo json_encode(['success'=>false,'message'=>'Fill required fields']);
    exit;
}

if ($password) {
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("UPDATE employees SET username=?, password=? WHERE id=?");
    $stmt->execute([$username, $hash, $id]);
} else {
    $stmt = $pdo->prepare("UPDATE employees SET username=? WHERE id=?");
    $stmt->execute([$username, $id]);
}
echo json_encode(['success'=>true,'message'=>'Employee updated!']);
?>