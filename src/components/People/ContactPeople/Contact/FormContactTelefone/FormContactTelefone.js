import React, { useState } from "react";
import "./FormContactTelefone.css";
import ModalContact from "../ModalContact/ModalContact";
import ModalConfirm from "../../../../ModalConfirm/ModalConfirm";

export default function FormContactTelefone(props) {
  let [showModalConfirm, setShowModalConfirm] = useState(false);
  let [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div
        id="item-contato-telefone"
        data-toggle="collapse"
        data-target={"#opcoes-" + props.objContato.CONTATO_ID}
        aria-expanded={"opcoes-" + props.objContato.CONTATO_ID}
        aria-controls={"opcoes-" + props.objContato.CONTATO_ID}
      >
        <div id="tipoContatoTelefone">
          <label className="label-contato">Tipo: </label>
          <label>{props.objContato.TIPO_CONTATO}</label>
        </div>
        <div id="contatoPadraoTelefone">
          <label className="label-contato">Padrão</label>
          <input
            type="checkbox"
            value="true"
            name="contatoPadrao"
            checked={props.objContato.CONTATO_PADRAO}
            readOnly
          />
        </div>
        <div id="contatoTelefone">
          <label>({props.objContato.DDD})</label>
          <label>{props.objContato.CONTATO}</label>
        </div>
        <div id="ramalTelefone">
          <label className="label-contato">Ramal</label>
          <label>{props.objContato.RAMAL}</label>
        </div>
      </div>
      <div
        id={"opcoes-" + props.objContato.CONTATO_ID}
        className="collapse opcoes"
      >
        <button
          className="btn editarContato"
          onClick={() => setModalShow(true)}
        >
          Editar
        </button>
        <button
          className="btn excluirContato"
          onClick={() => setShowModalConfirm(true)}
        >
          Excluir
        </button>
      </div>
      <ModalContact
        {...props.objContato}
        editarContato={(objAtualizar) => props.editarContato(objAtualizar)}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div>
        <ModalConfirm
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          acaoConfirmada={() => props.deletarContato(props.objContato)}
          tituloModalConfirm={"Confirmar exclusão?"}
        />
      </div>
    </>
  );
}
