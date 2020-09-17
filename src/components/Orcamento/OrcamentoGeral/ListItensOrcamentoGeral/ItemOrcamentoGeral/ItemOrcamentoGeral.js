import React, { useState } from "react";
import "./ItemOrcamentoGeral.css";
import ModalItemOrcamentoGeral from "../ModalItemOrcamentoGeral/ModalItemOrcamentoGeral";

export default function ItemOrcamentoGeral(props) {
  let [showModalItemOrcamentoGeral, setShowModalItemOrcamentoGeral] = useState(
    false
  );
  return (
    <>
      <div
        id="containerItemOrcamentoGeral"
        data-toggle="collapse"
        data-target={
          "#opcoes-" +
          "ITENS_ORCAMENTO_ID-" +
          props.ItemOrcamentoGeral.ITENS_ORCAMENTO_ID
        }
        aria-expanded={
          "opcoes-" +
          "ITENS_ORCAMENTO_ID-" +
          props.ItemOrcamentoGeral.ITENS_ORCAMENTO_ID
        }
        aria-controls={
          "opcoes-" +
          "ITENS_ORCAMENTO_ID-" +
          props.ItemOrcamentoGeral.ITENS_ORCAMENTO_ID
        }
      >
        <div className="row">
          <div className="col-xl-1 col-3 center titulo-item-orcamento-geral">
            Linha
          </div>
          <div className="col-xl-4 col-9 center titulo-item-orcamento-geral">
            Produto
          </div>
          <div className="col-xl-3 col-mobile-esconder center titulo-item-orcamento-geral">
            Ambiente
          </div>
          <div className="col-xl-2 col-mobile-esconder center titulo-item-orcamento-geral">
            Local
          </div>
          <div className="col-xl-1 col-mobile-esconder center titulo-item-orcamento-geral">
            Valor
          </div>
          <div className="col-xl-1 col-mobile-esconder center titulo-item-orcamento-geral">
            Area
          </div>
        </div>
        <div className="row">
          <div className="col-xl-1 col-3 center">
            {props.ItemOrcamentoGeral.NUMERO_LINHA}
          </div>
          <div className="col-xl-4 col-9 center">
            {props.ItemOrcamentoGeral.PRODUTO.NOME_MATERIAL}
          </div>
          <div className="col-xl-3 col-mobile-esconder center">
            {props.ItemOrcamentoGeral.AMBIENTE_APLICACAO}
          </div>
          <div className="col-xl-2 col-mobile-esconder center">
            {props.ItemOrcamentoGeral.LOCAL_APLICACAO}
          </div>
          <div className="col-xl-1 col-mobile-esconder center">
            {props.ItemOrcamentoGeral.VALOR_M_2}
          </div>
          <div className="col-xl-1 col-mobile-esconder center">
            {props.ItemOrcamentoGeral.AREA}
          </div>
        </div>
      </div>
      <div
        id={
          "opcoes-" +
          "ITENS_ORCAMENTO_ID-" +
          props.ItemOrcamentoGeral.ITENS_ORCAMENTO_ID
        }
        className="collapse opcoes-item-orcamento-geral"
      >
        <button
          className="btn btn-success btn-modal-item-orcamento-geral"
          onClick={() => setShowModalItemOrcamentoGeral(true)}
        >
          Selecionar
        </button>
      </div>
      <div>
        <ModalItemOrcamentoGeral
          key={props.ItemOrcamentoGeral.ITENS_ORCAMENTO_ID + "-modal"}
          show={showModalItemOrcamentoGeral}
          onHide={() => setShowModalItemOrcamentoGeral(false)}
          dados={props.ItemOrcamentoGeral}
          salvarItemOrcamentoGeral={(itemOrcamentoGeral, fazerAposCadastrar) =>
            props.salvarItemOrcamentoGeral(
              itemOrcamentoGeral,
              fazerAposCadastrar
            )
          }
          deletarItemOrcamentoGeral={(itensOrcamentoId) =>
            props.deletarItemOrcamentoGeral(itensOrcamentoId)
          }
          atualizarItemOrcamentoGeral={(itemOrcamentoGeral) =>
            props.atualizarItemOrcamentoGeral(itemOrcamentoGeral)
          }
        />
      </div>
    </>
  );
}
