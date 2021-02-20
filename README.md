# nHTMLToPDF
Node lib for converts HTML with dynamic or static content or url to PDF files

## Installation
- Coming soon

## Unit Test
- Jest
- Coverage : 90%

## Usage

```js
async function main() {
  try {
    const browser = await pdf.initBrowser();
    const result1 = await pdf.generatePDF(browser, files);
    const stream = await fs.createWriteStream(`./${your_pdf_name}.pdf`);
    await stream.write(result1[0].buffer);
    await pdf.terminateBrowser
  } catch (error) {
    throw new Error(error);
  }
}
main().catch(console.error);
```

### initBrowser(): Promise<Browser>

```js
async function main() {
  try {
    const browser = await pdf.initProcess();
  } catch (error) {
    throw new Error(error);
  }
}
main().catch(console.error);
```

### generatePDF(browser: Browser, files: pdfFile[], options?: PDFOPtions): Promise<PDF[]>

```ts
interface pdfFile {
  content?: string,
  url?: string,
  options?: {}
}

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
```

```js
async function main() {
  try {
    const browser = await pdf.initBrowser();
    const result1 = await pdf.generatePDF(browser, files);
  } catch (error) {
    throw new Error(error);
  }
}
main().catch(console.error);
```

### terminateBrowser(browser: Browser): Promise<void>

```js
async function main() {
  try {
    const browser = await pdf.initBrowser();
    await pdf.terminateBrowser
  } catch (error) {
    throw new Error(error);
  }
}
main().catch(console.error);
```
