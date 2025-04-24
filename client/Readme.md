# GeoQuiz Game - Frontend:

  Description: "Frontend for an interactive geography game where users guess European countries in a timed challenge."




## Structure:
      - HTML for homepage (user page)
      - HTML for the quiz page
      - HTML for login page
      -JS scripts for HTML DOM


## Features:
    - "60-second timed quiz"
    - "Interactive SVG map with real-time highlighting"
    - "Duplicate guess detection"
    - "Score submission to backend API"
    - "Responsive Bootstrap layout"
    - "LocalStorage for user session"
   

##  Tech_stack:
    html: "HTML5"
    css: "CSS3"
    js: "Vanilla JavaScript (ES6+)"
    framework: "Bootstrap 4"
    map: "Inline SVG"
    api: "Fetch API (POST to /sessions)"
    testing: "Jest with jsdom"


## game_logic:
  start_game:
    - "Enable input field"
    - "Start 60s countdown"
  on_submit:
    correct_guess:
      - "Highlight country on map"
      - "Add name to guessed list"
      - "Increment score"
  

 ##  Deployment:
           Netlify
