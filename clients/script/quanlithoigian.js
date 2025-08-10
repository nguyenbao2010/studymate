document.addEventListener("DOMContentLoaded", loadPlans);

const form = document.getElementById("study-form");
const list = document.getElementById("study-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const subject = document.getElementById("subject").value.trim();
  const date = document.getElementById("date").value;
  const start = document.getElementById("start-time").value;
  const end = document.getElementById("end-time").value;

  if (!subject || !date || !start || !end) {
    alert("Vui lòng nhập đủ thông tin!");
    return;
  }

  const plan = { subject, date, start, end };

  savePlan(plan);
  addPlanToDOM(plan);
  form.reset();
});

// Lưu vào LocalStorage
function savePlan(plan) {
  const plans = JSON.parse(localStorage.getItem("studyPlans")) || [];
  plans.push(plan);
  localStorage.setItem("studyPlans", JSON.stringify(plans));
}

// Tải dữ liệu khi load trang
function loadPlans() {
  const plans = JSON.parse(localStorage.getItem("studyPlans")) || [];
  plans.forEach(plan => addPlanToDOM(plan));
}

// Thêm vào giao diện
function addPlanToDOM(plan) {
  const card = document.createElement("div");
  card.classList.add("study-card");

  card.innerHTML = `
    <div class="study-info">
      <h3>${plan.subject}</h3>
      <p>${plan.date} | ${plan.start} - ${plan.end}</p>
    </div>
    <button class="delete-btn">Xóa</button>
  `;

  card.querySelector(".delete-btn").addEventListener("click", () => {
    deletePlan(plan);
    card.remove();
  });

  list.appendChild(card);
}

// Xóa khỏi LocalStorage
function deletePlan(plan) {
  let plans = JSON.parse(localStorage.getItem("studyPlans")) || [];
  plans = plans.filter(p => !(p.subject === plan.subject && p.date === plan.date && p.start === plan.start && p.end === plan.end));
  localStorage.setItem("studyPlans", JSON.stringify(plans));
}
