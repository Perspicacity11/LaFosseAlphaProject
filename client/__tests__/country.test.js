
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

describe("Country Page UI", () => {
  let dom, document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, "../country.html"), "utf8");
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
  });

  test("renders Start Game button", () => {
    const startButton = document.getElementById("start-game");
    expect(startButton).toBeTruthy();
    expect(startButton.textContent).toBe("Start Game");
  });

  test("has a form for entering countries", () => {
    const form = document.getElementById("countryForm");
    const input = document.getElementById("userInput");
    expect(form).toBeTruthy();
    expect(input).toBeTruthy();
  });

  test("renders score display and timer", () => {
    const scoreDisplay = document.querySelector(".country-counter");
    const timer = document.getElementById("timer");
    expect(scoreDisplay).toBeTruthy();
    expect(timer).toBeTruthy();
  });
});
