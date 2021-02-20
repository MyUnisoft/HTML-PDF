const compiler = require("../dist/index.js");
const fs = require('fs');
const file = fs.readFileSync('./test/sample.html', 'utf-8');

const opts = {
  persons: [
    {
      firstname: "Alice",
      lastname: "Fortin",
      salary: 2000,
    },
    {
      firstname: "Julienne",
      lastname: "Chauvin",
      salary: 2000,
    },
    {
      firstname: "Aubin",
      lastname: "Poissonnier",
      salary: 2000,
    },
    {
      firstname: "Roch",
      lastname: "Guilmette",
      salary: 2000,
    },
    {
      firstname: "Grégoire",
      lastname: "Grignon",
      salary: 2000,
    }
  ],
  title : "HELLO WORLD !"
}

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
  `

describe('convert html to pdf', () => {
  let browser;

  beforeAll(async () => {
    browser = await compiler.initBrowser();
  })

  it('should throw error if file dosn\'t have prop content or url as string', async () => {
    try {
      await compiler.generatePDF(browser, [{ content: true }]);
    } catch (error) {
      expect(error).toBeDefined();
    }
  })
  it('should return a Buffer for a file converted in pdf', async () => {
    try {
      const pdf = await compiler.generatePDF(browser, [{ content: file, options: opts }]);
      const stream = fs.createWriteStream("./test.pdf");
      stream.write(pdf.buffer);
      expect(pdf.buffer).toBeInstanceOf(Buffer);
    } catch (error) {
      throw new Error(error);
    }
  });

  it('should return a Buffer for an url converted in pdf', async () => {
    try {
      const pdf = await compiler.generatePDF(browser, [{ url: "https://nodejs.org/en/" }]);
      expect(pdf.buffer).toBeInstanceOf(Buffer);
    } catch (error) {
      throw new Error(error);
    }
  });

  it('should return a Buffer for a HTML converted in pdf', async () => {
    try {
      const pdf = await compiler.generatePDF(browser, [{ content: template }]);
      expect(pdf.buffer).toBeInstanceOf(Buffer);
    } catch (error) {
      throw new Error(error);
    }
  });

  it('should return a Buffer for each type of entry converted in pdf', async () => {
    try {
      const pdfs = await compiler.generatePDF(browser, files = [{ content: template }, { url: "https://nodejs.org/en/" }])
      for (let pdf of pdfs) {
        expect(pdf.buffer).toBeInstanceOf(Buffer);
      }
    } catch (error) {
      throw new Error(error);
    }
  });

  afterAll(async () => {
    await compiler.terminateBrowser(browser);
  })
});

