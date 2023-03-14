module.exports = (userConfig) => (interceptedRequest) => {
    if (interceptedRequest.isInterceptResolutionHandled()) return;

    if (
      interceptedRequest.url() ===
        "https://api-my.te.eg/api/user/login?channelId=WEB_APP" &&
      interceptedRequest.headers().jwt
    ) {
      const data = JSON.parse(interceptedRequest.postData());

      userConfig.number = data?.header?.msisdn;
      userConfig.password = data?.body?.password;
    }
    interceptedRequest.continue();
  }