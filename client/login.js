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
              window.location.href = "index.html";
              
            } else {
              console.error("Login failed:", data.error);
              alert("Invalid login credentials!");
            }
        }catch(err){
            console.log("Can't retrieve data")
        }
        
  })
  
 


