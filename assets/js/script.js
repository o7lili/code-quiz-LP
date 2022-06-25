// when start button is clicked, question and 4 answer choices appear from questions array
// if correct answer is chosen, "correct!" appears in answer-footer and next question/answer choices appear
// else "wrong!" appears in answer-footer, ten seconds are deducted from the timer, and next question/answer choices appear
// loop back through questions array until finished
// after last question answered, display score (time left) and form appears to enter initials for leader board
// when button is clicked to submit initials for high score, take to page displaying scores
// "view high scores" links to display leader board page

var timerEl = document.querySelector('.timer');
var scoresEl = document.querySelector('.high-scores');
var startBtn = document.getElementById('start-btn');
var answerBtns = document.querySelectorAll('.answer');

var questions = [
    {
        question: 'Commonly used data types DO Not Include:',
        answers: [
            {text: '1. string', correct: false},
            {text: '2. booleans', correct: false},
            {text: '3. alerts', correct: true},
            {text: '4. numbers', correct: false},
        ]
    }
]

startBtn.addEventListener('click', startQuiz);
// var correctEl = document.querySelector()  for when correct answer is clicked
// var wrongEl = document.querySelector()  for when wrong answer is clicked


function startQuiz() {
    console.log('started');
    startBtn.classList.add('hide');
    answerBtns.forEach(answer => {
        // remove class from each element
        answer.classList.remove('hide')
    });
    setNextQuestion();
}

function setNextQuestion() {

}

function selectAnswer() {

}