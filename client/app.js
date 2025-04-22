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




