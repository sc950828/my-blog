### widget

要进行 Flutter 的开发，一定离不开 Widget，Widget 是 Flutter 的基础。

Flutter 中的 Widget 相当于 Android 里的 View，iOS 里的 UIView。

### 根 widget

Flutter 会默认把 根 Widget 充满屏幕。

在 Flutter 中，根 Widget 只能是以下三个：

WidgetsApp

WidgetsApp 是可以自定义风格的 根 Widget。

MaterialApp

MaterialApp 是在 WidgetsApp 上添加了很多 material-design 的功能，是 Material Design 风格的 根 Widget。

CupertinoApp

CupertinoApp 也是基于 WidgetsApp 实现的 iOS 风格的 根 Widget。

### widget 的分类

Flutter 根据 UI 是否有变化，将 Widget 分为两类

StatefulWidget

StatefulWidget 是 UI 可以变化的 Widget，创建完后 UI 还可以在更改。

StatelessWidget

StatelessWidget 是 UI 不可以变化的 Widget，创建完后 UI 就不可以在更改。

### StatefulWidget 的生命周期

StatefulWidget 的生命周期很简单，只有一个，即 createState 函数：

createState （createState 函数）

### State 的生命周期

1. moundted is true

mounted 是 boolean，只有当 mounted 为 true 时，才能使用 setState()。

2. initState

initState() 方法是在创建 State 对象后要调用的第一个方法（在构造函数之后）。

如果你要重写此方法，需要首先调用 super.initState() 方法。

3. didChangeDependencies

initState() 方法运行完后，就立即运行 didChangeDependencies() 方法。当 Widget 依赖的数据被调用时，此方法也会被调用。此外，请注意，如果您的 Widget 链接到 InheritedWidget，则每次重建此窗口小部件时都会调用此方法。

如果重写此方法，则应首先调用 super.didChangeDependencies（）。

4. build

build() 方法在 didChangeDependencies()（或者 didUpdateWidget() ）之后调用。 这是构建 Widget 的地方。

每次 State 对象更改时（或者当 InheritedWidget 需要通知“已注册”的小部件时）都会调用此方法！

为了强制重建，需要调用 setState() 方法。

5. setState()

当状态有变化，需要刷新 UI 的时候，就调用 setState()，会触发强制重建 Widget。

6. didUpdateWidget()

7. deactive

当 State 从树中移除时，就会触发 deactive。

8. dispose

当 StaefulWidget 从树中移除时调用 dispose() 方法。

可以在这里执行一些清理逻辑（例如侦听器），重写此方法时，需要首先调用 super.dispose()。

9. mounted is false

State 对象不能 remounted，所以一旦 mounted is false，就不能在使用 setState() ，会抛异常。

10. State HotReload 的生命周期 -- reassemble

在开发期间，执行 HotReload，就会触发 reassemble()，这提供了重新初始化在 initState() 方法中准备的任何数据的机会，包括全局变量。

### StatelessWidget 的生命周期就只有一个

即 build 函数：

build （build 函数）
