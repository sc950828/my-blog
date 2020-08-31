### flutter 是什么

Flutter 使用 Dart 语言开发。Flutter 是 Google 开源的新一代跨平台 UI 框架。不同于其他我们熟知的移动端跨平台方案，Flutter 更像游戏引擎，因为 Flutter 有自己的渲染引擎：我们在 Flutter 上写了界面后，Flutter 会在自己的 canvas 上渲染，移动端不负责绘制。

### 配置 flutter 中国镜像

在 ~/.bash_profile 上添加：

```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

保存文件后，在运行使配置生效

```shell
$ source ~/.bash_profile
```

### 安装 flutter sdk 并配置

在 ~/.bash_profile 上添加（没有 .bash_profile ,可以新建一个）：

```
export FLUTTER_HOME=/Users/randy/fluttersdk/flutter
export PATH=$PATH:$FLUTTER_HOME/bin
```

保存文件后，在运行使配置生效

```shell
$ source ~/.bash_profile
```

### 搭建 android 环境

下载安装 android studio 并创建模拟器

在 ~/.bash_profile 上添加：

```
export ANDROID_HOME=/Users/randy/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

保存文件后，在运行使配置生效

```shell
$ source ~/.bash_profile
```

### 搭建 ios 环境

mac 电脑只需要安装 xcode 就可以了

### vscode 开发 flutter 项目只需要下载 flutter 插件即可
