document.addEventListener("DOMContentLoaded", function () {
    // Initialize EmailJS
    emailjs.init("7dD-PMOnCAnPhsub-");
    
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const isDashboard = window.location.pathname.includes("dashboard.html");
    
    const choiceBox = document.getElementById("choice-box");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const loginBtn = document.getElementById("choose-login");
    const registerBtn = document.getElementById("choose-register");
    const forgotLink = document.getElementById("forgot-password-link");
    
    function showForm(type) {
        if (choiceBox) choiceBox.style.display = "none";
        if (loginForm) loginForm.style.display = type === "login" ? "block" : "none";
        if (registerForm) registerForm.style.display = type === "register" ? "block" : "none";
    }
    
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    
    if (isDashboard) {
        const lastLoggedInEmail = localStorage.getItem("lastLoggedIn");
        if (!lastLoggedInEmail || !users[lastLoggedInEmail]) {
            alert("Please log in to access the dashboard.");
            window.location.href = "register.html";
            return;
        }
    
        const loadDashboardData = () => {
            const user = users[lastLoggedInEmail];
            const welcomeMsg = document.getElementById("welcome-msg");
            const emailDisplay = document.getElementById("user-email");
            const avatar = document.getElementById("user-avatar");
            const appointmentsList = document.getElementById("appointments");
            const vaccineRecordsList = document.getElementById("vaccine-records");
    
            if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${user.name}!`;
            if (emailDisplay) emailDisplay.textContent = `Email: ${lastLoggedInEmail}`;
            if (avatar && lastLoggedInEmail) {
                avatar.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(lastLoggedInEmail)}`;
            }
    
            // Load and display appointments
            if (appointmentsList) {
                const allAppointments = JSON.parse(localStorage.getItem("appointments") || "{}");
                const userAppointments = allAppointments[lastLoggedInEmail] || [];
    
                const today = new Date();
                const upcomingAppointments = userAppointments.filter(app => {
                    const appDate = new Date(app.date);
                    return appDate >= today;
                });
    
                appointmentsList.innerHTML = "";
    
                if (upcomingAppointments.length === 0) {
                    const li = document.createElement("li");
                    li.textContent = "No upcoming appointments";
                    appointmentsList.appendChild(li);
                } else {
                    upcomingAppointments.forEach(app => {
                        const li = document.createElement("li");
                        const appDate = new Date(app.date);
                        li.textContent = `${appDate.toLocaleDateString()} - ${app.description}`;
                        appointmentsList.appendChild(li);
                    });
                }
            }
    
            // Load and display vaccine records
            if (vaccineRecordsList) {
                const allVaccines = JSON.parse(localStorage.getItem("vaccines") || "{}");
                const userVaccines = allVaccines[lastLoggedInEmail] || [];
    
                vaccineRecordsList.innerHTML = "";
    
                if (userVaccines.length === 0) {
                    const li = document.createElement("li");
                    li.textContent = "No vaccine records found";
                    vaccineRecordsList.appendChild(li);
                } else {
                    userVaccines.forEach(vaccine => {
                        const li = document.createElement("li");
                        const vacDate = new Date(vaccine.date);
                        li.textContent = `${vaccine.name} - ${vacDate.toLocaleDateString()}`;
                        vaccineRecordsList.appendChild(li);
                    });
                }
            }
        };
    
        loadDashboardData();
    
        // Attach logout button event listener using event delegation
        document.addEventListener("click", function (event) {
            if (event.target && event.target.id === "logout-btn") {
                localStorage.removeItem("lastLoggedIn");
                alert("You have been logged out.");
                window.location.href = "index.html";
            }
        });
    }
    
    // Login/Register form logic
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            if (Object.keys(users).length === 0) {
                alert("No registered users. Please sign up first.");
            } else {
                showForm("login");
            }
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener("click", () => showForm("register"));
    }
    
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("register-name").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const password = document.getElementById("register-password").value;
    
            if (users[email]) {
                alert("User already registered!");
                return;
            }
    
            const otp = generateOTP();
            localStorage.setItem("pendingRegistration", JSON.stringify({ name, email, password, otp }));
    
            emailjs.send("immunitrack", "immunitrack", {
                to_name: name,
                to_email: email,
                otp: otp
            }).then(() => {
                alert("OTP sent to your email.");
            }).catch((err) => {
                console.error("EmailJS error:", err);
                alert("Failed to send OTP. Try again.");
                return;
            });
    
            if (!document.getElementById("otp-input")) {
                const otpInput = document.createElement("input");
                otpInput.id = "otp-input";
                otpInput.type = "text";
                otpInput.placeholder = "Enter OTP";
                otpInput.required = true;
                otpInput.style.marginTop = "10px";
    
                const verifyBtn = document.createElement("button");
                verifyBtn.id = "verify-otp-btn";
                verifyBtn.type = "button";
                verifyBtn.textContent = "Verify OTP";
                verifyBtn.style.marginTop = "10px";
    
                registerForm.append(otpInput, verifyBtn);
    
                verifyBtn.addEventListener("click", function () {
                    const enteredOTP = otpInput.value.trim();
                    const stored = JSON.parse(localStorage.getItem("pendingRegistration"));
    
                    if (enteredOTP === stored.otp) {
                        users[stored.email] = { name: stored.name, password: stored.password };
                        localStorage.setItem("users", JSON.stringify(users));
                        localStorage.removeItem("pendingRegistration");
                        alert("Email verified! Registration successful.");
                        showForm("login");
                    } else {
                        alert("Incorrect OTP. Try again.");
                    }
                });
            }
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value;
    
            if (users[email] && users[email].password === password) {
                localStorage.setItem("lastLoggedIn", email);
                alert(`Welcome back, ${users[email].name}!`);
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid credentials.");
            }
        });
    }
    
    if (forgotLink) {
        forgotLink.addEventListener("click", function (e) {
            e.preventDefault();
            const email = prompt("Enter your registered email:");
            if (!email) return;
    
            if (!users[email]) {
                alert("Email not found.");
            } else {
                const newPass = prompt("Enter your new password (min 4 characters):");
                if (newPass && newPass.length >= 4) {
                    users[email].password = newPass;
                    localStorage.setItem("users", JSON.stringify(users));
                    alert("Password reset successful.");
                } else {
                    alert("Password too short.");
                }
            }
        });
    }
    
    if (choiceBox) choiceBox.style.display = "block";
    if (loginForm) loginForm.style.display = "none";
    if (registerForm) registerForm.style.display = "none";
    
    const registerLink = document.getElementById("registerLink");
    if (registerLink && localStorage.getItem("lastLoggedIn")) {
        registerLink.style.display = "none";
    }
    });

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        console.log("Logout button clicked");
        localStorage.removeItem("lastLoggedIn");
        alert("You have been logged out.");
        window.location.href = "index.html";
      });
    } else {
      console.error("Logout button not found in the DOM");
    }
});
