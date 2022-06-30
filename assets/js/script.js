var timerEl = document.querySelector('.timer');
var currentQuestionIndex = 0;
var secondsLeft = 80;
var scoresEl = document.querySelector('.high-scores');
var startBtn = document.getElementById('start-btn');
var answerBtnsEl = document.getElementById('answer-btns');
var answerBtns = document.querySelectorAll('.answer');
var submitBtn = document.getElementById('submit-btn');
var cardInfo = document.getElementById('card-info');
var quizInfo = document.getElementById('quiz-instructions');
var questionEl = document.getElementById('card-header');
var finalScore = document.getElementById('final-score');
var answerConfirm = document.getElementById('correct-wrong');
var timeInterval;

// questions/answer choices array
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


// click event listeners
startBtn.addEventListener('click', function() {
    countdown();
    startQuiz(currentQuestionIndex);
});
answerBtnsEl.addEventListener('click', function() {
    currentQuestionIndex++;
    setNextQuestion();
});

// quiz starts when start button is clicked
function startQuiz() {
    startBtn.classList.add('hide');
    quizInfo.classList.add('hide');
    
    // loop through questions array
    for (var i = 0; i < questions.length; i++) {
        var questionTitle = questions[currentQuestionIndex].question;
        var questionAnswers = questions[currentQuestionIndex].answers;
        
        questionEl.textContent = questionTitle
    }

    answerBtns.forEach(answer => {
        // makes hidden answer elements visible
        answer.classList.remove('hide')
    });
    setNextQuestion();
};


//for chosen answer, checks if correct or wrong to trigger "Correct!" or "Wrong!" card footer
function selectAnswer(e) {
    var selectedBtn = e.target;
    var correct = selectedBtn.dataset.correct;
    setStatusClass(document.body, correct);
};

function endQuiz() {
    // stops timer countdown
    clearInterval(timeInterval);
    
    timerEl.textContent = secondsLeft;
    
    // clears questions/answers and brings up enter high score card elements
    questionEl.classList.add('hide');
    answerBtnsEl.classList.add('hide');
    finalScore.classList.remove('hide');
    answerConfirm.classList.add('hide');
    
    // indicates to use the quiz is over
    var finalH1 = document.createElement("h1");
    finalH1.setAttribute("id", "finalH1");
    finalH1.textContent = "All done!";
    
    finalScore.appendChild(finalH1);
    
    // shows final score (time left)
    var finalP = document.createElement("p");
    finalP.setAttribute("id", "finalP");
    
    finalScore.appendChild(finalP);
    
    // adds secondsLeft to final score
    if(secondsLeft >= 0) {
        var finalP2 = document.createElement("p");
        finalP2.textContent = "Your final score is " + secondsLeft;
        finalScore.appendChild(finalP2);
    };
    
    // label for form
    var formLabel = document.createElement("label");
    formLabel.setAttribute("for", "initials");
    formLabel.textContent = "Enter Initials: ";
    
    finalScore.appendChild(formLabel);
    
    // form to submit initials/score
    var scoreForm = document.createElement("input");
    scoreForm.setAttribute("id", "scoreForm");
    scoreForm.setAttribute("type", "text");
    scoreForm.setAttribute("name", "initials");
    
    finalScore.appendChild(scoreForm);
    
    // submit button
    var submitButton = document.createElement("button");
    submitButton.setAttribute("id", "submit-btn");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("class", "submit-btn btn");
    submitButton.textContent = "Submit";
    
    finalScore.appendChild(submitButton);
    
    // add score to local storage
    submitButton.addEventListener("click", function() {
        var initials = scoreForm.value;
        
        if (!initials) {
            alert("Please enter your initials");
        }
        else {
            var finalScore = {
                initials: initials,
                score: secondsLeft,
            }
            var scores = localStorage.getItem("scores");
            if (scores === null) {
                scores = [];
            }
            else {
                scores = JSON.parse(scores);
            }
            scores.push(finalScore);
            var newScore = JSON.stringify(scores);
            localStorage.setItem("scores", newScore);
            
            //take user to high score page
            window.location.replace("./highscores.html");
        }
    });
    
};

// ends quiz and alerts user they ran out of time, gives them option to try again
function timeOut() {
    resetState();
    cardInfo.classList.add('hide');
    answerConfirm.classList.add('hide');
    alert("You ran out of time!")
    startBtn.classList.remove('hide');
    startBtn.textContent = "Try Again?"

    eventTarget = startBtn;
    eventTarget.addEventListener("click", function(e) {
        window.location.reload();
    });
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
        secondsLeft = secondsLeft - 10;
    }
};

// start timer countdown
function countdown() {
    timeInterval = setInterval( function () {
        if(secondsLeft <= 0) {
            secondsLeft = 0;
            clearInterval(timeInterval);
            timeOut();
        } else {
            secondsLeft--;
        }
        timerEl.textContent = secondsLeft;
        
    }, 1000);
};


// sets up page for next question
function setNextQuestion() {
    resetState();
    // checks if more questions in array
    if (currentQuestionIndex > questions.length - 1) {
        endQuiz();
        return;
    }
    showQuestion(questions[currentQuestionIndex]);
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


