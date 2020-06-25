import React from "react";
import "./DropdownOption.css";

export default function DropdownOption(props) {
  return (
    <a class="dropdown-item" href="#">
      {props.children}
    </a>
  );
}
