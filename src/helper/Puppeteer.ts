import {Browser} from "puppeteer";
import puppeteer from 'puppeteer-extra';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';

puppeteer.use(AdblockerPlugin());

export class Puppeteer {

  private browser: Browser | undefined

  constructor() {
  }

  async getNewPage() {
    if (this.browser === undefined) {
      this.browser = await puppeteer.launch({headless: true})
    }
    return this.browser.newPage();
  }

  async closeBrowser() {
    if (this.browser === undefined) {
      return
    }
    await this.browser.close();
  }
}