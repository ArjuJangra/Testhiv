// Update the login button text based on selected role (student or teacher)
function updateLoginButton() {
    const selectedRole = document.querySelector('input[name="role"]:checked');
    const loginButton = document.getElementById("role-login-btn");

    if (!selectedRole) return;

    const role = selectedRole.value;

    if (role === "student") {
        loginButton.innerText = "Go to Student Sign-Up";
        loginButton.setAttribute("data-link", "studentindex.html"); // Set student login link
    } else if (role === "teacher") {
        loginButton.innerText = "Go to Teacher Sign-Up";
        loginButton.setAttribute("data-link", "teacherindex.html"); // Set teacher login link
    }

    loginButton.classList.remove("hidden"); // Show the button after selection
}

// Redirect to the respective sign-up or login page based on role
function redirectToLogin() {
    const loginButton = document.getElementById("role-login-btn");
    const link = loginButton.getAttribute("data-link");

    if (link) {
        window.location.href = link; // Redirect to the respective login page
    }
}

// Handle the form submission (login process)
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const role = document.querySelector('input[name="role"]:checked');

    if (!role) {
        alert("Please select a role before logging in.");
        return;
    }

    const roleValue = role.value;
    
    alert(`Welcome to TESTHIVE! You are logging in as a ${roleValue}.`);

    // Redirect to respective dashboard based on the role (student or teacher)
    const dashboardPage = roleValue === "student" ? "studentdashboard.html" : "teacherdashboard.html";
    window.location.href = dashboardPage;
});

// Redirect to the correct sign-up page (student or teacher) based on selected role
function redirectToSignup() {
    const selectedRole = document.querySelector('input[name="role"]:checked');

    if (!selectedRole) {
        alert("Please select a role first.");
        return;
    }

    const role = selectedRole.value;
    const signupPage = role === "student" ? "studentsignup.html" : "teachersignup.html";

    window.location.href = signupPage; // Redirects to the respective signup page
}
