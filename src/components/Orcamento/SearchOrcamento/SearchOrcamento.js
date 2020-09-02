import React from "react";
import "./SearchOrcamento.css";
import FilterOrcamento from "./FilterOrcamento/FilterOrcamento";
import ListOrcamento from "./ListOrcamento/ListOrcamento";

import { Provider } from "react-redux";

import store from "../../../store/store";

export default function SearchOrcamento(props) {
  return (
    <Provider store={store}>
      <div id="containerSearchOrcamento">
        <div id="filtro-orcamento">
          <FilterOrcamento />
        </div>
        <div id="list-orcamento">
          <ListOrcamento />
        </div>
      </div>
    </Provider>
  );
}
