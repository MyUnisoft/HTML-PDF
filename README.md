# HTMLToPDF
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
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

### initBrowser(options: PuppeteerLaunchOptions): Promise<Browser>

```js
type PuppeteerLaunchOptions = LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions & {
    product?: Product;
    extraPrefsFirefox?: Record<string, unknown>;
}

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/nicolas-hallaert/"><img src="https://avatars.githubusercontent.com/u/39910164?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nicolas Hallaert</b></sub></a><br /><a href="https://github.com/MyUnisoft/HTML-PDF/commits?author=Rossb0b" title="Code">💻</a> <a href="https://github.com/MyUnisoft/HTML-PDF/commits?author=Rossb0b" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!