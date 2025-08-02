// .vuepress/enhanceApp.js
export default ({ router }) => {
  router.afterEach(() => {
    if (window.adsbygoogle) {
      (adsbygoogle = window.adsbygoogle || []).push({});
    }
  });
};
