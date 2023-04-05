const puppeteer = require('puppeteer')
const browserPath = require('get-browser-path')
const reqHandler = require('./module/handlers/request.handler')
const resHandler = require('./module/handlers/response.handler')
const emitter = require('./module/emitter/done')

let config = {
   number: '',
   password: '',
}

const login = async (opts = { browserPath: '' }) => {
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
}
module.exports = login
