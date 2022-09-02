<p align="center"><h1 align="center">
  HTML-PDF
</h1>

<p align="center">
  Node lib to converts HTML with property binding or url to PDF files.
</p>

<p align="center">
    <a href="https://github.com/MyUnisoft/HTML-PDF"><img src="https://img.shields.io/github/package-json/v/MyUnisoft/HTML-PDF?style=flat-square" alt="npm version"></a>
    <a href="https://github.com/MyUnisoft/HTML-PDF"><img src="https://img.shields.io/github/license/MyUnisoft/HTML-PDF?style=flat-square" alt="license"></a>
    <a href="https://github.com/MyUnisoft/HTML-PDF"><img src="https://img.shields.io/github/languages/code-size/MyUnisoft/HTML-PDF?style=flat-square" alt="size"></a>
</p>

## 🚧 Requirements

- [Node.js](https://nodejs.org/en/) version 14 or higher

## 🚀 Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://doc.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com)

```bash
$ npm i @myunisoft/html-to-pdf
# or
$ yarn add @myunisoft/html-to-pdf
```

## 📚 Usage

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

## API

<details>
<summary>initBrowser(options?: PuppeteerLaunchOptions): Promise< Browser ></summary>

```js
import { initBrowser } from "@myunisoft/html-to-pdf";

const browser = await initBrowser();
```

Options payload is described by the following TypeScript interface:
```ts
import {
  LaunchOptions,
  BrowserLaunchArgumentOptions,
  BrowserConnectOptions,
  Product
} from "puppeteer";

type PuppeteerLaunchOptions = LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions & {
    product?: Product;
    extraPrefsFirefox?: Record<string, unknown>;
}
```

</details>

<details>
<summary>generatePDF(browser: Browser, files: pdfFile[], options?: PuppeteerPDFOptions): AsyncIterableIterator< Buffer ></summary>

`files` and `options` arguments are described with the following TypeScript interface/type:
```ts
interface pdfFile {
  content?: string,
  url?: string
}

type PuppeteerPDFOptions = PDFOptions & { paginationOffset?: number };
```

```js
import * as pdf from "@myunisoft/html-to-pdf";

const browser = await pdf.initBrowser();

const pdfOptions = {};
const content = "..HTML HERE..";

const readable = Readable.from(
  pdf.generatePDF(browser, [{ content }], pdfOptions)
);
// Do the work with readable (pipe to an http response for example).
```

</details>

<details>
<summary>terminateBrowser(browser: Browser): Promise< void ></summary>

```js
import * as pdf from "@myunisoft/html-to-pdf";

const browser = await pdf.initBrowser();

try {
  // DO THE WORK HERE
}
finally {
  await pdf.terminateBrowser(browser);
}
```

</details>

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/nicolas-hallaert/"><img src="https://avatars.githubusercontent.com/u/39910164?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nicolas Hallaert</b></sub></a><br /><a href="https://github.com/MyUnisoft/HTML-PDF/commits?author=Rossb0b" title="Code">💻</a> <a href="https://github.com/MyUnisoft/HTML-PDF/commits?author=Rossb0b" title="Documentation">📖</a> <a href="https://github.com/MyUnisoft/HTML-PDF/commits?author=Rossb0b" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="#security-fraxken" title="Security">🛡️</a> <a href="https://github.com/MyUnisoft/HTML-PDF/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/MyUnisoft/HTML-PDF/commits?author=fraxken" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/PierreDemailly"><img src="https://avatars.githubusercontent.com/u/39910767?v=4?s=100" width="100px;" alt=""/><br /><sub><b>PierreD</b></sub></a><br /><a href="https://github.com/MyUnisoft/HTML-PDF/commits?author=PierreDemailly" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT
