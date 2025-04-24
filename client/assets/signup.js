document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const options = {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: form.get("inputName"),
          email: form.get("inputEmail1"),
          password: form.get("exampleInputPassword1")
      })
  }

  const response = await fetch("http://localhost:3000/users/signup", options);
  const data = await response.json();

  if (response.status == 201) {
     window.location.assign("login.html")
  } else {
      alert(data.error);
  }
})