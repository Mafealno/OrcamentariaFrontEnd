import React, { useState } from "react";
import "./FormContactEmail.css";
import ModalContact from "../ModalContact/ModalContact";
import ModalConfirm from "../../../ModalConfirm/ModalConfirm";

export default function FormContactEmail(props) {
  let [showModalConfirm, setShowModalConfirm] = useState(false);
  let [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div
        id="item-contato-email"
        data-toggle="collapse"
        data-target={"#opcoes-" + props.objContato.contatO_ID}
        aria-expanded={"opcoes-" + props.objContato.contatO_ID}
        aria-controls={"opcoes-" + props.objContato.contatO_ID}
      >
        <div id="tipoContatoEmail">
          <label className="label-contato">Tipo: </label>
          <label>{props.objContato.tipoContato}</label>
        </div>
        <div id="contatoEmail">
          <label>{props.objContato.contato}</label>
        </div>
        <div id="contatoPadraoEmail">
          <label className="label-contato">Padrão</label>
          <input
            type="checkbox"
            value="true"
            name="contatoPadrao"
            checked={props.objContato.contatO_PADRAO}
            readOnly
          />
        </div>
      </div>
      <div
        id={"opcoes-" + props.objContato.contatO_ID}
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
