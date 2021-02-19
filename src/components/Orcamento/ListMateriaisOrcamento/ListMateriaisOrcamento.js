/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "./ListMateriaisOrcamento.css";
import ItemMaterialOrcamento from "./ItemMaterialOrcamento/ItemMaterialOrcamento";
import ModalMaterialOrcamento from "./ModalMaterialOrcamento/ModalMaterialOrcamento";
import ToastControl from "../../ToastControl/ToastControl";
import * as orcamentoActions from "../../../store/actions/orcamento";
import TotaisMaterialOrcamento from "./TotaisMaterialOrcamento/TotaisMaterialOrcamento";
import { connect } from "react-redux";

function ListMaterialOrcamento(props) {
  let [listItemMaterialOrcamentoDisplay,setListItemMaterialOrcamentoDisplay] = useState([]);
  let [showModalMaterialOrcamento, setShowModalMaterialOrcamento] = useState(false);
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
  }, [props.listMaterialOrcamento.length]);

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
    if (props.listMaterialOrcamento.length > 0) {
      setListItemMaterialOrcamentoDisplay(
        props.listMaterialOrcamento.map((elemento) => (
          <ItemMaterialOrcamento
            key={elemento.MATERIAL_ORCAMENTO_ID}
            materialOrcamento={elemento}
            salvarMaterialOrcamento={(
              materialOrcamento,
              fazerAposCadastrar
            ) =>
              salvarMaterialOrcamento(
                materialOrcamento,
                fazerAposCadastrar
              )
            }
            deletarMaterialOrcamento={(materialOrcamentoId) =>
              deletarMaterialOrcamento(materialOrcamentoId)
            }
            atualizarMaterialOrcamento={(materialOrcamento) =>
              atualizarMaterialOrcamento(materialOrcamento)
            }
          />
        ))
      );
    } else {
      setListItemMaterialOrcamentoDisplay([]);
    }
  };

  const salvarMaterialOrcamento = (
    materialOrcamento,
    fazerAposCadastrar
  ) => {
    fetch(props.linkBackEnd + "/materialOrcamento/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(materialOrcamento),
    })
      .then((response) => response.json())
      .then((data) => {

        props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);

        props.adicionarItemMaterialOrcamento(
          props.listMaterialOrcamento,
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

  const deletarMaterialOrcamento = (materialOrcamentoId) => {
    fetch(
      props.linkBackEnd +
        "/materialOrcamento/deletar?materialOrcamentoId=" +
        materialOrcamentoId,
      {
        method: "DELETE",
      }
    ).then((data) => {
      if (data.ok) {

        props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);

        props.removerItemMaterialOrcamento(
          props.listMaterialOrcamento,
          materialOrcamentoId
        );

        const msg = "Exclusão efetuada com sucesso";
        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar exclusão";
        exibirTost("erro", msg);
      }
    });
  };

  const atualizarMaterialOrcamento = (materialOrcamento) => {
    fetch(
      props.linkBackEnd +
        "/materialOrcamento/" +
        materialOrcamento.MATERIAL_ORCAMENTO_ID,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(materialOrcamento),
      }
    ).then((data) => {
      if (data.ok) {

        props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);

        props.recarregarItensMaterialOrcamento(
          props.linkBackEnd,
          materialOrcamento.ORCAMENTO_ID
        );

        const index = props.listMaterialOrcamento.findIndex(
          (elemento) =>
            elemento.MATERIAL_ORCAMENTO_ID ==
            materialOrcamento.MATERIAL_ORCAMENTO_ID
        );

        props.listMaterialOrcamento[index] = materialOrcamento;

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
      <div id="containerListMaterialOrcamento">
          <div id="btn-add-mao-obra-orcamento">
            <button
              type="button"
              className="btn"
              onClick={() => setShowModalMaterialOrcamento(true)}
            >
              Adicionar material
            </button>
          </div>
          <div id="list-mao-obra-orcamento">
            {listItemMaterialOrcamentoDisplay}
          </div>
          <div id="totais-mao-obra-orcamento">
            <TotaisMaterialOrcamento />
          </div>
      </div>
      <div>
        <ModalMaterialOrcamento
          show={showModalMaterialOrcamento}
          onHide={() => setShowModalMaterialOrcamento(false)}
          salvarMaterialOrcamento={(
            materialOrcamento,
            fazerAposCadastrar
          ) =>
            salvarMaterialOrcamento(materialOrcamento, fazerAposCadastrar)
          }
          deletarMaterialOrcamento={(materialOrcamentoId) =>
            deletarMaterialOrcamento(materialOrcamentoId)
          }
          atualizarMaterialOrcamento={(materialOrcamento) =>
            atualizarMaterialOrcamento(materialOrcamento)
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
  listMaterialOrcamento: state.orcamento.listMaterialOrcamento,
  orcamentoSelecionado: state.orcamento.orcamentoSelecionado
});

const mapDispatchToProps = (dispatch) => ({
  adicionarItemMaterialOrcamento: (
    listMaterialOrcamento,
    ItemMaterialOrcamento
  ) =>
    dispatch(
      orcamentoActions.adicionarItemMaterialOrcamento(
        listMaterialOrcamento,
        ItemMaterialOrcamento
      )
    ),
  removerItemMaterialOrcamento: (
    listMaterialOrcamento,
    materialOrcamentoId
  ) =>
    dispatch(
      orcamentoActions.removerItemMaterialOrcamento(
        listMaterialOrcamento,
        materialOrcamentoId
      )
    ),
  recarregarItensMaterialOrcamento: (linkBackEnd, orcamentoId) =>
    dispatch(
      orcamentoActions.recarregarItensMaterialOrcamento(
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
)(ListMaterialOrcamento);
