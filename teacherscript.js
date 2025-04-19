document.addEventListener("DOMContentLoaded", function () {
    // Function to toggle school/college options
    function toggleTeachingOptions() {
        let teachingLevel = document.getElementById("teaching-level").value;
        let schoolOptions = document.getElementById("school-options");
        let collegeOptions = document.getElementById("college-options");

        if (teachingLevel === "school") {
            schoolOptions.classList.remove("hidden");
            collegeOptions.classList.add("hidden");
        } else if (teachingLevel === "college") {
            collegeOptions.classList.remove("hidden");
            schoolOptions.classList.add("hidden");
        } else {
            schoolOptions.classList.add("hidden");
            collegeOptions.classList.add("hidden");
        }
    }

    // Function to toggle Engineering specialization options
    function toggleDegreeOptions() {
        let department = document.getElementById("department").value;
        let engineeringOptions = document.getElementById("engineering-options");

        if (department === "Engineering") {
            engineeringOptions.classList.remove("hidden");
        } else {
            engineeringOptions.classList.add("hidden");
        }
    }

    // Function to validate form and submit
    document.getElementById("teacher-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default submission

        let name = document.getElementById("name").value.trim();
        let photo = document.getElementById("photo").files.length;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm-password").value;
        let teachingLevel = document.getElementById("teaching-level").value;

        // Validations
        if (!name || !photo || !password || !confirmPassword || !teachingLevel) {
            alert("All fields are required!");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Registration success message
        alert(`Welcome ${name}! You have registered as a ${teachingLevel} teacher.`);

        // Redirect to teacher dashboard
        window.location.href = "teacherdashboard.html";
    });

    // Attach event listeners
    document.getElementById("teaching-level").addEventListener("change", toggleTeachingOptions);
    document.getElementById("department").addEventListener("change", toggleDegreeOptions);
});
