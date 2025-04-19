function updateLoginButton() {
    let selectedRole = document.querySelector('input[name="role"]:checked');
    let loginButton = document.getElementById("role-login-btn");

    if (!selectedRole) return;

    let role = selectedRole.value;

    if (role === "student") {
        loginButton.innerText = "Go to Student Sign-Up";
        loginButton.setAttribute("data-link", "studentindex.html"); // Set student login link
    } else if (role === "teacher") {
        loginButton.innerText = "Go to Teacher Sign-Up";
        loginButton.setAttribute("data-link", "teacherindex.html"); // Set teacher login link
    }

    loginButton.classList.remove("hidden"); // Show the button after selection
}

function redirectToLogin() {
    let loginButton = document.getElementById("role-login-btn");
    let link = loginButton.getAttribute("data-link");

    if (link) {
        window.location.href = link; // Redirect to the respective login page
    }
}

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let role = document.querySelector('input[name="role"]:checked');

    if (!role) {
        alert("Please select a role before logging in.");
        return;
    }

    role = role.value;
    
    alert(`Welcome to TESTHIVE! You are logging in as a ${role}.`);

    // Redirect to respective dashboard
    let dashboardPage = role === "student" ? "studentindex.html" : "teacherindex.html";
    window.location.href = dashboardPage;
});

function redirectToSignup() {
    let selectedRole = document.querySelector('input[name="role"]:checked');

    if (!selectedRole) {
        alert("Please select a role first.");
        return;
    }

    let role = selectedRole.value;
    let signupPage = role === "student" ? "studentindex.html" : "teachersignup.html";

    window.location.href = signupPage; // Redirects to respective signup page
}
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    let role = document.querySelector('input[name="role"]:checked');

    if (!role) {
        alert("Please select a role before logging in.");
        return;
    }

    role = role.value;
    
    alert(`Welcome to TESTHIVE! You are logging in as a ${role}.`);

    // ✅ Redirect to respective dashboard
    let dashboardPage = role === "student" ? "studentdashborad.html" : "teacherdashboard.html";
    window.location.href = dashboardPage;
    
});

