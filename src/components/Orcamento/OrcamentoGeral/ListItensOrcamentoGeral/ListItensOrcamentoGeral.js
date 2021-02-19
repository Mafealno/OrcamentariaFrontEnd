/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "./ListItensOrcamentoGeral.css";
import ModalItemOrcamentoGeral from "./ModalItemOrcamentoGeral/ModalItemOrcamentoGeral";
import ItemOrcamentoGeral from "./ItemOrcamentoGeral/ItemOrcamentoGeral";
import TotaisItensOrcamentoGeral from "./TotaisItensOrcamentoGeral/TotaisItensOrcamentoGeral";
import ToastControl from "../../../ToastControl/ToastControl";

import * as orcamentoActions from "../../../../store/actions/orcamento";

import { connect } from "react-redux";

function ListItensOrcamentoGeral(props) {
  let [showModalItemOrcamentoGeral, setShowModalItemOrcamentoGeral] = useState(
    false
  );
  let [
    listItensOrcamentoGeralDisplay,
    setListItensOrcamentoGeralDisplay,
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
    montarComponente();
  }, [props.listItensOrcamentoGeral]);

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

  const montarComponente = () => {
    if (props.listItensOrcamentoGeral.length > 0) {
      setListItensOrcamentoGeralDisplay(
        props.listItensOrcamentoGeral.map((elemento) => (
          <ItemOrcamentoGeral
            key={"ITENS_ORCAMENTO_ID-" + elemento.ITENS_ORCAMENTO_ID}
            ItemOrcamentoGeral={elemento}
            salvarItemOrcamentoGeral={(
              itemOrcamentoGeral,
              fazerAposCadastrar
            ) =>
              salvarItemOrcamentoGeral(itemOrcamentoGeral, fazerAposCadastrar)
            }
            deletarItemOrcamentoGeral={(itensOrcamentoId) =>
              deletarItemOrcamentoGeral(itensOrcamentoId)
            }
            atualizarItemOrcamentoGeral={(itemOrcamentoGeral) =>
              atualizarItemOrcamentoGeral(itemOrcamentoGeral)
            }
          />
        ))
      );
    }
  };

  const salvarItemOrcamentoGeral = (itemOrcamentoGeral, fazerAposCadastrar) => {
    fetch(props.linkBackEnd + "/itensOrcamentoGeral/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemOrcamentoGeral),
    })
      .then((response) => response.json())
      .then((data) => {
        props.adicionarItemOrcamentoGeral(props.listItensOrcamentoGeral, data);

        props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);

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

  const deletarItemOrcamentoGeral = (itensOrcamentoId) => {
    fetch(
      props.linkBackEnd +
        "/itensOrcamentoGeral/deletar?itensOrcamentoId=" +
        itensOrcamentoId,
      {
        method: "DELETE",
      }
    ).then((data) => {
      if (data.ok) {

        props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);

        props.removerItemOrcamentoGeral(
          props.listItensOrcamentoGeral,
          itensOrcamentoId
        );

        const msg = "Exclusão efetuada com sucesso";

        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar exclusão";

        exibirTost("erro", msg);
      }
    });
  };

  const atualizarItemOrcamentoGeral = (itemOrcamentoGeral) => {
    fetch(
      props.linkBackEnd +
        "/itensOrcamentoGeral/" +
        itemOrcamentoGeral.ITENS_ORCAMENTO_ID,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemOrcamentoGeral),
      }
    ).then((data) => {
      if (data.ok) {

        props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);

        props.recarregarItensOrcamentoGeral(
          props.linkBackEnd,
          itemOrcamentoGeral.ORCAMENTO_ID
        );

        const index = props.listItensOrcamentoGeral.findIndex(
          (elemento) =>
            elemento.ITENS_ORCAMENTO_ID == itemOrcamentoGeral.ITENS_ORCAMENTO_ID
        );

        props.listItensOrcamentoGeral[index] = itemOrcamentoGeral;

        montarComponente();

        const msg = "Atualização efetuada com sucesso";
        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar atualização";

        exibirTost("erro", msg);
      }
    });
  };

  return (
    <div id="containerListItensOrcamentoGeral">
        <div id="btn-add-item-orcamento-geral">
          <button
            type="button"
            className="btn"
            onClick={() => setShowModalItemOrcamentoGeral(true)}
          >
            Adicionar Item
          </button>
        </div>

        <div id="list-itens-orcamento-geral">
          {listItensOrcamentoGeralDisplay}
        </div>

        <div id="totais-itens-orcamento-geral">
          <TotaisItensOrcamentoGeral />
        </div>
      <div>
        <ModalItemOrcamentoGeral
          show={showModalItemOrcamentoGeral}
          onHide={() => setShowModalItemOrcamentoGeral(false)}
          salvarItemOrcamentoGeral={(itemOrcamentoGeral, fazerAposCadastrar) =>
            salvarItemOrcamentoGeral(itemOrcamentoGeral, fazerAposCadastrar)
          }
          deletarItemOrcamentoGeral={(itensOrcamentoId) =>
            deletarItemOrcamentoGeral(itensOrcamentoId)
          }
          atualizarItemOrcamentoGeral={(itemOrcamentoGeral) =>
            atualizarItemOrcamentoGeral(itemOrcamentoGeral)
          }
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listItensOrcamentoGeral: state.orcamento.listItensOrcamentoGeral,
  orcamentoSelecionado: state.orcamento.orcamentoSelecionado
});

const mapDispatchToProps = (dispatch) => ({
  adicionarItemOrcamentoGeral: (listItensOrcamentoGeral, itemOrcamentoGeral) =>
    dispatch(
      orcamentoActions.adicionarItemOrcamentoGeral(
        listItensOrcamentoGeral,
        itemOrcamentoGeral
      )
    ),
  removerItemOrcamentoGeral: (listItensOrcamentoGeral, itensOrcamentoId) =>
    dispatch(
      orcamentoActions.removerItemOrcamentoGeral(
        listItensOrcamentoGeral,
        itensOrcamentoId
      )
    ),
  recarregarItensOrcamentoGeral: (linkBackEnd, orcamentoId) =>
    dispatch(
      orcamentoActions.recarregarItensOrcamentoGeral(linkBackEnd, orcamentoId)
    ),
    recarregarTotaisOrcamento : (linkBackEnd, orcamentoId) =>
    dispatch(orcamentoActions.recarregarTotaisOrcamento(linkBackEnd, orcamentoId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItensOrcamentoGeral);
