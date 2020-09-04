import React from "react";
import "./ResultSearchMaterial.css";

export default function ResultSearchMaterial(props) {
  const itemDisplay = props.resultados.map((material) => (
    <div
      className="row container-result-material"
      key={material.MATERIAL_ID}
      onClick={() => props.selecionarMaterialItemOrcamentoGeral(material)}
    >
      <div className="col-2 item-result item-center">
        {material.MATERIAL_ID}
      </div>
      <div className="col-5 item-result item-center">
        {material.NOME_MATERIAL}
      </div>
      <div className="col-5 item-result item-center">
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
        <div className="col-2 item-center">Código</div>
        <div className="col-5 item-center">Nome</div>
        <div className="col-5 item-center">Fabricante</div>
      </div>
      {itemDisplay}
    </div>
  );
}
