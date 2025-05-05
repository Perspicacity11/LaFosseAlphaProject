// import API_URL from './config';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // prevent default form submission
      console.log("Form submitted"); // Debugging line
      console.log(e)
  
      const username = document.getElementById("inputName").value.trim();
      const email = document.getElementById("inputEmail1").value.trim();
      const password = document.getElementById("exampleInputPassword1").value;
  
      if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }
  
      const payload = {
        username,
        email,
        password
      };

      console.log("Payload:", payload); // Debugging line
  
      try {
        const res = await fetch('https://geogame-n2wb.onrender.com/users/signup', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        console.log(payload)
  
        const data = await res.json();
        console.log(res)
  
        if (res.ok) {
          alert("Signup successful! You can now log in.");
          window.location.href = "login.html";
        } else {
          alert(data.error || "Something went wrong.");
        }
  
      } catch (err) {
        console.error(err);
        alert("Failed to sign up. Please try again later.");
      }
    });
  });
  
