import React from "react";
import "./DropdownOption.css";

export default function DropdownOption(props) {
  return (
    <a className="dropdown-item" href="#">
      {props.children}
    </a>
  );
}
