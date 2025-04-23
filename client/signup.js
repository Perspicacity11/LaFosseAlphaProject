// signup.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // prevent default form submission
  
      const username = document.querySelector("#inputName").value.trim();
      const email = document.querySelector("#inputEmail1").value.trim();
      const password = document.querySelector("#exampleInputPassword1").value;
  
      if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }
  
      const payload = {
        username,
        email,
        password,
      };
  
      try {
        const res = await fetch("/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          alert("Signup successful! You can now log in.");
          window.location.href = "/login.html";
        } else {
          alert(data.error || "Something went wrong.");
        }
  
      } catch (err) {
        console.error(err);
        alert("Failed to sign up. Please try again later.");
      }
    });
  });
  