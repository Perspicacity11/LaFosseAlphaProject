const countryInputForm = document.getElementById('countryForm')
const allPath = document.querySelectorAll(".allPath")
const svg = document.querySelector(".svg");
const countryCounter = document.querySelector(".country-counter")
const userAlert = document.getElementById("userAlert")

let counter = 0
let countriesFound = []


countryInputForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if(countriesFound.includes(e.target.userInput.value)){
        userAlert.innerHTML = `${e.target.userInput.value} has already been entered`
        userAlert.style.color = "#fff"
        setTimeout(() => {
            userAlert.innerHTML = '';
        }, 2000);

        counter = counter
    }else{
    findCountry(e)
    e.target.userInput.value = ""
    }
    
})

function findCountry(e){
    allPath.forEach(path => {

        const countryName = path.getAttribute("name")

        const manualOffsets = {
            "Kosovo": { x: 5, y: -5 },
            "Montenegro": { x: -10, y: 5 },
            "Macedonia": { x: 0, y: 10 },
            "Albania": { x: -10, y: -5 },
            "Bosnia and Herzegovina": { x: 5, y: 5 },
            "Georgia": { x: -15, y: 5},
            "Armenia": {x: -45, y: 5},
            "Croatia": {x: -10, y: -10}
        }

       if(e.target.userInput.value.toLowerCase() === countryName.toLowerCase()){
            const bbox = path.getBBox();
            let x = bbox.x + bbox.width / 2;
            let y = bbox.y + bbox.height / 2;

            if (manualOffsets[countryName]) {
                x += manualOffsets[countryName].x
                y += manualOffsets[countryName].y
            }
            path.style.fill = "#fad2e1"
            const text = document.createElementNS("http://www.w3.org/2000/svg","text")
            text.setAttribute("x", x)
            text.setAttribute("y", y)
            text.setAttribute("font-size", "11")
            text.setAttribute("font-weight", "bold")
            text.setAttribute("fill", "red")
            text.setAttribute("pointer-events", "none")
            text.textContent = e.target.userInput.value;
            svg.appendChild(text);
            counter += 1
            countryCounter.textContent = `Score: 45/${counter}`
            countriesFound.push(countryName)
        }
    })
    
}


// -----------

//add app.js code in here

const startBtn = document.getElementById("start-game");
const timerEl = document.getElementById("timer");
const input = document.getElementById("guess-input");
const guessList = document.getElementById("guess-list");
const scoreDisplay = document.getElementById("score-display");
const finalScore = document.getElementById("final-score");

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
  "Lithuania", "Latvia", "Estonia", "United Kingdom", "Slovenia", "Luxembourg", "Iceland",
  "Ukraine", "Moldova", "North Macedonia", "Montenegro", "Malta", "Cyprus"
];

function startGame() {
  let timeLeft = 60;
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
  fetch("/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      session_score: score,
      session_type: "country-guess"
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
