const puppeteer = require("puppeteer");
const browserPath = require("get-browser-path");
const axios = require("axios");

const reqHandler = require("./module/handlers/request.handler");
const resHandler = require("./module/handlers/response.handler");
const emitter = require("./module/emitter/done");

const encrypt = require("./utils/password-encryption");


let config = {
  number: "",
  password: "",
};

// this module is a f*cking piece of art
const loginWeb = async (opts={webBrowserPath:''}) => {
   return new Promise(async (resolve, reject) => {
      try {
         const b = browserPath()
         if (!opts.browserPath && !b) {
            throw new Error('no browser detected')
         }
         const browser = await puppeteer.launch({
            headless: false,
            args: ['--incognito', '--disable-gpu'],
            ignoreDefaultArgs: ['--disable-setuid-sandbox', '--no-sandbox'],
            executablePath: opts?.browserPath || b, // || b
            defaultViewport: false,
         })

         const [page] = await browser.pages()

         await page.goto('https://my.te.eg/')
         await page.setRequestInterception(true)

         page.on('request', reqHandler(config))
         page.on('response', resHandler(config))
         emitter.on('done', async (userConfig) => {
            await browser.close()
            resolve(userConfig)
         })
         browser.on('disconnected', async () => {
            await browser.close()
            reject(new Error('browser closed'))
         })
      } catch (error) {
         reject(error)
      }
   })
};

const login = async (number, password,opts={skipEncryption:false}) => {
  const preTokenUrl =
    "https://api-my.te.eg/api/user/generatetoken?channelId=WEB_APP";
  const loginUrl = "https://api-my.te.eg/api/user/login?channelId=WEB_APP";

  if (!opts.skipEncryption) {
    password = encrypt(password)
  }
  const payload = {
    body: {
      password: password,
    },

    header: {
      msisdn: number,
      numberServiceType: "FBB",
      locale: "en",
    },
  };

  const headers = {
    Jwt: "",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    Host: "api-my.te.eg",
    Origin: "https://my.te.eg",
    Referer: "https://my.te.eg/",
  };

  const preTokenRes = await axios.get(preTokenUrl);

  if (!preTokenRes?.data?.body?.jwt || !preTokenRes?.data?.body)
    throw new Error("we server is down or not responding");

  const preToken = preTokenRes?.data?.body?.jwt;
  headers.Jwt = preToken;

  let token = await axios.post(loginUrl, payload, {
    headers,
  });

  if (!token?.data?.body?.jwt) throw new Error("wrong password or number");

  customerId = token?.data?.header?.customerId;
  customerName = token?.data?.body?.customerName;
  token = token?.data?.body?.jwt;

  return {number,password , token , customerId , customerName}
};

// login('022xxx','*********').then((data)=>{
//   console.log(data);
// })
// loginWeb().then((data)=>{
//   console.log(data);
// })

module.exports = {login,loginWeb};