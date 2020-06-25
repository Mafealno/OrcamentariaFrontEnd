import React from "react";
import "./DropdownButton.css";

export default function DropdownButton(props) {
  return (
    <div class="dropdown show">
      <a
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {props.name}
        <span className="dropdown-toggle"></span>
      </a>

      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        {props.children}
      </div>
    </div>
  );
}
