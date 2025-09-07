// Toggle Dark Mode
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');

  // Lưu chế độ vào localStorage
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Giữ chế độ khi tải lại trang
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
