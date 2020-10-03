import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Product list editor', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should open editor form', async () => {
    await page.goto(baseUrl);
    const addBtn = await page.$('.btn.small-btn.add-btn');
    addBtn.click();
    await page.waitForSelector('.editor-form', { visible: true });
  });

  test('should close editor form with cancel button', async () => {
    await page.goto(baseUrl);
    const addBtn = await page.$('.btn.small-btn.add-btn');
    addBtn.click();
    await page.waitForSelector('.editor-form', { visible: true });
    const formEl = await page.$('.editor-form');
    const cancelBtn = await formEl.$('[name="cancel"]');
    cancelBtn.click();
    await page.waitForSelector('.editor-form', { hidden: true });
  });

  test('should add new product to the product list', async () => {
    await page.goto(baseUrl);
    const addBtn = await page.$('.btn.small-btn.add-btn');
    addBtn.click();
    await page.waitForSelector('.editor-form', { visible: true });
    const formEl = await page.$('.editor-form');
    const nameInput = await formEl.$('[name="name"]');
    nameInput.focus();
    await nameInput.type('phone');
    const costInput = await formEl.$('[name="cost"]');
    costInput.focus();
    await costInput.type('20000');
    const saveBtn = await formEl.$('[name="save"]');
    saveBtn.click();
    await page.waitForSelector('.editor-form', { hidden: true });
    await page.waitForSelector('tr[data-product-name="phone"]');
  });

  test('should show error message', async () => {
    await page.goto(baseUrl);
    const addBtn = await page.$('.btn.small-btn.add-btn');
    addBtn.click();
    await page.waitForSelector('.editor-form', { visible: true });
    const formEl = await page.$('.editor-form');
    const saveBtn = await formEl.$('[name="save"]');
    saveBtn.click();
    await page.waitForSelector('.error-message');
  });
});
