/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "./ItensCartaCobertura.css";
import AddItensCartaCobertura from "./AddItensCartaCobertura/AddItensCartaCobertura";
import ToastControl from "../../../ToastControl/ToastControl";
import * as cartaCoberturaActions from "../../../../store/actions/cartaCobertura";
import { connect } from "react-redux";

function ItensCartaCobertura(props) {
  let [keyComponente, setKeyComponente] = useState(0);
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
    if (document.getElementById("btn-adicionar-componente")) {
      var containerAutoScrool = document.getElementById(
        "containerItensCartaCobertura"
      );
      if (containerAutoScrool.scrollLeft !== containerAutoScrool.scrollWidth) {
        containerAutoScrool.scrollTo(containerAutoScrool.scrollWidth, 0);
      }

      if (props.listComponenteItems.length == 9) {
        const msg = "Limite de componentes atingido";
        exibirTost("erro", msg);
      }
    }
  }, [props.listComponenteItems.length]);

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

  const criarCompornente = () => {
    const componenteCriado = (
      <AddItensCartaCobertura
        key={keyComponente}
        statusComponente={["Criado"]}
        keyComponente={keyComponente}
      />
    );
    setKeyComponente((keyComponente) => keyComponente + 1);

    return componenteCriado;
  };

  return (
    <>
      <div id="containerItensCartaCobertura">
        {props.listComponenteItems}

        <div id="button-add">
          {props.materialCartaCoberturaSalvar.MATERIAL_ID &&
            props.listComponenteItems.length < 9 && (
              <button
                type="button"
                id="btn-adicionar-componente"
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
  listComponenteItems: state.cartaCobertura.listComponenteItems,
  materialCartaCoberturaSalvar:
    state.cartaCobertura.materialCartaCoberturaSalvar,
  listCartaCoberturaSalvar: state.cartaCobertura.listCartaCoberturaSalvar,
});

const mapDispatchToProps = (dispatch) => ({
  adicionarComponenteItems: (listComponenteItems, novoComponente) =>
    dispatch(
      cartaCoberturaActions.adicionarComponenteItems(
        listComponenteItems,
        novoComponente
      )
    ),
  adicionarCartaCoberturaSalvar: (
    listCartaCoberturaSalvar,
    novoObjCartaCobertura
  ) =>
    dispatch(
      cartaCoberturaActions.adicionarCartaCoberturaSalvar(
        listCartaCoberturaSalvar,
        novoObjCartaCobertura
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItensCartaCobertura);
