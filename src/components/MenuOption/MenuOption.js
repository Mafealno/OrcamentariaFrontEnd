import React from "react";
import "./MenuOption.css";

import { Link } from "react-router-dom";

export default function MenuOption(props) {
  return (
    <li>
      <Link to={props.path}>
        <p className="item-menu">
          <span className={props.icon} aria-hidden="true"></span>
          {props.name}
        </p>
      </Link>
    </li>
  );
}
