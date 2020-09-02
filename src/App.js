import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import SideBar from "./components/SideBar";
import MenuOption from "./components/MenuOption";
import DropdownOption from "./components/DropdownOption";
import DropdownButton from "./components/DropdownButton";
import People from "./components/People";
import "./components/Material";
import Material from "./components/Material";
import Equipamento from "./components/Equipamento";
import Custos from "./components/Custos/Custos";
import RegCartaCobertura from "./components/CartaCobertura/RegCartaCobertura";
import UpdateCartaCobertura from "./components/CartaCobertura/UpdateCartaCobertura";
import OrcamentoGeral from "./components/Orcamento/OrcamentoGeral/OrcamentoGeral";
import OrcamentoIntumescente from "./components/Orcamento/OrcamentoIntumescente/OrcamentoIntumescente";
import SearchOrcamento from "./components/Orcamento/SearchOrcamento/SearchOrcamento";

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
            <MenuOption name="Custos" icon="fa fa-bars" path="/custos" />
            <DropdownButton name="Carta de Cobertura" icon="fa fa-bars">
              <DropdownOption path="/cartaCobertura">Cadastrar</DropdownOption>
              <DropdownOption path="/consultarCartaCobertura">
                Consultar/Editar
              </DropdownOption>
            </DropdownButton>
            <DropdownButton name="Orçamento" icon="fa fa-bars">
              <DropdownOption path="/orcamentoIntumescente">
                Orçamento Intumescente
              </DropdownOption>
              <DropdownOption path="/orcamentoGeral">
                Orçamento Geral
              </DropdownOption>
              <DropdownOption path="/consultarOrcamento">
                Consultar/Editar
              </DropdownOption>
            </DropdownButton>
          </SideBar>
        </div>

        <div id="body">
          <Route path="/pessoas" render={() => <People />} />
          <Route path="/materiais" render={() => <Material />} />
          <Route path="/equipamentos" render={() => <Equipamento />} />
          <Route path="/custos" render={() => <Custos />} />
          <Route path="/cartaCobertura" render={() => <RegCartaCobertura />} />
          <Route
            path="/consultarCartaCobertura"
            render={() => <UpdateCartaCobertura />}
          />
          <Route path="/orcamentoGeral" render={() => <OrcamentoGeral />} />
          <Route
            path="/orcamentoIntumescente"
            render={() => <OrcamentoIntumescente />}
          />
          <Route
            path="/consultarOrcamento"
            render={() => <SearchOrcamento />}
          />
        </div>
      </Router>
    </div>
  );
}
