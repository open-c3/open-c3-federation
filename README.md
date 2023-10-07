# open-c3-federation

## 说明

在企业部署了多个open-c3平台的情况下，造成的问题是数据分散，该项目通过对外提供与open-c3一致的接口调用，达到同时调用多个open-c3项目接口，并返回联合数据的目的。

## 安装

### 镜像构建

```shell
bash ./build.sh
```

上述命令将创建镜像 `open-c3-federation:latest`。

### 启动容器

请在项目根目录下创建 `data` 目录。该目录下需要包含两个文件 `.env` 和 `config.json`。请参考 `.env.example`
和 `config.json.example` 来创建对应文件。

创建完上述两个文件后，请执行该命令启动容器:

```shell
bash ./restart.sh
```

上述命令将创建一个名为 `open-c3-federation` 的容器，该容器监听`config.json`中配置的端口。

# 文档地址

http://x.x.x.x:57289/apidocs/#/