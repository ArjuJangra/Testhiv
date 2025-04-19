document.addEventListener("DOMContentLoaded", displayCreatedQuizzes);

function generateQuiz() {
    let topic = document.getElementById("quiz-topic").value.trim();
    let numQuestions = parseInt(document.getElementById("num-questions").value);

    if (!topic || numQuestions < 1 || numQuestions > 20) {
        alert("Please enter a valid topic and number of questions (1-20).");
        return;
    }

    let quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h2>Generated Quiz: ${topic}</h2>`;

    for (let i = 1; i <= numQuestions; i++) {
        let questionBox = document.createElement("div");
        questionBox.classList.add("question-box");

        questionBox.innerHTML = `
            <label>Question ${i}:</label>
            <input type="text" class="question-input" value="What is ${topic} Question ${i}?">

            <label>Options:</label>
            <input type="text" class="option-input" value="Option A">
            <input type="text" class="option-input" value="Option B">
            <input type="text" class="option-input" value="Option C">
            <input type="text" class="option-input" value="Option D">
        `;

        quizContainer.appendChild(questionBox);
    }

    document.getElementById("save-btn").style.display = "block";
}

function saveQuiz() {
    let topic = document.getElementById("quiz-topic").value.trim();
    let questionElements = document.querySelectorAll(".question-box");

    let quizQuestions = [];

    questionElements.forEach((box, index) => {
        let questionText = box.querySelector(".question-input").value.trim();
        let options = [...box.querySelectorAll(".option-input")].map(opt => opt.value.trim());

        quizQuestions.push({
            question: questionText,
            options: options
        });
    });

    let quizzes = JSON.parse(localStorage.getItem("aiQuizzes")) || [];
    quizzes.push({ title: topic, questions: quizQuestions });

    localStorage.setItem("aiQuizzes", JSON.stringify(quizzes));

    alert("Quiz saved successfully!");
    document.getElementById("quiz-topic").value = "";
    document.getElementById("num-questions").value = "";
    document.getElementById("quiz-container").innerHTML = "";
    document.getElementById("save-btn").style.display = "none";

    displayCreatedQuizzes();
}

// Function to Display Created Quizzes in Sidebar
function displayCreatedQuizzes() {
    let quizList = document.getElementById("quiz-list");
    quizList.innerHTML = "";

    let quizzes = JSON.parse(localStorage.getItem("aiQuizzes")) || [];
    
    if (quizzes.length === 0) {
        quizList.innerHTML = "<li>No AI-generated quizzes yet.</li>";
        return;
    }

    quizzes.forEach((quiz, index) => {
        let quizItem = document.createElement("li");
        quizItem.classList.add("quiz-item");
        quizItem.textContent = quiz.title;
        quizItem.onclick = () => loadQuiz(index);
        quizList.appendChild(quizItem);
    });
}

// Function to Load a Quiz for Editing
function loadQuiz(index) {
    let quizzes = JSON.parse(localStorage.getItem("aiQuizzes")) || [];
    let quiz = quizzes[index];

    document.getElementById("quiz-topic").value = quiz.title;
    document.getElementById("quiz-container").innerHTML = "";
    
    quiz.questions.forEach((_, i) => generateQuiz()); // Simulate filling the form
}
