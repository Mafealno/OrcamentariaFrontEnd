/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./SideBar.css";
import logo from "../../img/logo.png";

export default function SideBar(props) {

  const [stringPesquisa, setStringPesquisa] = useState("");
  const menus = ['Pessoas', 'Materiais', 'Equipamentos', 'Custos', 'Carta de Cobertura', 'Orçamento']

  useEffect(() => {
    if(stringPesquisa){
      menus.forEach(menu => { 
        document.getElementById("menu-" + menu).classList.add("d-none")
      })

      const menusFiltrados = menus.filter((item)=> item.toLowerCase().indexOf(stringPesquisa.toLowerCase()) > -1)

      if(menusFiltrados){
        menusFiltrados.forEach(menu => {document.getElementById("menu-" + menu).classList.remove("d-none")});
      }
    }else{
        menus.forEach(menu => { 
          document.getElementById("menu-" + menu).classList.remove("d-none");
        })
    }
  }, [stringPesquisa])

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
                onChange={(event)=> setStringPesquisa(event.target.value)}
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
