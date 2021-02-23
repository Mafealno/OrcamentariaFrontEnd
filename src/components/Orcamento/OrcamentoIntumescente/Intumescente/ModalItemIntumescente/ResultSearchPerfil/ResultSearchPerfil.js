import React from "react";
import "./ResultSearchPerfil.css";

export default function ResultSearchPerfil(props) {
  const itemDisplay = props.resultados.map((perfil) => (
    <div
      className="row container-result-perfil"
      key={perfil.PERFIL_ID}
      onClick={() => props.selecionarPerfilItemOrcamentoIntumescente(perfil)}
    >
      <div className="col-2 d-none d-md-block item-result item-center">
        {perfil.PERFIL_ID}
      </div>
      <div className="col item-result item-center limitar-texto-1">
        {perfil.NOME_PERFIL}
      </div>
    </div>
  ));
  return (
    <div id="container-result-perfil" className={props.show ? "show-result" : ""}>
      <div className="row result-cabecalho">
        <div className="col-2 d-none d-md-block item-center">Código</div>
        <div className="col item-center">Nome</div>
      </div>
      {itemDisplay}
    </div>
  );
}
