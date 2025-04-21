//add app.js code in here

const startBtn = document.getElementById("start-game");
const timerEl = document.getElementById("timer");
const input = document.getElementById("guess-input");
const guessList = document.getElementById("guess-list");
const scoreDisplay = document.getElementById("score-display");
const finalScore = document.getElementById("final-score");

let timeLeft = 60;
let timer;
let score = 0;
let guesses = new Set();

// Simulated user (replace with session user in real app)
const userId = 1;

const europeanCountries = [
  "France", "Germany", "Italy", "Spain", "Portugal", "Greece", "Poland",
  "Sweden", "Norway", "Denmark", "Belgium", "Netherlands", "Austria",
  "Switzerland", "Finland", "Czech Republic", "Hungary", "Ireland",
  "Slovakia", "Croatia", "Romania", "Bulgaria", "Serbia", "Albania", 
  "Lithuania", "Latvia", "Estonia", "England", "Slovenia", "Luxembourg", "Iceland",
  "Ukraine", "Moldova", "North Macedonia", "Montenegro", "Malta", "Cyprus"
];

function startGame() {
  timeLeft = 60;
  score = 0;
  guesses.clear();
  guessList.innerHTML = "";
  input.disabled = false;
  input.value = "";
  finalScore.textContent = "";
  scoreDisplay.textContent = "Score: 0";
  input.focus();
  timerEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  input.disabled = true;
  finalScore.textContent = `Final Score: ${score}`;

  // Send result to backend
  fetch("/sessions/record", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      session_score: score
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Session saved:", data);
  })
  .catch(err => {
    console.error("Error saving session:", err);
  });
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const guess = input.value.trim();
    input.value = "";

    if (!guess) return;

    const isValid = europeanCountries.some(
      country => country.toLowerCase() === guess.toLowerCase()
    );

    if (isValid && !guesses.has(guess.toLowerCase())) {
      guesses.add(guess.toLowerCase());
      score++;
      scoreDisplay.textContent = `Score: ${score}`;

      const li = document.createElement("li");
      li.textContent = guess;
      guessList.appendChild(li);
    }
  }
});

startBtn.addEventListener("click", startGame);
