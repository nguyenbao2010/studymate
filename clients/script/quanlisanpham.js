// Import Firebase từ CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";


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

// ✅ Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Gắn sự kiện nút "Thêm khóa học"
document.getElementById("submit-btn").addEventListener("click", async () => {
  const name = document.getElementById("course-name").value.trim();
  const price = document.getElementById("course-price").value.trim();
  const imageFile = document.getElementById("course-image").files[0];

  if (!name || !price || !imageFile) {
    alert("Vui lòng nhập đủ thông tin!");
    return;
  }

  try {
    // 📤 Upload ảnh lên Firebase Storage
    const storageRef = ref(storage, `courses/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);

    // 🔗 Lấy URL ảnh
    const imageUrl = await getDownloadURL(storageRef);

    // 💾 Lưu vào Firestore
    await addDoc(collection(db, "courses"), {
      name: name,
      price: parseFloat(price),
      image: imageUrl,
      createdAt: new Date()
    });

    alert("✅ Khóa học đã được thêm!");
    document.getElementById("course-form").reset();

    // 📌 Hiển thị luôn khóa học mới
    addCourseToList(name, price, imageUrl);

  } catch (error) {
    console.error("Lỗi khi thêm khóa học: ", error);
    alert("❌ Lỗi khi thêm khóa học!");
  }
});

// 📌 Hàm hiển thị khóa học ra HTML
function addCourseToList(name, price, imageUrl) {
  const courseList = document.getElementById("course-list");
  const card = document.createElement("div");
  card.classList.add("course-card");
  card.innerHTML = `
    <img src="${imageUrl}" alt="${name}" />
    <h3>${name}</h3>
    <p>Giá: ${price.toLocaleString()} VNĐ</p>
  `;
  courseList.appendChild(card);
}
