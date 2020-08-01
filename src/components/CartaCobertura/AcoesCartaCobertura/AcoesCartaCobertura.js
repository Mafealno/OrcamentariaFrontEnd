import React, { useState } from "react";
import { connect } from "react-redux";
import ToastControl from "../../ToastControl/ToastControl";

function AcoesCartaCobertura(props) {
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

  const salvarCadastro = () => {
    props.listCartaCoberturaSalvar.forEach((cartaCobertura) => {
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
                cartaCobertura.MATERIAL.NOME_MATERIAL +
                " e referência " +
                cartaCobertura.REFERENCIA +
                ". Altere a referencia e/ou item e tente novamente.",
              closeToast: () => setShowToast(),
            });
            setShowToast(true);

            return;
          } else {
            fetch(props.linkBackEnd + "/cartaCobertura/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(cartaCobertura),
            })
              .then((response) => response.json())
              .then((data) => {});
          }
        });
    });
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => salvarCadastro()}
      >
        Salvar
      </button>
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
  listCartaCoberturaSalvar: state.cartaCobertura.listCartaCoberturaSalvar,
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcoesCartaCobertura);
