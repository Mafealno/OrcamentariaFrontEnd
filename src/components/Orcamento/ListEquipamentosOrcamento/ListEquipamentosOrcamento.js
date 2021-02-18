import React, { useState, useEffect } from "react";
import "./ListEquipamentosOrcamento.css";
import ItemEquipamentoOrcamento from "./ItemEquipamentoOrcamento/ItemEquipamentoOrcamento";
import ModalEquipamentoOrcamento from "./ModalEquipamentoOrcamento/ModalEquipamentoOrcamento";
import ToastControl from "../../ToastControl/ToastControl";
import * as orcamentoActions from "../../../store/actions/orcamento";
import TotaisEquipamentoOrcamento from "./TotaisEquipamentoOrcamento/TotaisEquipamentoOrcamento";
import { connect } from "react-redux";

function ListEquipamentosOrcamento(props) {
  let [listItemEquipamentoOrcamentoDisplay,setListItemEquipamentoOrcamentoDisplay] = useState([]);
  let [showModalEquipamentoOrcamento, setShowModalEquipamentoOrcamento] = useState(false);
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
    montarItemDisplay();
  }, [props.listEquipamentoOrcamento.length]);

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

  const montarItemDisplay = () => {
    if (props.listEquipamentoOrcamento.length > 0) {
      setListItemEquipamentoOrcamentoDisplay(
        props.listEquipamentoOrcamento.map((elemento) => (
          <ItemEquipamentoOrcamento
            key={elemento.EQUIPAMENTO_ORCAMENTO_ID}
            equipamentoOrcamento={elemento}
            salvarEquipamentoOrcamento={(
              equipamentoOrcamento,
              fazerAposCadastrar
            ) =>
              salvarEquipamentoOrcamento(
                equipamentoOrcamento,
                fazerAposCadastrar
              )
            }
            deletarEquipamentoOrcamento={(equipamentoOrcamentoId) =>
              deletarEquipamentoOrcamento(equipamentoOrcamentoId)
            }
            atualizarEquipamentoOrcamento={(equipamentoOrcamento) =>
              atualizarEquipamentoOrcamento(equipamentoOrcamento)
            }
          />
        ))
      );
    } else {
      setListItemEquipamentoOrcamentoDisplay([]);
    }
  };

  const salvarEquipamentoOrcamento = (
    equipamentoOrcamento,
    fazerAposCadastrar
  ) => {
    fetch(props.linkBackEnd + "/equipamentoOrcamento/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(equipamentoOrcamento),
    })
      .then((response) => response.json())
      .then((data) => {

        props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);

        props.adicionarItemEquipamentoOrcamento(
          props.listEquipamentoOrcamento,
          data
        );

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

  const deletarEquipamentoOrcamento = (equipamentoOrcamentoId) => {
    fetch(
      props.linkBackEnd +
        "/equipamentoOrcamento/deletar?equipamentoOrcamentoId=" +
        equipamentoOrcamentoId,
      {
        method: "DELETE",
      }
    ).then((data) => {
      if (data.ok) {

        props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);

        props.removerItemEquipamentoOrcamento(
          props.listEquipamentoOrcamento,
          equipamentoOrcamentoId
        );

        const msg = "Exclusão efetuada com sucesso";
        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar exclusão";
        exibirTost("erro", msg);
      }
    });
  };

  const atualizarEquipamentoOrcamento = (equipamentoOrcamento) => {
    fetch(
      props.linkBackEnd +
        "/equipamentoOrcamento/" +
        equipamentoOrcamento.EQUIPAMENTO_ORCAMENTO_ID,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(equipamentoOrcamento),
      }
    ).then((data) => {
      if (data.ok) {

        props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);

        props.recarregarItensEquipamentoOrcamento(
          props.linkBackEnd,
          equipamentoOrcamento.ORCAMENTO_ID
        );

        const index = props.listEquipamentoOrcamento.findIndex(
          (elemento) =>
            elemento.EQUIPAMENTO_ORCAMENTO_ID ==
            equipamentoOrcamento.EQUIPAMENTO_ORCAMENTO_ID
        );

        props.listEquipamentoOrcamento[index] = equipamentoOrcamento;

        montarItemDisplay();

        const msg = "Atualização efetuada com sucesso";
        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar atualização";
        exibirTost("erro", msg);
      }
    });
  };

  return (
    <>
      <div id="containerListEquipamentoOrcamento">
          <div id="btn-add-mao-obra-orcamento">
            <button
              type="button"
              className="btn"
              onClick={() => setShowModalEquipamentoOrcamento(true)}
            >
              Adicionar equipamento
            </button>
          </div>
          <div id="list-mao-obra-orcamento">
            {listItemEquipamentoOrcamentoDisplay}
          </div>
          <div id="totais-mao-obra-orcamento">
            <TotaisEquipamentoOrcamento />
          </div>
      </div>
      <div>
        <ModalEquipamentoOrcamento
          show={showModalEquipamentoOrcamento}
          onHide={() => setShowModalEquipamentoOrcamento(false)}
          salvarEquipamentoOrcamento={(
            equipamentoOrcamento,
            fazerAposCadastrar
          ) =>
            salvarEquipamentoOrcamento(equipamentoOrcamento, fazerAposCadastrar)
          }
          deletarEquipamentoOrcamento={(equipamentoOrcamentoId) =>
            deletarEquipamentoOrcamento(equipamentoOrcamentoId)
          }
          atualizarEquipamentoOrcamento={(equipamentoOrcamento) =>
            atualizarEquipamentoOrcamento(equipamentoOrcamento)
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
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listEquipamentoOrcamento: state.orcamento.listEquipamentoOrcamento,
  orcamentoSelecionado: state.orcamento.orcamentoSelecionado
});

const mapDispatchToProps = (dispatch) => ({
  adicionarItemEquipamentoOrcamento: (
    listEquipamentoOrcamento,
    ItemEquipamentoOrcamento
  ) =>
    dispatch(
      orcamentoActions.adicionarItemEquipamentoOrcamento(
        listEquipamentoOrcamento,
        ItemEquipamentoOrcamento
      )
    ),
  removerItemEquipamentoOrcamento: (
    listEquipamentoOrcamento,
    equipamentoOrcamentoId
  ) =>
    dispatch(
      orcamentoActions.removerItemEquipamentoOrcamento(
        listEquipamentoOrcamento,
        equipamentoOrcamentoId
      )
    ),
  recarregarItensEquipamentoOrcamento: (linkBackEnd, orcamentoId) =>
    dispatch(
      orcamentoActions.recarregarItensEquipamentoOrcamento(
        linkBackEnd,
        orcamentoId
      )
    ),
    recarregarTotaisOrcamento : (linkBackEnd, orcamentoId) =>
    dispatch(orcamentoActions.recarregarTotaisOrcamento(linkBackEnd, orcamentoId)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListEquipamentosOrcamento);
