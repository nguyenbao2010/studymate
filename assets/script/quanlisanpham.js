// Import Firebase từ CDN (chỉ cần Firestore)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

// ✅ Khởi tạo Firebase (chỉ cần Firestore)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔍 Kiểm tra config
console.log("Firebase config:", {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain
});
console.log("Firebase app:", app);
console.log("Firestore db:", db);

// 🔒 Biến để kiểm soát việc load
let isLoading = false;
let loadedCourseIds = new Set();

// 🧪 Test Firestore connection
async function testFirestoreConnection() {
  try {
    console.log("Testing Firestore connection...");
    const testDoc = await addDoc(collection(db, "test"), {
      message: "Test connection",
      timestamp: new Date()
    });
    console.log("✅ Firestore connection OK, test doc ID:", testDoc.id);
    return true;
  } catch (error) {
    console.error("❌ Firestore connection failed:", error);
    return false;
  }
}

// � Alternative: Convert image to base64 if Storage fails
function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
// 📌 Hàm hiển thị khóa học ra HTML
function addCourseToList(name, price, imageUrl, courseId = null) {
  const courseList = document.getElementById("course-list");
  if (!courseList) {
    console.error("Không tìm thấy element course-list");
    return;
  }
  
  // Kiểm tra input
  if (!name || !price || !imageUrl) {
    console.error("Thiếu thông tin khóa học:", {name, price, imageUrl});
    return;
  }
  
  // Kiểm tra xem khóa học đã tồn tại chưa (nếu có courseId)
  if (courseId && document.getElementById(`course-${courseId}`)) {
    console.log(`Khóa học ${courseId} đã tồn tại, bỏ qua`);
    return;
  }
  
  // Kiểm tra trong Set đã load
  if (courseId && loadedCourseIds.has(courseId)) {
    console.log(`Khóa học ${courseId} đã được load, bỏ qua`);
    return;
  }
  
  const card = document.createElement("div");
  card.classList.add("course-card");
  
  // Thêm ID unique nếu có
  if (courseId) {
    card.id = `course-${courseId}`;
    loadedCourseIds.add(courseId);
  }
  
  // Đảm bảo price là number
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  // Kiểm tra URL ảnh (hỗ trợ cả HTTP URL và Base64)
  const validImageUrl = imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('data:image')) ? imageUrl : 
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f0f0f0%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2214%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EKh%C3%B4ng%20c%C3%B3%20%E1%BA%A3nh%3C/text%3E%3C/svg%3E';
  
  card.innerHTML = `
    <img src="${validImageUrl}" 
         alt="${name}" 
         loading="lazy"
         style="width: 100%; height: 200px; object-fit: cover;"
         onerror="if(this.src !== 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f0f0f0%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2214%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EKh%C3%B4ng%20t%E1%BA%A3i%20%C4%91%C6%B0%E1%BB%A3c%20%E1%BA%A3nh%3C/text%3E%3C/svg%3E') { this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f0f0f0%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2214%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EKh%C3%B4ng%20t%E1%BA%A3i%20%C4%91%C6%B0%E1%BB%A3c%20%E1%BA%A3nh%3C/text%3E%3C/svg%3E'; }" />
    <h3>${name}</h3>
    <p>Giá: ${numericPrice.toLocaleString('vi-VN')} VNĐ</p>
  `;
  courseList.appendChild(card);
}

// 📌 Load các khóa học đã có khi trang được tải
async function loadExistingCourses() {
  if (isLoading) {
    console.log("Đang load, bỏ qua yêu cầu load thêm");
    return;
  }
  
  isLoading = true;
  
  try {
    // Hiển thị loading
    const courseList = document.getElementById("course-list");
    if (courseList) {
      courseList.innerHTML = '<p style="text-align: center; padding: 20px;">🔄 Đang tải khóa học...</p>';
      loadedCourseIds.clear(); // Reset set các ID đã load
    }
    
    const querySnapshot = await getDocs(collection(db, "courses"));
    
    // Xóa loading message
    courseList.innerHTML = '';
    
    if (querySnapshot.empty) {
      courseList.innerHTML = '<p style="text-align: center; padding: 20px;">📚 Chưa có khóa học nào. Hãy thêm khóa học đầu tiên!</p>';
      return;
    }
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!loadedCourseIds.has(doc.id)) {
        addCourseToList(data.name, data.price, data.image, doc.id);
        loadedCourseIds.add(doc.id);
      }
    });
    
    console.log(`Đã load ${loadedCourseIds.size} khóa học`);
  } catch (error) {
    console.error("Lỗi khi tải khóa học: ", error);
  } finally {
    isLoading = false;
  }
}

// Đảm bảo DOM đã sẵn sàng
let domReady = false;
document.addEventListener('DOMContentLoaded', () => {
  if (domReady) {
    console.log("DOM đã ready, bỏ qua");
    return;
  }
  domReady = true;
  
  console.log("DOM ready, bắt đầu khởi tạo");
  
  // Test Firestore connection trước
  testFirestoreConnection();
  
  // Load các khóa học có sẵn
  setTimeout(() => loadExistingCourses(), 100);
  
  // Gắn sự kiện nút "Thêm khóa học"
  const submitBtn = document.getElementById("submit-btn");
  if (!submitBtn) {
    console.error("Không tìm thấy button submit-btn");
    return;
  }
  
  submitBtn.addEventListener("click", async () => {
    const name = document.getElementById("course-name").value.trim();
    const price = document.getElementById("course-price").value.trim();
    const imageFile = document.getElementById("course-image").files[0];

    // Validation chi tiết
    if (!name) {
      alert("⚠️ Vui lòng nhập tên khóa học!");
      return;
    }
    
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      alert("⚠️ Vui lòng nhập giá hợp lệ!");
      return;
    }
    
    if (!imageFile) {
      alert("⚠️ Vui lòng chọn ảnh khóa học!");
      return;
    }

    // Kiểm tra file size (max 5MB)
    if (imageFile.size > 5 * 1024 * 1024) {
      alert("⚠️ File ảnh quá lớn! Vui lòng chọn file nhỏ hơn 5MB.");
      return;
    }

    // Kiểm tra định dạng file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(imageFile.type)) {
      alert("⚠️ Chỉ chấp nhận file ảnh (JPG, PNG, GIF)!");
      return;
    }

    // Hiển thị loading
    const originalText = submitBtn.value;
    submitBtn.value = "Đang xử lý...";
    submitBtn.disabled = true;

    try {
      // � Chuyển ảnh thành Base64 (không dùng Storage)
      console.log("Chuyển đổi ảnh thành Base64:", imageFile.name);
      const imageUrl = await convertFileToBase64(imageFile);
      console.log("Đã chuyển đổi thành Base64 thành công");

      // 💾 Lưu vào Firestore
      console.log("Đang lưu vào Firestore...");
      console.log("Dữ liệu sẽ lưu:", {
        name: name,
        price: parseFloat(price),
        image: imageUrl.substring(0, 50) + "... (Base64)",
        createdAt: new Date()
      });
      
      const docRef = await addDoc(collection(db, "courses"), {
        name: name,
        price: parseFloat(price),
        image: imageUrl,
        createdAt: new Date()
      });
      
      console.log("Lưu Firestore thành công với ID:", docRef.id);

      alert("✅ Khóa học đã được thêm!");
      document.getElementById("course-form").reset();

      // 📌 Hiển thị luôn khóa học mới với ID từ Firestore
      addCourseToList(name, parseFloat(price), imageUrl, docRef.id);

    } catch (error) {
      console.error("❌ LỖI TỔNG QUÁT khi thêm khóa học:");
      console.error("Error object:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      
      // Xử lý các loại lỗi cụ thể
      let errorMessage = "❌ Lỗi khi thêm khóa học!";
      
      if (error.code === 'permission-denied') {
        errorMessage = "❌ Không có quyền truy cập! Kiểm tra Firestore Rules.";
      } else if (error.message.includes('Missing or insufficient permissions')) {
        errorMessage = "❌ Thiếu quyền truy cập Firestore! Kiểm tra Rules.";
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = "❌ Lỗi kết nối mạng! Kiểm tra internet và Firebase config.";
      } else if (error.message.includes('quota')) {
        errorMessage = "❌ Vượt quá giới hạn Firestore! Kiểm tra quota.";
      } else if (error.message.includes('network')) {
        errorMessage = "❌ Lỗi mạng! Kiểm tra kết nối internet.";
      } else if (error.name === 'FirebaseError') {
        errorMessage = `❌ Lỗi Firebase: ${error.message}`;
      }
      
      console.error("Thông báo lỗi sẽ hiển thị:", errorMessage);
      alert(errorMessage);
    } finally {
      // Reset button state
      submitBtn.value = originalText;
      submitBtn.disabled = false;
    }
  });
});
