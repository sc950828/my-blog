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
import All from "./pages/All";
import Container from './redux/Container'

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
        <Link to="/hello">to hello, </Link>
        <Link to="/params/randy">to params name = randy, </Link>
        <Link to="/parent">to parent, </Link>
        <CustomLink to="/hello" label="to customlink,"></CustomLink>
        <Link to="/guodu">to guodu,</Link>
        <Link to="/redirecttest">to redirecttest但是会redirect到hello</Link>
        <Link to="/container">redux test</Link>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/hello" component={Hello}></Route>
          <Route path="/params/:name" component={Params}></Route>
          <Route path="/parent" component={ParentRoute}></Route>
          <Route path="/guodu" component={GuoDu}></Route>
          <Route path="/container" component={Container}></Route>
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
