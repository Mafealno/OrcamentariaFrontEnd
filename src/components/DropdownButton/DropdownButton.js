import React from "react";
import "./DropdownButton.css";

export default function DropdownButton(props) {
  return (
    <div className="dropdown show">
      <a
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className={props.icon}></span>
        {props.name}
        <span className="dropdown-toggle"></span>
      </a>

      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        {props.children}
      </div>
    </div>
  );
}
