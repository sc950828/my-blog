### 代理

我们知道 postman 主要是用来做接口测试的，但是其实它还有一个强大的代理功能，类似于 charles 和 fiddler。

#### 开启代理

打开 postman

找到小雷达图标 Capture requests 点击

我们把 proxy 打开 设置好端口 知道我们本机的 ip 我们的代理就设置好了

#### 截取浏览器的请求

postman 的代理不向 charles 和 fiddler 一样自动设置浏览器的代理，我们需要找到我们电脑代理设置 配置到我们刚刚开启的代理上，这样浏览器的请求就都会在 postman 上出现。

但是 https 请求我们还是获取不到结果我们需要设置 postman，打开 setting 找到 SSL certificate verification 把它关闭即可

#### 截取手机上的请求

把手机和电脑连接到同一无线，在手机上设置我们刚开启的代理 这样我们手机上的请求就都会在 postman 上出现。

但是 https 请求我们还是获取不到结果我们需要设置 postman，打开 setting 找到 SSL certificate verification 把它关闭即可
