const logoutBtn = document.getElementById("logoutBtn")
const welcome = document.querySelector('.welcome')
const userName = localStorage.getItem("userName");

logoutBtn.addEventListener("click", () =>{
    logout()
  })
  
  function logout() {
    localStorage.clear();
    window.location.href = "login.html";
  }

  welcome.innerHTML = `Welcome ${userName}`
 
