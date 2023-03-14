# We TE Login

simple module for login into we (telecom egypt) using web automation with puppeteer

## Installation

```bash
npm install we-login
```

## Usage

```js
const {login, loginWeb} = require('we-te-login');

// normal login useing functtion
login('022713XXXX', '*********').then((res) => {
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
