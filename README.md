# HTMLToPDF
Node lib to converts HTML with property binding or url to PDF files

## Installation
```$ npm install @myunisoft/html-to-pdf```

## Unit Test
- Jest
- Coverage : 100%

## Usage

```js
async function main() {
  const browser = await initBrowser();

  try {
    const { pdfs } = await generatePDF(browser, files);
    const { pdf } = await generatePDF(browser, file);

    const stream = fs.createWriteStream(`./${your_pdf_name}.pdf`);

    stream.write(pdf.buffer); // => create file for the given buffer.
    
    for (let pdf of pdfs) {
      stream.write(pdf.buffer); // => create file for each given buffer
    }
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
  const result = Readable.from(generatePDF(browser, [{ content: html.content }], pdfOptions ?? kDefaultOptions));
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
