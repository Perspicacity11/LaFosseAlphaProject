
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

describe("Login Page Basic UI", () => {
  let dom;
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, "../login.html"), "utf8");
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
  });

  test("Login form is present", () => {
    const form = document.getElementById("login-form");
    expect(form).not.toBeNull();
  });

  test("Username input exists", () => {
    const usernameInput = document.getElementById("inputUsername");
    expect(usernameInput).not.toBeNull();
  });

  test("Password input exists", () => {
    const passwordInput = document.getElementById("inputPassword");
    expect(passwordInput).not.toBeNull();
  });

  test("Submit button exists and is labeled 'Login'", () => {
    const button = document.getElementById("loginButton");
    expect(button).not.toBeNull();
    expect(button.textContent).toBe("Login");
  });
});
