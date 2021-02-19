import React from "react";
import "./ResultSearchMaterial.css";

export default function ResultSearchMaterial(props) {
  const itemDisplay = props.resultados.map((material) => (
    <div
      className="row container-result-material"
      key={material.MATERIAL_ID}
      onClick={() => props.selecionarMaterialOrcamento(material)}
    >
      <div className="col-2 item-result item-center">
        {material.MATERIAL_ID}
      </div>
      <div className="col item-result item-center limitar-texto-1">
        {material.NOME_MATERIAL}
      </div>
    </div>
  ));
  return (
    <div
      id="container-result-material"
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
