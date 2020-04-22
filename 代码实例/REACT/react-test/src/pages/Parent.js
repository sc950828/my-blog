import React from "react";
import { Route, useRouteMatch, Link } from "react-router-dom";
import Hello from "./Hello";
import Child from "./Child";

function Parent() {
  const { path, url } = useRouteMatch();
  console.log(path, url);

  return (
    <div>
      Parent
      <Link to={url + "/hello"}>to hello , </Link>
      <Link to={url + "/child/randy"}>to child, </Link>
      <Route path={path + "/hello"} component={Hello}></Route>
      <Route path={path + "/child/:name"} component={Child}></Route>
    </div>
  );
}

export default Parent;
