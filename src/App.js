import React from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import MenuOption from "./components/MenuOption";
import DropdownOption from "./components/DropdownOption";
import DropdownButton from "./components/DropdownButton";
import People from "./components/People";

export default function App() {
  return (
    <div className="App">
      <div id="sideBar">
        <SideBar>
          <MenuOption name="Contas" icon="fa fa-bars"></MenuOption>
          <DropdownButton name="Orçamento" icon="fa fa-bars">
            <DropdownOption>Orça1</DropdownOption>
            <DropdownOption>Orça2</DropdownOption>
            <DropdownOption>Orça3</DropdownOption>
            <DropdownOption>Orça4</DropdownOption>
          </DropdownButton>
          <MenuOption name="Financeiro"></MenuOption>
          <MenuOption name="Estoque"></MenuOption>
          <MenuOption name="Estoque"></MenuOption>
          <MenuOption name="Estoque"></MenuOption>
          <MenuOption name="Estoque"></MenuOption>
        </SideBar>
      </div>

      <div id="body">
        <People></People>
      </div>
    </div>
  );
}
