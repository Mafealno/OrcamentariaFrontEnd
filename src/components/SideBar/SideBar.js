import React from "react";
import "./SideBar.css";
import logo from "../../img/logo.png";

export default function SideBar(props) {
  return (
    <div className="inSideBar">
      <a href="#main-menu" id="main-menu-toggle" className="menu-toggle">
        <span className="fa fa-bars" aria-hidden="true"></span>
      </a>

      <nav id="main-menu" className="main-menu">
        <a href="#main-menu-toggle" id="main-menu-close" className="menu-close">
          <span className="fa fa-close close-sidebar" aria-hidden="true"></span>
        </a>
        <ul>
          <li>
            <div className="container-logo">
              <img src={logo} className="rounded img-logo" />
            </div>
          </li>
          <li>
            <div id="input-search-menu">
              <input
                type="text"
                className="form-control"
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
