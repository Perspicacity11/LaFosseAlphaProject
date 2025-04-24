const logoutBtn = document.getElementById("logoutBtn")
const userAlert = document.querySelector("#userAlert")

logoutBtn.addEventListener("click", () =>{
    logout()
  })
  
  function logout() {
    localStorage.clear();
    window.location.href = "login.html";
  }

 
