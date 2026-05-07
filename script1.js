// ── DARK MODE ──
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const btn = document.querySelector(".theme-btn");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("roomSyncDark", "true");
    btn.textContent = "☀️ Light";
  } else {
    localStorage.setItem("roomSyncDark", "false");
    btn.textContent = "🌙 Dark";
  }
}

// Apply saved dark mode on load
(function () {
  if (localStorage.getItem("roomSyncDark") === "true") {
    document.body.classList.add("dark-mode");
    document.addEventListener("DOMContentLoaded", () => {
      const btn = document.querySelector(".theme-btn");
      if (btn) btn.textContent = "☀️ Light";
    });
  }
})();

// ── REGISTER ──
function showMessage() {
  window.location.href = "register.html";
}

function registerUser() {
  let name = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let budget = document.getElementById("budget").value;
  let cleanliness = document.getElementById("cleanliness").value;
  let schedule = document.getElementById("schedule").value;
  let username = document.getElementById("newUsername").value;
  let password = document.getElementById("newPassword").value;

  if (!name || !email || !username || !password || !budget || !cleanliness || !schedule) {
    alert("Please complete all fields.");
    return false;
  }

  localStorage.setItem("roomSyncName", name);
  localStorage.setItem("roomSyncEmail", email);
  localStorage.setItem("roomSyncUsername", username);
  localStorage.setItem("roomSyncPassword", password);
  localStorage.setItem("roomSyncBudget", budget);
  localStorage.setItem("roomSyncCleanliness", cleanliness);
  localStorage.setItem("roomSyncSchedule", schedule);
  localStorage.setItem("roomSyncLoggedIn", "true");

  alert("Account created! Taking you to your dashboard.");
  window.location.href = "dashboard.html";
  return false;
}

// ── LOGIN ──
function loginUser() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let savedUsername = localStorage.getItem("roomSyncUsername");
  let savedPassword = localStorage.getItem("roomSyncPassword");

  if (username === savedUsername && password === savedPassword) {
    localStorage.setItem("roomSyncLoggedIn", "true");
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Incorrect username or password.");
  }
  return false;
}

// ── AUTH GUARD ──
function checkLogin() {
  if (localStorage.getItem("roomSyncLoggedIn") !== "true") {
    alert("Please log in or register before accessing the dashboard.");
    window.location.href = "login.html";
  }
}

// ── QUIZ ──
function saveQuiz() {
  let name = document.getElementById("quizName").value;
  let cleanliness = document.getElementById("quizCleanliness").value;
  let schedule = document.getElementById("quizSchedule").value;
  let guests = document.getElementById("quizGuests").value;

  localStorage.setItem("quizName", name);
  localStorage.setItem("quizCleanliness", cleanliness);
  localStorage.setItem("quizSchedule", schedule);
  localStorage.setItem("quizGuests", guests);

  const result = document.getElementById("quizResult");
  result.style.display = "block";
  result.innerHTML =
    "<h3>✅ Preferences Saved!</h3>" +
    "<p><strong>Name:</strong> " + name + "</p>" +
    "<p><strong>Cleanliness:</strong> " + cleanliness + "</p>" +
    "<p><strong>Schedule:</strong> " + schedule + "</p>" +
    "<p><strong>Guests:</strong> " + guests + "</p>";

  return false;
}

// ── LOGOUT ──
function logoutUser() {
  localStorage.setItem("roomSyncLoggedIn", "false");
  alert("You've been logged out.");
  window.location.href = "index.html";
}

// ── SEARCH FILTER ──
function filterRoommates() {
  let filter = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.getElementsByClassName("roommate-card");
  for (let i = 0; i < cards.length; i++) {
    let text = cards[i].innerText.toLowerCase();
    let keywords = cards[i].getAttribute("data-keywords").toLowerCase();
    cards[i].style.display = (text.includes(filter) || keywords.includes(filter)) ? "" : "none";
  }
}

// ── FILTER BUTTONS ──
function setFilter(type, btn) {
  // Update active button
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  let cards = document.getElementsByClassName("roommate-card");
  for (let i = 0; i < cards.length; i++) {
    if (type === "all") {
      cards[i].style.display = "";
    } else if (type === "early") {
      cards[i].style.display = cards[i].getAttribute("data-schedule") === "early" ? "" : "none";
    } else if (type === "night") {
      cards[i].style.display = cards[i].getAttribute("data-schedule") === "night" ? "" : "none";
    } else if (type === "clean") {
      cards[i].style.display = cards[i].getAttribute("data-cleanliness") === "clean" ? "" : "none";
    }
  }
}

// ── HOME PAGE (logged in state) ──
function updateHomePage() {
  let loggedIn = localStorage.getItem("roomSyncLoggedIn");
  let name = localStorage.getItem("roomSyncName");

  if (loggedIn === "true" && name) {
    document.getElementById("homeContent").innerHTML =
      "<div class='hero-eyebrow'><span class='hero-eyebrow-dot'></span>Welcome Back</div>" +
      "<h1>Hey, <span class='accent'>" + name + "!</span></h1>" +
      "<p>Your RoomSync profile is active. Explore new matches, check your messages, and update your compatibility quiz.</p>" +
      "<div class='hero-cta'>" +
        "<button class='btn-primary' onclick=\"window.location.href='search.html'\">Search Roommates →</button>" +
        "<button class='btn-secondary' onclick=\"window.location.href='dashboard.html'\">My Dashboard</button>" +
      "</div>";

    document.getElementById("memberSection").style.display = "block";
  }
}

function showDemoMessage() {
  alert("Demo: In a future version, you could chat directly with matched roommates here.");
}

// ── SAVE MATCH ──
function saveMatch(name) {
  let savedMatches = document.getElementById("savedMatches");
  // Remove placeholder if present
  let placeholder = savedMatches.querySelector("p");
  if (placeholder && !savedMatches.querySelector(".saved-card h3")) {
    savedMatches.innerHTML = "";
  }
  savedMatches.innerHTML +=
    "<div class='saved-card'>" +
      "<h3 style='font-family:Syne,sans-serif;font-weight:700;margin-bottom:6px;color:var(--text)'>" + name + "</h3>" +
      "<p>Added to your saved matches.</p>" +
    "</div>";
  alert("✅ " + name + " saved to your matches!");
}

// ── PROFILE MODAL ──
function openProfile(name, details) {
  document.getElementById("modalName").innerText = name;
  document.getElementById("modalDetails").innerText = details;
  document.getElementById("profileModal").style.display = "flex";
}

function closeProfile() {
  document.getElementById("profileModal").style.display = "none";
}
