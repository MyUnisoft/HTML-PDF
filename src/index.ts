// Import Third-party Dependencies Dependencies
import puppeteer, { Browser, PDFOptions } from "puppeteer";

// Export Third-party Types
export type PuppeteerPDFOptions = PDFOptions & { paginationOffset?: number };
export type PuppeteerBrowser = Browser;

// CONSTANTS
const kEmptyPage = `<style>
      .empty-page { page-break-after: always; visibility: hidden }
    </style>
    <div class="empty-page">no content</div>`;

/**
 * @author HALLAERT Nicolas
 * @returns {Promise<Browser>}
 */
export async function initBrowser(): Promise<Browser> {
  return await puppeteer.launch();
}

export interface pdfFile {
  content?: string,
  url?: string
}

/**
 * @author HALLAERT Nicolas
 * @param {Browser} browser
 * @param {pdfFile[]} files
 * @param {PDFOptions} [options]
 * @returns {AsyncIterableIterator<PDF>}
 */
export async function* generatePDF(
  browser: Browser,
  files: pdfFile[],
  options?: PuppeteerPDFOptions
  ): AsyncIterableIterator<Buffer> {
  const { paginationOffset = 0, ...pdfOptions } = options ?? {};

  if (!browser) {
    // eslint-disable-next-line no-param-reassign
    browser = await puppeteer.launch();
  }
  const page = await browser.newPage();

  for (const file of files) {
    if (file.content) {
      for (let pageNumber = 0; pageNumber < paginationOffset; pageNumber++) {
        file.content = kEmptyPage + file.content;
      }

      await page.setContent(file.content, { waitUntil: "networkidle0" });
    }
    else if (file.url) {
      await page.goto(file.url, { waitUntil: "networkidle0" });
    }
    else {
      continue;
    }

    yield await page.pdf(paginationOffset ?
      Object.assign({}, { pageRanges: `${paginationOffset + 1}-` }, pdfOptions) :
      pdfOptions
    );
  }
}

/**
 * @author HALLAERT Nicolas
 * @param {Browser} browser
 * @returns {Promise<void>}
 */
export async function terminateBrowser(browser: Browser): Promise<void> {
  await browser.close();

  return;
}
