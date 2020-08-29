import React from "react";
import "./Custos.css";
import SearchRegCustos from "./SearchRegCustos/SearchRegCustos";
import BasicRegCusto from "./BasicRegCusto/BasicRegCusto";

import { Provider } from "react-redux";

import store from "../../store/store";

export default function Custos() {
  return (
    <div id="containerCustos">
      <Provider store={store}>
        <div id="busca-custos">
          <SearchRegCustos />
        </div>
        <div id="principal-custos">
          <BasicRegCusto />
        </div>
      </Provider>
    </div>
  );
}
