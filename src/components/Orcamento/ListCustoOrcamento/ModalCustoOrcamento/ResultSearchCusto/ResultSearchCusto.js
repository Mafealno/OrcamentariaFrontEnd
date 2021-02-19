import React from 'react'
import "./ResultSearchCusto.css";

function ResultSearchCusto(props) {
    const itemDisplay = props.resultados.map((custo) => (
        <div
          className="row container-result-custo"
          key={custo.CUSTO_ID}
          onClick={() => props.selecionarCustoOrcamento(custo)}
        >
          <div className="col-2 item-result item-center">
            {custo.CUSTO_ID}
          </div>
          <div className="col item-result item-center limitar-texto-1">
            {custo.NOME_CUSTO}
          </div>
        </div>
      ));
      return (
        <div
          id="container-result-custo"
          className={props.show ? "show-result" : ""}
        >
          <div className="row result-cabecalho">
            <div className="col-2 item-center">Código</div>
            <div className="col item-center">Nome</div>
          </div>
          {itemDisplay}
        </div>
      );
}

export default ResultSearchCusto