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
  let readable;

  try {
    readable = Readable.from(generatePDF(browser, [{ content: html }], pdfOptions));
  }
  finally {
    await terminateBrowser(browser);
  }

  return readable;
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

### generatePDF(browser: Browser, files: pdfFile[], options?: PuppeteerPDFOptions): Promise<genPDFPayload>

```ts
interface pdfFile {
  content?: string,
  url?: string
}

type PuppeteerPDFOptions = PDFOptions & { paginationOffset?: number };
```

```js
async function main() {
  const browser = await initBrowser();
  const readable = Readable.from(generatePDF(browser, [{ content: html.content }], pdfOptions));
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
