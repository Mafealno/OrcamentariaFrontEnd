import React from "react";
import "./OrcamentoGeral.css";
import BasicRegOrcamento from "../BasicRegOrcamento/BasicRegOrcamento";
import ItensOrcamentoGeral from "./ItensOrcamentoGeral/ItensOrcamentoGeral";
import { Provider } from "react-redux";

import store from "../../../store/store";

export default function OrcamentoGeral() {
  return (
    <div id="containerOrcamentoGeral">
      <Provider store={store}>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              className="nav-item nav-link active"
              id="aba-cadastro-basico"
              data-toggle="tab"
              href="#conteudo-cadastro-basico"
            >
              Cadastro básico
            </a>
            <a
              className="nav-item nav-link"
              id="aba-itens-orcamento-geral"
              data-toggle="tab"
              href="#conteudo-itens-orcamento-geral"
            >
              Itens
            </a>
            <a
              className="nav-item nav-link"
              id="nav-contact-tab"
              data-toggle="tab"
              href="#nav-contact"
            >
              Mão de obra
            </a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="conteudo-cadastro-basico"
            role="tabpanel"
            aria-labelledby="aba-cadastro-basico"
          >
            <BasicRegOrcamento tipoObra="Geral" referencia="Geral" />
          </div>
          <div
            className="tab-pane fade "
            id="conteudo-itens-orcamento-geral"
            role="tabpanel"
            aria-labelledby="aba-itens-orcamento-geral"
          >
            <ItensOrcamentoGeral />
          </div>
          <div
            className="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            ...
          </div>
        </div>
      </Provider>
    </div>
  );
}