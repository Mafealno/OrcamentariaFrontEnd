import React, { useState } from "react";
import "./FormContactEmail.css";
import ModalContact from "../ModalContact/ModalContact";

export default function FormContactEmail({ objContato, deletarContato }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div
        id="item-contato-email"
        data-toggle="collapse"
        data-target={"#opcoes-" + objContato.contatO_ID}
        aria-expanded={"opcoes-" + objContato.contatO_ID}
        aria-controls={"opcoes-" + objContato.contatO_ID}
      >
        <div id="tipoContatoEmail">
          <label className="label-contato">Tipo: </label>
          <label>{objContato.tipoContato}</label>
        </div>
        <div id="contatoEmail">
          <label>{objContato.contato}</label>
        </div>
        <div id="contatoPadraoEmail">
          <label className="label-contato">Padrão</label>
          <input
            type="checkbox"
            value="true"
            name="contatoPadrao"
            checked={objContato.contatoPadrao}
            readOnly
          />
        </div>
      </div>
      <div id={"opcoes-" + objContato.contatO_ID} className="collapse opcoes">
        <button
          className="btn editarContato"
          onClick={() => setModalShow(true)}
        >
          Editar
        </button>
        <button className="btn excluirContato" onClick={() => deletarContato()}>
          Excluir
        </button>
        <ModalContact
          objContato={objContato}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
}
