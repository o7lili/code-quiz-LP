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

scores.sort(function(a, b) {return b-a});
let lowest = scores[0];

if (scores !== null) {
    for (var i = 0; i < scores.length; i++) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "high-score")
        highScore.appendChild(createDiv);

        var createLi = document.createElement("li");
        createLi.textContent = scores[i].initials + "" + scores[i].score;
        createLi.setAttribute("id", "score-item");
        createDiv.appendChild(createLi);
    }
}