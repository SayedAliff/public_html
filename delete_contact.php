<?php
session_start();
if (!isset($_SESSION['is_admin'])) { http_response_code(403); exit; }
require 'db.php';
$id = intval($_POST['id'] ?? 0);
if ($id) {
    $stmt = $pdo->prepare("DELETE FROM contacts WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>