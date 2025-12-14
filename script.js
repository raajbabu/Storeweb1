// ==========================
// ⚠️ SAME NETWORK TEST
// Termux IP yahan daalo
// ==========================
const API_BASE = "http://10.210.141.53:3000";

let sessionId = "";

// ==========================
// MODAL CONTROLS
// ==========================
function openLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

// ==========================
// LOGIN REQUIRED
// ==========================
function requireLogin() {
  const token = localStorage.getItem("token");
  if (!token) {
    openLogin();
  } else {
    alert("Order placed successfully 🎉");
  }
}

// ==========================
// SEND OTP
// ==========================
function sendOTP() {
  const telegram = document.getElementById("telegram").value;

  if (!telegram) {
    alert("Telegram username daalo");
    return;
  }

  fetch(`${API_BASE}/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telegram })
  })
  .then(res => res.json())
  .then(data => {
    sessionId = data.sessionId;
    window.open(data.botLink, "_blank");
    alert("OTP Telegram par bhej diya gaya hai");
  })
  .catch(() => {
    alert("Backend connect nahi ho raha");
  });
}

// ==========================
// VERIFY OTP
// ==========================
function verifyOTP() {
  const otp = document.getElementById("otp").value;

  fetch(`${API_BASE}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, otp })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem("token", data.token);
      alert("Login Successful 🎉");
      closeLogin();
    } else {
      alert("Wrong OTP");
    }
  });
}