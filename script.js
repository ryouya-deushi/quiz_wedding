const questions = [
    {
        question: "日本の首都はどこですか？",
        answers: ["大阪", "東京", "京都", "札幌"],
        correctAnswer: "東京"
    },
    {
        question: "2 + 2 はいくつですか？",
        answers: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    // 他の質問を追加できます
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;
    const answerButtons = document.querySelectorAll(".answer-btn");
    answerButtons.forEach((button, index) => {
        button.textContent = question.answers[index];
        button.onclick = () => checkAnswer(question.answers[index]);
    });
}

function checkAnswer(selectedAnswer) {
    const question = questions[currentQuestionIndex];
    if (selectedAnswer === question.correctAnswer) {
        alert("正解です！");
    } else {
        alert("不正解です...");
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert("クイズが終了しました！");
    }
}

loadQuestion();
