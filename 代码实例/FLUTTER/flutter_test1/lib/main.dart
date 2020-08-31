import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
        // This makes the visual density adapt to the platform that you run
        // the app on. For desktop platforms, the controls will be smaller and
        // closer together (more dense) than on mobile platforms.
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Randy Title'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  int _counter = 0;
  String _userGender;
  String _userName;
  String _userPassword;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Image.asset("images/randy.jpg", height: 200.0),
            Image.network(
                "https://cdn.jsdelivr.net/gh/flutterchina/website@1.0/images/flutter-mark-square-100.png",
                fit: BoxFit.cover),
            Text(
              "randy",
              style: TextStyle(
                color: Colors.red,
                fontSize: 20.0,
                background: new Paint()..color = Colors.yellow,
              ),
            ),
            RichText(
              text: TextSpan(children: [
                TextSpan(text: "Hello", style: TextStyle(color: Colors.blue)),
                TextSpan(text: "Flutter", style: TextStyle(color: Colors.red))
              ]),
            ),
            Icon(
              Icons.android,
              size: 50.0,
              color: Colors.green,
            ),
            TextField(
                onChanged: (String data) {
                  // 实时获取
                  print(data);
                },
                textInputAction: TextInputAction.search),
            Form(
                key: _formKey,
                child: Column(
                  children: <Widget>[
                    // DropdownButtonFormField<String>(
                    //   value: _userGender,
                    //   items: ['男', '女']
                    //       .map((label) => DropdownMenuItem(
                    //             child: Text(label),
                    //             value: label,
                    //           ))
                    //       .toList(),
                    //   onChanged: (value) {
                    //     setState(() {
                    //       _userGender = value;
                    //     });
                    //   },
                    //   onSaved: (value) {
                    //     _userGender = value;
                    //   },
                    // ),
                    TextFormField(
                      decoration: InputDecoration(hintText: '用户名'),
                      validator: (value) {
                        // 校验
                        if (value?.length <= 5) {
                          return '用户名必须大于 5 个字符';
                        }
                      },
                      onSaved: (value) {
                        _userName = value;
                      },
                    ),
                    TextFormField(
                      decoration: InputDecoration(hintText: '密码'),
                      obscureText: true,
                      validator: (value) {
                        if (value?.length <= 8) {
                          // 校验
                          return '密码必须大于 8 个字符';
                        }
                      },
                      onSaved: (value) {
                        _userPassword = value;
                      },
                    ),
                    RaisedButton(
                      child: Text('注册'),
                      onPressed: () {
                        if (_formKey.currentState.validate()) {
                          _formKey.currentState.save();
                          print(_userGender);
                          print(_userName);
                          print(_userPassword);
                        }
                      },
                    )
                  ],
                )),
            Builder(
                builder: (context) => RaisedButton(
                    child: Text('Show SnackBar'),
                    onPressed: () {
                      Scaffold.of(context).showSnackBar(SnackBar(
                          content: Text('SnackBar'),
                          duration: Duration(seconds: 5)));
                    })),
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
