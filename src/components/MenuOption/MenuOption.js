import React from "react";
import "./MenuOption.css";

function MenuOption(props) {
  return (
    <li>
      <a href="#">
        <span className={props.icon} aria-hidden="true"></span>
        {props.name}
      </a>
    </li>
  );
}

export default MenuOption;
