import React, { useState } from "react";
import "./ItemOrcamentoIntumescente.css";
import ModalItemIntumescente from "../ModalItemIntumescente/ModalItemIntumescente";

export default function ItemOrcamentoIntumescente(props) {
  let [showModalItemOrcamentoIntumescente, setShowModalItemOrcamentoIntumescente] = useState(
    false
  );
  return (
    <>
      <div
        id="containerItemOrcamentoIntumescente"
        data-toggle="collapse"
        data-target={"#opcoes-ITENS_ORCAMENTO_ID-" + props.ItemOrcamentoIntumescente.ITENS_ORCAMENTO_ID}
        aria-expanded={"opcoes-ITENS_ORCAMENTO_ID-" + props.ItemOrcamentoIntumescente.ITENS_ORCAMENTO_ID}
        aria-controls={"opcoes-ITENS_ORCAMENTO_ID-" + props.ItemOrcamentoIntumescente.ITENS_ORCAMENTO_ID}
      >
        <div className="row">
          <div className="col-xl-2 col-5 center titulo-item-orcamento-intumescente">
            Referência
          </div>
          <div className="col-xl-2 col-7 center position-initial titulo-item-orcamento-intumescente">
            Perfil
          </div>
          <div className="col-xl-2 col-mobile-esconder center titulo-item-orcamento-intumescente">
            Quantidade
          </div>
          <div className="col-xl-2 col-mobile-esconder center titulo-item-orcamento-intumescente">
            Comprimento
          </div>
          <div className="col-xl-1 col-mobile-esconder center titulo-item-orcamento-intumescente">
            Area
          </div>
          <div className="col-xl-3 center col-mobile-esconder titulo-item-orcamento-intumescente">
            Qtde de Litros
          </div>
        </div>
        <div className="row">
          <div className="col-xl-2 col-5 center">
            {props.ItemOrcamentoIntumescente.REFERENCIA}
          </div>
          <div className="col-xl-2 col-7 position-initial limitar-texto-1 center">
            {props.ItemOrcamentoIntumescente.PERFIL.NOME_PERFIL}
          </div>
          <div className="col-xl-2 col-mobile-esconder center">
            {props.ItemOrcamentoIntumescente.QTDE}
          </div>
          <div className="col-xl-2 col-mobile-esconder center">
            {props.ItemOrcamentoIntumescente.VALOR_COMPRIMENTO.toFixed(2)}
          </div>
          <div className="col-xl-1 col-mobile-esconder center">
            {props.ItemOrcamentoIntumescente.AREA.toFixed(2)}
          </div>
          <div className="col-xl-3 col-mobile-esconder center">
            {props.ItemOrcamentoIntumescente.QTDE_LITROS.toFixed(2)}
          </div>
        </div>
      </div>
      <div
        id={"opcoes-ITENS_ORCAMENTO_ID-" + props.ItemOrcamentoIntumescente.ITENS_ORCAMENTO_ID}
        className="collapse opcoes-item-orcamento-intumescente"
      >
        <button
          className="btn btn-success btn-modal-item-orcamento-intumescente"
          onClick={() => setShowModalItemOrcamentoIntumescente(true)}
        >
          Selecionar
        </button>
      </div>
      <div>
        <ModalItemIntumescente
          key={props.ItemOrcamentoIntumescente.ITENS_ORCAMENTO_ID + "-modal"}
          show={showModalItemOrcamentoIntumescente}
          onHide={() => setShowModalItemOrcamentoIntumescente(false)}
          dados={props.ItemOrcamentoIntumescente}
          salvarItemOrcamentoIntumescente={(itemOrcamentoIntumescente, fazerAposCadastrar) =>
            props.salvarItemOrcamentoIntumescente(itemOrcamentoIntumescente, fazerAposCadastrar)}
          deletarItemOrcamentoIntumescente={(itensOrcamentoId) =>
            props.deletarItemOrcamentoIntumescente(itensOrcamentoId)}
          atualizarItemOrcamentoIntumescente={(itemOrcamentoIntumescente) =>
            props.atualizarItemOrcamentoIntumescente(itemOrcamentoIntumescente)}
        />
      </div>
    </>
  );
}
