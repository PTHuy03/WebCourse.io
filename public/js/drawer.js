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

// Hàm đọc giá trị cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// Kiểm tra trạng thái đăng nhập bằng cookie authToken
const authToken = getCookie("authToken");
const logoutLink = document.querySelector(".bottom-menu a.logout");
const settingLink = document.querySelector(
  ".bottom-menu a[href='setting.html']"
);

if (logoutLink) {
  if (authToken) {
    // User đã đăng nhập
    logoutLink.innerHTML = `<i class="bi bi-box-arrow-right"></i> Logout`;
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      // Xóa cookie authToken
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.top.location.href = "signin.html";
    });
  } else {
    // User chưa đăng nhập
    logoutLink.innerHTML = `<i class="bi bi-box-arrow-in-right"></i> Login`;
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.top.location.href = "signin.html";
    });
  }
}

if (settingLink && !authToken) {
  settingLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.top.location.href = "signin.html";
  });
}
