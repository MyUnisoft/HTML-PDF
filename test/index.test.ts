// Import Node.js Dependencies
import path from "path";
import fs from "fs";
import { pipeline } from "stream/promises";

// Import Internal Dependencies
import { initBrowser, generatePDF, terminateBrowser } from "../src";

// CONST
const file = fs.readFileSync(path.join(__dirname, "fixtures", "sample.html"), "utf-8");

const template = `
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css">
    <div class="container">
        <div class="table-responsive">
          <table class="table table-bordered table-hover ">
            <tr><th colspan="3"><h5>Company Name</h5></th></tr>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>salary</th>
            </tr>
            <tr>
              <td>Alice</td>
              <td>Fortin</td>
              <td class="text-right">xxxx€</td>
            </tr>
            <tr>
              <td>Julienne</td>
              <td>Chauvin</td>
              <td class="text-right">xxxx€</td>
            </tr>
            <tr>
              <td>Aubin</td>
              <td>Poissonnier</td>
              <td class="text-right">xxxx€</td>
            </tr>
            <tr>
              <td>Roch</td>
              <td>Guilmette</td>
              <td class="text-right">xxxx€</td>
            </tr>
            <tr>
              <td>Grégoire</td>
              <td>Grignon</td>
              <td class="text-right">xxxx€</td>
            </tr>
          </table>
        </div>
    </div>
  `;

describe("convert html to pdf", () => {
  let browser;

  beforeAll(async() => {
    browser = await initBrowser();
  });

  it("should return a Buffer for a file converted in pdf", async() => {
    expect.assertions(1);

    for await (const pdf of generatePDF(browser, [{ content: file }])) {
      expect(pdf).toBeInstanceOf(Buffer);
    }
  });

  it("should return a Buffer for an url converted in pdf", async() => {
    expect.assertions(1);

    for await (const pdf of generatePDF(browser, [{ url: "https://nodejs.org/en/" }])) {
      expect(pdf).toBeInstanceOf(Buffer);
    }
  });

  it("should return a Buffer for a HTML converted in pdf", async() => {
    expect.assertions(1);

    for await (const pdf of generatePDF(browser, [{ content: template }], { scale: 2 })) {
      expect(pdf).toBeInstanceOf(Buffer);
    }
  });

  it("should return a Buffer for each type of entry converted in pdf", async() => {
    expect.assertions(2);

    for await (const pdf of generatePDF(browser, [{ content: template }, { url: "https://nodejs.org/en/" }])) {
      expect(pdf).toBeInstanceOf(Buffer);
    }
  });

  afterAll(async() => {
    await terminateBrowser(browser);
  });
});

