/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./DropdownButton.css";

export default function DropdownButton(props) {
  return (
    <div className="dropdown show" id={props.id}>
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
