import React from "react";
import "./App.css";

import NameClass from "./components/NameClass";
import NameFun from "./components/NameFun";
import Calculator from "./components/stateUp/Calculator";
import Parent from "./components/slot/Parent";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Hello from "./pages/Hello";
import Params from "./pages/Params";
import ParentRoute from "./pages/Parent";
import CustomLink from "./pages/CustomLink";
import GuoDu from "./pages/GuoDu";
import LifeCycle from "./pages/LifeCycle";
import All from "./pages/All";
import AnimationTest from "./pages/Animation";
import ContextTest from "./pages/ContextTest";
import ErrorHandler from "./pages/ErrorHandler";
import Container from "./redux/Container";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>React Test By Randy</p>
      </header>
      <main className="App-main">
        <NameClass name="randy"></NameClass>
        <NameFun name="randy" date={new Date()}></NameFun>
      </main>
      <main className="App-main">
        <Calculator></Calculator>
      </main>
      <main className="App-main">
        <Parent></Parent>
      </main>
      <main className="App-router">
        <Link to="/hello?name=randy">to hello, </Link><br/>
        <Link to="/params/randy">to params name = randy, </Link><br/>
        <Link to="/parent">to parent, </Link><br/>
        <CustomLink to="/hello" label="to customlink,"></CustomLink><br/>
        <Link to="/guodu">to guodu,</Link><br/>
        <Link to="/redirecttest">to redirecttest但是会redirect到hello</Link><br/>
        <Link to="/container">redux test</Link><br/>
        <Link to="/lifecycle">react生命周期</Link><br/>
        <Link to="/animation">动画</Link><br/>
        <Link to="/contexttest">context 测试</Link><br/>
        <Link to="/errorhandler">错误边界</Link><br/>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/hello" component={Hello}></Route>
          <Route path="/params/:name" component={Params}></Route>
          <Route path="/parent" component={ParentRoute}></Route>
          <Route path="/guodu" component={GuoDu}></Route>
          <Route path="/container" component={Container}></Route>
          <Route path="/lifecycle" component={LifeCycle}></Route>
          <Route path="/animation" component={AnimationTest}></Route>
          <Route path="/contexttest" component={ContextTest}></Route>
          <Route path="/errorhandler" component={ErrorHandler}></Route>
          <Route to="/redirecttest">
            <Redirect to="/hello"></Redirect>
          </Route>
          <Route path="*" component={All}></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
