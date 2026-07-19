/* =========================================================
   layout.js
   Shared sidebar behaviour: guard the page, fill in the
   logged-in user's info, and wire up logout.
   Included on every page except the login page.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const user = Session.requireLogin();
  if (!user) return; // requireLogin already redirected

  const nameEl = document.getElementById("sidebar-user-name");
  const roleEl = document.getElementById("sidebar-user-role");
  const avatarEl = document.getElementById("sidebar-avatar");

  if (nameEl) nameEl.textContent = user.name;
  if (roleEl) roleEl.textContent = user.role;
  if (avatarEl) avatarEl.textContent = initials(user.name);

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      Session.clear();
      window.location.href = "index.html";
    });
  }
});
