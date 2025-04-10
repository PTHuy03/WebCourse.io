document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.querySelector('input[placeholder="Enter your name"]').value.trim();
  const email = document.querySelector('input[placeholder="Enter your email"]').value.trim();
  const password = document.querySelector('input[placeholder="Enter your password"]').value.trim();
  const agree = document.getElementById("termsCheck").checked;

  if (!username || !email || !password) {
    alert("Please fill out all fields.");
    return;
  }

  if (!agree) {
    alert("You must agree to the terms & policy.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
      credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Registration failed");
      return;
    }

    alert("Signup successful! Please login.");
    window.location.href = "signin.html";
  } catch (error) {
    console.error("Signup error:", error);
    alert("An error occurred during signup.");
  }
});
