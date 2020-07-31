import React from "react";
import "./Equipamento.css";
import SearchRegEquipamento from "./SearchRegEquipamento/SearchRegEquipamento";
import BasicRegEquipamento from "./BasicRegEquipamento/BasicRegEquipamento";
import { Provider } from "react-redux";

import store from "../../store/store";

export default function Equipamento() {
  return (
    <div id="containerEquipamento">
      <Provider store={store}>
        <div id="busca-equipamento">
          <SearchRegEquipamento />
        </div>
        <div id="principal-equipamento">
          <BasicRegEquipamento />
        </div>
      </Provider>
    </div>
  );
}
