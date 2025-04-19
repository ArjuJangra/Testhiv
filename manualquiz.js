let questionCount = 0;
let quizQuestions = [];
let editingIndex = null;

document.addEventListener("DOMContentLoaded", displayCreatedQuizzes);

function addQuestion() {
    questionCount++;

    let questionContainer = document.createElement("div");
    questionContainer.classList.add("question-box");
    questionContainer.setAttribute("id", `question-${questionCount}`);

    questionContainer.innerHTML = `
        <label>Question ${questionCount}:</label>
        <input type="text" class="question-input" placeholder="Enter question">

        <label>Options:</label>
        <input type="text" class="option-input" placeholder="Option 1">
        <input type="text" class="option-input" placeholder="Option 2">
        <input type="text" class="option-input" placeholder="Option 3">
        <input type="text" class="option-input" placeholder="Option 4">

        <button class="remove-btn" onclick="removeQuestion(${questionCount})">❌ Remove</button>
    `;

    document.getElementById("questions-container").appendChild(questionContainer);
}

function removeQuestion(questionId) {
    document.getElementById(`question-${questionId}`).remove();
}

function saveQuiz() {
    let quizTitle = document.getElementById("quiz-title").value.trim();
    if (!quizTitle) {
        alert("Please enter a quiz title.");
        return;
    }

    let questionElements = document.querySelectorAll(".question-box");
    if (questionElements.length === 0) {
        alert("Please add at least one question.");
        return;
    }

    quizQuestions = [];

    questionElements.forEach((box, index) => {
        let questionText = box.querySelector(".question-input").value.trim();
        let options = [...box.querySelectorAll(".option-input")].map(opt => opt.value.trim());

        if (!questionText || options.some(opt => !opt)) {
            alert(`Please fill in all fields for Question ${index + 1}`);
            return;
        }

        quizQuestions.push({
            question: questionText,
            options: options
        });
    });

    let quizzes = JSON.parse(localStorage.getItem("manualQuizzes")) || [];

    if (editingIndex !== null) {
        quizzes[editingIndex] = { title: quizTitle, questions: quizQuestions };
        editingIndex = null;
    } else {
        quizzes.push({ title: quizTitle, questions: quizQuestions });
    }

    localStorage.setItem("manualQuizzes", JSON.stringify(quizzes));

    alert("Quiz saved successfully!");
    document.getElementById("quiz-title").value = "";
    document.getElementById("questions-container").innerHTML = "";
    displayCreatedQuizzes();
}

// Function to Display Created Quizzes in Sidebar
function displayCreatedQuizzes() {
    let quizList = document.getElementById("quiz-list");
    quizList.innerHTML = "";

    let quizzes = JSON.parse(localStorage.getItem("manualQuizzes")) || [];
    
    if (quizzes.length === 0) {
        quizList.innerHTML = "<li>No quizzes created yet.</li>";
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
    let quizzes = JSON.parse(localStorage.getItem("manualQuizzes")) || [];
    let quiz = quizzes[index];

    document.getElementById("quiz-title").value = quiz.title;
    document.getElementById("questions-container").innerHTML = "";
    editingIndex = index;

    quiz.questions.forEach(() => addQuestion());
}

// Function to Delete a Quiz
function deleteQuiz(index) {
    let quizzes = JSON.parse(localStorage.getItem("manualQuizzes")) || [];
    quizzes.splice(index, 1);
    localStorage.setItem("manualQuizzes", JSON.stringify(quizzes));
    displayCreatedQuizzes();
}
