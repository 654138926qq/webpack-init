module.exports = {
  plugins: [
      require("autoprefixer"),
      //兼容css，less编译成css自动加前缀
      require("cssnano"),
      // 压缩css
      require("postcss-cssnext"),
      // 解析pcss
      require("postcss-import")
  ]
};

