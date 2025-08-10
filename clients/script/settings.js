function signOut() {
  alert("Bạn đã đăng xuất thành công!");
  window.location.href = "index.html";
}

document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm-password").value;

  if (password !== confirm) {
    alert("Mật khẩu xác nhận không khớp!");
  } else if (password.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự!");
  } else {
    alert("Cài đặt đã được lưu thành công!");
    
  }
});
