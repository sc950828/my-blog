/*
 * @Author: your name
 * @Date: 2020-05-28 13:06:36
 * @LastEditTime: 2020-05-28 15:27:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myprojects/my-blog/代码实例/REACT/hooks/src/hooks/Index.js
 */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StateTest from "./StateTest";
import EffectTest from "./EffectTest";
import ContextTest from "./ContextTest";
import ReducerTest from "./ReducerTest";
import AnLi from "../anli/AnLi";
import ZiDingYiHook from "../zidingyi/ZiDingYiHook";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Router>
          <Link to="/state">state</Link>
          <br />
          <Link to="/effect">effect</Link>
          <br />
          <Link to="/context">context</Link>
          <br />
          <Link to="/reducer">reducer</Link>
          <br />
          <Link to="/anli">anli</Link>
          <br />
          <Link to="/zidingyi">自定义hook</Link>
          <br />
          <hr />
          <Route component={StateTest} path="/state"></Route>
          <Route component={EffectTest} path="/effect"></Route>
          <Route component={ContextTest} path="/context"></Route>
          <Route component={ReducerTest} path="/reducer"></Route>
          <Route component={AnLi} path="/anli"></Route>
          <Route component={ZiDingYiHook} path="/zidingyi"></Route>
        </Router>
      </div>
    );
  }
}

export default App;
