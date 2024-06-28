# ⚠️ Changes in WE login system making this package not working
deprecated

# We TE Login
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-downloads-url]
[![MIT License][license-image]][license-url]

simple module for login into we (telecom egypt) using web automation with puppeteer

## Installation

```bash
npm install we-te-login
```

## Usage

```js
const {login, loginWeb} = require('we-te-login');

// normal login useing functtion
login('022713XXXX', '*********').then((res) => {
    console.log(res);
    res->{
         number: '022713XXXX',
        password: 'T0da89******' //encrypted with 'we' encryption algorithm,
        token: 'eyJrdasdawddcvb...',
        customerId: '101101xxx',
        customerName: 'Ahmed'
    }
}).catch((err) => {
    console.log(err);
});

login('022713XXXX', '*********',{skipEncryption:true}).then((res) => {
    console.log(res);
    res->{
        number: '022713XXXX',
        password: '**********' //not encrypted,
        token: 'eyJrdasdawddcvb...',
        customerId: '101101xxx',
        customerName: 'Ahmed'
    }
}).catch((err) => {
    console.log(err);
});

// login using web automation with puppeteer
// NOTE !!!!!!!!!!!
// by default the module will use edg or chrome if installed and in default path
// if you want to use different browser you can pass the path to the browser to webBrowserPath
// just like the example below
loginWeb({webBrowserPath:'apps/browser/firefox.exe'}).then((res) => {
    console.log(res);
    res->{
         number: '022713XXXX',
        password: 'T0da89******' //encrypted,
        token: 'eyJrdasdawddcvb...',
        customerId: '101101xxx',
        customerName: 'Ahmed'
    }
}).catch((err) => {
    console.log(err);
});

```

[license-image]: https://img.shields.io/badge/license-ISC-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/we-te-login
[npm-version-image]: https://img.shields.io/npm/v/we-te-login.svg?style=flat

[npm-downloads-image]: https://img.shields.io/npm/dm/we-te-login.svg?style=flat
[npm-downloads-url]: https://npmcharts.com/compare/we-te-login?minimal=true
