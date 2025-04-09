document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn reload trang

  const username = document
    .querySelector('input[placeholder="Enter your name"]')
    .value.trim();
  const email = document
    .querySelector('input[placeholder="Enter your email"]')
    .value.trim();
  const password = document
    .querySelector('input[placeholder="Enter your password"]')
    .value.trim();
  const agree = document.getElementById("termsCheck").checked;

  if (!username || !email || !password) {
    alert("Please fill out all fields.");
    return;
  }

  if (!agree) {
    alert("You must agree to the terms & policy.");
    return;
  }

  // Lưu vào sessionStorage
  const userData = {
    username,
    email,
    password, // Trong thực tế nên mã hóa
  };

  sessionStorage.setItem("user", JSON.stringify(userData));

  alert("Signup successful!");
  window.location.href = "signin.html";
});
