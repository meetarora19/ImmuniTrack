document.addEventListener("DOMContentLoaded", function () {
    // Navigation Handling
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetSection = document.querySelector(this.getAttribute("href"));
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Validation
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            
            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields.");
                return;
            }
            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }
            alert("Message sent successfully!");
            form.reset();
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Toggle Mobile Menu
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    // Dynamic Year in Footer
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Login form event listener
    document.getElementById("login-form")?.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Login successful!");
    });

    // Registration form event listener
    document.getElementById("register-form")?.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Registration successful!");
    });

    // Function to handle scheduling appointments
    document.getElementById("schedule-btn")?.addEventListener("click", function () {
        alert("Appointment scheduled successfully!");
    });
});