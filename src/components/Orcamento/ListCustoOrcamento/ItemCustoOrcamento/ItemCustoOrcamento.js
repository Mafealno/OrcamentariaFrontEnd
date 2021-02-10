import React, { useState } from 'react'
import "./ItemCustoOrcamento.css"
import ModalCustoOrcamento from "../ModalCustoOrcamento/ModalCustoOrcamento";

function ItemCustoOrcamento(props) {

    let [showModalCustoOrcamento, setShowModalCustoOrcamento] = useState(false);

    return (
        <>
            <div
        className="containerItemCustoOrcamento"
        data-toggle="collapse"
        data-target={
          "#opcoes-CUSTO_ORCAMENTO_ID-" +
          props.custoOrcamento.CUSTO_ORCAMENTO_ID
        }
        aria-expanded={
          "opcoes-CUSTO_ORCAMENTO_ID-" +
          props.custoOrcamento.CUSTO_ORCAMENTO_ID
        }
        aria-controls={
          "opcoes-CUSTO_ORCAMENTO_ID-" +
          props.custoOrcamento.CUSTO_ORCAMENTO_ID
        }
      >
        <div className="row">
          <div className="col col-sm position-initial center titulo-item-equipamento-orcamento">
            Custo
          </div>
          <div className="col d-none d-md-block center titulo-item-equipamento-orcamento">
            Tipo de Custo
          </div>
          <div className="col d-none d-md-block center titulo-item-equipamento-orcamento">
            Valor do Custo
          </div>
        </div>
        <div className="row">
          <div className="col col-sm center position-initial">
            {props.custoOrcamento.CUSTO_OBRA.NOME_CUSTO}
          </div>
          <div className="col d-none d-md-block center">
            {props.custoOrcamento.CUSTO_OBRA.TIPO_CUSTO}
          </div>
          <div className="col d-none d-md-block center">
            {props.custoOrcamento.CUSTO_OBRA.VALOR_CUSTO}
          </div>
        </div>
      </div>
      <div
        id={
          "opcoes-" +
          "CUSTO_ORCAMENTO_ID-" +
          props.custoOrcamento.CUSTO_ORCAMENTO_ID
        }
        className="collapse opcoes-item-orcamento-geral"
      >
        <button
          className="btn btn-success btn-item-custo-orcamento"
          onClick={() => setShowModalCustoOrcamento(true)}
        >
          Selecionar
        </button>
      </div>
      <div>
        <ModalCustoOrcamento
          show={showModalCustoOrcamento}
          custoOrcamento={props.custoOrcamento}
          onHide={() => setShowModalCustoOrcamento(false)}
          salvarCustoOrcamento={(
            custoOrcamento,
            fazerAposCadastrar
          ) =>
            props.salvarCustoOrcamento(
                custoOrcamento,
              fazerAposCadastrar
            )
          }
          deletarCustoOrcamento={(custoOrcamentoId) =>
            props.deletarCustoOrcamento(custoOrcamentoId)
          }
        />
      </div>
        </>
    )
}

export default ItemCustoOrcamento
