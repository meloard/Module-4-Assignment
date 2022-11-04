var clearBtn = document.getElementById("clearScores");
var retakeBtn = document.getElementById("startOver");
var highScoreBtn = document.getElementById("highscore");

// Clear scoring
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});
// Begin quiz over again
retakeBtn.addEventListener("click", function() {
    window.location.replace("index.html");
});
// finds stored scores and displays
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);
if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScoreBtn.appendChild(createLi);
    }
}