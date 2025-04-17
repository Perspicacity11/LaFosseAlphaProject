let startBtn = document.getElementById('startGame')
let options = document.querySelectorAll('.options')

startBtn.addEventListener('click', () => {
    options.forEach(dot => {
        dot.style.display = "flex"
    })
    startBtn.style.display = "none"
})