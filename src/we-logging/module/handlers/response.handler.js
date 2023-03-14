const emitter = require("../emitter/done");
module.exports = (userConfig) => async (response) => {
  if (
    response.url() ===
      "https://api-my.te.eg/api/user/login?channelId=WEB_APP" &&
    response?.request()?.headers()?.jwt
  ) {
    let status = response?.status();

    if (!(status && !(status > 299 && status < 400) && !(status === 204)))
      return;

    let res = await response.json();
    
    userConfig.token = res?.body?.jwt
    userConfig.customerId = res?.header?.customerId
    userConfig.customerName = res?.body?.customerName


    if (res?.body && res?.body?.status === "2" && res?.body?.jwt) {
      emitter.emit("done", userConfig);
    }
  }
};
