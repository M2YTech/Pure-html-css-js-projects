const questions = [
    {
        question : "Who is the fastest man alive in history?",
        answers: [
            {text: "Muhammad Ali", correct: false},
            {text: "Usain Bolt", correct: true},
            {text: "Mike tyson", correct: false},
            {text: "Ricardo Lopez", correct: false},
        ]
    },
    {
        question : "what is the name of the world's fastest car?",
        answers: [
            {text: "Koenigsegg Jesko Absolut", correct: true},
            {text: "Supra ", correct: false},
            {text: "Dodge", correct: false},
            {text: "Nissan GT", correct: false},
        ]
    },
    {
        question : "What is the #1 most expensive country in the world?",
        answers: [
            {text: "Pakistan", correct: false},
            {text: "India", correct: false},
            {text: "Switzerland", correct: true},
            {text: "Dubai", correct: false},
        ]
    },
    {
        question : "Which currency is strongest in the world?",
        answers: [
            {text: "Kuwaiti Dinar (KWD)", correct: true},
            {text: "Omani Rial (OMR)", correct: false},
            {text: "British Pound (GBP)", correct: false},
            {text: "Swiss Franc (CHF)", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
const videoDisplay = document.getElementById("vd");
const videoDisplay1 = document.getElementById("vd-2");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    videoDisplay.style.display = "none";
    videoDisplay1.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=> {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    if(score == questions.length){
        videoDisplay.style.display = "block";
    }else if(score == 0){
        videoDisplay1.style.display = "block";
    }
    
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});



startQuiz();