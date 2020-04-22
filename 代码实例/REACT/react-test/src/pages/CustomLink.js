import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function CustomLink(props) {
  const { to, label, activeOnlyWhenExact } = props;
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
  return (
    <div>
      {match && ">"}
      <Link to={to}>{label}</Link>
    </div>
  );
}

export default CustomLink;
