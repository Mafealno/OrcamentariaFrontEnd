import React, { useState } from "react";
import "./OrcamentoGeral.css";
import BasicRegOrcamento from "../BasicRegOrcamento/BasicRegOrcamento";
import ListItensOrcamentoGeral from "./ListItensOrcamentoGeral/ListItensOrcamentoGeral";
import ListMaoObraOrcamento from "../ListMaoObraOrcamento/ListMaoObraOrcamento";
import ListEquipamentosOrcamento from "../ListEquipamentosOrcamento/ListEquipamentosOrcamento";
import ListMateriaisOrcamento from "../ListMateriaisOrcamento/ListMateriaisOrcamento";
import ListCustoOrcamento from "../ListCustoOrcamento/ListCustoOrcamento";
import TotaisOrcamento from "../TotaisOrcamento/TotaisOrcamento";
import GerarOrcamento from "../GerarOrcamento/GerarOrcamento";
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
              className="nav-item nav-link active col position-initial text-center"
              id="aba-cadastro-basico"
              data-toggle="tab"
              href="#conteudo-cadastro-basico"
            >
              Básico
            </a>
            {mostrarAbas && (
              <>
                <a
                  className="nav-item nav-link col position-initial text-center"
                  id="aba-itens-orcamento-geral"
                  data-toggle="tab"
                  href="#conteudo-itens-orcamento-geral"
                >
                  Itens
                </a>
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
                  id="aba-materiais"
                  data-toggle="tab"
                  href="#conteudo-materiais"
                >
                  Materiais
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
                <a
                  className="nav-item nav-link col position-initial text-center"
                  id="aba-gerar-orcamento"
                  data-toggle="tab"
                  href="#conteudo-gerar-orcamento"
                >
                  Gerar PDF
                </a>
              </>
            )}
          </div>
        </nav>
        <div className="tab-content conteudo-aba-orcamento" id="nav-tabContent">
          <div
            className="tab-pane fade show active conteudo-aba-orcamento"
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
              className="tab-pane fade conteudo-aba-orcamento"
              id="conteudo-itens-orcamento-geral"
              role="tabpanel"
              aria-labelledby="aba-itens-orcamento-geral"
            >
              <ListItensOrcamentoGeral />
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
              id="conteudo-materiais"
              role="tabpanel"
              aria-labelledby="aba-materiais"
            >
              <ListMateriaisOrcamento />
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
            <div
              className="tab-pane fade conteudo-aba-orcamento"
              id="conteudo-totais"
              role="tabpanel"
              aria-labelledby="aba-totais"
            >
              <TotaisOrcamento />
            </div>
            <div
              className="tab-pane fade conteudo-aba-orcamento"
              id="conteudo-gerar-orcamento"
              role="tabpanel"
              aria-labelledby="aba-gerar-orcamento"
            >
              <GerarOrcamento />
            </div>
          </>
        </div>
      </Provider>
    </div>
  );
}
