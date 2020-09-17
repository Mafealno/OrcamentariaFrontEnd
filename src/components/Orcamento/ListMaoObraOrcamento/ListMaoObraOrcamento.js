import React, { useState, useEffect } from "react";
import "./ListMaoObraOrcamento.css";
import ItemMaoObraOrcamento from "./ItemMaoObraOrcamento/ItemMaoObraOrcamento";
import TotaisMaoObraOrcamento from "./TotaisMaoObraOrcamento/TotaisMaoObraOrcamento";
import ModalMaoObraOrcamento from "./ModalMaoObraOrcamento/ModalMaoObraOrcamento";
import ToastControl from "../../ToastControl/ToastControl";

import * as orcamentoActions from "../../../store/actions/orcamento";

import { connect } from "react-redux";

function ListMaoObraOrcamento(props) {
  let [
    totaisMaoObraOrcamentoDisplay,
    setTotaisMaoObraOrcamentoDisplay,
  ] = useState(<></>);
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

  let [itemMaoObraOrcamentoDisplay, setItemMaoObraOrcamentoDisplay] = useState(
    []
  );

  let [showModalMaoObraOrcamento, setShowModalMaoObraOrcamento] = useState(
    false
  );

  useEffect(() => {
    montarItemDisplay();
  }, [props.listMaoObraOrcamento.length]);

  const montarItemDisplay = () => {
    if (props.listMaoObraOrcamento.length > 0) {
      setItemMaoObraOrcamentoDisplay(
        props.listMaoObraOrcamento.map((elemento) => (
          <ItemMaoObraOrcamento
            key={elemento.MAO_OBRA_ORCAMENTO_ID}
            dadosMaoObra={elemento}
            deletarCadastro={(maoObraOrcamentoId) =>
              deletarCadastro(maoObraOrcamentoId)
            }
            salvarCadastro={(objMaoObraOrcamento) =>
              salvarCadastro(objMaoObraOrcamento)
            }
            editarCadastro={(objMaoObraOrcamento) =>
              editarCadastro(objMaoObraOrcamento)
            }
            montarItemDisplay={() => montarItemDisplay()}
          />
        ))
      );
      setTotaisMaoObraOrcamentoDisplay(<></>);
      setTotaisMaoObraOrcamentoDisplay(<TotaisMaoObraOrcamento />);
    }
  };

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

  const salvarCadastro = (objMaoObraOrcamento, fazerAposCadastrar) => {
    fetch(props.linkBackEnd + "/maoObraOrcamento/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objMaoObraOrcamento),
    })
      .then((response) => response.json())
      .then((data) => {
        props.adicionarMaoObraOrcamento(props.listMaoObraOrcamento, data);

        const msg = "Cadastro efetuado com sucesso";
        exibirTost("sucesso", msg);

        if (fazerAposCadastrar) {
          fazerAposCadastrar(data);
        }
      })
      .catch(() => {
        const msg = "Erro ao efetuar cadastro";
        exibirTost("erro", msg);
      });
  };

  const deletarCadastro = (maoObraOrcamentoId) => {
    fetch(
      props.linkBackEnd +
        "/maoObraOrcamento/deletar/" +
        maoObraOrcamentoId +
        "/" +
        props.orcamentoSelecionado.ORCAMENTO_ID,
      { method: "DELETE" }
    ).then((data) => {
      if (data.ok) {
        props.removerMaoObraOrcamento(
          props.listMaoObraOrcamento,
          maoObraOrcamentoId
        );

        const msg = "Exclusão realizada com sucesso";
        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar exclusão";
        exibirTost("erro", msg);
      }
    });
  };

  const editarCadastro = (objMaoObraOrcamento) => {
    fetch(
      props.linkBackEnd +
        "/maoObraOrcamento/" +
        objMaoObraOrcamento.MAO_OBRA_ORCAMENTO_ID,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objMaoObraOrcamento),
      }
    ).then((data) => {
      if (data.ok) {
        const msg = "Cadastro atualizado com sucesso";
        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar atualização";
        exibirTost("erro", msg);
      }
    });
  };

  return (
    <>
      <div id="containerMaoObraOrcamento">
        <div className="form form-orcamento">
          <div id="btn-add-mao-obra-orcamento">
            <button
              type="button"
              className="btn"
              onClick={() => setShowModalMaoObraOrcamento(true)}
            >
              Adicionar funcionário
            </button>
          </div>
          <div id="list-mao-obra-orcamento">{itemMaoObraOrcamentoDisplay}</div>
          <div id="totais-mao-obra-orcamento">
            {totaisMaoObraOrcamentoDisplay}
          </div>
        </div>
      </div>
      <div>
        <ModalMaoObraOrcamento
          show={showModalMaoObraOrcamento}
          onHide={() => setShowModalMaoObraOrcamento(false)}
          deletarCadastro={(maoObraOrcamentoId) =>
            deletarCadastro(maoObraOrcamentoId)
          }
          salvarCadastro={(objMaoObraOrcamento, fazerAposCadastrar) =>
            salvarCadastro(objMaoObraOrcamento, fazerAposCadastrar)
          }
          editarCadastro={(objMaoObraOrcamento) =>
            editarCadastro(objMaoObraOrcamento)
          }
          montarItemDisplay={() => montarItemDisplay()}
        />
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
  orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
  listMaoObraOrcamento: state.orcamento.listMaoObraOrcamento,
});

const mapDispatchToProps = (dispatch) => ({
  adicionarMaoObraOrcamento: (listMaoObraOrcamento, maoObraOrcamento) =>
    dispatch(
      orcamentoActions.adicionarMaoObraOrcamento(
        listMaoObraOrcamento,
        maoObraOrcamento
      )
    ),
  removerMaoObraOrcamento: (listMaoObraOrcamento, maoObraOrcamentoId) =>
    dispatch(
      orcamentoActions.removerMaoObraOrcamento(
        listMaoObraOrcamento,
        maoObraOrcamentoId
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListMaoObraOrcamento);
