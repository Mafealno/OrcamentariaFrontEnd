import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SideBar from "./components/SideBar";
import MenuOption from "./components/MenuOption";
import DropdownOption from "./components/DropdownOption";
import DropdownButton from "./components/DropdownButton";
import People from "./components/People";
import "./components/Material";
import Material from "./components/Material";
import Equipamento from "./components/Equipamento";
import RegCartaCobertura from "./components/CartaCobertura/RegCartaCobertura";
import UpdateCartaCobertura from "./components/CartaCobertura/UpdateCartaCobertura";

export default function App() {
  return (
    <div className="App">
      <Router>
        <div id="sideBar">
          <SideBar>
            <MenuOption name="Pessoas" icon="fa fa-bars" path="/pessoas" />
            <MenuOption name="Materais" icon="fa fa-bars" path="/materiais" />
            <MenuOption
              name="Equipamento"
              icon="fa fa-bars"
              path="/equipamentos"
            />
            <DropdownButton name="Carta de Cobertura" icon="fa fa-bars">
              <DropdownOption path="/cartaCobertura">Cadastrar</DropdownOption>
              <DropdownOption path="/consultarCartaCobertura">
                Consultar/Editar
              </DropdownOption>
            </DropdownButton>
          </SideBar>
        </div>

        <div id="body">
          <Switch>
            <Route path="/pessoas">
              <People />
            </Route>
            <Route path="/materiais">
              <Material />
            </Route>
            <Route path="/equipamentos">
              <Equipamento />
            </Route>
            <Route path="/cartaCobertura">
              <RegCartaCobertura />
            </Route>
            <Route path="/consultarCartaCobertura">
              <UpdateCartaCobertura />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
