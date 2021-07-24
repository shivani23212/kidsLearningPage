const problemElement = document.querySelector(".problem");
const entryForm = document.querySelector("#entry-form");
const entryField = document.querySelector(".entry-field");
const pointsNeeded = document.querySelector("#points-needed");
const mistakesAllowed = document.querySelector("#mistakes-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMsg = document.querySelector(".endMsg");
const resetBtn = document.querySelector(".resetButton");

let state = {
    score: 0,
    wrongAns: 0
}

// creates new sum
function updateProblem() {
    state.currentProblem = generateProblem();
    problemElement.innerHTML = `${state.currentProblem.number1} ${state.currentProblem.operator} ${state.currentProblem.number2}`;
    entryField.value="";
    entryField.focus();
}

function generateNumber(max) {
    return Math.floor(Math.random()*(max+1));
}

// randomly generates components of new sum
function generateProblem() {
    return {
        number1: generateNumber(10),
        number2: generateNumber(10),
        operator: ['+', '-', 'x'][generateNumber(2)]
    }
}

function resetGame() {
    updateProblem();
    state.score = 0;
    state.wrongAns = 0;
    pointsNeeded.textContent = 10;
    mistakesAllowed.textContent = 2;
    renderProgressBar();
    document.body.classList.remove("overlay-is-open");  
}

// checks if user wins or loses
function checkLogic() {
    if (state.score === 10) {
        endMsg.textContent = "Congradululuations, you won!1!!11 :)";
        document.body.classList.add("overlay-is-open");
        setTimeout(() => {resetBtn.focus()}, 331);
    }
    else if (state.wrongAns === 3) {
        endMsg.textContent = "Sorry, you made 3 mistakes and lost.";
        document.body.classList.add("overlay-is-open");   
        setTimeout(() => {resetBtn.focus()}, 331); 
    }
}

resetBtn.addEventListener("click", resetGame);

function handleSubmit(event) {
    event.preventDefault(); // stops page reloading on button click / enter of form

    let correctAns;
    const currProb = state.currentProblem;
    if (state.currentProblem.operator === "+") {
        correctAns = currProb.number1 + currProb.number2;
    } else if (currProb.operator === "-") {
        correctAns = currProb.number1 - currProb.number2;
    } else if (currProb.operator === "x") {
        correctAns = currProb.number1 * currProb.number2;
    }

    if (parseInt(entryField.value, 10) === correctAns) { // if user get q correct
        state.score++;
        pointsNeeded.textContent = 10 - state.score;
        updateProblem();
        renderProgressBar();

    } else {
        state.wrongAns++;
        mistakesAllowed.textContent = 2 - state.wrongAns;
        problemElement.classList.add("animateWrong");
        setTimeout(() => {problemElement.classList.remove("animateWrong")}, 331);
    } 

    checkLogic()
}

function renderProgressBar() {
    progressBar.style.transform = `scaleX(${state.score/10})`;
}


entryForm.addEventListener("submit", handleSubmit);

updateProblem();