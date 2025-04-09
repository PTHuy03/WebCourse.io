// Gán dữ liệu từ sessionStorage
const userInfoStr = sessionStorage.getItem("userInfo");
if (userInfoStr) {
  const user = JSON.parse(userInfoStr);

  document.getElementById("fullName").value = user.fullName || "";
  document.getElementById("username").value = user.username || "";
  document.getElementById("gender").value = user.gender || "";
  document.getElementById("country").value = user.country || "";
  document.getElementById("language").value = user.language || "";
  document.getElementById("timezone").value = user.timezone || "";

  document.getElementById("welcomeName").textContent =
    "Welcome, " + (user.username?.split(" ")[0] || "User");
  document.getElementById("profileName").textContent =
    user.username || "User Name";
  document.getElementById("profileEmail").textContent =
    user.email || "email@example.com";

  const avatar = user.avatar || "public/img/defaultAvatar.png";
  document.getElementById("userAvatar").src = avatar;
  document.getElementById("userAvatarTop").src = avatar;
}

// Hiển thị ngày hiện tại
const today = new Date().toLocaleDateString("en-GB", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
});
document.getElementById("todayDate").textContent = today;
// Save dữ liệu vào sessionStorage
document.getElementById("saveBtn").addEventListener("click", () => {
  const user = {
    fullName: document.getElementById("fullName").value,
    username: document.getElementById("username").value,
    gender: document.getElementById("gender").value,
    country: document.getElementById("country").value,
    language: document.getElementById("language").value,
    timezone: document.getElementById("timezone").value,
    email: document.getElementById("profileEmail").textContent,
    avatar: document.getElementById("userAvatar").src,
  };
  sessionStorage.setItem("userInfo", JSON.stringify(user));
});
// Xử lý khi chọn ảnh
document.getElementById("avatarInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64Image = event.target.result;
      document.getElementById("userAvatar").src = base64Image;
      document.getElementById("userAvatarTop").src = base64Image;
    };
    reader.readAsDataURL(file);
  }
});
