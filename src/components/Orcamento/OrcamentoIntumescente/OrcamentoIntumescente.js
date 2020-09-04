import React, { useState } from "react";
import "./OrcamentoIntumescente.css";
import BasicRegOrcamento from "../BasicRegOrcamento/BasicRegOrcamento";
import { Provider } from "react-redux";

import store from "../../../store/store";

export default function OrcamentoIntumescente() {
  let [mostrarAbas, setMostrarAbas] = useState(false);
  return (
    <div id="containerOrcamentoIntumescente">
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
            {mostrarAbas && (
              <>
                <a
                  className="nav-item nav-link"
                  id="nav-profile-tab"
                  data-toggle="tab"
                  href="#nav-profile"
                >
                  Itens
                </a>
                <a
                  className="nav-item nav-link "
                  id="nav-contact-tab"
                  data-toggle="tab"
                  href="#nav-contact"
                >
                  Mão de obra
                </a>
              </>
            )}
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="conteudo-cadastro-basico"
            role="tabpanel"
            aria-labelledby="aba-cadastro-basico"
          >
            <BasicRegOrcamento
              tipoObra="Intumescente"
              mostrarAbas={(valor) => setMostrarAbas(valor)}
            />
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            ...
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
