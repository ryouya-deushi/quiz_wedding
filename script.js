const quizData = [
    {
        question: "日本の首都はどこですか？",
        a: "大阪",
        b: "京都",
        c: "東京",
        d: "名古屋",
        correct: "c"
    },
    {
        question: "富士山の高さはどれくらいですか？",
        a: "3,776メートル",
        b: "2,500メートル",
        c: "4,000メートル",
        d: "3,000メートル",
        correct: "a"
    },
    {
        question: "日本の国花は何ですか？",
        a: "桜",
        b: "梅",
        c: "菊",
        d: "椿",
        correct: "a"
    }
];

const quiz = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    quiz.innerHTML = `
        <div class="question">${currentQuizData.question}</div>
        <label>
            <input type="radio" name="answer" value="a">
            ${currentQuizData.a}
        </label>
        <label>
            <input type="radio" name="answer" value="b">
            ${currentQuizData.b}
        </label>
        <label>
            <input type="radio" name="answer" value="c">
            ${currentQuizData.c}
        </label>
        <label>
            <input type="radio" name="answer" value="d">
            ${currentQuizData.d}
        </label>
    `;
}

function getSelected() {
    const answers = document.querySelectorAll('input[name="answer"]');
    let answer;
    answers.forEach(ans => {
        if (ans.checked) {
            answer = ans.value;
        }
    });
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = "クイズが終了しました。お疲れ様でした！";
        }
    }
});

loadQuiz();
