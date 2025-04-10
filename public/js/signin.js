document
  .querySelector("button.btn-success")
  .addEventListener("click", async function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      const response = await fetch(
        "https://webcourse-io.onrender.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // Save token in cookie
      document.cookie = `authToken=${data.token}; path=/; max-age=604800`; // 7 days

      window.location.href = "index.html";
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  });
