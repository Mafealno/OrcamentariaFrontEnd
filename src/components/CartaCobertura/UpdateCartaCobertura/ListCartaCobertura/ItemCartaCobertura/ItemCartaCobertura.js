import React from "react";
import "./ItemCartaCobertura.css";
import * as cartaCoberturaActions from "../../../../../store/actions/cartaCobertura";

import { connect } from "react-redux";

function ItemCartaCobertura(props) {
  return (
    <>
      <div
        className="item-carta-cobertura"
        id={"opcoes-div-pai" + props.dados.MATERIAL.MATERIAL_ID}
        data-toggle="collapse"
        data-target={"#opcoes-" + props.dados.MATERIAL.MATERIAL_ID}
        aria-expanded={"opcoes-" + props.dados.MATERIAL.MATERIAL_ID}
        aria-controls={"opcoes-" + props.dados.MATERIAL.MATERIAL_ID}
      >
        <div className="row">
          <label className="titulo-item-carta-cobertura">Material</label>
        </div>
        <div className="row">
          <label>{props.dados.MATERIAL.NOME_MATERIAL}</label>
        </div>
        <div className="row">
          <label className="titulo-item-carta-cobertura">Fabricante</label>
        </div>
        <div className="row">
          <label>{props.dados.MATERIAL.FABRICANTE.NOME_PESSOA}</label>
        </div>
      </div>
      <div
        id={"opcoes-" + props.dados.MATERIAL.MATERIAL_ID}
        className="collapse opcoes-selecionar-carta-cobertura"
      >
        <button
          className="btn btn-success btn-selecionar-carta-cobertura"
          onClick={() => props.selecionarCartaCoberturaEditar(props.dados)}
        >
          Selecionar
        </button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  selecionarCartaCoberturaEditar: (cartaCoberturaEditar) =>
    dispatch(
      cartaCoberturaActions.selecionarCartaCoberturaEditar(cartaCoberturaEditar)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemCartaCobertura);
