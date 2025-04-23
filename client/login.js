  const inputUsername = document.getElementById("inputUsername")
  const inputPassword = document.getElementById("inputPassword")
  const loginBtn = document.getElementById("loginButton")
  const welcomeMsg = document.querySelector(".welcome-message")

  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault()

    try{
        const response = await fetch("/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username : inputUsername.value.trim(),
              password : inputPassword.value.trim()
            })
          })

          const data = await response.json()

          if (response.ok) {
              console.log("Login successful:", data);
              window.location.href = "./index.html";
              welcomeMsg.innerHTML = `Welcome ${username}`
            } else {
              console.error("Login failed:", data.error);
              alert("Invalid login credentials!");
            }
        }catch(err){
            console.log("Can't retrieve data")
        }
        
  })
  
 


