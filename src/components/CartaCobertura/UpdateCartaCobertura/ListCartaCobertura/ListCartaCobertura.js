import React, { useState, useEffect } from "react";
import "./ListCartaCobertura.css";
import ItemCartaCobertura from "./ItemCartaCobertura/ItemCartaCobertura";
import * as cartaCoberturaActions from "../../../../store/actions/cartaCobertura";

import { connect } from "react-redux";

function ListCartaCobertura(props) {
  let [listMaterialCartaCobertura, setMaterialListCartaCobertura] = useState(
    []
  );
  let [
    listMaterialCartaCoberturaDisplay,
    setMaterialListCartaCoberturaDisplay,
  ] = useState([]);

  let [montandoItemCartaCobertura, setMontandoItemCartaCobertura] = useState();

  useEffect(() => {
    props.listarCartaCoberturaEditar(props.linkBackEnd);
  }, [props.cartaCoberturaEditar]);

  useEffect(() => {
    ordernarCartaCoberturaPorMaterial();
  }, [props.listCartaCoberturaEditar.length]);

  useEffect(() => {
    if (props.listCartaCoberturaEditar.length > 0) {
      montarElementosDisplay();
    }
  }, [listMaterialCartaCobertura.length]);

  const ordernarCartaCoberturaPorMaterial = () => {
    setMontandoItemCartaCobertura(true);

    let listCartaCoberturaAux = [];
    props.listCartaCoberturaEditar.map((elementoAtual) => {
      const material = listCartaCoberturaAux.find(
        (elemento) =>
          (elemento.MATERIAL.MATERIAL_ID = elementoAtual.MATERIAL.MATERIAL_ID)
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
          MATERIAL: elementoAtual.MATERIAL,
          LIST_CARTA_COBERTURA: [objCartaCobertura],
        };

        listCartaCoberturaAux.push(objMaterialCartaCobertura);
      }
    });

    if (listCartaCoberturaAux.length == 0) {
      setMontandoItemCartaCobertura(false);
      setMaterialListCartaCoberturaDisplay([]);
    } else {
      setMaterialListCartaCobertura(listCartaCoberturaAux);
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

    setMaterialListCartaCoberturaDisplay(materialListCartaCoberturaDisplayAux);

    setMontandoItemCartaCobertura(false);
  };

  return (
    <div id="container-list-carta-cobertura">
      {montandoItemCartaCobertura && (
        <div className="container-carregando-list-carta-cobertura">
          <span className="fa fa-spinner fa-spin"></span>
        </div>
      )}
      {!montandoItemCartaCobertura && listMaterialCartaCoberturaDisplay}
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