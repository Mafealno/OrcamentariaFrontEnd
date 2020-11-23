import React from "react";
import "./ResultSearchEquipamento.css";

export default function ResultSearchEquipamento(props) {
  const itemDisplay = props.resultados.map((equipamento) => (
    <div
      className="row container-result-equipamento"
      key={equipamento.EQUIPAMENTO_ID}
      onClick={() => props.selecionarEquipamentoOrcamento(equipamento)}
    >
      <div className="col-2 item-result item-center">
        {equipamento.EQUIPAMENTO_ID}
      </div>
      <div className="col item-result item-center">
        {equipamento.NOME_EQUIPAMENTO}
      </div>
    </div>
  ));
  return (
    <div
      id="container-result-equipamento"
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
