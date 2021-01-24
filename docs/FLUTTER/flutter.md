## flutter 文档

[flutter 中文文档](https://flutterchina.club/setup-macos/)

## flutter 简介

Flutter 使用 Dart 语言开发。Flutter 是 Google 开源的新一代跨平台 UI 框架。不同于其他我们熟知的移动端跨平台方案，Flutter 更像游戏引擎，因为 Flutter 有自己的渲染引擎：我们在 Flutter 上写了界面后，Flutter 会在自己的 canvas 上渲染，移动端不负责绘制。

## 配置

注意: 如果你使用的是 zsh，终端启动时 ~/.bash_profile 将不会被加载，解决办法就是修改 ~/.zshrc ，在其中添加：source ~/.bash_profile

### 配置 flutter 中国镜像

在 ~/.bash_profile 上添加：

```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

保存文件后，在运行使配置生效

```shell
source ~/.bash_profile
```

### 安装 flutter sdk 并配置

在 ~/.bash_profile 上添加（没有 .bash_profile ,可以新建一个）：

```
export FLUTTER_HOME=/Users/randy/fluttersdk/flutter
export PATH=$PATH:$FLUTTER_HOME/bin
```

保存文件后，在运行使配置生效

```shell
source ~/.bash_profile
```

我们使用 `flutter doctor`检查我们的配置是否成功

### 搭建 android 环境

下载安装 android studio 并创建模拟器

在 ~/.bash_profile 上添加：

```
export ANDROID_HOME=/Users/randy/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

保存文件后，在运行使配置生效

```shell
source ~/.bash_profile
```

### 搭建 ios 环境

mac 电脑只需要安装 xcode 就可以了

在项目根目录下使用 `open ios/Runner.xcworkspace`启动 xcode 打开项目

### vscode 开发 flutter

只需要下载 flutter 插件即可

### android 开发 flutter

需要下载 Flutter Dart 插件
