document.addEventListener("DOMContentLoaded", function () {
    // Function to handle form submission during teacher registration
    document.getElementById("teacher-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

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

        // Validate photo type (image)
        let photoFile = document.getElementById("photo").files[0];
        if (photoFile && !photoFile.type.startsWith('image/')) {
            alert("Please upload a valid image file.");
            return;
        }

        // Store the teacher's name and role in localStorage
        localStorage.setItem("teacherName", name);
        localStorage.setItem("role", "teacher");

        // Registration success message
        alert(`Welcome ${name}! You have registered as a ${teachingLevel} teacher.`);

        // Redirect to teacher dashboard
        window.location.href = "teacherdashboard.html";
    });

    // Function to handle the display of teacher's name on the teacher dashboard
    let teacherName = localStorage.getItem("teacherName");
    if (teacherName) {
        // Display the teacher's name in the dashboard header
        document.getElementById("teacher-name").innerText = teacherName;
    } else {
        // If no name is found, display a default message
        document.getElementById("teacher-name").innerText = "Guest Teacher";
    }

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

    // Attach event listeners for dynamic options
    document.getElementById("teaching-level").addEventListener("change", toggleTeachingOptions);
    document.getElementById("department").addEventListener("change", toggleDegreeOptions);
});
