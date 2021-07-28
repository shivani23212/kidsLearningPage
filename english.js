const startBtn = document.querySelector(".start-btn");
const nextBtn = document.querySelector(".next-btn");
const questionContainer = document.querySelector("#question-container");
let shuffledOrder, currentIndex;
const questionElement = document.querySelector("#question");
const ansContainer = document.querySelector("#answer-container")
let originalAnsBtns = document.querySelectorAll(".ans-btn");


function startQuiz() {
    questionContainer.classList.remove("hide");
    startBtn.classList.add("hide");

    shuffledOrder = questions.sort((a, b) => (Math.random - 0.5)); // for every pair of objs generates +/- num to determine order
    currentIndex = 0; // current question index in array
    displayQuestion();
}


startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentIndex++;
    displayQuestion();
})

function displayQuestion() {
    showQuestion(shuffledOrder[currentIndex]);
}

function showQuestion(question) {
    nextBtn.classList.add("hide");
    originalAnsBtns = document.querySelectorAll(".ans-btn");
    originalAnsBtns.forEach(origBtn => {
        origBtn.style.display = "none";
    })
    questionElement.innerHTML = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("ans-btn", "btn");
        if (answer.correct) {button.dataset.correct = answer.correct}
        button.addEventListener("click", selectAnswer)
        ansContainer.appendChild(button);
    })
}

function selectAnswer(e) {
    // add 'correct' or 'wrong' to class of each button
    Array.from(ansContainer.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledOrder.length > currentIndex+1) {
        nextBtn.classList.remove("hide");
    } else {
        nextBtn.classList.add("hide");
        startBtn.innerText = "Restart";
        startBtn.classList.remove("hide");
    }

}

function setStatusClass(element, correct) {
    // remove any prev statuses
    element.classList.remove("correct");
    element.classList.remove("wrong");

    if (correct) {element.classList.add("correct");}
    else {element.classList.add("wrong")}
}



const questions = [
    {
      question: 'The order of a basic positive sentence is: ',
      answers: [
        { text: 'Subject-Verb-Object ', correct: true },
        { text: 'Verb-Object-Subject', correct: false }
      ]
    },
    {
      question: 'What is the modal verb in this sentence: \
      "It might be a good idea to ring up and check what time it starts."',
      answers: [
        { text: 'ring', correct: false },
        { text: 'idea', correct: false },
        { text: 'might', correct: true },
        { text: 'it', correct: false }
      ]
    },
    {
      question: 'What is the present perfect tense of ‘it rains’?',
      answers: [
        { text: 'It rained', correct: false },
        { text: 'It had rained', correct: false },
        { text: 'It has rained', correct: true },
        { text: 'It was raining', correct: false }
      ]
    },
    {
      question: 'Which of these sentences uses the subjunctive?',
      answers: [
        { text: "If I was you, I'd take the chance", correct: false },
        { text: "If I were you, I'd take the chance", correct: true }, 
        {text: "Both", correct: false}, 
        {text: "Neither", correct: false}
      ]
    }
  ]