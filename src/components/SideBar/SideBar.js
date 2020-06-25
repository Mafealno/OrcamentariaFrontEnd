import React from "react";
import "./SideBar.css";

function SideBar(props) {
  return (
    <div className="inSideBar">
      <a href="#main-menu" id="main-menu-toggle" class="menu-toggle">
        <span class="fa fa-bars" aria-hidden="true"></span>
      </a>

      <nav id="main-menu" class="main-menu">
        <a href="#main-menu-toggle" id="main-menu-close" class="menu-close">
          <span class="fa fa-close" aria-hidden="true"></span>
        </a>
        <ul>{props.children}</ul>
      </nav>
      <a
        href="#main-menu-toggle"
        class="backdrop"
        tabindex="-1"
        aria-hidden="true"
      ></a>
    </div>
  );
}

export default SideBar;
