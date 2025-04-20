document.addEventListener("DOMContentLoaded", displayCreatedQuizzes);

async function generateQuiz() {
    const topic = document.getElementById("quiz-topic").value.trim();
    const numQuestions = parseInt(document.getElementById("num-questions").value);
    const quizContainer = document.getElementById("quiz-container");

    if (!topic || numQuestions < 1 || numQuestions > 20) {
        alert("Please enter a valid topic and number of questions (1-20).");
        return;
    }

    quizContainer.innerHTML = "<p>🧠 Generating quiz using AI...</p>";

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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",  // Replace with your API key
                "HTTP-Referer": "http://localhost:5500"   // Replace with your actual domain or local URL
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [{
                    role: "user",
                    content: `Create a ${numQuestions}-question multiple-choice quiz on the topic "${topic}". Each question must have 4 options and one correct answer. Format as JSON array: [{question: "", options: ["", "", "", ""], answerIndex: 0}]`
                }],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const quizData = JSON.parse(data.choices[0].message.content);

        quizContainer.innerHTML = `<h2>Generated Quiz: ${topic}</h2>`;

        quizData.forEach((q, i) => {
            let box = document.createElement("div");
            box.classList.add("question-box");
            box.innerHTML = `
                <label>Question ${i + 1}:</label>
                <input type="text" class="question-input" value="${q.question}">
                <label>Options:</label>
                <input type="text" class="option-input" value="${q.options[0]}">
                <input type="text" class="option-input" value="${q.options[1]}">
                <input type="text" class="option-input" value="${q.options[2]}">
                <input type="text" class="option-input" value="${q.options[3]}">
            `;
            quizContainer.appendChild(box);
        });

        document.getElementById("save-btn").style.display = "block";

    } catch (error) {
        console.error("AI Quiz Generation Error:", error);
        alert("❌ AI quiz generation failed. Please try again later.");
        quizContainer.innerHTML = "";
    }
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

    alert("✅ Quiz saved successfully!");
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

    quiz.questions.forEach((q, i) => {
        let box = document.createElement("div");
        box.classList.add("question-box");
        box.innerHTML = `
            <label>Question ${i + 1}:</label>
            <input type="text" class="question-input" value="${q.question}">
            <label>Options:</label>
            <input type="text" class="option-input" value="${q.options[0]}">
            <input type="text" class="option-input" value="${q.options[1]}">
            <input type="text" class="option-input" value="${q.options[2]}">
            <input type="text" class="option-input" value="${q.options[3]}">
        `;
        document.getElementById("quiz-container").appendChild(box);
    });

    document.getElementById("save-btn").style.display = "block";
}
