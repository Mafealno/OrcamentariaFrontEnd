import React, { useState } from "react";
import "./OrcamentoIntumescente.css";
import BasicRegOrcamento from "../BasicRegOrcamento/BasicRegOrcamento";
import Intumescente from "./Intumescente/Intumescente";
import ListMaoObraOrcamento from "../ListMaoObraOrcamento/ListMaoObraOrcamento";
import ListEquipamentosOrcamento from "../ListEquipamentosOrcamento/ListEquipamentosOrcamento";
import ListCustoOrcamento from "../ListCustoOrcamento/ListCustoOrcamento";
import TotaisOrcamento from "../TotaisOrcamento/TotaisOrcamento"
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
              className="nav-item nav-link active col text-center"
              id="aba-cadastro-basico"
              data-toggle="tab"
              href="#conteudo-cadastro-basico"
            >
              Básico
            </a>
            <a
                  className="nav-item nav-link col position-initial text-center"
                  id="aba-intumescente"
                  data-toggle="tab"
                  href="#conteudo-intumescente"
                >
                  Intumescente
                </a>
            {mostrarAbas && (
              <>
                {/* <a
                  className="nav-item nav-link col position-initial text-center"
                  id="aba-intumescente"
                  data-toggle="tab"
                  href="#conteudo-intumescente"
                >
                  Intumescente
                </a> */}
                <a
                  className="nav-item nav-link col position-initial text-center"
                  id="aba-mao-obra"
                  data-toggle="tab"
                  href="#conteudo-mao-obra"
                >
                  Mão de obra
                </a>
                <a
                  className="nav-item nav-link col position-initial text-center"
                  id="aba-equipamentos"
                  data-toggle="tab"
                  href="#conteudo-equipamentos"
                >
                  Equipamentos
                </a>
                <a
                  className="nav-item nav-link col position-initial text-center"
                  id="aba-custos"
                  data-toggle="tab"
                  href="#conteudo-custos"
                >
                  Custos
                </a>
                <a
                  className="nav-item nav-link col position-initial text-center"
                  id="aba-totais"
                  data-toggle="tab"
                  href="#conteudo-totais"
                >
                  Totais
                </a>
              </>
            )}
          </div>
        </nav>
        <div className="tab-content conteudo-aba-orcamento" id="nav-tabContent">
          <div
            className="tab-pane fade show conteudo-aba-orcamento active"
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
            className="tab-pane fade conteudo-aba-orcamento"
            id="conteudo-intumescente"
            role="tabpanel"
            aria-labelledby="aba-intumescente"
          >
            <Intumescente/>
          </div>
          <div
              className="tab-pane fade conteudo-aba-orcamento"
              id="conteudo-mao-obra"
              role="tabpanel"
              aria-labelledby="aba-mao-obra"
            >
              <ListMaoObraOrcamento />
            </div>
            <div
              className="tab-pane fade conteudo-aba-orcamento"
              id="conteudo-equipamentos"
              role="tabpanel"
              aria-labelledby="aba-equipamentos"
            >
              <ListEquipamentosOrcamento />
            </div>
            <div
              className="tab-pane fade conteudo-aba-orcamento"
              id="conteudo-custos"
              role="tabpanel"
              aria-labelledby="aba-custos"
            >
              <ListCustoOrcamento />
            </div>
            <div
              className="tab-pane fade conteudo-aba-orcamento"
              id="conteudo-totais"
              role="tabpanel"
              aria-labelledby="aba-totais"
            >
              <TotaisOrcamento />
            </div>
        </div>
      </Provider>
    </div>
  );
}
