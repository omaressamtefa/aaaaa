var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var loginButton = document.getElementById("loginButton");
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signupButton = document.getElementById("signupButton");
var signupPrompt = document.getElementById("signupPrompt");
var signinPrompt = document.getElementById("signinPrompt");
var incorrect = document.getElementById("incorrect");
var exist = document.getElementById("exist");
var existingUsers;
if (localStorage.getItem("users") == null) {
  existingUsers = [];
} else {
  existingUsers = JSON.parse(localStorage.getItem("users"));
}
function toggleForms() {
  if (signinEmail.classList.contains("d-none")) {
    signinEmail.classList.remove("d-none");
    signinPassword.classList.remove("d-none");
    loginButton.classList.remove("d-none");
    signupName.classList.add("d-none");
    signupEmail.classList.add("d-none");
    signupPassword.classList.add("d-none");
    signupButton.classList.add("d-none");
    signupPrompt.classList.remove("d-none");
    signinPrompt.classList.add("d-none");
  } else {
    signinEmail.classList.add("d-none");
    signinPassword.classList.add("d-none");
    loginButton.classList.add("d-none");
    signupName.classList.remove("d-none");
    signupEmail.classList.remove("d-none");
    signupPassword.classList.remove("d-none");
    signupButton.classList.remove("d-none");
    signupPrompt.classList.add("d-none");
    signinPrompt.classList.remove("d-none");
  }
}

function signUp() {
  incorrect.textContent = "";
  exist.textContent = "";

  if (!signupName.value || !signupEmail.value || !signupPassword.value) {
    incorrect.textContent = "All fields are required.";
    incorrect.style.color = "red";
    return;
  }

  for (var i = 0; i < existingUsers.length; i++) {
    if (existingUsers[i].email === signupEmail.value) {
      exist.textContent = "User already exists. Please login.";
      exist.style.color = "red";
      return;
    }
  }
  if (!validateEmail(signupEmail.value)) {
    incorrect.textContent = "Invalid email format.";
    incorrect.style.color = "red";
    return;
  }
  if (!validatePassword(signupPassword.value)) {
    incorrect.textContent =
      "Password must be at least 6 characters long and include a number.";
    incorrect.style.color = "red";
    return;
  }

  // Assign special behavior for specific names
  let specialUser = false;
  const specialNames = ["Batna section", "2lb section ", "7meer section"]; // Add any names you want here
  if (specialNames.includes(signupName.value)) {
    specialUser = true;
  }

  var newUser = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
    isSpecial: specialUser, // New property to track special users
  };

  existingUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(existingUsers));
  incorrect.textContent = "Sign-up successful! You can now log in.";
  incorrect.style.color = "green";
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
}

function login() {
  incorrect.textContent = "";

  if (!signinEmail.value || !signinPassword.value) {
    incorrect.textContent = "All fields are required.";
    incorrect.style.color = "red";
    return;
  }

  for (var i = 0; i < existingUsers.length; i++) {
    if (
      existingUsers[i].email === signinEmail.value &&
      existingUsers[i].password === signinPassword.value
    ) {
      localStorage.setItem("currentUser", JSON.stringify(existingUsers[i]));

      // Show a special card for specific users
      if (existingUsers[i].isSpecial) {
        document.body.innerHTML = `
          <nav class="navbar navbar-expand-lg navbar-dark group">
              <div class="container">
                  <a class="navbar-brand" href="#">SMART LOGIN</a>              
                  <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                  <ul class="navbar-nav ml-auto">
                      <li class="nav-item">
                        <button class="btn btn-outline-warning logout-btn" onclick="logout()">Logout</button>
                      </li>
                  </ul>
              </div>
              </div>
          </nav>
          <div class="container my-5 text-center h-100 d-flex align-items-center">
              <div class="group m-auto w-75 p-5">
                  <div class="card">
                      <h1 class="card-header">Special Card</h1>
                      <div class="card-body">
                          <h3>Welcome, ${existingUsers[i].name}!</h3>
                          <p>You have special privileges in this system.</p>
                      </div>
                  </div>
              </div>
          </div>`;
      } else {
        document.body.innerHTML = `
          <nav class="navbar navbar-expand-lg navbar-dark group">
              <div class="container">
                  <a class="navbar-brand" href="#">SMART LOGIN</a>              
                  <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                  <ul class="navbar-nav ml-auto">
                      <li class="nav-item">
                        <button class="btn btn-outline-warning logout-btn" onclick="logout()">Logout</button>
                      </li>
                  </ul>
              </div>
              </div>
          </nav>
          <div class="container my-5 text-center h-100 d-flex align-items-center">
              <div class="group m-auto w-75 p-5">
                  <h1 id="username">Welcome, ${existingUsers[i].name}!</h1>
              </div>
          </div>`;
      }
      return;
    }
  }

  incorrect.textContent = "Invalid email or password.";
  incorrect.style.color = "red";
  console.log(
    "Current user before logout:",
    localStorage.getItem("currentUser")
  );
}
function logout() {
  localStorage.removeItem("currentUser");
  window.location.replace("index.html");
  console.log(
    "Current user before logout:",
    localStorage.getItem("currentUser")
  );
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6 && /\d/.test(password);
}
