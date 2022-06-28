// when start button is clicked, question and 4 answer choices appear from questions array
// if correct answer is chosen, "correct!" appears in answer-footer and next question/answer choices appear
// else "wrong!" appears in answer-footer, ten seconds are deducted from the timer, and next question/answer choices appear
// loop back through questions array until finished
// after last question answered, display score (time left) and form appears to enter initials for leader board
// when button is clicked to submit initials for high score, take to page displaying scores
// "view high scores" links to display leader board page

var timerEl = document.querySelector('.timer');
var secondsLeft = 80;
var scoresEl = document.querySelector('.high-scores');
var startBtn = document.getElementById('start-btn');
var quizInfo = document.getElementById('quiz-instructions');
var answerBtns = document.querySelectorAll('.answer');
var questionEl = document.getElementById('card-header');
var answerBtnsEl = document.getElementById('answer-btns');
var finalScore = document.getElementById('final-score');
var answerConfirm = document.getElementById('correct-wrong');
var submitBtn = document.getElementById('submit-btn');
var scoreText = document.getElementById('score');

var questions = [
    {
        question: 'Commonly used data types DO Not Include:',
        answers: [
            {text: '1. string', correct: false},
            {text: '2. booleans', correct: false},
            {text: '3. alerts', correct: true},
            {text: '4. numbers', correct: false},
        ]
    },

    {
        question: 'The condition in an if/else statement is enclosed with _____.',
        answers: [
            {text: '1. quotes', correct: false},
            {text: '2. curly brackets', correct: false},
            {text: '3. parenthesis', correct: true},
            {text: '4. square brackets', correct: false},
        ]
    },
    
    {
        question: 'Arrays in JavaScript can be used to store _____.',
        answers: [
            {text: '1. numbers and strings', correct: false},
            {text: '2. other arrays', correct: false},
            {text: '3. booleans', correct: false},
            {text: '4. all of the above', correct: true},
        ]
    },

    {
        question: 'String values must be enclosed within _____ when being assigned to variables',
        answers: [
            {text: '1. commas', correct: false},
            {text: '2. curly brackets', correct: false},
            {text: '3. quotes', correct: true},
            {text: '4. parenthesis', correct: false},
        ]
    },

    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            {text: '1. JavaScript', correct: false},
            {text: '2. terminal/bash', correct: false},
            {text: '3. for loops', correct: false},
            {text: '4. console.log', correct: true},
        ]
    },
];

let randomQuestions, currentQuestionIndex

// start timer countdown
function countdown() {
    var timeInterval = setInterval( function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
};

startBtn.addEventListener('click', startQuiz);
answerBtnsEl.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

// quiz starts when start button is clicked
function startQuiz() {
    countdown();
    console.log('started');
    startBtn.classList.add('hide');
    randomQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    quizInfo.classList.add('hide');
    answerBtns.forEach(answer => {
        // remove class from each element
        answer.classList.remove('hide')
    });
    setNextQuestion();
};

// sets up page for next question
function setNextQuestion() {
    resetState();
    showQuestion(randomQuestions[currentQuestionIndex]);
};

// resets page to not show answer choice placeholders from HTML file
function resetState() {
    while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild(answerBtnsEl.firstChild);
    };
};

// brings up next question when an answer is chosen
function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerBtnsEl.appendChild(button);
    });
};

//for chosen answer, checks if correct or wrong to trigger "Correct!" or "Wrong!" card footer
function selectAnswer(e) {
    var selectedBtn = e.target;
    var correct = selectedBtn.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerBtnsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    // brings up next question if there are more left in the questions array
    if (randomQuestions.length > currentQuestionIndex + 1) {
       setNextQuestion();
    }
    // brings up submit high score card if no questions left in array
    else {
        questionEl.classList.add('hide');
        answerBtnsEl.classList.add('hide');
        finalScore.classList.remove('hide');
        answerConfirm.classList.add('hide');
        submitBtn.classList.remove('hide');
        scoreText.innerHTML = "Your final score is " + timerEl + "."; 
    };
};

// trigger function for correct or wrong card footer note
function setStatusClass(element, correct) {
    if (correct) {
        answerConfirm.innerHTML = "Correct!";
        element.classList.add('correct');
    }
    else {
        answerConfirm.innerHTML = "Wrong!";
        element.classList.add('wrong');
    }
};

