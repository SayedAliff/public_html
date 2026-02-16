<?php
session_start();
require 'db.php';
if (!isset($_SESSION['employee_id'])) { header("Location: employee_login.php"); exit; }
$employee_id = $_SESSION['employee_id'];
$stmt = $pdo->prepare("SELECT n.message, n.created_at FROM notifications n JOIN employee_notifications en ON n.id=en.notification_id WHERE en.employee_id=? ORDER BY n.created_at DESC");
$stmt->execute([$employee_id]);
$notifications = $stmt->fetchAll();
?>
<!DOCTYPE html><html><head><title>Employee Portal</title>
<style>
body{background:#f6f8fb;font-family:'Inter',Arial,sans-serif;}
.portal-box{max-width:600px;margin:50px auto;background:#fff;border-radius:18px;box-shadow:0 4px 24px rgba(49,47,255,0.08);padding:44px 32px;}
.button{padding:10px 24px;border-radius:8px;border:none;font-weight:600;background:#312fff;color:#fff;cursor:pointer;}
.button:hover{background:#5345d6;}
.notification{background:#e6e8fa;margin-bottom:18px;padding:18px;border-radius:10px;}
</style></head><body>
<div class="portal-box">
    <h2>Welcome, <?= htmlspecialchars($_SESSION['employee_username']) ?></h2>
    <a href="employee_logout.php" class="button" style="float:right;">Logout</a>
    <h3>Notifications</h3>
    <?php if(empty($notifications)): ?>
        <p>No notifications yet.</p>
    <?php else: foreach($notifications as $noti): ?>
        <div class="notification">
            <div><?= nl2br(htmlspecialchars($noti['message'])) ?></div>
            <div style="font-size:0.95em;color:#888;"><?= htmlspecialchars($noti['created_at']) ?></div>
        </div>
    <?php endforeach; endif; ?>
</div>
</body></html>