// .vuepress/enhanceApp.js
export default ({ router }) => {
  // 方法1：使用 typeof window 判断客户端环境（推荐）
  if (typeof window !== 'undefined') {
    router.afterEach(() => {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    });
  }
};