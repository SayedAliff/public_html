<?php
session_start();
require 'db.php';

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['admin_login'])) {
    $admin = $_POST['admin'] ?? '';
    $password = $_POST['password'] ?? '';
    if ($admin === 'tareq' && $password === 'tareq321') {
        $_SESSION['is_admin'] = true;
        header("Location: admin.php");
        exit;
    } else {
        $error = "Invalid admin credentials.";
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    unset($_SESSION['is_admin']);
    header("Location: admin.php");
    exit;
}

// Only show admin panel if logged in
if (!isset($_SESSION['is_admin'])):
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Login - Qubit Cloud</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        /* ... same admin login CSS as before ... */
        body { background: #f6f8fb; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; margin: 0; }
        .admin-login-container {
            max-width: 420px; margin: 80px auto; background: #fff; border-radius: 18px;
            box-shadow: 0 4px 24px rgba(49,47,255,0.08); padding: 44px 32px; text-align: center;
        }
        h1 { color: #312fff; font-size: 2.1rem; margin-bottom: 24px; }
        label { display: block; text-align: left; margin-bottom: 14px; font-weight: 500; }
        input[type="text"], input[type="password"] {
            width: 100%; padding: 10px 12px; margin-top: 6px; margin-bottom: 18px;
            border-radius: 8px; border: 1px solid #d4d7ee; font-size: 1rem; background: #f6f8fb;
        }
        .button { padding: 12px 26px; border-radius: 8px; border: none; font-weight: 600;
            text-decoration: none; display: inline-block; background: #312fff; color: #fff;
            cursor: pointer; font-size: 1rem; transition: background 160ms ease, transform 140ms ease;
        }
        .button:hover { background: #5345d6; transform: translateY(-1px); }
        .contact-msg { margin-bottom: 18px; color: #d81b60; font-weight: 600; }
    </style>
</head>
<body>
    <div class="admin-login-container">
        <h1>Admin Login</h1>
        <?php if (isset($error)): ?>
            <div class="contact-msg"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        <form method="POST">
            <label>
                Admin Name:
                <input type="text" name="admin" required>
            </label>
            <label>
                Password:
                <input type="password" name="password" required>
            </label>
            <button type="submit" name="admin_login" class="button">Login</button>
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
</body>
</html>
<?php
exit;
endif;

// If admin logged in, show contacts and reviews:
$stmtC = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC");
$contacts = $stmtC->fetchAll();

$stmtR = $pdo->query("SELECT * FROM reviews ORDER BY created_at DESC");
$reviews = $stmtR->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Panel - Qubit Cloud</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { background: #f6f8fb; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; margin: 0; }
        .admin-panel-container {
            max-width: 1100px; margin: 50px auto; background: #fff; border-radius: 18px;
            box-shadow: 0 4px 24px rgba(49,47,255,0.08); padding: 44px 32px;
        }
        h1 { color: #312fff; font-size: 2.1rem; margin-bottom: 24px; text-align: center; }
        .button, .logout-link {
            padding: 10px 24px; border-radius: 8px; border: none; font-weight: 600;
            text-decoration: none; display: inline-block; background: #312fff; color: #fff;
            cursor: pointer; font-size: 1rem; transition: background 160ms ease, transform 140ms ease;
            margin-bottom: 26px;
        }
        .button:hover, .logout-link:hover { background: #5345d6; transform: translateY(-1px); }
        .logout-link { float: right; margin-top: -20px; margin-right: -12px; background: #e6e8fa; color: #312fff; border: 2px solid #312fff; }
        .logout-link:hover { background: #312fff; color: #fff; }
        table { width: 100%; border-collapse: collapse; margin-top: 30px; background: #fafafa; border-radius: 14px; overflow: hidden; }
        th, td { padding: 12px 10px; text-align: left; }
        th { background: #e6e8fa; color: #312fff; font-weight: 700; font-size: 1.05rem; border-bottom: 1px solid #d4d7ee; }
        td { background: #fff; font-size: 1rem; border-bottom: 1px solid #eee; }
        tr:last-child td { border-bottom: none; }
        .del-btn {
            background: #d81b60; color: #fff; border: none; border-radius: 6px; padding: 6px 16px;
            font-weight: 600; cursor: pointer; font-size: 0.96rem; margin-left: 6px;
        }
        .del-btn:hover { background: #c2185b; }
        @media (max-width:900px){
            .admin-panel-container { padding: 12px 6px; }
            table, th, td { font-size: 0.97rem; }
        }
        @media (max-width:580px){
            table, th, td { font-size: 0.9rem; padding: 8px 4px; }
        }
        .section-title { margin-top: 56px; color: #d81b60; font-size: 1.5rem; }
    </style>
</head>
<body>
    <div class="admin-panel-container">
        <h1>Admin Panel</h1>
        <a href="admin.php?logout=1" class="button logout-link">Logout</a>

        <div class="section-title">Contact Submissions</div>
        <?php if (empty($contacts)): ?>
            <p>No contacts submitted yet.</p>
        <?php else: ?>
            <table id="contacts-table">
                <thead>
                    <tr>
                        <th>Name</th><th>Email</th><th>Phone</th><th>Subject</th><th>Message</th><th>Submitted</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach ($contacts as $c): ?>
                    <tr data-id="<?php echo $c['id']; ?>">
                        <td><?php echo htmlspecialchars($c['name']); ?></td>
                        <td><?php echo htmlspecialchars($c['email']); ?></td>
                        <td><?php echo htmlspecialchars($c['phone']); ?></td>
                        <td><?php echo htmlspecialchars($c['subject']); ?></td>
                        <td><?php echo nl2br(htmlspecialchars($c['message'])); ?></td>
                        <td><?php echo htmlspecialchars($c['created_at']); ?></td>
                        <td><button class="del-btn" onclick="deleteContact(<?php echo $c['id']; ?>, this)">Delete</button></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>

        <div class="section-title">Review Submissions</div>
        <?php if (empty($reviews)): ?>
            <p>No reviews submitted yet.</p>
        <?php else: ?>
            <table id="reviews-table">
                <thead>
                    <tr>
                        <th>Name</th><th>Email</th><th>Message</th><th>Rating</th><th>Submitted</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach ($reviews as $r): ?>
                    <tr data-id="<?php echo $r['id']; ?>">
                        <td><?php echo htmlspecialchars($r['name']); ?></td>
                        <td><?php echo htmlspecialchars($r['email']); ?></td>
                        <td><?php echo nl2br(htmlspecialchars($r['message'])); ?></td>
                        <td><?php echo str_repeat('★', (int)$r['rating']); ?></td>
                        <td><?php echo htmlspecialchars($r['created_at']); ?></td>
                        <td><button class="del-btn" onclick="deleteReview(<?php echo $r['id']; ?>, this)">Delete</button></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
        
        
        
 <div class="section-title"><h1>Add Employee</h1></div>
<form id="add-employee-form" style="margin-bottom:24px;">
    <label>Username: <input type="text" name="username" required></label>
    <label>Password: <input type="password" name="password" required></label>
    <button type="submit" class="button">Add Employee</button>
    <div id="employee-msg"></div>
</form>
<script>
document.getElementById('add-employee-form').addEventListener('submit', function(e){
    e.preventDefault();
    const form = e.target;
    fetch('add_employee.php', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            username: form.username.value,
            password: form.password.value
        })
    }).then(res=>res.json()).then(data=>{
        document.getElementById('employee-msg').textContent = data.message;
        form.reset();
    });
});
</script>


<div class="section-title"><h1>Add Notification</h1></div>
<form id="add-notification-form" class="notification-form">
    <label class="notification-label">
        Message:
        <textarea name="message" required class="notification-textarea"></textarea>
    </label>
    <label class="notification-label">
        Assign to Employee:
        <select name="employee_id" class="notification-select">
            <option value="">All Employees</option>
            <?php
            $emps = $pdo->query("SELECT id,username FROM employees")->fetchAll();
            foreach($emps as $emp){
                echo '<option value="'.$emp['id'].'">'.htmlspecialchars($emp['username']).'</option>';
            }
            ?>
        </select>
    </label>
    <button type="submit" class="button notification-btn">Post Notification</button>
    <div id="notification-msg"></div>
</form>
<style>
.notification-form {
    background: #f7f8fc;
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(49,47,255,0.04);
    padding: 28px 20px 18px 20px;
    max-width: 480px;
    margin-bottom: 32px;
    margin-top: 10px;
}
.notification-label {
    display: block;
    font-weight: 500;
    color: #312fff;
    margin-bottom: 18px;
    font-size: 1.04rem;
}
.notification-textarea {
    width: 100%;
    padding: 10px 12px;
    margin-top: 6px;
    border-radius: 8px;
    border: 1px solid #d4d7ee;
    font-size: 1rem;
    background: #fff;
    min-height: 70px;
    resize: vertical;
}
.notification-select {
    width: 100%;
    padding: 10px 12px;
    margin-top: 6px;
    border-radius: 8px;
    border: 1px solid #d4d7ee;
    font-size: 1rem;
    background: #fff;
}
.notification-btn {
    background: #312fff;
    color: #fff;
    padding: 10px 24px;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    margin-top: 8px;
    cursor: pointer;
    transition: background 160ms ease, transform 140ms ease;
}
.notification-btn:hover {
    background: #5345d6;
    transform: translateY(-1px);
}
#notification-msg {
    margin-top: 14px;
    color: #0c8d36;
    font-weight: 600;
    font-size: 1.02rem;
}
@media (max-width: 600px) {
    .notification-form {
        padding: 16px 8px 12px 8px;
        max-width: 100%;
    }
    .notification-label { font-size: 0.99rem; }
}
</style>
<script>
document.getElementById('add-notification-form').addEventListener('submit', function(e){
    e.preventDefault();
    const form = e.target;
    fetch('add_notification.php', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            message: form.message.value,
            employee_id: form.employee_id.value
        })
    }).then(res=>res.json()).then(data=>{
        document.getElementById('notification-msg').textContent = data.message;
        form.reset();
    });
});
</script>


<div class="section-title">Employee List</div>
<table id="employees-table">
    <thead>
        <tr>
            <th>Username</th>
            <th>Password (hashed)</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
    <?php
    $emps = $pdo->query("SELECT * FROM employees ORDER BY id DESC")->fetchAll();
    foreach($emps as $emp): ?>
        <tr data-id="<?= $emp['id'] ?>">
            <td><?= htmlspecialchars($emp['username']) ?></td>
            <td style="font-size:0.9em;color:#888;"><?= htmlspecialchars($emp['password']) ?></td>
            <td>
                <button class="upd-btn" onclick="showUpdateForm(<?= $emp['id'] ?>, '<?= htmlspecialchars($emp['username'], ENT_QUOTES) ?>')">Update</button>
            </td>
            <td>
                <button class="del-btn" onclick="deleteEmployee(<?= $emp['id'] ?>, this)">Delete</button>
            </td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>

<!-- Update Employee Modal -->
<div id="update-modal" class="update-modal" style="display:none;">
    <div class="update-modal-content">
        <span class="close" onclick="closeUpdateModal()">&times;</span>
        <h3>Update Employee</h3>
        <form id="update-employee-form">
            <input type="hidden" name="id" id="update-id">
            <label>Username:<input type="text" name="username" id="update-username" required></label>
            <label>New Password:<input type="password" name="password" id="update-password"></label>
            <button type="submit" class="button">Update</button>
        </form>
        <div id="update-msg"></div>
    </div>
</div>
<style>
#employees-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background: #fafafa;
    border-radius: 14px;
    overflow: hidden;
}
#employees-table th, #employees-table td {
    padding: 12px 10px;
    text-align: left;
    border-bottom: 1px solid #eee;
}
#employees-table th { background: #e6e8fa; color: #312fff; font-weight: 700; }
#employees-table td { background: #fff; }
.upd-btn, .del-btn {
    background: #312fff;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 6px 16px;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.96rem;
    margin-left: 6px;
    transition: background 160ms;
}
.upd-btn:hover { background: #6c63ff; }
.del-btn { background: #d81b60; }
.del-btn:hover { background: #c2185b; }
.update-modal {
    position: fixed; top:0; left:0; width:100vw; height:100vh;
    background:rgba(49,47,255,0.11); z-index:1001; display:flex; align-items:center; justify-content:center;
}
.update-modal-content {
    background:#fff; padding:32px 22px; border-radius:12px; box-shadow:0 4px 24px rgba(49,47,255,0.12); width:320px; text-align:center;
    position:relative;
}
.update-modal .close {
    position:absolute; top:12px; right:16px; font-size:2rem; color:#888; cursor:pointer;
}
#update-employee-form label { display:block; text-align:left; margin-bottom:14px; font-weight:500; }
#update-employee-form input[type="text"], #update-employee-form input[type="password"] {
    width:100%; padding:10px 12px; border-radius:8px; border:1px solid #d4d7ee; font-size:1rem; background:#f6f8fb; margin-top:6px; margin-bottom:12px;
}
#update-msg { margin-top:12px; color: #0c8d36; font-weight: 600; font-size: 1.02rem;}
</style>
<script>
function deleteEmployee(id, btn) {
    if (confirm('Delete this employee?')) {
        fetch('delete_employee.php', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: 'id=' + encodeURIComponent(id)
        }).then(r=>r.json()).then(data=>{
            if(data.success) btn.closest('tr').remove();
            else alert('Failed to delete.');
        });
    }
}
function showUpdateForm(id, username) {
    document.getElementById('update-id').value = id;
    document.getElementById('update-username').value = username;
    document.getElementById('update-password').value = '';
    document.getElementById('update-msg').textContent = '';
    document.getElementById('update-modal').style.display = 'flex';
}
function closeUpdateModal() {
    document.getElementById('update-modal').style.display = 'none';
}
document.getElementById('update-employee-form').addEventListener('submit', function(e){
    e.preventDefault();
    const form = e.target;
    fetch('update_employee.php', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            id: form.id.value,
            username: form.username.value,
            password: form.password.value // can be empty
        })
    }).then(res=>res.json()).then(data=>{
        document.getElementById('update-msg').textContent = data.message;
        if(data.success){
            // Update username in table
            let row = document.querySelector('tr[data-id="'+form.id.value+'"] td:first-child');
            if(row) row.textContent = form.username.value;
            closeUpdateModal();
            location.reload(); // Refresh to show updated hash
        }
    });
});
</script>
        
        
        
        
        
    </div>
    <script>
    // AJAX delete for contacts
    function deleteContact(id, btn) {
        if (confirm('Are you sure you want to delete this contact?')) {
            fetch('delete_contact.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: 'id=' + encodeURIComponent(id)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    btn.closest('tr').remove();
                } else {
                    alert('Failed to delete contact.');
                }
            });
        }
    }
    // AJAX delete for reviews
    function deleteReview(id, btn) {
        if (confirm('Are you sure you want to delete this review?')) {
            fetch('delete_review.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: 'id=' + encodeURIComponent(id)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    btn.closest('tr').remove();
                } else {
                    alert('Failed to delete review.');
                }
            });
        }
    }
    </script>
</body>
</html>