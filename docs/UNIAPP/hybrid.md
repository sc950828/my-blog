## Hybrid app 本质

在原生 app 中使用 webview 作为容器来承载一个 web 页面

## JSBridge

### 定义

一座用 JavaScript 搭建起来的桥 一端是 web 一端是 Native

### 目的

让 Native 可以调用 web 的 JavaScript 代码 让 web 可以调用 Native 的原生代码

## 相互调用

### 原生调用 web 方法

原生端调用 web 端的 js 方法必须是挂载到 window 对象上的方法。

android 端

```java
// Native调用js方法
private void isAutoUser () {
    String username = mSpHelper.getAutoUser();
    if (TextUtils.isEmpty(username)) {
        return;
    }

    // 原生调用 JS 方法， 调用的是绑定到window上面的方法
    // 保存当前登录的用户名到 web
    mWebView.evaluateJavascript("javascript:nativeFunctionUserLogin('" + username + "')", new ValueCallback<String>() {
        @Override
        public void onReceiveValue(String s) {

        }
    });
}
```

ios 端

```c
[self.webView evaluateJavaScript:@"registerCallback(true)" completionHandler:nil];
```

### web 调用原生方法

构建 JSBridge 对象 这里提供的 JSBridge 的方法会被挂载到网页的 window 对象上

#### android 注册给 web 端调用的方法

web 端调用原生的方法 使用 window.androidJSBridge.xxx xxx 是 MyJaveScriptInterface 里面的方法。例如 window.androidJSBridge.aliPay()

js 调用 Native 原生方法传递的参数必须是基本类型的数据 不能是引用数据类型。如果想传递对象需要使用 JSON.stringify()

android 在暴露给 web 端调用的方法能直接有返回值

```java
addJavascriptInterface(new MyJaveScriptInterface(mContext), "androidJSBridge");

// MyJaveScriptInterface类里面的方法
// js调用Native原生方法传递的参数必须是基本类型的数据 不能是引用数据类型
// 如果想传递对象需要使用JSON.stringify()
@JavascriptInterface
public void aliPay (String payJson) {
  aliPayHelper.pay(payJson);
}
```

#### ios 注册给 web 端调用的方法

web 端调用原生的方法 使用 window.webkit.messageHandlers.xxx 例如 window.webkit.register() 与 android 不同的是这里的 JSBridge 名字是固定的 webkit.messageHandlers

js 调用 Native 原生方法传递的参数可以是基本类型和引用数据类型。如果方法需要传递参数 我们调用的方式还得改成 window.webkit.messageHandlers.xxx.postMessage(params)

ios 在暴露给 web 端调用的方法不能直接有返回值 如果需要有返回值需要再调用 web 端的方法来传递参数

```c
#pragma mark -  OC注册供JS调用的方法
- (void)addScriptFunction {
    self.wkUserContentController = [self.webView configuration].userContentController;

    [self.wkUserContentController addScriptMessageHandler:self name:@"register"];
    [self.wkUserContentController addScriptMessageHandler:self name:@"login"];
    [self.wkUserContentController addScriptMessageHandler:self name:@"logout"];
}

#pragma mark - 注册方法
- (void)register:(id)body {
     NSDictionary *dict = body;
    [self.userDefaults setObject:[dict objectForKey:@"password"] forKey:[dict objectForKey:@"username"]];
    [self.webView evaluateJavaScript:@"registerCallback(true)" completionHandler:nil];
}
```

## android ios 的双向通讯对比

### 相同点

1. 都是通过 WebView 来完成网页的加载
2. 都是通过向 Window 注入对象的方式来提供可被 Web 端调用的方法
3. 都可以直接使用 evaluateJavaScript 调用 Web 端挂载到 window 对象下的方法

### 不同点

1. 注入对象的不同： android 可以提供注入对象名。 ios 固定为 webkit
2. js 调用 Native 方式不同： android 可直接获取注入对象调用方法。而 ios 为相对固定的写法 使用 window.webkit
   .messageHandlers.方法名.postMessage(参数)
3. 接受 web 端传递来的数据格式不同： android 只能接受基本数据类型，传递对象需要用到 JSON.stringify()方法。而 ios 可以接受任意类型的数据
4. 返回值的不同：android 在 web 端可以直接接受 andriod 方法的返回值。而 ios 只能通过再次调用 web 端方法来传递值

### android 代码实例

```java
import android.app.Application;

import com.tencent.smtt.sdk.QbSdk;

// 初始化app
public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        // TODO Auto-generated method stub
        super.onCreate();
        //搜集本地tbs内核信息并上报服务器，服务器返回结果决定使用哪个内核。

        QbSdk.PreInitCallback cb = new QbSdk.PreInitCallback() {

            @Override
            public void onViewInitFinished(boolean arg0) {
                // TODO Auto-generated method stub
                //x5內核初始化完成的回调，为true表示x5内核加载成功，否则表示x5内核加载失败，会自动切换到系统内核。
            }

            @Override
            public void onCoreInitFinished() {
                // TODO Auto-generated method stub
            }
        };
        //x5内核初始化接口
        QbSdk.initX5Environment(getApplicationContext(),  cb);
    }
}
```

```java
package cn.sunday.imoochybridandroidnative.views;


import android.app.AlertDialog;
import android.content.Context;
import android.util.AttributeSet;

import com.tencent.smtt.export.external.interfaces.JsResult;
import com.tencent.smtt.sdk.WebChromeClient;
import com.tencent.smtt.sdk.WebSettings;
import com.tencent.smtt.sdk.WebView;
import com.tencent.smtt.sdk.WebViewClient;

import java.util.Map;

import cn.sunday.imoochybridandroidnative.jsInterface.MyJaveScriptInterface;

public class X5WebView extends WebView {

//    上下文
    private Context mContext;
//    回调接口
    private OnWebViewListener onWebViewListener;

    public void setOnWebViewListener(OnWebViewListener onWebViewListener) {
        this.onWebViewListener = onWebViewListener;
    }

    public X5WebView(Context context) {
        super(context);
        init(context);
    }

    public X5WebView(Context context, AttributeSet attributeSet) {
        super(context, attributeSet);
        init(context);
    }

    public X5WebView(Context context, AttributeSet attributeSet, int i) {
        super(context, attributeSet, i);
        init(context);
    }

    public X5WebView(Context context, AttributeSet attributeSet, int i, boolean b) {
        super(context, attributeSet, i, b);
        init(context);
    }

    public X5WebView(Context context, AttributeSet attributeSet, int i, Map<String, Object> map, boolean b) {
        super(context, attributeSet, i, map, b);
        init(context);
    }

    private void init (Context context) {
        this.mContext = context;
//      打开此代码可使移动设备链接 chrome 调试
//        setWebContentsDebuggingEnabled(true);

//        设置 jsBridge
        addJavascriptInterface(new MyJaveScriptInterface(mContext),
                "androidJSBridge");

//        webView 设置
        initWebViewSettings();
//        webClient 设置
        initWebViewClient();
//        chromeClient 设置
        initChromeClient();
    }

    /**
     * webView 设置
     */
    private void initWebViewSettings () {
        WebSettings webSettings = getSettings();
//        允许运行 js 代码
        webSettings.setJavaScriptEnabled(true);
//        不可缩放
        webSettings.setSupportZoom(false);
        webSettings.setBuiltInZoomControls(false);
        webSettings.setDisplayZoomControls(true);
//        设置缓存策略
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
    }

    /**
     * webClient 设置
     */
    private void initWebViewClient () {
//        设置网页在APP 内部打开，而不是用外部浏览器
        setWebViewClient(new WebViewClient(){
        });
    }

    /**
     * chromeClient 设置
     */
    private void initChromeClient () {
        setWebChromeClient(new WebChromeClient(){
            @Override
            public void onProgressChanged(WebView webView, int i) {
                super.onProgressChanged(webView, i);

//                回调网页加载状态
                if (onWebViewListener != null) {
                    onWebViewListener.onProgressChanged(webView, i);
                }
            }

            /**
             * 监听alert弹出框，使用原生弹框代替alert。
             */
            @Override
            public boolean onJsAlert(WebView webView, String s, String s1, JsResult jsResult) {

                AlertDialog.Builder builder = new AlertDialog.Builder(mContext);
                builder.setMessage(s1);
                builder.setNegativeButton("确定", null);
                builder.create().show();
                jsResult.confirm();

                return true;
            }
        });
    }

    public interface OnWebViewListener {
        void onProgressChanged(WebView webView, int progress);
    }
}
```
