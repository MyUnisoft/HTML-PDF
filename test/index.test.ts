// Import Node.js Dependencies
import path from "path";
import fs from "fs";

// Import Internal Dependencies
import * as compiler from "../src/index";

// CONST
const file = fs.readFileSync(path.join(__dirname, "fixtures", "sample.html"), "utf-8");

const opts = {
  persons: [
    {
      firstname: "Alice",
      lastname: "Fortin",
      salary: 2000
    },
    {
      firstname: "Julienne",
      lastname: "Chauvin",
      salary: 2000
    },
    {
      firstname: "Aubin",
      lastname: "Poissonnier",
      salary: 2000
    },
    {
      firstname: "Roch",
      lastname: "Guilmette",
      salary: 2000
    },
    {
      firstname: "Grégoire",
      lastname: "Grignon",
      salary: 2000
    }
  ],
  title: "HELLO WORLD !"
};

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
    browser = await compiler.initBrowser();
  });

  it("should return a Buffer for a file converted in pdf", async() => {
    try {
      const res = await compiler.generatePDF(browser, [{ content: file, options: opts }]);
      const stream = fs.createWriteStream("./test.pdf");
      stream.write(res.pdf.buffer);
      expect(res.pdf.buffer).toBeInstanceOf(Buffer);
    }
    catch (error) {
      throw new Error(error);
    }
  });

  it("should return a Buffer for an url converted in pdf", async() => {
    try {
      const res = await compiler.generatePDF(browser, [{ url: "https://nodejs.org/en/" }]);
      expect(res.pdf.buffer).toBeInstanceOf(Buffer);
    }
    catch (error) {
      throw new Error(error);
    }
  });

  it("should return a Buffer for a HTML converted in pdf", async() => {
    try {
      const res = await compiler.generatePDF(browser, [{ content: template }], { scale: 2 });
      expect(res.pdf.buffer).toBeInstanceOf(Buffer);
    }
    catch (error) {
      throw new Error(error);
    }
  });

  it("should return a Buffer for each type of entry converted in pdf", async() => {
    try {
      const res = await compiler.generatePDF(browser, [{ content: template }, { url: "https://nodejs.org/en/" }]);
      for (const pdf of res.pdfs) {
        expect(pdf.buffer).toBeInstanceOf(Buffer);
      }
    }
    catch (error) {
      throw new Error(error);
    }
  });

  afterAll(async() => {
    await compiler.terminateBrowser(browser);
  });
});

