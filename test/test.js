const { should } = require("chai");
const puppeteer = require("puppeteer");
// const LoginLogic = require('../src/Pages/Login/LoginLogic')
const expect = require("chai").expect;
const assert = require("chai").assert;

describe("Testing Login form",()=> {
  it("------check email and password formate and accept----- ", async ()=> {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 150,
    });
    const emailRegex =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector('#email')
    await page.click('#email')
    await page.click('#password')
    // await page.waitForSelector("#email-helper-text")
    // const text = await page.$eval("#email-helper-text", (e) => e.textContent);
    // expect(text).contain("E-mail is required");
    heading = await page.$eval('h1', heading => heading.innerText);
    expect(heading).is.eql("Admin - Login")
    await page.type("#email", "test@gmail.com", { delay: 70 });
    await page.type("#password", "123123123", { delay: 70 });
    await page.click("#loginbtn");
    
    await page.click('#clrbtn')
    await page.click('#forgotbtn')
    await page.click("#email2")
    await page.type("#email2","test@gmail.com")
    await page.click("#sendbtn")
    await page.click('#lgnbtn') 
    await browser.close();
  }).timeout(50000);


 

});

// describe("testing array functions", function () {
//   it("testing array", () => {
//     const arrayFun = () => [1, 2, 3];
//     assert.isArray(arrayFun([1, 2, 3]));
//   });
// });
