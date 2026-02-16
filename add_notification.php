<?php
session_start();
if (!isset($_SESSION['is_admin'])) { http_response_code(403); exit; }
require 'db.php';
$message = $_POST['message'] ?? '';
$employee_id = $_POST['employee_id'] ?? '';
if ($message) {
    $pdo->beginTransaction();
    $stmt = $pdo->prepare("INSERT INTO notifications (message) VALUES (?)");
    $stmt->execute([$message]);
    $nid = $pdo->lastInsertId();
    if ($employee_id) {
        $stmt2 = $pdo->prepare("INSERT INTO employee_notifications (employee_id,notification_id) VALUES (?,?)");
        $stmt2->execute([$employee_id, $nid]);
    } else {
        $emps = $pdo->query("SELECT id FROM employees")->fetchAll();
        $stmt2 = $pdo->prepare("INSERT INTO employee_notifications (employee_id,notification_id) VALUES (?,?)");
        foreach ($emps as $emp) {
            $stmt2->execute([$emp['id'], $nid]);
        }
    }
    $pdo->commit();
    echo json_encode(['success'=>true,'message'=>'Notification posted!']);
} else {
    echo json_encode(['success'=>false,'message'=>'Message required.']);
}
?>