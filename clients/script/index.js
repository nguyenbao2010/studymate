// Kiểm tra chế độ người dùng đã chọn=)

const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const nav = document.querySelector('nav');
const mainContent = document.querySelector('main');

// Kiểm tra chế độ hiện tại khi tải trang

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);
  nav.classList.add(savedTheme);
  mainContent.classList.add(savedTheme);
}

//chuyển đổi chế độ

themeToggleButton.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    nav.classList.remove('dark-mode');
    mainContent.classList.remove('dark-mode');
    localStorage.setItem('theme', '');  
  } else {
    body.classList.add('dark-mode');
    nav.classList.add('dark-mode');
    mainContent.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark-mode');  
  }
});
