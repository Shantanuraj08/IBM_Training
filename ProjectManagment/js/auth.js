/* =========================================================
  auth.js — auth page logic
  The app stores one local account in localStorage. Users must
  register first, then sign in with the saved email/password.
  ========================================================= */

const LOCAL_ROLE = "Project Admin";

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

document.addEventListener("DOMContentLoaded", () => {
  // if already logged in, skip straight to the dashboard
  if (Session.get()) {
    window.location.href = "dashboard.html";
    return;
  }

  const registerForm = document.getElementById("register-form");
  const signinForm = document.getElementById("signin-form");
  const errorBox = document.getElementById("login-error");
  const successBox = document.getElementById("login-success");
  const registerBtn = document.getElementById("show-register-btn");
  const signinBtn = document.getElementById("show-signin-btn");
  const authTitle = document.getElementById("auth-title");
  const authCopy = document.getElementById("auth-copy");
  const authHint = document.getElementById("auth-hint");

  function clearMessages() {
    errorBox.textContent = "";
    errorBox.classList.remove("show");
    successBox.textContent = "";
    successBox.classList.remove("show");
  }

  function setMode(mode) {
    clearMessages();
    const isRegister = mode === "register";

    registerForm.classList.toggle("hidden", !isRegister);
    signinForm.classList.toggle("hidden", isRegister);
    registerBtn.classList.toggle("active", isRegister);
    signinBtn.classList.toggle("active", !isRegister);

    authTitle.textContent = isRegister ? "Create your account" : "Welcome back";
    authCopy.textContent = isRegister
      ? "Register first, then sign in with the account you saved in this browser."
      : "Sign in with the local account created on this browser.";
    authHint.textContent = isRegister
      ? "Create one local account for this browser. After that, use Sign in."
      : "If you have not registered yet, switch to Register first.";

    if (!isRegister) {
      const savedUser = Auth.get();
      if (savedUser) {
        document.getElementById("signin-email").value = savedUser.email || "";
        document.getElementById("signin-password").value = savedUser.password || "";
      }
    }
  }

  registerBtn.addEventListener("click", () => setMode("register"));
  signinBtn.addEventListener("click", () => setMode("signin"));

  const storedUser = Auth.get();
  setMode(storedUser ? "signin" : "register");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearMessages();
    const nameInput = document.getElementById("name");
    const email = normalizeEmail(document.getElementById("email").value);
    const password = document.getElementById("password").value;
    const name = nameInput.value.trim() || email.split("@")[0] || "Project User";

    if (!name || !email || !password) {
      errorBox.textContent = "Enter a name, email, and password.";
      errorBox.classList.add("show");
      return;
    }

    if (Auth.get()) {
      errorBox.textContent = "A local account already exists in this browser. Sign in instead.";
      errorBox.classList.add("show");
      setMode("signin");
      return;
    }

    const user = { name, role: LOCAL_ROLE, email, password };
    Auth.set(user);
    successBox.textContent = "Registration complete. You can now sign in.";
    successBox.classList.add("show");
    registerForm.reset();
    setMode("signin");
    document.getElementById("signin-email").value = email;
    document.getElementById("signin-password").value = password;
  });

  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearMessages();
    const email = normalizeEmail(document.getElementById("signin-email").value);
    const password = document.getElementById("signin-password").value;
    const user = Auth.get();

    if (!user) {
      errorBox.textContent = "No account has been registered on this browser. Please register first.";
      errorBox.classList.add("show");
      setMode("register");
      return;
    }

    if (normalizeEmail(user.email || "") !== email || user.password !== password) {
      errorBox.textContent = "Sign-in failed. Please verify your email and password.";
      errorBox.classList.add("show");
      return;
    }

    Session.set({ name: user.name, role: user.role || LOCAL_ROLE, email: user.email });
    seedDemoData();
    window.location.href = "dashboard.html";
  });
});
