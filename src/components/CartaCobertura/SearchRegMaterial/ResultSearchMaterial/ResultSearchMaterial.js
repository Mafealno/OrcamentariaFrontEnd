import React from "react";
import "./ResultSearchMaterial.css";
import { connect } from "react-redux";
import * as cartaCoberturaActions from "../../../../store/actions/cartaCobertura";

function ResultSearchMaterial({ show, resultados, selecionarMaterial }) {
  const itemDisplay = resultados.map((material) => (
    <div
      className="row container-result"
      key={material.materiaL_ID}
      onClick={() => selecionarMaterial(material)}
    >
      <div className="col-2 item-result item-center">
        {material.materiaL_ID}
      </div>
      <div className="col-5 item-result item-center">
        {material.nomE_MATERIAL}
      </div>
      <div className="col-5 item-result">{material.fabricante.nomE_PESSOA}</div>
    </div>
  ));
  return (
    <div id="container-result" className={show ? "show-result" : ""}>
      <div className="row result-cabecalho">
        <div className="col-2 item-center">Código</div>
        <div className="col-5 item-center">Nome</div>
        <div className="col-5">Fabricante</div>
      </div>
      {itemDisplay}
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  selecionarMaterial: (materialCartaCobertura) =>
    dispatch(
      cartaCoberturaActions.selecionarMaterialCartaCobertura(
        materialCartaCobertura
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultSearchMaterial);
