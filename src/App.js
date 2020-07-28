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
            <MenuOption name="Estoque" />
            <MenuOption name="Estoque" />
            <MenuOption name="Estoque" />
            <DropdownButton name="Orçamento" icon="fa fa-bars">
              <DropdownOption path="pessoas">Orça1</DropdownOption>
              <DropdownOption>Orça2</DropdownOption>
              <DropdownOption>Orça3</DropdownOption>
              <DropdownOption>Orça4</DropdownOption>
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
          </Switch>
        </div>
      </Router>
    </div>
  );
}
