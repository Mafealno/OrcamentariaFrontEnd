import React, { useState } from "react";
import { connect } from "react-redux";
import "./AcoesCartaCobertura.css";
import * as cartaCoberturaActions from "../../../../store/actions/cartaCobertura";
import ToastControl from "../../../ToastControl/ToastControl";
import ModalConfirm from "../../../ModalConfirm/ModalConfirm";

function AcoesCartaCobertura(props) {
  let [showToast, setShowToast] = useState(false);
  let [showModalConfirm, setShowModalConfirm] = useState(false);
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

  let contador = 0;

  const salvarCadastro = () => {
    const qdtdeItensSalvar = props.listComponenteItems.filter(
      (elemento) => elemento.props.statusComponente[0] == "Aprovado"
    ).length;

    props.listCartaCoberturaSalvar.forEach((ItemCartaCobertura) => {
      if (
        props.listComponenteItems.find(
          (elemento) => elemento.key == ItemCartaCobertura.keyComponente
        ).props.statusComponente[0] == "Aprovado"
      ) {
        fetch(
          props.linkBackEnd +
            "/cartaCobertura/buscar/" +
            ItemCartaCobertura.cartaCobertura.REFERENCIA +
            "/" +
            ItemCartaCobertura.cartaCobertura.MATERIAL.FABRICANTE.PESSOA_ID +
            "/" +
            ItemCartaCobertura.cartaCobertura.MATERIAL.MATERIAL_ID,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data[0]) {
              setConfigToast({
                estiloToast: "",
                estiloToastHeader: "estiloToastErro",
                estiloToastBody: "estiloToastErro",
                delayToast: 0,
                autoHideToast: false,
                hideToastHeader: true,
                conteudoHeader: "",
                conteudoBody:
                  "Já existe uma carta de cobertura para o item " +
                  ItemCartaCobertura.cartaCobertura.MATERIAL.NOME_MATERIAL +
                  " e referência " +
                  ItemCartaCobertura.cartaCobertura.REFERENCIA +
                  ". Altere a referencia e/ou item e tente novamente.",
                closeToast: () => setShowToast(),
              });
              setShowToast(true);

              return;
            } else {
              contador++;

              fetch(props.linkBackEnd + "/cartaCobertura/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ItemCartaCobertura.cartaCobertura),
              })
                .then((response) => response.json())
                .then((data) => {
                  setConfigToast({
                    estiloToast: "",
                    estiloToastHeader: "estiloToastSucesso",
                    estiloToastBody: "estiloToastSucesso",
                    delayToast: 3000,
                    autoHideToast: true,
                    hideToastHeader: false,
                    conteudoHeader: "",
                    conteudoBody:
                      contador + "/" + qdtdeItensSalvar + " concluido(s)",
                    closeToast: () => setShowToast(),
                  });
                  setShowToast(true);

                  props.alterarStatusComponente(
                    props.listComponenteItems,
                    ItemCartaCobertura.keyComponente,
                    "Concluido"
                  );

                  props.listarCartaCoberturaEditar(props.linkBackEnd);
                })
                .catch((data) => {});
            }
          });
      }
    });
  };
  return (
    <>
      {props.listCartaCoberturaSalvar.length > 0 && (
        <>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-salvar-carta-cobertura"
              onClick={() => setShowModalConfirm(true)}
            >
              Salvar
            </button>
          </div>
        </>
      )}
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
      <div>
        <ModalConfirm
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          acaoConfirmada={() => salvarCadastro()}
          tituloModalConfirm={
            "Serão salvos apenas os elementos com status 'Aprovado'."
          }
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  listCartaCoberturaSalvar: state.cartaCobertura.listCartaCoberturaSalvar,
  listComponenteItems: state.cartaCobertura.listComponenteItems,
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({
  alterarStatusComponente: (
    listComponenteItems,
    keyComponente,
    statusAlteracao
  ) =>
    dispatch(
      cartaCoberturaActions.alterarStatusComponente(
        listComponenteItems,
        keyComponente,
        statusAlteracao
      )
    ),
  listarCartaCoberturaEditar: (linkBackEnd) =>
    dispatch(cartaCoberturaActions.listarCartaCoberturaEditar(linkBackEnd)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcoesCartaCobertura);
