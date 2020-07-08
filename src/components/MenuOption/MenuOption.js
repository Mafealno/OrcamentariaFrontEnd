import React from "react";
import "./MenuOption.css";

export default function MenuOption(props) {
  return (
    <li>
      <a href="#">
        <span className={props.icon} aria-hidden="true"></span>
        {props.name}
      </a>
    </li>
  );
}
