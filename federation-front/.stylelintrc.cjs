module.exports = {
  root: true,
  extends: ['stylelint-config-standard'],
  rules: {
      indentation: 2, // 缩进2个空格
      'function-url-quotes': 'never',// url不需要引号
      'color-hex-case': 'lower', // 16进制颜色小写
      "string-quotes":"single", // 单引号
      "number-leading-zero": "never", // 小数不带0
  }
};
