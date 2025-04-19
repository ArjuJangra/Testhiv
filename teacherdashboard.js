document.addEventListener("DOMContentLoaded", () => {
    loadCreatedQuizzes();
});

function createQuiz(type) {
    let quizName = prompt("Enter the Quiz Title:");
    if (!quizName) return;

    let newQuiz = {
        title: quizName,
        type: type === "ai" ? "AI-Generated" : "Manually Created",
        id: Date.now(),
    };

    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.push(newQuiz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    loadCreatedQuizzes();
}

function loadCreatedQuizzes() {
    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    let quizContainer = document.getElementById("created-quizzes-list");

    quizContainer.innerHTML = "";
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

function viewQuiz(quizId) {
    alert("Viewing Quiz ID: " + quizId);
}
