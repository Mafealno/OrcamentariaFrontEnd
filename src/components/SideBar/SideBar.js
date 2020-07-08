import React from "react";
import "./SideBar.css";

export default function SideBar(props) {
  return (
    <div className="inSideBar">
      <a href="#main-menu" id="main-menu-toggle" className="menu-toggle">
        <span className="fa fa-bars" aria-hidden="true"></span>
      </a>

      <nav id="main-menu" className="main-menu">
        <a href="#main-menu-toggle" id="main-menu-close" className="menu-close">
          <span className="fa fa-close" aria-hidden="true"></span>
        </a>
        <ul>
          <li>
            <div id="inputSearch">
              <input
                type="text"
                className="form-control-sm"
                placeholder="Procurar menu"
              ></input>
            </div>
          </li>
          {props.children}
        </ul>
      </nav>
      <a
        href="#main-menu-toggle"
        className="backdrop"
        tabIndex="-1"
        aria-hidden="true"
      ></a>
    </div>
  );
}
