import React from "react";
import "./RegCartaCobertura.css";
import SearchRegMaterial from "../SearchRegMaterial/SearchRegMaterial";
import BasicRegCartaCobertura from "./BasicRegCartaCobertura/BasicRegCartaCobertura";
import ItensCartaCobertura from "./ItensCartaCobertura/ItensCartaCobertura";
import AcoesCartaCobertura from "./AcoesCartaCobertura/AcoesCartaCobertura";
import { Provider } from "react-redux";

import store from "../../../store/store";

export default function RegCartaCobertura(props) {
  const { match, location, history } = props;

  return (
    <div id="containerRegCartaCobertura">
      <Provider store={store}>
        <div id="busca-material-carta-cobertura">
          <SearchRegMaterial />
        </div>
        <div id="cadastro-basico-carta-cobertura">
          <BasicRegCartaCobertura />
        </div>
        <div id="container-itens-carta-cobertura">
          <ItensCartaCobertura />
        </div>
        <div id="confirmar-acao">
          <AcoesCartaCobertura />
        </div>
      </Provider>
    </div>
  );
}
