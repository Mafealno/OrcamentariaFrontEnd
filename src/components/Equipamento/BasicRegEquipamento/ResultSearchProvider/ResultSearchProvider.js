import React from "react";
import "./ResultSearchProvider.css";

export default function ResultSearchProvider(props) {
  const itemDisplay = props.resultados.map((fabricante) => (
    <div
      className="row container-result-provider"
      key={fabricante.PESSOA_ID}
      onClick={() => props.selecionarFabricante(fabricante)}
    >
      <div className="col-2 item-result item-center">
        {fabricante.PESSOA_ID}
      </div>
      <div className="col-10 item-result item-center limitar-texto-1">
        {fabricante.NOME_PESSOA}
      </div>
    </div>
  ));
  return (
    <div
      id="container-result-provider"
      className={props.show ? "show-result" : ""}
    >
      <div className="row result-cabecalho">
        <div className="col-2 item-center">Código</div>
        <div className="col-10 item-center">Nome</div>
      </div>
      {itemDisplay}
    </div>
  );
}
