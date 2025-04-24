// import API_URL from './config';
  
  const loginForm = document.getElementById("login-form")
  const inputUsername = document.getElementById("inputUsername")
  const inputPassword = document.getElementById("inputPassword")

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = inputUsername.value.trim()
    const password = inputPassword.value.trim()

    try{
        const response = await fetch('https://geogame-n2wb.onrender.com/users/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
          })


          const data = await response.json()

          if (response.ok) {
              console.log("Login successful:", data);
              let user = localStorage.setItem("userName", data.username)
              getUsers(user)
              window.location.href = "home.html";
              
              
            } else {
              console.error("Login failed:", data.error);
              alert("Invalid login credentials!");
            }
        }catch(err){
            console.log("Can't retrieve data")
        }
        
  })

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
  
  
  
 


