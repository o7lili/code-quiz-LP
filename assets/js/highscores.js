var quizBack = document.getElementById("back");
var clearScore = document.getElementById("clear");
var highScore = document.getElementById("high-score");

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
var scores = localStorage.getItem("scores");
scores = JSON.parse(scores);

if (scores !== null) {
    for (var i = 0; i < scores.length; i++) {
        var createOl = document.createElement("ol");
        createOl.textContent = scores[i].initials + "" + scores[i].score;
        createOl.setAttribute("id", "high-score")
        highScore.appendChild(createOl);
    }
}