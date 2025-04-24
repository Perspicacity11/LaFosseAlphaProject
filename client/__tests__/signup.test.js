// test("basic sanity check", () => {
//     expect(1 + 1).toBe(2);
//   });
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

//form elements render correctly
describe("Signup Form UI Tests", () => {
  let document;

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, "../signup.html"), "utf8");
    const dom = new JSDOM(html);
    document = dom.window.document;
  });

  test("renders the signup form and fields", () => {
    const form = document.querySelector("#signup-form");
    const username = document.querySelector("#inputName");
    const email = document.querySelector("#inputEmail1");
    const password = document.querySelector("#exampleInputPassword1");

    expect(form).not.toBeNull();
    expect(username).not.toBeNull();
    expect(email).not.toBeNull();
    expect(password).not.toBeNull();
  });
});

  