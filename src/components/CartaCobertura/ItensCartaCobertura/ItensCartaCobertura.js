import React, { useState } from "react";
import "./ItensCartaCobertura.css";
import AddItensCartaCobertura from "./AddItensCartaCobertura/AddItensCartaCobertura";
import * as cartaCoberturaActions from "../../../store/actions/cartaCobertura";
import { connect } from "react-redux";

function ItensCartaCobertura(props) {
  let [keyComponente, setKeyComponente] = useState(0);

  const criarCompornente = () => {
    const componenteCriado = (
      <AddItensCartaCobertura
        key={keyComponente}
        keyComponente={keyComponente}
      />
    );
    setKeyComponente((keyComponente) => keyComponente + 1);

    return componenteCriado;
  };

  return (
    <div id="containerItensCartaCobertura">
      {props.listComponenteItems}
      <div id="button-add">
        {props.materialCartaCobertura.materiaL_ID && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              props.adicionarComponenteItems(
                props.listComponenteItems,
                criarCompornente()
              )
            }
          >
            Adicionar
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  listComponenteItems: state.cartaCobertura.listComponenteItems,
  materialCartaCobertura:
    state.cartaCobertura.cartaCobertura.materialCartaCobertura,
});

const mapDispatchToProps = (dispatch) => ({
  adicionarComponenteItems: (listComponenteItems, novoComponente) =>
    dispatch(
      cartaCoberturaActions.adicionarComponenteItems(
        listComponenteItems,
        novoComponente
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItensCartaCobertura);
