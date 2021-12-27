# HTMLToPDF
Node lib to converts HTML with property binding or url to PDF files

## Installation
```$ npm install @myunisoft/html-to-pdf```

## Unit Test
- Jest
- Coverage : 90%

## Usage

```js
async function main() {
  const browser = await initBrowser();
  const writable = fs.createWriteStream("./test.pdf");

  try {
    await pipeline(
      compiler.generateDPDF(browser, [{ content: file, options: opts }]),
      writable
    );
  }
  finally {
    await terminateBrowser(browser);
  }
}

main().catch(console.error);
```

### initBrowser(): Promise<Browser>

```js
async function main() {
  const browser = await initBrowser();
}
main().catch(console.error);
```

### generatePDF(browser: Browser, files: pdfFile[], options?: PDFOPtions): Promise<genPDFPayload>

```ts
interface pdfFile {
  content?: string,
  url?: string
}
```

```js
async function main() {
  const browser = await initBrowser();

  try {
    for await (const pdf of compiler.generatePDF(browser, [{ content: template }, { url: "https://nodejs.org/en/" }])) {
      console.log(pdf);
    }
  } 
  finally {
    await terminateBrowser(browser);
  }

  const result = await generatePDF(browser, files);
}
main().catch(console.error);
```

### terminateBrowser(browser: Browser): Promise<void>

```js
async function main() {
  const browser = await pdf.initBrowser();
  await terminateBrowser(browser);
}
main().catch(console.error);
```
