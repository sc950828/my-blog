import React from "react";
import "./App.css";

import NameClass from './components/NameClass'
import NameFun from './components/NameFun'

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
    </div>
  );
}

export default App;
