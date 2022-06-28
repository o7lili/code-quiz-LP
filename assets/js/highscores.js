var quizBack = document.getElementById("back");
var clearScore = document.getElementById("clear");

// go back to quiz page
quizBack.addEventListener("click", function() {
    window.location.replace("./index.html");
});

// clear high scores
clearScore.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// shows high scores
// var scores = localstorage.getItem("")