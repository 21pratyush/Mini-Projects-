const questions = [
    {
        question: "Q1. How many Infinity Stones are there?",
        options: ["Five", "Six", "Seven", "Nine"],
        correct: 1
    },
    {
        question: "Q2. Where is Captain America from?",
        options: ["India", "USA", "Brooklyn", "Canada"],
        correct: 2
    },
    {
        question: "Q3. Who is Tony Stark's father?",
        options: ["Howard Stark", "Tony Stark Sr.", "Edwin Jarvis", "Bruce Wayne"],
        correct: 0
    },
    {
        question: "Q4. What is the name of the character known as Black Widow?",
        options: ["Natasha Romanoff", "Wanda Maximoff", "Carol Danvers", "Jessica Drew"],
        correct: 0
    },
    {
        question: "Q5. What type of doctor is Doctor Strange?",
        options: ["Neurosurgeon", "Cardiologist", "Radiologist", "Orthopedic Surgeon"],
        correct: 0
    }
];


const questionElement = document.querySelector(".question");
const optionsElements = document.querySelectorAll(".option");
const scoreElement = document.querySelector(".score");
const skipButton = document.querySelector(".skip-button");
const resultElement = document.querySelector(".result");
const retryButton = document.querySelector(".retry-button");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion(index) {
    questionElement.textContent = questions[index].question;
    optionsElements.forEach((option, i) => {
        option.textContent = questions[index].options[i];
    });
}

function updateScore() {
    scoreElement.textContent = `${score}/${questions.length}`;
}

function showResult() {
    resultElement.textContent = getResultMessage(score);
    retryButton.style.display = "block";
    skipButton.style.display = "none";
}

function getResultMessage(score) {
    if (score === 0) {
        return "Oh no! Keep trying!";
    } else if (score <= 2) {
        return "Not bad! Keep practicing!";
    } else if (score <= 4) {
        return "Great job! You're almost there!";
    } else {
        return "Marvel Mastery Unleashed!";
    }
}

showQuestion(currentQuestionIndex);
updateScore();

// Function to reset the quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(currentQuestionIndex);
    updateScore();
    resultElement.textContent = ""; // Clearing result message
    retryButton.style.display = "none"; // Hiding retry-button
    skipButton.style.display = "block"; //Showing skip-button
}
// Event listener for option buttons
optionsElements.forEach((option, index) => {
    option.addEventListener("click", () => {
        if (index === questions[currentQuestionIndex].correct) {
            score++;
            updateScore();
        }

        // Moving to the next question
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
            resultElement.textContent = ""; // Clearing result message
        } else {
            showResult();
        }
    });
});
// Event listener for skip button
skipButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
});

// Event listener for the Retry button
retryButton.addEventListener("click", resetQuiz);