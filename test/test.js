const { should } = require("chai");
const puppeteer = require("puppeteer");
// const LoginLogic = require('../src/Pages/Login/LoginLogic')
const expect = require("chai").expect;
const assert = require("chai").assert;

describe("Testing form",()=> {
  it("------ Front end testing ----- ", async ()=> {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 150,
      defaultViewport: null,
    });
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
    await page.type("#email", "snayak@apexaglobal.com", { delay: 70 });
    await page.type("#password", "1234", { delay: 10 });
    await page.click("#loginbtn");
    await page.waitForTimeout(5000)
    // heading = await page.$eval('div', heading => heading.innerText);
    // expect(heading).is.eql("Apexa Group");
    // await page.waitForResponse()
    // await page.goto("http://localhost:3000/candidate-master")
    
    // await page.click("#candidateMasterBtn");
    // await page.waitForTimeout(5000);
    // await page.type("#fullnamec","A Karthikeyan")
    // await page.type("#contactc","9591482467")
    // await page.type("#ids","22864")
    // await page.type("#status","Active")
    // await page.click("#filter")
    // await page.waitForTimeout(5000)
    // await page.click('#newcandidate');
    // await page.waitForTimeout(5000);
    // await page.type("#fullname","This is the front end testing demo")
    // await page.type("#birthdate","05-08-1999")
    // await page.click('#male');
    // await page.type("#permAddress","This is front end testing address")
    // await page.type("#city","This is front end testing city")
    // await page.type("#state","This is front end testing state")
    // await page.type("#zipcode","413203")
    // await page.click("#searchzip")
    // await page.waitForTimeout(5000);
    // await page.click("#sameaddress")
    // await page.waitForTimeout(5000);
    // await page.type("#primaryemail","primaryemailfordemo@gmailss.com")
    // await page.type("#secondaryemail","primaryemailfordemo@gmailss.com")
    // await page.type("#primarycontact","9000987657")
    // await page.type("#secondarycontact","9000987657")
    // await page.type("#aadhar","900098765697")
    // await page.click("#isactive")
    // await page.click("#savenext")
    // await page.waitForTimeout(5000);
    // await page.click("#closemodal")
    // await page.waitForTimeout(5000);
    

    //For the candidate verification module
    // await page.click("#candidateUploadBtn")
    // await page.waitForTimeout(5000);
    await page.click("#candidateVerificationBtn")
    await page.waitForTimeout(5000);
    await page.type("#candidateVerification","RAM JAYNESH")
    await page.waitForTimeout(4000)
    // await page.click("#assignbtn")
    // await page.click("#editrecord")
    // await page.waitForTimeout(8000)
    // await page.waitForSelector("#candidateConsent");
    // await page.type("#candidateConsent","Consent Pending")
  
    // await page.type("#candidateConsent","Consent Pending")
    // await page.select("#callStat","Call Back")

    // await page.click("#closemodal")
    // await page.waitForTimeout(5000);


    //For the agent master module
    await page.click("#agentmaster")
    await page.waitForTimeout(4000)
    await page.click("#addnewagent")
    // await page.click("#companyid")
    // await page.type("#companyname","Adding company")
    // await page.type("#gstin","Adding GSTIN")
    // await page.type("#agentNo","ABABAB-123")
    // await page.type("#agentfullname","Agent master name")
    // await page.type("#agentbirth","Agent birthdate")
    // await page.click("#agentgender")
    // await page.type("#agentemail","Agentemail@gg.co")
    // await page.type("#agentcontact","9900990099")
    // await page.type("#curraddress","Agent current address")
    // await page.type("#currpin","413203")
    // await page.type("#currcity","Agent current city")
    // await page.type("#currstate","Agent current state")
    // await page.type("#sameaddress","Agent same address")
    // await page.type("#pancard","awasas1212a")
    // await page.type("#aadharcard","123123123123")
    // await page.click("#activeagent")
    
    // await page.click("#professional")
    // await page.type("#bankname","HSB Bank")
    // await page.type("#acno","12345678")
    // await page.type("#ifsc","HSB123")
    // await page.type("#actype","HSB123")
    // await page.type("#pfstatus","SD")
    // await page.type("#subwork","City")
    // await page.select("#poi","Pan Card")
    // await page.select("#poa","Electricity Bill")
    // await page.select("#bd","Bank Statement")
    // const [fileChooser] = await Promise.all([
    //   page.waitForFileChooser(),
    //   page.click('#upload-file-button'),
    //   // some button that triggers file selection
    // ]);
    // await page.waitForTimeout(4000)
    // await fileChooser.accept([`../../../../../Downloads/Navnaath Salary slip April'23.pdf`]);
    // await page.click("#uploaddone")
    // await page.waitForTimeout(3000)

    await page.click("#closemodal")
    // await page.click("#savbtn")
    await page.waitForTimeout(5000)


    await page.click("#agentpricing")
    await page.waitForTimeout(5000);
    await page.type("#agentpri","Test 11")
    await page.waitForTimeout(4000)
    await page.click("#addagentpricing")
    await page.type("#tempName","Adding temp")
    await page.type("#approval","Adding new temp")
    await page.click("#closemodal")
    await page.waitForTimeout(4000)
    await page.click("#opendrawer")
    await page.click("#adminsection")
    await page.waitForTimeout(4000)
    await page.click("#admincandidate")
    await page.waitForTimeout(5000)
    // await page.click("#pendingapproval")
    // await page.waitForTimeout(5000)
    // await page.click("#processed")
    // await page.click("#processed")
    await page.click("#adminbatchpriority")
    await page.waitForTimeout(5000)
    await page.click("#editbtn")
    // await page.select("#batchNo","187")
    // await page.click("#closemodals")
    await page.click("#adminotherindustry")
    await page.waitForTimeout(5000)
    await page.click("#adminuseractivity")
    await page.waitForTimeout(5000)
    await page.click("#adminuserlogin")
    await page.waitForTimeout(5000)
    await page.click("#otherm")
    await page.waitForTimeout(2000)
    await page.click("#categoryBtn")
    await page.waitForTimeout(5000)
    await page.type("#searchCategory","BUSINESS DEVELOPMENT MANAGER")
    await page.click("#editrecord")
    await page.waitForTimeout(4000)
    await page.click("#closemodal")
    await page.click("#companyBtn")
    await page.waitForTimeout(5000)
    await page.click("#customerBtn")
    await page.waitForTimeout(5000)
    await page.click("#industryBtn")
    await page.waitForTimeout(5000)
    await page.click("#roleBtn")
    await page.waitForTimeout(5000)
    await page.click("#skillsetBtn")
    await page.waitForTimeout(5000)
    await page.click("#subscriptionBtn")
    await page.waitForTimeout(5000)
    await page.click("#userBtn")
    await page.waitForTimeout(5000)
    await browser.close();



  }).timeout(500000);

  
 

});

// describe("testing candidate master", function () {
//   it("testing array", async() => {
//     const browser = await puppeteer.launch({
//       headless: false,
//       slowMo: 150,
//     });
//     const page = await browser.newPage();
//     await page.goto("http://localhost:3000/candidate-master");
//     await page.click("#candidateMasterBtn");
//     await page.waitForTimeout(5000);
//     await page.click('#newcandidate');
//     await page.waitForTimeout(10000);
//     await page.type("#fullname","This is the front end testing")
//     await page.type("#birthdate","05-08-1999")
//     await page.type("#permAddress","This front end testing address")
//     await browser.close();
//   }).timeout(50000)
// });
