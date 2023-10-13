# 开发环境/前端

> 该项目是用于`OPEN-C3`联邦运维平台， 基于Vite + React + Typescript 构建。

## Pre-work

### 包管理工具

- pnpm `JS包管理工具`

> 运行pnpm时 需要保证node版本在16.14.0以上
> `npm install -g pnpm`

- vite `前端配置打包脚手架`

> `pnpm create vite`

## 目录结构

```markdown
|--src
   |--env
      |--.env # 放置公用配置
      |--.env.local # 放置敏感配置
      |--.env.development # 放置开发环境配置
      |--.env.production # 放置生产环境配置
    |--components # 组件
    |--hooks # hooks
    |--assets # 静态文件
        |--images # 图片
        |--fonts # 字体文件
        |--svg # svg文件
        |--js # js文件
    |--layouts # 布局组件
    |--common # 基础工具
    |--uitls # 辅助函数
    |--styles # 样式文件
    |--pages # 页面
    |--routes # 路由文件
    |--stores # 状态管理
    |--mian.tsx # 主入口
    |--App.tsx # App文件
|--tests # 测试文件
|--types # 声明文件
|--index.html
|--vite-env.d.ts
|--typings.d.ts # 全局定义类型
|--tsconfig.json # ts 配置
|--vite.config.ts # vite 配置
|--package.json
|--CHANGELOG.md # 构建日志
|--.versionrc.cjs # 项目变更日志自定义配置
|--.prettierrc.cjs # prettier文件自定义配置
|--.eslintrc.cjs # Eslint自定义配置
|--.stylelintrc.cjs # StyleLint自定义配置
|--.gitignore
|--.stylelintignore # Stylelint忽略检查的文件类型
|--pnpm-lock.yaml
```

## 命令执行

- 安装依赖

> `pnpm install`

- 运行项目

> `pnpm run dev` 或 `pnpm dev`

- 打包构建

> `pnpm run build` 或 `pnpm build`

## 代码提交

- 默认提交方式

> `git commit - m 'feat(index):update'`
