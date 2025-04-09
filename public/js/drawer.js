// Active menu highlight
// Active menu highlight
window.addEventListener("message", function (event) {
  const currentPath = event.data;

  document.querySelectorAll(".sidebar a").forEach((link) => {
    const linkPath = link.getAttribute("href");

    // Trường hợp đặc biệt: nếu là edituser.html thì active setting
    if (currentPath.endsWith("edituser.html") && linkPath === "setting.html") {
      link.classList.add("active");
    }
    // Trường hợp trang chính / hoặc index.html thì active dashboard
    else if (
      (currentPath === "/" || currentPath.endsWith("index.html")) &&
      linkPath === "index.html"
    ) {
      link.classList.add("active");
    }
    // Các trường hợp bình thường
    else if (currentPath.endsWith(linkPath)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Kiểm tra trạng thái đăng nhập
const userInfo = sessionStorage.getItem("userInfo");
const logoutLink = document.querySelector(".bottom-menu a.logout");
const settingLink = document.querySelector(
  ".bottom-menu a[href='setting.html']"
);

if (userInfo) {
  // User đã đăng nhập
  if (logoutLink) {
    logoutLink.innerHTML = `<i class="bi bi-box-arrow-right"></i> Logout`;
    logoutLink.setAttribute("href", "#");
    logoutLink.setAttribute("target", "_top");

    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      sessionStorage.removeItem("userInfo");
      window.top.location.href = "signin.html";
    });
  }
} else {
  // User chưa đăng nhập
  if (logoutLink) {
    logoutLink.innerHTML = `<i class="bi bi-box-arrow-in-right"></i> Login`;
    logoutLink.setAttribute("href", "signin.html");
    logoutLink.setAttribute("target", "_top");
  }

  if (settingLink) {
    settingLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.top.location.href = "signin.html";
    });
  }
}
