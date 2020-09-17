import React from "react";
import "./ResultSearchFuncionario.css";

export default function ResultSearchFuncionario(props) {
  const itemDisplay = props.resultados.map((funcionario) => (
    <div
      className="row container-result-funcionario"
      key={funcionario.PESSOA_ID}
      onClick={() => props.selecionarFuncionarioMaoObraOrcamento(funcionario)}
    >
      <div className="col-2 item-result item-center">
        {funcionario.PESSOA_ID}
      </div>
      <div className="col-5 item-result item-center">
        {funcionario.NOME_PESSOA}
      </div>
      <div className="col-5 item-result item-center">
        {funcionario.CARGO_FUNCIONARIO}
      </div>
    </div>
  ));
  return (
    <div
      id="container-result-funcionario"
      className={props.show ? "show-result" : ""}
    >
      <div className="row result-cabecalho">
        <div className="col-2 item-center">Código</div>
        <div className="col-5 item-center">Nome</div>
        <div className="col-5 item-center">Cargo</div>
      </div>
      {itemDisplay}
    </div>
  );
}
