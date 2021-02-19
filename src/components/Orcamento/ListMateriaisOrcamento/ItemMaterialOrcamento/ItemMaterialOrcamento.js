import React, { useState } from "react";
import "./ItemMaterialOrcamento.css";
import ModalMaterialOrcamento from "../ModalMaterialOrcamento/ModalMaterialOrcamento";

export default function ItemMaterialOrcamento(props) {
  let [
    showModalMaterialOrcamento,
    setShowModalMaterialOrcamento,
  ] = useState(false);
  return (
    <>
      <div
        id="containerItemMaterialOrcamento"
        data-toggle="collapse"
        data-target={
          "#opcoes-MATERIAL_ORCAMENTO_ID-" +
          props.materialOrcamento.MATERIAL_ORCAMENTO_ID
        }
        aria-expanded={
          "opcoes-MATERIAL_ORCAMENTO_ID-" +
          props.materialOrcamento.MATERIAL_ORCAMENTO_ID
        }
        aria-controls={
          "opcoes-MATERIAL_ORCAMENTO_ID-" +
          props.materialOrcamento.MATERIAL_ORCAMENTO_ID
        }
      >
        <div className="row">
          <div className="col-md-6 col-sm position-initial center titulo-item-material-orcamento">
            Material
          </div>
          <div className="col d-none d-md-block center titulo-item-material-orcamento">
            Valor unitário
          </div>
          <div className="col d-none d-md-block center titulo-item-material-orcamento">
            Quantidade
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm center position-initial">
            {props.materialOrcamento.MATERIAL.NOME_MATERIAL}
          </div>
          <div className="col d-none d-md-block center">
            {props.materialOrcamento.VALOR_UNITARIO_MATERIAL}
          </div>
          <div className="col d-none d-md-block center">
            {props.materialOrcamento.QTDE_MATERIAL}
          </div>
        </div>
      </div>
      <div
        id={
          "opcoes-" +
          "MATERIAL_ORCAMENTO_ID-" +
          props.materialOrcamento.MATERIAL_ORCAMENTO_ID
        }
        className="collapse opcoes-item-orcamento-geral"
      >
        <button
          className="btn btn-success btn-item-material-orcamento"
          onClick={() => setShowModalMaterialOrcamento(true)}
        >
          Selecionar
        </button>
      </div>
      <div>
        <ModalMaterialOrcamento
          show={showModalMaterialOrcamento}
          materialOrcamento={props.materialOrcamento}
          onHide={() => setShowModalMaterialOrcamento(false)}
          salvarMaterialOrcamento={(
            materialOrcamento,
            fazerAposCadastrar
          ) =>
            props.salvarMaterialOrcamento(
              materialOrcamento,
              fazerAposCadastrar
            )
          }
          deletarMaterialOrcamento={(materialOrcamentoId) =>
            props.deletarMaterialOrcamento(materialOrcamentoId)
          }
          atualizarMaterialOrcamento={(materialOrcamento) =>
            props.atualizarMaterialOrcamento(materialOrcamento)
          }
        />
      </div>
    </>
  );
}
