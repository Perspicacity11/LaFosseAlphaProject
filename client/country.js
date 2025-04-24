const countryInputForm = document.getElementById('countryForm')
const allPath = document.querySelectorAll(".allPath")
const svg = document.querySelector(".svg");
const countryCounter = document.querySelector(".country-counter")
const userAlert = document.querySelector("#userAlert")
const input = document.getElementById("userInput")
const logoutBtn = document.getElementById("logoutBtn")
const startBtn = document.getElementById("start-game");
const timerEl = document.getElementById("timer");
const finalScore = document.getElementById("final-score");
const welcome = document.querySelector('.welcome')
const userName = localStorage.getItem("userName");

let counter = 0
let countriesFound = []
welcome.innerHTML = `Welcome ${userName}`


async function getUsers(userName) {
  try {
    const response = await fetch('https://geogame-n2wb.onrender.com/users');
    const data = await response.json();

    if (response.ok) {
      console.log("Data fetched successfully:", data);

      const usernameToFind = userName; 
      const userId = getUserIdByUsername(data, usernameToFind);
      localStorage.setItem("userId", userId)
      
    } else {
      console.error("Data retrival failed:", data.error);
    }
  } catch (err) {
    console.log("Can't retrieve data", err);
  }
}

function getUserIdByUsername(users, username) {
  const user = users.find(user => user.username === username);
  return user ? user.id : null; 
}

getUsers(userName);

logoutBtn.addEventListener("click", () =>{
    logout()
  })
  
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}


countryInputForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if(countriesFound.includes(e.target.userInput.value)){
        userAlert.style.color = "#dc3545"
        userAlert.innerHTML = `${e.target.userInput.value} has already been entered`

        setTimeout(() => {
            userAlert.innerHTML = '';
        }, 2000);

        e.target.userInput.value = ""
        counter = counter
    }else{
    findCountry(e)
    e.target.userInput.value = ""
    console.log(countriesFound)
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
            countryCounter.textContent = `Score: ${counter}/45`
            countriesFound.push(e.target.userInput.value)
        }
    })
    
}


let timer;

input.disabled = true;

function startGame() {
  const svgTexts = svg.querySelectorAll("text");
  svgTexts.forEach(text => text.remove());

  allPath.forEach(path => {
    path.style.fill = "#fff";
  });

  counter = 0;
  countriesFound = [];
  input.disabled = false;
  console.log('STARTING GAME')
  let timeLeft = 30;
  input.disabled = false;
  input.value = "";
  finalScore.textContent = "";
  countryCounter.textContent = "Score: 0/45";
  input.focus();
  timerEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
      allPath.forEach(path => {
        const manualOffsets = {
          "Kosovo": { x: 5, y: -5 },
          "Montenegro": { x: -10, y: 5 },
          "Macedonia": { x: 0, y: 10 },
          "Albania": { x: -10, y: -5 },
          "Bosnia and Herzegovina": { x: 5, y: 5 },
          "Georgia": { x: -15, y: 5},
          "Armenia": {x: -45, y: 5},
          "Croatia": {x: -10, y: -10},
          "Switzerland": {x: 10, y: 10}
      }
        countryMissing = path.getAttribute("name")
        if(!countriesFound.includes(countryMissing)){
          const bbox = path.getBBox();
          let x = bbox.x + bbox.width / 2;
          let y = bbox.y + bbox.height / 2;

          if (manualOffsets[countryMissing]) {
              x += manualOffsets[countryMissing].x
              y += manualOffsets[countryMissing].y
          }
          path.style.fill = "#fcefb4"
          const text = document.createElementNS("http://www.w3.org/2000/svg","text")
          text.setAttribute("x", x)
          text.setAttribute("y", y)
          text.setAttribute("font-size", "11")
          text.setAttribute("font-weight", "bold")
          text.setAttribute("fill", "red")
          text.setAttribute("pointer-events", "none")
          text.textContent = countryMissing
          svg.appendChild(text);
        }
      })
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  input.disabled = true;
  finalScore.textContent = `Final Score: ${counter}`;

  // Send result to backend
  fetch("https://geogame-n2wb.onrender.com/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: localStorage.getItem("userId"),
      session_score: counter,
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

startBtn.addEventListener("click", startGame);



