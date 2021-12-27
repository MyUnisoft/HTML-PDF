# nHTMLToPDF
Node lib to converts HTML with property binding or url to PDF files

## Installation
```$ npm install @rossbob/html-to-pdf```

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
  url?: string,
  options?: {}
}

More Info [there](https://pptr.dev/#?product=Puppeteer&version=v7.1.0&show=api-pagepdfoptions)
interface PDFOptions {
  path?: string,
  scale?: number,
  displayHeaderFooter?: boolean,
  headerTemplate?: string,
  footerTemplate?: string,
  printBackground?: boolean,
  landscape?: boolean,
  pageRanges?: string,
  format?: string,
  width?: string | number,
  height?: string | number,
  margin?: {
    top?: string | number,
    right?: string | number,
    bottom?: string | number,
    left?: string | number,
  },
  preferCSSPageSize?: boolean
}

interface PDF {
  options?: string,
  buffer: Buffer
}

interface genPDFPayload {
  pdf?: PDF,
  pdfs?: PDF[],
  stream?: fs.ReadStream
}
```

```js
async function main() {
  const browser = await initBrowser();
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

### How to use [Zup](https://github.com/mscdex/zup)
