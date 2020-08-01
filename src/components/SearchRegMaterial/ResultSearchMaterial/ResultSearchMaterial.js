import React from "react";
import "./ResultSearchMaterial.css";
import { connect } from "react-redux";
import * as MaterialActions from "../../../store/actions/material";

function ResultSearchMaterial({ show, resultados, selecionarMaterial }) {
  const itemDisplay = resultados.map((material) => (
    <div
      className="row container-result"
      key={material.MATERIAL_ID}
      onClick={() => selecionarMaterial(material)}
    >
      <div className="col-2 item-result item-center">
        {material.MATERIAL_ID}
      </div>
      <div className="col-5 item-result item-center">
        {material.NOME_MATERIAL}
      </div>
      <div className="col-5 item-result">{material.TIPO_MATERIAL}</div>
    </div>
  ));
  return (
    <div id="container-result" className={show ? "show-result" : ""}>
      <div className="row result-cabecalho">
        <div className="col-2 item-center">Código</div>
        <div className="col-5 item-center">Nome</div>
        <div className="col-5">Tipo</div>
      </div>
      {itemDisplay}
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  selecionarMaterial: (material) =>
    dispatch(MaterialActions.selecionarMaterial(material)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultSearchMaterial);
