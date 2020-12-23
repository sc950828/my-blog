### charles 是干什么的

Charles 是目前最主流的网络调试工具（Charles、Fiddler、Wireshark...）之一，对于一个开发者来说与网络打交道是日常需求，因此很多时候我们需要调试参数、返回的数据结构、查看网络请求的各种头信息、协议、响应时间等等。所以了解 Charles 并使用它

由于这款软件只有 30 天的免费使用期限，除非你付费。但是如果想免费使用的话也是可以的，只是每次使用不能超过 30 分钟，且启动会有 10 秒的延时，谁让不想花钱呢，就忍忍吧。

但是我们可以破解 注意破解包和我们安装的 charles 版本需要一致[破解地址](https://www.zzzmode.com/mytools/charles/)

### 使用

#### 如何捕获浏览器的请求

浏览器在 charles 打开的时候默认截取了浏览器的请求，无需任何配置

注意我们浏览器需要关闭其他的代理插件，比如翻墙软件。

#### 如何捕获手机的请求

选择菜单中的“Proxy” -> "Mac OS X Proxy"设置本机 ip 和端口号就已经配置好代理了。

把手机和电脑连接同一网络，设置代理 服务器是我们电脑的 ip 端口是我们设置的端口。

#### 上面的方法只能设置普通的 http 代理 https 的还需要安装证书

如果你需要捕获 HTTPS 协议的网络请求，那么则需要安装 Charles 的 CA 证书。

首先需要在 MAC 上安装证书。点击 Charles 顶部的菜单栏，选择 “Help” -> "SSL Proxying" -> "Install Charles Root Certificate"。

在 keychain 处将新安装的证书设置为永久信任

即使安装了 CA 证书，Charles 默认是不捕获 HTTPS 协议的网络请求，所以我们需要对某个主机下的网络请求抓包分析的话，选中该网络请求右击选中 “SSL Proxying Enabled”。这样就可以看到我们感兴趣的 HTTPS 网络请求了。 如果不想一个个点击 Enabled 可以在"proxy -> SSL Proxying Settings"里面添加`*`通配符就可以了。这个只需要设置一次就可以了。

#### 如果你需要捕获移动设备的 HTTPS 网络请求，则需要在移动设备上安装证书并作简单的设置

选择 Charles 顶部菜单栏选择 “Help” ->"Install Charles Root Certificate on a Mobile Device or Remote Browser"。然后就可以看到 Charles 弹出的安装说明了。

在手机设置好 Charles 代理的情况下，在手机浏览器输入 “chls.pro/ssl”。安装提示下载好 CA 证书。

验证刚刚安装的 CA 证书

iPhone 打开设置 -> 通用 -> 关于本机 -> 证书信任设置 -> 开启开关

设置完毕，尽情抓取你想要的 HTTPS 网络请求吧。
