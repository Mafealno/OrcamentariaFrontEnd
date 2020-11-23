import React, { useState } from "react";
import "./ItemEquipamentoOrcamento.css";
import ModalEquipamentoOrcamento from "../ModalEquipamentoOrcamento/ModalEquipamentoOrcamento";

export default function ItemEquipamentoOrcamento(props) {
  let [
    showModalEquipamentoOrcamento,
    setShowModalEquipamentoOrcamento,
  ] = useState(false);
  return (
    <>
      <div
        id="containerItemEquipamentoOrcamento"
        data-toggle="collapse"
        data-target={
          "#opcoes-EQUIPAMENTO_ORCAMENTO_ID-" +
          props.equipamentoOrcamento.EQUIPAMENTO_ORCAMENTO_ID
        }
        aria-expanded={
          "opcoes-EQUIPAMENTO_ORCAMENTO_ID-" +
          props.equipamentoOrcamento.EQUIPAMENTO_ORCAMENTO_ID
        }
        aria-controls={
          "opcoes-EQUIPAMENTO_ORCAMENTO_ID-" +
          props.equipamentoOrcamento.EQUIPAMENTO_ORCAMENTO_ID
        }
      >
        <div className="row">
          <div className="col-6 center titulo-item-equipamento-orcamento">
            Equipamento
          </div>
          <div className="col center titulo-item-equipamento-orcamento">
            Valor unitário
          </div>
          <div className="col center titulo-item-equipamento-orcamento">
            Quantidade
          </div>
        </div>
        <div className="row">
          <div className="col-6 center">
            {props.equipamentoOrcamento.EQUIPAMENTO.NOME_EQUIPAMENTO}
          </div>
          <div className="col center">
            {props.equipamentoOrcamento.VALOR_UNITARIO_EQUIPAMENTO}
          </div>
          <div className="col center">
            {props.equipamentoOrcamento.QTDE_EQUIPAMENTO}
          </div>
        </div>
      </div>
      <div
        id={
          "opcoes-" +
          "EQUIPAMENTO_ORCAMENTO_ID-" +
          props.equipamentoOrcamento.EQUIPAMENTO_ORCAMENTO_ID
        }
        className="collapse opcoes-item-orcamento-geral"
      >
        <button
          className="btn btn-success opcoes-item-equipamento-orcamento"
          onClick={() => setShowModalEquipamentoOrcamento(true)}
        >
          Selecionar
        </button>
      </div>
      <div>
        <ModalEquipamentoOrcamento
          show={showModalEquipamentoOrcamento}
          equipamentoOrcamento={props.equipamentoOrcamento}
          onHide={() => setShowModalEquipamentoOrcamento(false)}
          salvarEquipamentoOrcamento={(
            equipamentoOrcamento,
            fazerAposCadastrar
          ) =>
            props.salvarEquipamentoOrcamento(
              equipamentoOrcamento,
              fazerAposCadastrar
            )
          }
          deletarEquipamentoOrcamento={(equipamentoOrcamentoId) =>
            props.deletarEquipamentoOrcamento(equipamentoOrcamentoId)
          }
          atualizarEquipamentoOrcamento={(equipamentoOrcamento) =>
            props.atualizarEquipamentoOrcamento(equipamentoOrcamento)
          }
        />
      </div>
    </>
  );
}
