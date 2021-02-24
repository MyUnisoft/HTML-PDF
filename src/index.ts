import { Browser } from "puppeteer";
import * as puppeteer from "puppeteer";
const compile = require('zup');

/**
 * @author HALLAERT Nicolas
 * @returns {Promise<Browser>}
 */
export async function initBrowser(): Promise<Browser> {
  try {
    return await puppeteer.launch();
  } catch (error) {
    throw new Error(error);
  }
}

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

/**
 * @author HALLAERT Nicolas
 * @description Return a buffer of generated pdfs with the payload of options used
 *
 * @param {Browser} browser
 * @param {pdfFile[]} files
 * @param {PDFOptions} [options]
 * @returns {Promise<PDF[]>}
 */
export async function generatePDF(browser: Browser, files: pdfFile[], options?: PDFOptions): Promise<PDF[]> {
  const pdfs = [];
  let pdf;

  try {
    const page = await browser.newPage();

    for (let file of files) {
      if (file.content) {
        const template = compile(file.content);
        const html = template(file?.options ?? {});

        await page.setContent(html, {
            waitUntil: 'networkidle0'
        });
      } else {
        await page.goto(file.url!, {
            waitUntil: 'networkidle0'
        });
      }

      pdf = JSON.parse(JSON.stringify(file));
      delete pdf['content'];

      pdf['options'] = options ?? undefined;
      pdf['buffer'] = await page.pdf(pdf.options);
      pdfs.push(pdf);
    }

    if (pdfs.length === 1) return pdf;
    else return pdfs;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * @author HALLAERT Nicolas
 *
 * @param {Browser} browser
 * @returns {Promise<void>}
 */
export async function terminateBrowser(browser: Browser): Promise<void> {
  try {
    await browser.close();
  } catch (error) {
    throw new Error(error);
  }

  return;
}

// module.exports.generatePDF = generatePDF;
// module.exports.initBrowser = initBrowser;
// module.exports.terminateBrowser = terminateBrowser;
