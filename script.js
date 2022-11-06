let score = 0;
let questionsIndex = 0;
let startTime = 100;
let pauseInterval = 0;
let timeSubtraction = 10;
const timeLeft = document.getElementById("remainingTime");
const timer = document.getElementById("timer");
const questionsContainer = document.getElementById("questionsContainer");
const wrapper = document.getElementById("content");
const createUl = document.createElement("ul");
const multiChoiceQuestions = [{
        question: "Where should a .JS file be linked on an HTML document?",
        multipleChoices: ["A. At the top in a <link>", "B. Anywhere in the document", "C. At the bottom wrapped in a <script>", "D. Embedded in the metadata"],
        answer: "C. At the bottom wrapped in a <script>"
    },
    {
        question: "What does the .pop method do?",
        multipleChoices: ["A. Adds an element to the end of an array", "B. Removes an element from the end of an array", "C. Adds an element to the beginning of an array", "D. Removes an element from the beginning of an array"],
        answer: "B. Removes an element from the end of an array"
    },
    {
        question: "What does DOM stand for?",
        multipleChoices: ["A. Dudes On Meth", "B. Dormant Oriented Model", "C. Don't Order Many", "D. Document Object Model"],
        answer: "D. Document Object Model"
    },
    {
        question: "How do you name a variable that you plan to change or manipulate?",
        multipleChoices: ["A. Let", "B. Const", "C. This", "D. For"],
        answer: "A. Let"
    },
    {
        question: "Which of these data types are not represented in a .JS file?",
        multipleChoices: ["A. Boolean", "B. String", "C. Currency", "D. Integer"],
        answer: "C. Currency"
    },
    {
        question: "Which of these would correctly log 'Hello World'?",
        multipleChoices: ["A. Hello World.console", "B. 'Hello World'.console.log", "log.console('Hello Wold')", "D. console.log('Hello World')"],
        answer: "D. console.log('Hello World')"
    },
    {
        question: "What does the abbreviation NaN stand for?",
        multipleChoices: ["A. Not a Noob", "B. Notation area Allowance", "C. Not a Number", "D. Needs attention Now"],
        answer: "C. Not a Number"
    },
];
// Event listener to start timer, and display questions
timer.addEventListener("click", function() {
    if (pauseInterval === 0) {
        pauseInterval = setInterval(function() {
            startTime--;
            timeLeft.textContent = "Time: " + startTime;
            if (startTime <= 0) {
                clearInterval(pauseInterval);
                completed();
                timeLeft.textContent = "You are out of Time!";
            }
        }, 1000);
    }
    display(questionsIndex);
});
// Displays questions and answers
function display(questionsIndex) {
    questionsContainer.innerHTML = "";
    createUl.innerHTML = "";
    for (var i = 0; i < multiChoiceQuestions.length; i++) {
        let userQuestions = multiChoiceQuestions[questionsIndex].question;
        var userAnswers = multiChoiceQuestions[questionsIndex].multipleChoices;
        questionsContainer.textContent = userQuestions;
    }
    userAnswers.forEach(function(nextQuestion) {
        let listItem = document.createElement("li");
        listItem.textContent = nextQuestion;
        questionsContainer.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (questionGrade));
    })
};
// Grades choices with answers
function questionGrade(event) {
    let element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.id = "createDiv";
        if (element.textContent == multiChoiceQuestions[questionsIndex].answer) {
            score++;
            createDiv.textContent = "That is Correct!   " + multiChoiceQuestions[questionsIndex].answer;
        } else {
            startTime = startTime - timeSubtraction;
            createDiv.textContent = "Sorry, that is Wrong! The correct answer is: " + multiChoiceQuestions[questionsIndex].answer;
        }
    }
    // Keeps track of which question user is on, knowing when to know when to end
    questionsIndex++;
    if (questionsIndex >= multiChoiceQuestions.length) {
        completed();
    } else {
        display(questionsIndex);
    }
    questionsContainer.appendChild(createDiv);
};
// records initials and saved score
function completed() {
    questionsContainer.innerHTML = "";
    timeLeft.innerHTML = "";
    const createH1 = document.createElement("h1");
    createH1.id = "createH1";
    createH1.textContent = "Completed!"
    questionsContainer.appendChild(createH1);
    const createP = document.createElement("p");
    createP.id = "createP";
    questionsContainer.appendChild(createP);
    // Converts time remaining into score
    if (startTime >= 0) {
        var timeRemaining = startTime;
        const createP2 = document.createElement("p");
        clearInterval(pauseInterval);
        createP.textContent = "Final Score: " + timeRemaining;
        questionsContainer.appendChild(createP2);
    }
    const infoPrompt = document.createElement("label");
    infoPrompt.id = "createLabel";
    infoPrompt.textContent = "Enter your initials: ";
    questionsContainer.appendChild(infoPrompt);
    // Input initials
    const userInitials = document.createElement("input");
    userInitials.type = "text";
    userInitials.id = "initials";
    userInitials.textContent = "";
    questionsContainer.appendChild(userInitials);
    // Submit score and initials
    const saveInfo = document.createElement("button");
    saveInfo.type = "submit";
    saveInfo.id = "Submit";
    saveInfo.textContent = "Submit";
    questionsContainer.appendChild(saveInfo);
    // Stores initials/score in local storage
    saveInfo.addEventListener("click", function() {
        var initials = userInitials.value;
        if (initials === "") {
            console.log("Please enter your initials");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining 
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("scoring.html");
        }
    })
};