module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
      'plugin:import/typescript' // 增加对typescript的支持
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'prettier', 'react', '@typescript-eslint'],
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/prefer-default-export': 0,
      // 'import/extensions': [
      //   'error',
      //   'ignorePackages',
      //   {
      //     ignorePackages: true,
      //     pattern: {
      //       js: 'never',
      //       mjs: 'never',
      //       jsx: 'never',
      //       ts: 'never',
      //       tsx: 'never'
      //     }
      //   }
      // ],
      'no-param-reassign': 0, // 允许参数重新赋值
      'no-debugger': 2, // 禁止出现debugger
      'no-alert': 2, // 禁止使用alert confirm prompt
      'class-methods-use-this': 0, // 关闭类方法中必须使用this
      'import/prefer-default-export': 0, // 关闭模块须有export default
      'no-dupe-keys': 2, // 禁止对象中出现同名key
      'no-dupe-args': 2, // 禁止出现同名参数
      'no-use-before-define': [2, { functions: false }], // 除函数外，必须在应用前声明
      "@typescript-eslint/no-explicit-any": ["off"], // 关闭any类型的警告
    },
    overrides: [
      {
        files: ['*.js', '*.ts', '*.jsx', '*.tsx'], // 针对目标后缀名的文件
        rules: {
          'import/no-default-export': 0, // 关闭默认导出的警告
        },
      },
    ],
};
