document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.getElementById("quiz-form");
    const quizTitleInput = document.getElementById("quiz-title");
    const quizDifficultyInput = document.getElementById("quiz-difficulty");
    const createdQuizzesList = document.getElementById("created-quizzes-list");

    // Sample quizzes for demo
    let createdQuizzes = [
        { title: "C++ Basics", difficulty: "Easy" },
        { title: "Python Data Science", difficulty: "Medium" }
    ];

    // Function to display created quizzes
    function displayCreatedQuizzes() {
        createdQuizzesList.innerHTML = "";
        createdQuizzes.forEach((quiz, index) => {
            const quizElement = document.createElement("div");
            quizElement.classList.add("created-quiz");
            quizElement.innerHTML = `
                <h4>${quiz.title}</h4>
                <p>Difficulty: ${quiz.difficulty}</p>
                <button class="view-quiz-btn" onclick="viewQuiz(${index})">View Quiz</button>
            `;
            createdQuizzesList.appendChild(quizElement);
        });
    }

    // Function to create a new quiz and navigate to manualquiz.html
    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const newQuiz = {
            title: quizTitleInput.value,
            difficulty: quizDifficultyInput.value
        };
        createdQuizzes.push(newQuiz);
        displayCreatedQuizzes();
        quizTitleInput.value = "";
        quizDifficultyInput.value = "Easy";  // Reset difficulty to default value

        // Redirect to manualquiz.html after quiz creation
        window.location.href = 'manualquiz.html'; // Navigate to manualquiz.html
    });

    // Function to view a quiz (this could be enhanced with more functionality)
    window.viewQuiz = function (index) {
        // You can replace this alert with your actual logic for displaying the quiz
        alert(`Opening quiz: ${createdQuizzes[index].title}`);
    };

    // Initial display of created quizzes
    displayCreatedQuizzes();
});
