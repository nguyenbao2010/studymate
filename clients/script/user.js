// user.js

document.addEventListener("DOMContentLoaded", function () {
    const addUserForm = document.getElementById("addUserForm");
    const userTableBody = document.getElementById("userTableBody");
    let users = [];
  
    function renderUsers() {
      userTableBody.innerHTML = "";
      users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td><button onclick="deleteUser(${index})">Xóa</button></td>
        `;
        userTableBody.appendChild(row);
      });
    }
  
    window.deleteUser = function (index) {
      if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
        users.splice(index, 1);
        renderUsers();
      }
    };
  
    addUserForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const role = document.getElementById("role").value;
  
      users.push({ username, email, role });
      renderUsers();
  
      addUserForm.reset();
    });
  });
  