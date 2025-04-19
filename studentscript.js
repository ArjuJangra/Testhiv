// function toggleEducationOptions() {
//     let educationLevel = document.getElementById("education").value;
//     let schoolOptions = document.getElementById("school-options");
//     let collegeOptions = document.getElementById("college-options");

//     if (educationLevel === "school") {
//         schoolOptions.classList.remove("hidden");
//         collegeOptions.classList.add("hidden");
//     } else if (educationLevel === "college") {
//         collegeOptions.classList.remove("hidden");
//         schoolOptions.classList.add("hidden");
//     } else {
//         schoolOptions.classList.add("hidden");
//         collegeOptions.classList.add("hidden");
//     }
// }

// function toggleDegreeOptions() {
//     let degreeType = document.getElementById("degree").value;
//     let graduationOptions = document.getElementById("graduation-options");
//     let postGradOptions = document.getElementById("post-grad-options");

//     if (degreeType === "graduation") {
//         graduationOptions.classList.remove("hidden");
//         postGradOptions.classList.add("hidden");
//     } else if (degreeType === "post-graduation") {
//         postGradOptions.classList.remove("hidden");
//         graduationOptions.classList.add("hidden");
//     } else {
//         graduationOptions.classList.add("hidden");
//         postGradOptions.classList.add("hidden");
//     }
// }

// document.getElementById("student-form").addEventListener("submit", function(event) {
//     event.preventDefault();

//     let name = document.getElementById("name").value;
//     let password = document.getElementById("password").value;
//     let confirmPassword = document.getElementById("confirm-password").value;
//     let education = document.getElementById("education").value;

//     if (password !== confirmPassword) {
//         alert("Passwords do not match!");
//         return;
//     }

//     alert(`Welcome ${name}! You have registered as a ${education} student.`);
// });
// Toggle school/college options based on selection
function toggleEducationOptions() {
    let educationLevel = document.getElementById("education").value;
    let schoolOptions = document.getElementById("school-options");
    let collegeOptions = document.getElementById("college-options");

    if (educationLevel === "school") {
        schoolOptions.classList.remove("hidden");
        collegeOptions.classList.add("hidden");
    } else if (educationLevel === "college") {
        collegeOptions.classList.remove("hidden");
        schoolOptions.classList.add("hidden");
    } else {
        schoolOptions.classList.add("hidden");
        collegeOptions.classList.add("hidden");
    }
}

// Toggle graduation/post-graduation options
function toggleDegreeOptions() {
    let degreeType = document.getElementById("degree").value;
    let graduationOptions = document.getElementById("graduation-options");
    let postGradOptions = document.getElementById("post-grad-options");

    if (degreeType === "graduation") {
        graduationOptions.classList.remove("hidden");
        postGradOptions.classList.add("hidden");
    } else if (degreeType === "post-graduation") {
        postGradOptions.classList.remove("hidden");
        graduationOptions.classList.add("hidden");
    } else {
        graduationOptions.classList.add("hidden");
        postGradOptions.classList.add("hidden");
    }
}

// Form validation and redirection to student dashboard
document.getElementById("student-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let education = document.getElementById("education").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    alert(`Welcome ${name}! You have registered as a ${education} student.`);

    // Redirect to student dashboard
    window.location.href = "studentdashborad.html";
});
