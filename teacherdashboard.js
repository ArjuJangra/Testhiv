document.addEventListener("DOMContentLoaded", function () {
    // Retrieve teacher's name and department from localStorage
    let teacherName = localStorage.getItem("teacherName");
    let teacherDepartment = localStorage.getItem("teacherDepartment") || "Unknown Department"; // Default to "Unknown Department"

    // If a teacher is logged in, display their name and department
    if (teacherName) {
        document.getElementById("teacher-name").innerText = teacherName;
        document.getElementById("teacher-department").innerText = teacherDepartment;
    } else {
        // If no name is found, use default values
        document.getElementById("teacher-name").innerText = "Guest Teacher";
        document.getElementById("teacher-department").innerText = "Unknown Department";
    }

    // Function to create a new quiz
    function createQuiz(type) {
        let quizName = prompt("Enter the Quiz Title:");
        if (!quizName) return;

        // Save quiz details in localStorage (optional)
        let newQuiz = {
            title: quizName,
            type: type === "ai" ? "AI-Generated" : "Manually Created",
            id: Date.now(),
        };

        let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        quizzes.push(newQuiz);
        localStorage.setItem("quizzes", JSON.stringify(quizzes));

        // Redirect to appropriate quiz creation page
        if (type === "manual") {
            window.location.href = "manualquiz.html"; // Redirect to manual quiz page
        } else if (type === "ai") {
            window.location.href = "aiquiz.html"; // Redirect to AI quiz page
        }
    }

    // Function to load created quizzes from localStorage
    function loadCreatedQuizzes() {
        let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        let quizContainer = document.getElementById("created-quizzes-list");

        quizContainer.innerHTML = ""; // Clear the list first

        if (quizzes.length === 0) {
            quizContainer.innerHTML = "<p>No quizzes created yet.</p>";
            return;
        }

        quizzes.forEach((quiz) => {
            let quizElement = document.createElement("div");
            quizElement.classList.add("created-quiz");
            quizElement.innerHTML = `
                <h3>${quiz.title}</h3>
                <p>Type: ${quiz.type}</p>
                <button class="view-quiz-btn" onclick="viewQuiz(${quiz.id})">View Quiz</button>
            `;
            quizContainer.appendChild(quizElement);
        });
    }

    // Function to simulate viewing a quiz (this can be replaced with real functionality)
    function viewQuiz(quizId) {
        alert("Viewing Quiz ID: " + quizId);
    }

    // Load created quizzes when the page loads
    loadCreatedQuizzes();

    // Logout function
    window.logout = function () {
        localStorage.clear(); // Clear all stored data
        window.location.href = "index.html"; // Redirect to login page
    };
});
