import React from "react";
import "./UpdateCartaCobertura.css";
import FilterCartaCobertura from "./FilterCartaCobertura/FilterCartaCobertura";
import ListCartaCobertura from "./ListCartaCobertura/ListCartaCobertura";
import RegCartaCoberturaSelecionada from "./RegCartaCoberturaSelecionada/RegCartaCoberturaSelecionada";
import { Provider } from "react-redux";

import store from "../../../store/store";

export default function UpdateCartaCobertura() {
  return (
    <div id="containerUpdateCartaCobertura">
      <Provider store={store}>
        <div id="filtro-carta-cobertura">
          <FilterCartaCobertura />
        </div>
        <div id="list-carta-cobertura">
          <ListCartaCobertura />
        </div>
        <div id="carta-cobertura-selecionada">
          <RegCartaCoberturaSelecionada />
        </div>
        <div id="confirmar-acao"></div>
      </Provider>
    </div>
  );
}
