function login() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    const user = users.find(user => user.username === u && user.password === p);
    if (user) {
        window.location.href = "dashboard.html";
    } else {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
}