
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

describe("Dashboard  Basic UI", () => {
  let dom;
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, "../dashboard.html"), "utf8");
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
  });

  test("dashboard scoretable is present", () => {
    const table = document.getElementById("scoretable");
    expect(table).not.toBeNull();
  });

  test("Navbar exists", () => {
    const navbar = document.getElementById("navbar");
    expect(navbar).not.toBeNull();
  });
});
