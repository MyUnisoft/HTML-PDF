// Import Third-party Dependencies Dependencies
import puppeteer, { Browser, PDFOptions } from "puppeteer";
import compile from "zup";

export type PuppeteerBrowser = Browser;

/**
 * @author HALLAERT Nicolas
 * @returns {Promise<Browser>}
 */
export async function initBrowser(): Promise<Browser> {
  return await puppeteer.launch();
}

export interface pdfFile {
  content?: string,
  url?: string,
  options?: unknown
}

export interface PDF {
  options?: PDFOptions,
  buffer: Buffer
}

export interface genPDFPayload {
  pdf?: PDF,
  pdfs?: PDF[]
}

/**
 * @author HALLAERT Nicolas
 * @description Return a buffer of generated pdfs with the payload of options used
 *
 * @export
 * @param {Browser} browser
 * @param {pdfFile[]} files
 * @param {PDFOptions} [options]
 * @param {boolean} [toStream=false]
 * @returns {Promise<genPDFPayload>}
 */
export async function generatePDF(
  browser: Browser,
  files: pdfFile[],
  options?: PDFOptions
): Promise<genPDFPayload> {
  if (!browser) {
    // eslint-disable-next-line no-param-reassign
    browser = await puppeteer.launch();
  }
  const page = await browser.newPage();

  const pdfs: PDF[] = [];
  for (const file of files) {
    if (file.content) {
      const template = compile(file.content);
      const html = template(file?.options ?? {});

      await page.setContent(html, { waitUntil: "networkidle0" });
    }
    else if (file.url) {
      await page.goto(file.url, { waitUntil: "networkidle0" });
    }
    else {
      continue;
    }

    pdfs.push({
      options,
      buffer: await page.pdf(options)
    });
  }

  return pdfs.length === 1 ? { pdf: pdfs[0] } : { pdfs };
}

/**
 * @author HALLAERT Nicolas
 *
 * @param {Browser} browser
 * @returns {Promise<void>}
 */
export async function terminateBrowser(browser: Browser): Promise<void> {
  await browser.close();

  return;
}
