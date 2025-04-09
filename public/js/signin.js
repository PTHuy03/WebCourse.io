document
  .querySelector("button.btn-success")
  .addEventListener("click", function () {
    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    // Lấy user từ sessionStorage
    const storedUser = sessionStorage.getItem("user");

    if (!storedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    const user = JSON.parse(storedUser);

    // Kiểm tra email và mật khẩu
    if (user.email === emailInput && user.password === passwordInput) {
      // Lưu vào sessionStorage
      const userData = {
        username: user.username,
        email: user.email,
      };

      sessionStorage.setItem("userInfo", JSON.stringify(userData));
      window.location.href = "home.html"; // Chuyển hướng
    } else {
      alert("Incorrect email or password.");
    }
  });
