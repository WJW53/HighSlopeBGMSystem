HighSlope Platform是我个人的毕设项目----by WJW53.

# 如何使用？

## mongodb安装

服务在运行过程中需要用到mongodb数据库，因此，你需要按照下面的教程安装mongodb

[windows安装mongodb](https://www.runoob.com/mongodb/mongodb-window-install.html)

[mac安装mongodb](https://www.runoob.com/mongodb/mongodb-osx-install.html)

[linux安装mongodb](https://www.runoob.com/mongodb/mongodb-linux-install.html)

安装完成后，打开终端，输入命令`mongo --version`，看是否能打印出mongo版本号，只要能够打印出版本号即可

```shell
$ mongo --version
MongoDB shell version v4.2.6
git version: 20364840b8f1af16917e4c23c1b5f5efd8b352f8
allocator: system
modules: none
build environment:
    distarch: x86_64
    target_arch: x86_64
```

## 克隆仓库

```shell
git clone https://github.com/WJW53/HighSlopeBGMSystem.git
```

## 安装依赖

当前文件夹下pnpm i, 进入client目录下再次pnpm i; 分别对应安装node和vue项目所需依赖

## 修改配置

如果要修改某些配置，可以进入`/config/config.default.js`进行修改，该文件中注释了大量可供修改的配置

其中大部分配置都不需要进行修改，但强烈建议修改下面两个配置

```js
// 用于加密的秘钥
exports.keys = ''; // 为避免安全问题，强烈建议修改该值
```


## 启动服务

之前的步骤只需要做一次即可

完成之后，即可启动服务

进入根目录，进入终端，运行下面的命令即可启动服务

```shell

# 前后端项目开发环境
pnpm run dev

 #这是生产环境; 得先打包好相关项目, 工程化配置目录
# npm start
```

启动完成后即可关闭终端

根据配置文件，服务将监听本机的`27017`端口

重启电脑后，重新启动服务即可

## 停止服务

大部分情况下，你都无须停止服务

但如果你在服务运行过程中更改了服务端代码，例如配置内容，则需要停止服务后重新启动

如果需要停止服务，进入根目录，运行`npm stop`即可