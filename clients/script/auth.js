import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  update,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyBsZvKDxVeeCc_abu9lpX7V7pcq7OqeAJQ",
  authDomain: "studymate-cae77.firebaseapp.com",
  databaseURL: "https://studymate-cae77-default-rtdb.firebaseio.com",
  projectId: "studymate-cae77",
  storageBucket: "studymate-cae77.firebasestorage.app",
  messagingSenderId: "499041011253",
  appId: "1:499041011253:web:daf2f327b5b90c399d137c",
  measurementId: "G-1TL6MQYLYF"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

function showMessage(message, type = "info") {
  const msgBox = document.getElementById("message");
  if (msgBox) {
    msgBox.innerText = message;
    msgBox.style.color = type === "error" ? "red" : "green";
    msgBox.style.fontWeight = "bold";
  }
}

// ✅ Theo dõi trạng thái đăng nhập
onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  if (user) {
    if (path.includes("login.html") || path === "/") {
      window.location.href = "index.html";
    }
  } else {
    if (path.includes("index.html") || (!path.includes("login.html") && path !== "/")) {
      window.location.href = "login.html";
    }
  }
});

// ✅ Đăng ký tài khoản bằng Email
window.signUp = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const username = document.getElementById("username").value.trim();

  if (!username) {
    showMessage("❌ Vui lòng nhập tên hiển thị!", "error");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Cập nhật tên hiển thị vào Firebase Auth
    await updateProfile(user, {
      displayName: username,
    });

    // Lưu thông tin vào Realtime Database
    await set(ref(database, "users/" + user.uid), {
      email: user.email,
      displayName: username,
      createdAt: new Date().toISOString(),
    });

    showMessage("✅ Đăng ký thành công!");
    window.location.href = "index.html";
  } catch (error) {
    showMessage("❌ " + error.message, "error");
  }
};

// ✅ Đăng nhập bằng Google
window.signInWithGoogle = async function () {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Lưu hoặc cập nhật thông tin
    await update(ref(database, "users/" + user.uid), {
      email: user.email,
      displayName: user.displayName,
      lastLogin: new Date().toISOString(),
    });

    showMessage(`✅ Chào mừng, ${user.displayName}!`);
    window.location.href = "index.html";
  } catch (error) {
    console.error("❌ Google login error:", error);
    showMessage("❌ " + error.message, "error");
  }
};

// ✅ Đăng nhập Email
window.signIn = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Cập nhật thời gian login
    await update(ref(database, "users/" + user.uid), {
      lastLogin: new Date().toISOString(),
    });

    showMessage("✅ Đăng nhập thành công!");
    window.location.href = "index.html";
  } catch (error) {
    showMessage("❌ " + error.message, "error");
  }
};

// ✅ Đăng xuất
window.signOut = async function () {
  try {
    await signOut(auth);
    showMessage("✅ Đã đăng xuất!");
    setTimeout(() => location.reload(), 1000);
  } catch (error) {
    showMessage("❌ " + error.message, "error");
  }
};
