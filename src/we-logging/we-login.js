const puppeteer = require("puppeteer");
const browserPath = require('get-browser-path')

const reqHandler = require("./module/handlers/request.handler");
const resHandler = require("./module/handlers/response.handler");
const emitter = require("./module/emitter/done");

let config = {
  number: "",
  password: "",
  
};

const loginWeb = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        args: ["--incognito"],
        executablePath: browserPath(),
        defaultViewport:false
      });

      const [page] = await browser.pages();

      await page.goto("https://my.te.eg/");
      await page.setRequestInterception(true);

      page.on("request", reqHandler(config));
      page.on("response", resHandler(config));
      emitter.on("done", (userConfig) => {
        browser.close();
        resolve(userConfig);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const login = async (number,password) => {
  const preToken = "https://api-my.te.eg/api/user/generatetoken?channelId=WEB_APP"
  const loginUrl = "`https://api-my.te.eg/api/user/login?channelId=WEB_APP`"

  

};
module.exports = login;
