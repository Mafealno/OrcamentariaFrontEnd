import React from "react";
import "./DropdownOption.css";
import { Link } from "react-router-dom";

export default function DropdownOption(props) {
  return (
    <Link to={props.path}>
      <p className="dropdown-item">{props.children}</p>
    </Link>
  );
}
