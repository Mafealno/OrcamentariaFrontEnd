import React, { useState } from "react";
import "./FormContactEmail.css";
import ModalContact from "../ModalContact/ModalContact";

export default function FormContactEmail(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div
        id="item-contato-email"
        data-toggle="collapse"
        data-target={"#opcoes-" + props.contato}
        aria-expanded={"opcoes-" + props.contato}
        aria-controls={"opcoes-" + props.contato}
      >
        <div id="tipoContatoEmail">
          <label className="label-contato">Tipo: </label>
          <label>{props.tipoContato}</label>
        </div>
        <div id="contatoEmail">
          <label>{props.contato}</label>
        </div>
        <div id="contatoPadraoEmail">
          <label className="label-contato">Padrão</label>
          <input
            type="checkbox"
            value="true"
            name="contatoPadrao"
            checked={props.contatoPadrao}
            readOnly
          />
        </div>
      </div>
      <div id={"opcoes-" + props.contato} className="collapse opcoes">
        <button
          className="btn editarContato"
          onClick={() => setModalShow(true)}
        >
          Editar
        </button>
        <button className="btn excluirContato">Excluir</button>
        <ModalContact
          {...props}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
}
