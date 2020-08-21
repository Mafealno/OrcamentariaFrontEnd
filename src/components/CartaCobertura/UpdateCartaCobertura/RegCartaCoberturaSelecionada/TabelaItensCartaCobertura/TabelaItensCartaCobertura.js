import React, { useState, useEffect } from "react";
import "./TabelaItensCartaCobertura.css";
import "./ItemTabelaItensCartaCobertura/ItemTabelaItensCartaCobertura";
import ItemTabelaItensCartaCobertura from "./ItemTabelaItensCartaCobertura/ItemTabelaItensCartaCobertura";

import { connect } from "react-redux";

function TabelaItensCartaCobertura(props) {
  let [
    itemTabelaItensCartaCoberturaDisplay,
    setItemTabelaItensCartaCoberturaDisplay,
  ] = useState([]);

  useEffect(() => {
    if (props.listCartaCoberturaEditar) {
      monstarItemCartaCobertura();
    }
  }, [props.listCartaCoberturaEditar.length ?? []]);

  const monstarItemCartaCobertura = () => {
    setItemTabelaItensCartaCoberturaDisplay(
      props.listCartaCoberturaEditar.map((elementoAtual) => (
        <ItemTabelaItensCartaCobertura
          key={elementoAtual.CARTA_COBERTURA_ID}
          dados={elementoAtual}
        />
      ))
    );
  };

  return (
    <div id="containerTabelaItensCartaCobertura">
      {itemTabelaItensCartaCoberturaDisplay}
    </div>
  );
}

const mapStateToProps = (state) => ({
  listCartaCoberturaEditar:
    state.cartaCobertura.cartaCoberturaEditar.LIST_CARTA_COBERTURA,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabelaItensCartaCobertura);
