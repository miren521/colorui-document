// .vuepress/enhanceApp.js
export default ({ router }) => {
  if (process.client) {  // 仅客户端执行
    router.afterEach(() => {
      if (window.adsbygoogle) {
        (adsbygoogle = window.adsbygoogle || []).push({});
      }
    });
  }
};