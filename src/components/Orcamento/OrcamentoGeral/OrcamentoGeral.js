import React, { useState } from "react";
import "./OrcamentoGeral.css";
import BasicRegOrcamento from "../BasicRegOrcamento/BasicRegOrcamento";
import ListItensOrcamentoGeral from "./ListItensOrcamentoGeral/ListItensOrcamentoGeral";
import ListMaoObraOrcamento from "../ListMaoObraOrcamento/ListMaoObraOrcamento";
import ListEquipamentosOrcamento from "../ListEquipamentosOrcamento/ListEquipamentosOrcamento";
import { Provider } from "react-redux";

import store from "../../../store/store";

export default function OrcamentoGeral() {
  let [mostrarAbas, setMostrarAbas] = useState(false);

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
            {mostrarAbas && (
              <>
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
                  id="aba-mao-obra"
                  data-toggle="tab"
                  href="#conteudo-mao-obra"
                >
                  Mão de obra
                </a>
                <a
                  className="nav-item nav-link"
                  id="aba-equipamentos"
                  data-toggle="tab"
                  href="#conteudo-equipamentos"
                >
                  Equipamentos
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
              tipoObra="Geral"
              referencia="Geral"
              mostrarAbas={(valor) => setMostrarAbas(valor)}
            />
          </div>

          <>
            <div
              className="tab-pane fade "
              id="conteudo-itens-orcamento-geral"
              role="tabpanel"
              aria-labelledby="aba-itens-orcamento-geral"
            >
              <ListItensOrcamentoGeral />
            </div>
            <div
              className="tab-pane fade"
              id="conteudo-mao-obra"
              role="tabpanel"
              aria-labelledby="aba-mao-obra"
            >
              <ListMaoObraOrcamento />
            </div>
            <div
              className="tab-pane fade"
              id="conteudo-equipamentos"
              role="tabpanel"
              aria-labelledby="aba-equipamentos"
            >
              <ListEquipamentosOrcamento />
            </div>
          </>
        </div>
      </Provider>
    </div>
  );
}
