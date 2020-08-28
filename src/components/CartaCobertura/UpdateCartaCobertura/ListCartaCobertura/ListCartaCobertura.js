import React, { useState, useEffect } from "react";
import "./ListCartaCobertura.css";
import ItemCartaCobertura from "./ItemCartaCobertura/ItemCartaCobertura";
import * as cartaCoberturaActions from "../../../../store/actions/cartaCobertura";

import { connect } from "react-redux";

function ListCartaCobertura(props) {
  let [
    listMaterialCartaCobertura,
    setListMaterialListCartaCobertura,
  ] = useState([]);
  let [
    listMaterialCartaCoberturaDisplay,
    setListMaterialListCartaCoberturaDisplay,
  ] = useState([]);

  useEffect(() => {
    props.listarCartaCoberturaEditar(props.linkBackEnd);
  }, []);

  useEffect(() => {
    ordernarCartaCoberturaPorMaterial();
  }, [props.listCartaCoberturaEditar]);

  useEffect(() => {
    if (props.listCartaCoberturaEditar.length > 0) {
      montarElementosDisplay();
    }
  }, [listMaterialCartaCobertura.length]);

  const ordernarCartaCoberturaPorMaterial = () => {
    let listCartaCoberturaAux = [];
    props.listCartaCoberturaEditar.map((elementoAtual) => {
      const material = listCartaCoberturaAux.find(
        (elemento) =>
          elemento.MATERIAL.MATERIAL_ID == elementoAtual.MATERIAL.MATERIAL_ID
      );

      if (material) {
        const indexElemento = listCartaCoberturaAux.indexOf(material);

        const objCartaCobertura = {
          CARTA_COBERTURA_ID: elementoAtual.CARTA_COBERTURA_ID,
          LIST_ITENS_CARTA_COBERTURA: elementoAtual.LIST_ITENS_CARTA_COBERTURA,

          REFERENCIA: elementoAtual.REFERENCIA,
        };

        listCartaCoberturaAux[indexElemento].LIST_CARTA_COBERTURA.push(
          objCartaCobertura
        );
      } else {
        const objCartaCobertura = {
          CARTA_COBERTURA_ID: elementoAtual.CARTA_COBERTURA_ID,
          LIST_ITENS_CARTA_COBERTURA: elementoAtual.LIST_ITENS_CARTA_COBERTURA,
          REFERENCIA: elementoAtual.REFERENCIA,
        };

        const objMaterialCartaCobertura = {
          MATERIAL: Object.assign({}, elementoAtual.MATERIAL),
          LIST_CARTA_COBERTURA: [objCartaCobertura],
        };

        listCartaCoberturaAux.push(objMaterialCartaCobertura);
      }
    });

    setListMaterialListCartaCobertura([]);

    if (listCartaCoberturaAux.length == 0) {
      setListMaterialListCartaCoberturaDisplay([]);
    } else {
      setListMaterialListCartaCobertura(listCartaCoberturaAux);
    }
  };

  const montarElementosDisplay = () => {
    let materialListCartaCoberturaDisplayAux = listMaterialCartaCobertura.map(
      (elementoAtual) => (
        <ItemCartaCobertura
          key={elementoAtual.MATERIAL.MATERIAL_ID}
          dados={elementoAtual}
        />
      )
    );

    setListMaterialListCartaCoberturaDisplay(
      materialListCartaCoberturaDisplayAux
    );
  };

  return (
    <div id="container-list-carta-cobertura">
      <div className="recarregar-list-carta-cobertura">
        <button
          type="button"
          className="btn recarregar-list-carta-cobertura"
          onClick={() => props.listarCartaCoberturaEditar(props.linkBackEnd)}
        >
          Recarregar
        </button>
      </div>
      {listMaterialCartaCoberturaDisplay}
    </div>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listCartaCoberturaEditar: state.cartaCobertura.listCartaCoberturaEditar,
  cartaCoberturaEditar: state.cartaCobertura.cartaCoberturaEditar,
});

const mapDispatchToProps = (dispatch) => ({
  listarCartaCoberturaEditar: (linkBackEnd) =>
    dispatch(cartaCoberturaActions.listarCartaCoberturaEditar(linkBackEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListCartaCobertura);
