document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll(".category-option");
    const questionCountButtons = document.querySelectorAll(".question-option");
    const startButton = document.querySelector(".start-quiz-btn");

    const configContainer = document.querySelector(".config-container");
    const quizContainer = document.querySelector(".Quiz-container");
    const quizTitle = document.querySelector(".quiz-title");
    const quizQuestion = document.querySelector(".quiz-question");
    const quizOptions = document.querySelector(".quiz-options");
    const timerDisplay = document.querySelector(".time-duration");
    const nextBtn = document.querySelector(".next-btn");

    let selectedCategory = "Programming";
    let questionCount = 10;
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 15;

    const sampleQuestions = {
    Programming: [
        { question: "What does HTML stand for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "HighText Machine Language"], answer: 1 },
        { question: "Which language is used for styling web pages?", options: ["HTML", "JQuery", "CSS", "XML"], answer: 2 },
        { question: "Which is not a JavaScript framework?", options: ["Python Script", "JQuery", "Django", "NodeJS"], answer: 2 },
        { question: "Which symbol is used for comments in JavaScript?", options: ["//", "/*", "<!--", "#"], answer: 0 },
        { question: "What is the result of 3 + '3' in JS?", options: ["6", "33", "Error", "NaN"], answer: 1 },
        { question: "Which HTML tag is used to link JavaScript?", options: ["<js>", "<script>", "<javascript>", "<code>"], answer: 1 },
        { question: "What does CSS stand for?", options: ["Color Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"], answer: 2 },
        { question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], answer: 0 },
        { question: "How do you declare a variable in JavaScript?", options: ["var name;", "v name;", "variable name;", "dim name;"], answer: 0 },
        { question: "Which company developed JavaScript?", options: ["Mozilla", "Google", "Netscape", "Microsoft"], answer: 2 }
    ],
    Geography: [
        { question: "What is the capital of France?", options: ["Rome", "Madrid", "Paris", "Berlin"], answer: 2 },
        { question: "Which ocean is the largest?", options: ["Atlantic", "Arctic", "Indian", "Pacific"], answer: 3 },
        { question: "Mount Everest is located in?", options: ["India", "China", "Nepal", "Bhutan"], answer: 2 },
        { question: "Which is the longest river?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1 },
        { question: "Which country has the most population?", options: ["India", "USA", "China", "Brazil"], answer: 2 },
        { question: "Sahara is a?", options: ["Forest", "Mountain", "River", "Desert"], answer: 3 },
        { question: "Which continent has the most countries?", options: ["Asia", "Europe", "Africa", "South America"], answer: 2 },
        { question: "Which country is known as the Land of the Rising Sun?", options: ["Japan", "China", "India", "Thailand"], answer: 0 },
        { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: 2 },
        { question: "Which country has the most islands?", options: ["Indonesia", "Canada", "Sweden", "Philippines"], answer: 2 }
    ],
    Mathematics: [
        { question: "What is 7 * 8?", options: ["54", "56", "48", "58"], answer: 1 },
        { question: "√144 equals?", options: ["10", "12", "14", "16"], answer: 1 },
        { question: "What is 9²?", options: ["81", "72", "90", "79"], answer: 0 },
        { question: "What is the value of π?", options: ["3.14", "3.15", "3.16", "3.17"], answer: 0 },
        { question: "Which is a prime number?", options: ["9", "15", "17", "21"], answer: 2 },
        { question: "What is 25% of 200?", options: ["40", "50", "45", "60"], answer: 1 },
        { question: "What is the perimeter of a square with side 5?", options: ["25", "10", "20", "15"], answer: 2 },
        { question: "What is 3/4 as a decimal?", options: ["0.25", "0.5", "0.75", "1"], answer: 2 },
        { question: "What comes after 999?", options: ["1000", "9999", "100", "900"], answer: 0 },
        { question: "Solve: 8 + (6 × 2)", options: ["20", "28", "18", "16"], answer: 0 }
    ],
    Entertainment: [
        { question: "Who directed 'Titanic'?", options: ["James Cameron", "Spielberg", "Nolan", "Tarantino"], answer: 0 },
        { question: "What is the name of Harry Potter's owl?", options: ["Errol", "Crookshanks", "Hedwig", "Scabbers"], answer: 2 },
        { question: "Which is a Marvel superhero?", options: ["Batman", "Superman", "Iron Man", "Wonder Woman"], answer: 2 },
        { question: "Which singer is known as the 'Queen of Pop'?", options: ["Adele", "Madonna", "Taylor Swift", "Rihanna"], answer: 1 },
        { question: "Who is the lead actor in 'Mission Impossible'?", options: ["Tom Hanks", "Tom Cruise", "Brad Pitt", "Matt Damon"], answer: 1 },
        { question: "What is the name of the kingdom in 'Frozen'?", options: ["Arendelle", "Narnia", "Genovia", "Asgard"], answer: 0 },
        { question: "Which movie features 'Infinity Stones'?", options: ["Avengers", "Justice League", "X-Men", "Batman"], answer: 0 },
        { question: "Who is Mickey Mouse's girlfriend?", options: ["Daisy", "Minnie", "Elsa", "Anna"], answer: 1 },
        { question: "Which K-pop band released 'Butter'?", options: ["BTS", "EXO", "Blackpink", "Twice"], answer: 0 },
        { question: "Which game has the character 'Mario'?", options: ["Minecraft", "Roblox", "Super Mario", "Fortnite"], answer: 2 }
    ]
};


    // Selection
    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedCategory = btn.textContent;
        });
    });

    questionCountButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            questionCountButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            questionCount = parseInt(btn.textContent);
        });
    });

    startButton.addEventListener("click", () => {
        configContainer.style.display = "none";
        quizContainer.style.display = "block";
        startQuiz();
    });

    function startQuiz() {
        const questions = sampleQuestions[selectedCategory].slice(0, questionCount);
        runQuestion(questions);
    }

    function runQuestion(questions) {
        if (currentQuestionIndex >= questions.length) {
            return endQuiz();
        }

        let current = questions[currentQuestionIndex];
        quizQuestion.textContent = current.question;
        quizOptions.innerHTML = "";

        current.options.forEach((opt, index) => {
            const btn = document.createElement("button");
            btn.textContent = opt;
            btn.classList.add("option-btn");
            btn.style.margin = "10px";
            btn.style.padding = "10px";
            btn.style.border = "1px solid #5145BA";
            btn.style.borderRadius = "5px";
            btn.style.cursor = "pointer";
            btn.addEventListener("click", () => {
                clearInterval(timer);
                document.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
                if (index === current.answer) {
                    btn.style.backgroundColor = "#a2f3b7";
                    score++;
                } else {
                    btn.style.backgroundColor = "#f3a2a2";
                }
                nextBtn.style.display = "block";
            });
            quizOptions.appendChild(btn);
        });

        nextBtn.onclick = () => {
            currentQuestionIndex++;
            nextBtn.style.display = "none";
            startTimer();
            runQuestion(questions);
        };

        startTimer();
    }

    function startTimer() {
        timeLeft = 15;
        timerDisplay.textContent = `${timeLeft}s`;
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `${timeLeft}s`;
            if (timeLeft === 0) {
                clearInterval(timer);
                nextBtn.style.display = "block";
                document.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
            }
        }, 1000);
    }

    function endQuiz() {
        quizContainer.innerHTML = `
            <div class="result">
                <h2>Quiz Completed!</h2>
                <p>Your Score: ${score}/${questionCount}</p>
                <button onclick="location.reload()">Restart Quiz</button>
            </div>
        `;
    }
});
const quitBtn = document.querySelector('.quit-btn');
quitBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to quit the quiz?")) {
    document.querySelector('.Quiz-container').style.display = 'none';
    document.querySelector('.config-container').style.display = 'block';
    clearInterval(timer); // stop timer if any
    currentQuestion = 0;
    score = 0;
    selectedCategory = "";
    selectedQuestions = [];
  }
});


