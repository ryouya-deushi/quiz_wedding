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
const results = document.getElementById('results');

let currentQuiz = 0;
let score = 0;
let quizResults = [];

function loadQuiz() {
    if (currentQuiz < quizData.length) {
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
    } else {
        submitBtn.disabled = true; // 送信ボタンを無効化
        fetch('https://script.google.com/macros/s/AKfycbxSgR3VKzuCbs_5tdKgiSDn7rlZETGInNlxcYHe9fxQY48_mZqLSS-fWLcQiDggmIrZ/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quizResults)
        })
        .then(response => response.text())
        .then(data => {
            quiz.innerHTML = `クイズが終了しました。お疲れ様でした！<br>あなたのスコアは ${score}/${quizData.length} です。`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
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
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        quizResults.push({
            question: quizData[currentQuiz].question,
            answer: answer
        });
        currentQuiz++;
        loadQuiz();
    }
});

loadQuiz();
