<?php
session_start();
require 'db.php';
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? ''; $password = $_POST['password'] ?? '';
    $stmt = $pdo->prepare("SELECT * FROM employees WHERE username=?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['employee_id'] = $user['id'];
        $_SESSION['employee_username'] = $user['username'];
        header("Location: employee_portal.php");
        exit;
    } else $error = "Invalid credentials.";
}
?>
<!DOCTYPE html><html><head><title>Employee Login</title>
<style>
body{background:#f6f8fb;font-family:'Inter',Arial,sans-serif;}
.login-box{max-width:400px;margin:80px auto;background:#fff;border-radius:18px;box-shadow:0 4px 24px rgba(49,47,255,0.08);padding:44px 32px;text-align:center;}
input[type="text"],input[type="password"]{width:100%;padding:10px 12px;margin-top:6px;margin-bottom:18px;border-radius:8px;border:1px solid #d4d7ee;font-size:1rem;background:#f6f8fb;}
.button{padding:12px 26px;border-radius:8px;border:none;font-weight:600;background:#312fff;color:#fff;cursor:pointer;}
.button:hover{background:#5345d6;}
.err-msg{color:red;font-weight:bold;}
</style></head><body>
<div class="login-box">
    <h2>Employee Login</h2>
    <?php if($error): ?><div class="err-msg"><?= htmlspecialchars($error) ?></div><?php endif; ?>
    <form method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button class="button" type="submit">Login</button>
    </form>
    
     
        <a href="index.html" class="home-link">← Back to Homepage</a>
<style>
.home-link {
    display: inline-block;
    margin-top: 18px;
    color: #312fff;
    background: #e6e8fa;
    border: 2px solid #312fff;
    border-radius: 8px;
    padding: 8px 18px;
    font-weight: 600;
    text-decoration: none;
    font-size: 1rem;
    transition: background 160ms ease, color 160ms ease;
}
.home-link:hover {
    background: #312fff;
    color: #fff;
}
</style>
    
</div>
</body></html>