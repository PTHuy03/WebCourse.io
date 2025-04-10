document.addEventListener("DOMContentLoaded", async () => {
  // Hàm đọc giá trị cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  // Kiểm tra trạng thái đăng nhập bằng cookie authToken
  const token = getCookie("authToken");
  if (!token) return;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  document.getElementById("todayDate").textContent = formattedDate;
  console.log("Token:", token);
  try {
    const res = await fetch("https://webcourse-io.onrender.com/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Không thể lấy dữ liệu người dùng");

    const user = await res.json();

    // Hiển thị thông tin người dùng
    document.getElementById("fullName").value = user.fullName || "";
    document.getElementById("username").value = user.username || "";
    document.getElementById("gender").value = user.gender || "";
    document.getElementById("country").value = user.country || "";
    document.getElementById("language").value = user.language || "";
    document.getElementById("timezone").value = user.timezone || "";

    document.getElementById("welcomeName").textContent =
      "Welcome, " + (user.username?.split(" ")[0] || "User");
    document.getElementById("profileName").textContent =
      user.username || "User";
    document.getElementById("profileEmail").textContent = user.email || "";

    const avatarSrc = user.avatar || "public/img/defaultAvatar.png";
    document.getElementById("userAvatar").src = avatarSrc;
    document.getElementById("userAvatarTop").src = avatarSrc;

    // Lưu avatar path vào sessionStorage để tái sử dụng nếu cần
    sessionStorage.setItem("avatarPath", avatarSrc);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
});

// Xử lý cập nhật ảnh đại diện
document.getElementById("avatarInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const res = await fetch(
      "https://webcourse-io.onrender.com/api/users/upload-avatar",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (res.ok) {
      // Cập nhật ảnh ở giao diện
      const avatarPath = data.avatar;
      document.getElementById("userAvatar").src = avatarPath;
      document.getElementById("userAvatarTop").src = avatarPath;

      // Lưu lại đường dẫn vào sessionStorage
      sessionStorage.setItem("avatarPath", avatarPath);
    } else {
      alert(data.message || "Upload avatar failed");
    }
  } catch (err) {
    console.error("Upload avatar error:", err);
  }
});

// Xử lý lưu thông tin cập nhật
document.getElementById("saveBtn").addEventListener("click", async () => {
  // Hàm đọc giá trị cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  // Kiểm tra trạng thái đăng nhập bằng cookie authToken
  const token = getCookie("authToken");
  if (!token) return;

  const avatar =
    sessionStorage.getItem("avatarPath") ||
    document.getElementById("userAvatar").src;

  const updatedUser = {
    username: document.getElementById("username").value,
    fullName: document.getElementById("fullName").value,
    gender: document.getElementById("gender").value,
    country: document.getElementById("country").value,
    language: document.getElementById("language").value,
    timezone: document.getElementById("timezone").value,
    avatar,
  };
  console.log("Updated User:", updatedUser);

  try {
    const res = await fetch(
      "https://webcourse-io.onrender.com/api/users/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      }
    );

    const result = await res.json();

    if (res.ok) {
      alert("Profile updated successfully");
    } else {
      alert(result.message || "Update failed");
    }
  } catch (err) {
    console.error("Error updating profile:", err);
  }
});
