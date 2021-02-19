import React from "react";
import "./ResultSearchMaterial.css";

export default function ResultSearchMaterial(props) {
  const itemDisplay = props.resultados.map((material) => (
    <div
      className="row container-result-material"
      key={material.MATERIAL_ID}
      onClick={() => props.selecionarMaterialOrcamentoIntumescente(material)}
    >
      <div className="col-2 d-none d-md-block item-result item-center">
        {material.MATERIAL_ID}
      </div>
      <div className="col item-result item-center limitar-texto-1">
        {material.NOME_MATERIAL}
      </div>
      <div className="col-5 d-none d-md-block item-result item-center limitar-texto-1">
        {material.FABRICANTE.NOME_PESSOA}
      </div>
    </div>
  ));
  return (
    <div
      id="container-result-material"
      className={props.show ? "show-result" : ""}
    >
      <div className="row result-cabecalho">
        <div className="col-2 d-none d-md-block item-center">Código</div>
        <div className="col item-center">Nome</div>
        <div className="col-5 d-none d-md-block item-center">Fabricante</div>
      </div>
      {itemDisplay}
    </div>
  );
}
