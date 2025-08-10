
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
  onValue
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// ✅ Firebase Config
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

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

function showMessage(message, type = 'info') {
  const msgBox = document.getElementById("message");
  msgBox.innerText = message;
  msgBox.style.color = type === 'error' ? 'red' : 'green';
  msgBox.style.fontWeight = 'bold';
}

// ✅ Theo dõi trạng thái đăng nhập
onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  if (user) {
    if (path === "/login.html" || path === "/") {
      window.location.href = "index.html";
    }
    // Hiển thị thông tin realtime
    onValue(ref(database, 'users/' + user.uid), (snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("user-info").innerText =
          snapshot.val().displayName || snapshot.val().email;
      }
    });
  } else {
    if (path.includes("index.html")) {
      window.location.href = "login.html";
    }
  }
});

// ✅ Đăng ký tài khoản bằng Email
window.signUp = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Lưu thông tin vào Realtime Database
    await set(ref(database, 'users/' + user.uid), {
      email: user.email,
      displayName: user.displayName || "",
      createdAt: new Date().toISOString()
    });

    showMessage("✅ Đăng ký thành công!");
  } catch (error) {
    showMessage("❌ " + error.message, 'error');
  }
};

// ✅ Đăng nhập bằng Google
window.signInWithGoogle = async function () {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Lưu hoặc cập nhật thông tin
    await update(ref(database, 'users/' + user.uid), {
      email: user.email,
      displayName: user.displayName,
      lastLogin: new Date().toISOString()
    });

    showMessage(`✅ Chào mừng, ${user.displayName}!`);
    window.location.href = "index.html";
  } catch (error) {
    console.error("❌ Google login error:", error);
    showMessage("❌ " + error.message, 'error');
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
    await update(ref(database, 'users/' + user.uid), {
      lastLogin: new Date().toISOString()
    });

    showMessage("✅ Đăng nhập thành công!");
    window.location.href = "index.html";
  } catch (error) {
    showMessage("❌ " + error.message, 'error');
  }
};

// ✅ Đăng xuất
window.signOut = async function () {
  try {
    await signOut(auth);
    showMessage("✅ Đã đăng xuất!");
    setTimeout(() => location.reload(), 1000);
  } catch (error) {
    showMessage("❌ " + error.message, 'error');
  }
};
