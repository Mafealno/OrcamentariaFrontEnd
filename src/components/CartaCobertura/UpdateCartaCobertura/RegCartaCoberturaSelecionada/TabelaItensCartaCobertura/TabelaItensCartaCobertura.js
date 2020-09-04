import React, { useState, useEffect } from "react";
import "./TabelaItensCartaCobertura.css";
import "./ItemTabelaItensCartaCobertura/ItemTabelaItensCartaCobertura";
import ToastControl from "../../../../ToastControl/ToastControl";
import * as cartaCoberturaActions from "../../../../../store/actions/cartaCobertura";

import ItemTabelaItensCartaCobertura from "./ItemTabelaItensCartaCobertura/ItemTabelaItensCartaCobertura";

import { connect } from "react-redux";

function TabelaItensCartaCobertura(props) {
  let [
    itemTabelaItensCartaCoberturaDisplay,
    setItemTabelaItensCartaCoberturaDisplay,
  ] = useState([]);
  let [showToast, setShowToast] = useState(false);
  let [configToast, setConfigToast] = useState({
    estiloToast: "",
    estiloToastHeader: "",
    estiloToastBody: "",
    delayToast: 0,
    autoHideToast: false,
    hideToastHeader: true,
    conteudoHeader: "",
    conteudoBody: "",
    closeToast: {},
  });

  useEffect(() => {
    if (props.listCartaCoberturaEditar) {
      montarItemCartaCobertura();
    }
  }, [
    props.listCartaCoberturaEditar.length || [],
    props.listCartaCoberturaEditar,
  ]);

  const exibirTost = (tipo, mensagem) => {
    switch (tipo) {
      case "sucesso":
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastSucesso",
          estiloToastBody: "estiloToastSucesso",
          delayToast: 3000,
          autoHideToast: true,
          hideToastHeader: false,
          conteudoHeader: "",
          conteudoBody: mensagem,
          closeToast: () => setShowToast(),
        });
        setShowToast(true);
        break;
      case "erro":
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastErro",
          estiloToastBody: "estiloToastErro",
          delayToast: 6000,
          autoHideToast: true,
          hideToastHeader: false,
          conteudoHeader: "",
          conteudoBody: mensagem,
          closeToast: () => setShowToast(),
        });
        setShowToast(true);
        break;
      default:
        break;
    }
  };

  const montarItemCartaCobertura = () => {
    setItemTabelaItensCartaCoberturaDisplay(
      props.listCartaCoberturaEditar.map((elementoAtual) => (
        <ItemTabelaItensCartaCobertura
          key={elementoAtual.CARTA_COBERTURA_ID}
          dados={elementoAtual}
          deletarCartaCobertura={(cartaCobertura) =>
            deletarCartaCobertura(cartaCobertura)
          }
          atualizarReferencia={(
            cartaCoberturaId,
            novaReferecia,
            setReferencia
          ) =>
            atualizarReferencia(cartaCoberturaId, novaReferecia, () =>
              setReferencia(novaReferecia)
            )
          }
        />
      ))
    );
  };

  const deletarCartaCobertura = (cartaCobertura) => {
    fetch(
      props.linkBackEnd +
        "/cartaCobertura/" +
        cartaCobertura.CARTA_COBERTURA_ID,
      {
        method: "DELETE",
      }
    ).then((data) => {
      if (data.ok) {
        const msg = "Referência deletada com sucesso";

        exibirTost(
          "sucesso",
          msg,
          props.removerItemCartaCoberturaEditar(
            props.cartaCoberturaEditar,
            cartaCobertura.CARTA_COBERTURA_ID
          )
        );
      }
    });
  };

  const atualizarReferencia = (
    cartaCoberturaId,
    novaReferecia,
    setReferencia
  ) => {
    const cartaCobertura = {
      CARTA_COBERTURA_ID: cartaCoberturaId,
      REFERENCIA: novaReferecia,
      MATERIAL: props.cartaCoberturaEditar.MATERIAL,
      LIST_ITENS_CARTA_COBERTURA: [],
    };

    fetch(
      props.linkBackEnd +
        "/cartaCobertura/buscar/" +
        cartaCobertura.REFERENCIA +
        "/" +
        cartaCobertura.MATERIAL.FABRICANTE.PESSOA_ID +
        "/" +
        cartaCobertura.MATERIAL.MATERIAL_ID,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data[0]) {
          const msg =
            "Já existe uma carta de cobertura para o item " +
            cartaCobertura.MATERIAL.NOME_MATERIAL +
            " e referência " +
            cartaCobertura.REFERENCIA +
            ". Altere a referencia e tente novamente.";

          exibirTost("erro", msg);

          return;
        } else {
          fetch(props.linkBackEnd + "/cartaCobertura/" + cartaCoberturaId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartaCobertura),
          }).then((data) => {
            if (data.ok) {
              const msg = "Referência atualizada com sucesso";
              exibirTost("sucesso", msg);
              setReferencia(novaReferecia);
            } else {
              const msg = "Erro inexperado ao salvar referência";
              exibirTost("erro", msg);

              return data;
            }
          });
        }
      });
  };

  return (
    <>
      <div id="containerTabelaItensCartaCobertura">
        {itemTabelaItensCartaCoberturaDisplay}
      </div>
      <div>
        <ToastControl
          showToast={showToast}
          closeToast={configToast.closeToast}
          delayToast={configToast.delayToast}
          autoHideToast={configToast.autoHideToast}
          estiloToastHeader={configToast.estiloToastHeader}
          estiloToastBody={configToast.estiloToastBody}
          hideToastHeader={configToast.hideToastHeader}
          conteudoHeader={configToast.conteudoHeader}
          conteudoBody={configToast.conteudoBody}
        ></ToastControl>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listCartaCoberturaEditar:
    state.cartaCobertura.cartaCoberturaEditar.LIST_CARTA_COBERTURA,
  cartaCoberturaEditar: state.cartaCobertura.cartaCoberturaEditar,
});

const mapDispatchToProps = (dispatch) => ({
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
)(TabelaItensCartaCobertura);
