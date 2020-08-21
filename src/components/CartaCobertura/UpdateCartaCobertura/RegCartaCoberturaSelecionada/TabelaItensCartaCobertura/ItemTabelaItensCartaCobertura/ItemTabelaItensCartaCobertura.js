import React, { useState, useEffect } from "react";
import "./ItemTabelaItensCartaCobertura.css";
import * as cartaCoberturaActions from "../../../../../../store/actions/cartaCobertura";
import ModalVisualizacaoItensCartaCobertura from "./ModalVisualizacaoItensCartaCobertura/ModalVisualizaçãoItensCartaCobertura";

import { connect } from "react-redux";

function ItemTabelaItensCartaCobertura(props) {
  let [modalVisualizacaoShow, setModalVisualizacaoShow] = useState(false);
  let [listTempoFogo, setListTempoFogo] = useState([]);
  let [listTempoFogoDisplay, setListTempoFogoDisplay] = useState([]);
  let [referencia, setReferencia] = useState("");

  useEffect(() => {
    if (props.dados.LIST_ITENS_CARTA_COBERTURA) {
      ordernarCartaCoberturaPorTempoFogo();
    }
  }, [props.dados.LIST_ITENS_CARTA_COBERTURA]);

  useEffect(() => {
    if (props.dados.LIST_ITENS_CARTA_COBERTURA) {
      montarElementoDisplay();
    }
  }, [listTempoFogo]);

  useEffect(() => {
    setReferencia(props.dados.REFERENCIA);
  }, [props.dados.CARTA_COBERTURA_ID]);

  const deleterCartaCobertura = (cartaCobertura) => {
    fetch(
      props.linkBackEnd +
        "/cartaCobertura/" +
        cartaCobertura.CARTA_COBERTURA_ID,
      {
        method: "DELETE",
      }
    ).then(() => {
      props.removerItemCartaCoberturaEditar(
        props.cartaCoberturaEditar,
        cartaCobertura.CARTA_COBERTURA_ID
      );
    });
  };

  const ordernarCartaCoberturaPorTempoFogo = () => {
    let listTempoFogoAux = [];

    props.dados.LIST_ITENS_CARTA_COBERTURA.map((elementoAtual) => {
      const tempoFogo = listTempoFogoAux.find(
        (elemento) =>
          elemento.TEMPO_RESISTENCIA_FOGO ==
          elementoAtual.TEMPO_RESISTENCIA_FOGO
      );

      if (tempoFogo) {
        const indexElemento = listTempoFogoAux.indexOf(tempoFogo);

        const objItemCartaCobertura = {
          CARTA_COBERTURA_ID: elementoAtual.CARTA_COBERTURA_ID,
          ITENS_CARTA_COBERTURA_ID: elementoAtual.ITENS_CARTA_COBERTURA_ID,
          VALOR_ESPESSURA: elementoAtual.VALOR_ESPESSURA,
          VALOR_HP_A: elementoAtual.VALOR_HP_A,
        };
        listTempoFogoAux[indexElemento].LIST_ITENS_CARTA_COBERTURA.push(
          objItemCartaCobertura
        );
      } else {
        const objTempoFogo = {
          TEMPO_RESISTENCIA_FOGO: elementoAtual.TEMPO_RESISTENCIA_FOGO,
          LIST_ITENS_CARTA_COBERTURA: [
            {
              CARTA_COBERTURA_ID: elementoAtual.CARTA_COBERTURA_ID,
              ITENS_CARTA_COBERTURA_ID: elementoAtual.ITENS_CARTA_COBERTURA_ID,
              VALOR_ESPESSURA: elementoAtual.VALOR_ESPESSURA,
              VALOR_HP_A: elementoAtual.VALOR_HP_A,
            },
          ],
        };

        listTempoFogoAux.push(objTempoFogo);
      }
    });

    setListTempoFogo(listTempoFogoAux);
  };

  const montarElementoDisplay = () => {
    let tempoFogoCartaCoberuraDisplayAux = [];

    tempoFogoCartaCoberuraDisplayAux = listTempoFogo.map((elementoAtual) => (
      <div className="item-tempo-fogo" onClick={() => elementoAtual}>
        {elementoAtual.TEMPO_RESISTENCIA_FOGO}
      </div>
    ));

    setListTempoFogoDisplay(tempoFogoCartaCoberuraDisplayAux);
  };

  return (
    <>
      <div className="container-item-carta-cobertura">
        <div className="referencia">
          <label className="titulo-item-carta">Referência</label>
          <label>{referencia}</label>
        </div>
        <label className="titulo-item-carta">Tempo de Resistência</label>
        <div className="container-tempo-fogo">{listTempoFogoDisplay}</div>
        <div className="container-btn-opcoes-carta-cobertura">
          <button
            type="button"
            className="btn btn-danger btn-opcoes-carta-cobertura"
            onClick={() => deleterCartaCobertura(props.dados)}
          >
            Excluir
          </button>

          <button
            type="button"
            className="btn btn-primary btn-opcoes-carta-cobertura"
            onClick={() => setModalVisualizacaoShow(true)}
          >
            Visualizar
          </button>
        </div>
      </div>

      <ModalVisualizacaoItensCartaCobertura
        show={modalVisualizacaoShow}
        listTempoFogo={listTempoFogo}
        onHide={() => setModalVisualizacaoShow(false)}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  cartaCoberturaEditar: state.cartaCobertura.cartaCoberturaEditar,
});

const mapDispatchToProps = (dispatch) => ({
  listarCartaCoberturaEditar: (linkBackEnd) =>
    dispatch(cartaCoberturaActions.listarCartaCoberturaEditar(linkBackEnd)),
  removerItemCartaCoberturaEditar: (cartaCoberturaEditar, cartaCoberturaId) =>
    dispatch(
      cartaCoberturaActions.removerItemCartaCoberturaEditar(
        cartaCoberturaEditar,
        cartaCoberturaId
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemTabelaItensCartaCobertura);
