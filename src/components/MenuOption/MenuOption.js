import React from "react";

function MenuOption(props) {
  return (
    <li>
      <a href="#">{props.children}</a>
    </li>
  );
}

export default MenuOption;
