// Require third part Dependencies
import { Browser } from "puppeteer";
import * as puppeteer from "puppeteer";
import * as fs from "fs";
const compile = require('zup');

/**
 * @author HALLAERT Nicolas
 * @returns {Promise<Browser>}
 */
export async function initBrowser(): Promise<Browser> {
  try {
    return await puppeteer.launch();
  }
  catch (error) {
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
 * @export
 * @param {Browser} browser
 * @param {pdfFile[]} files
 * @param {PDFOptions} [options]
 * @param {boolean} [toStream=false]
 * @returns {Promise<PDF[]>}
 */
export async function generatePDF(browser: Browser, files: pdfFile[], options?: PDFOptions, toStream: boolean = false): Promise<PDF[] | PDF | fs.ReadStream> {
  const pdfs = [];
  let pdf;

  if (toStream && files.length > 1) {
    throw new Error("Cannot handle stream for multiple files");
  }

  try {
    const page = await browser.newPage();

    for (let file of files) {
      pdf = JSON.parse(JSON.stringify(file));
      pdf['options'] = options ?? undefined;

      if (file.content) {
        const template = compile(file.content);
        const html = template(file?.options ?? {});
        delete pdf['content'];

        await page.setContent(html, {
          waitUntil: 'networkidle0'
        });
      }
      else {
        delete pdf['url'];

        await page.goto(file.url!, {
            waitUntil: 'networkidle0'
        });
      }

      if (toStream) {
        const buffer = await page.pdf(pdf.options);
        await terminateBrowser(browser);

        const writableStream = fs.createWriteStream('generated.pdf');
        writableStream.write(buffer);

        const readableStream = fs.createReadStream('generated.pdf');

        readableStream.on('end', () => {
          fs.unlink('generated.pdf', (error) => {
            if (error) throw new Error(error.code);
          })
        })

        return readableStream;
      }

      pdf['buffer'] = await page.pdf(pdf.options);
      pdfs.push(pdf);
    }

    if (pdfs.length === 1) return pdf;
    else return pdfs;
  }
  catch (error) {
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
  }
  catch (error) {
    throw new Error(error);
  }

  return;
}
