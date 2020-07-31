import React from "react";
import "./CartaCobertura.css";
import "../SearchRegMaterial/SearchRegMaterial";
import SearchRegMaterial from "./SearchRegMaterial/SearchRegMaterial";
import BasicRegCartaCobertura from "./BasicRegCartaCobertura/BasicRegCartaCobertura";
import ItensCartaCobertura from "./ItensCartaCobertura/ItensCartaCobertura";
import { Provider } from "react-redux";

import store from "../../store/store";

export default function CartaCobertura(props) {
  return (
    <>
      <div id="containerCartaCobertura">
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
            <div>
              <button type="button" className="btn btn-primary">
                Salvar
              </button>
            </div>
          </div>
        </Provider>
      </div>
    </>
  );
}
