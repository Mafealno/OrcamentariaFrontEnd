import React from "react";
import "./ResultSearchCusto.css";

export default function ResultSearchCusto(props) {
  const itemDisplay = props.resultados.map((custo) => (
    <div
      className="row container-result-custo"
      key={custo.CUSTO_ID}
      onClick={() => props.selecionarCustoMaoObraOrcamento(custo)}
    >
      <div className="col item-result item-center">{custo.NOME_CUSTO}</div>
    </div>
  ));
  return (
    <div
      id="container-result-custo"
      className={props.show ? "show-result" : ""}
    >
      <div className="row result-cabecalho">
        <div className="col item-center">Nome</div>
      </div>
      {itemDisplay}
    </div>
  );
}
