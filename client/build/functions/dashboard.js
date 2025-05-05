const userName = localStorage.getItem("userName");
const welcome = document.querySelector('.welcome')
const tableBody = document.getElementById("session-table")
const logoutBtn = document.getElementById("logoutBtn")
welcome.innerHTML = `Welcome ${userName}`


logoutBtn.addEventListener("click", () =>{
    logout()
  })
  
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

async function getUsers(userName) {
  try {
    const response = await fetch('https://geo-nius-lafosse-alpha-project.onrender.com/users');
    const data = await response.json();

    if (response.ok) {
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

getUsers(userName)

async function getSessionDetails() {
    try {
      const response = await fetch('https://geo-nius-lafosse-alpha-project.onrender.com/sessions');
      const data = await response.json();
  
      if (response.ok) {
        const userSession = data.filter(session => session.user_id == localStorage.getItem("userId"))
             addTable(userSession)
        
      } else {
        console.error("Data retrival failed:", data.error);
      }
    } catch (err) {
      console.log("Can't retrieve data", err);
    }
  }
  

  getSessionDetails()


  function addTable(userSession){
    if (userSession.length > 0) {
        userSession.forEach(session => {
          const row = document.createElement('tr');

          const userIdCell = document.createElement('td');
          userIdCell.textContent = session.user_id;

          const sessionTypeCell = document.createElement('td');
          sessionTypeCell.textContent = session.session_type;

          const sessionScoreCell = document.createElement('td');
          sessionScoreCell.textContent = session.session_score;

          row.appendChild(userIdCell);
          row.appendChild(sessionTypeCell);
          row.appendChild(sessionScoreCell);


          tableBody.appendChild(row);
        });
      } else {
        const noDataRow = document.createElement('tr');
        const noDataCell = document.createElement('td');
        noDataCell.setAttribute('colspan', 3);
        noDataCell.textContent = 'No sessions found for this user.';
        noDataRow.appendChild(noDataCell);
        tableBody.appendChild(noDataRow);
      }
  }