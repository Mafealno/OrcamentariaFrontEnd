import React, { useState } from "react";
import "./FormContactTelefone.css";
import ModalContact from "../ModalContact/ModalContact";

export default function FormContactTelefone(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div
        id="item-contato-telefone"
        data-toggle="collapse"
        data-target={"#opcoes-" + props.contato}
        aria-expanded={"opcoes-" + props.contato}
        aria-controls={"opcoes-" + props.contato}
      >
        <div id="tipoContatoTelefone">
          <label className="label-contato">Tipo: </label>
          <label>{props.tipoContato}</label>
        </div>
        <div id="contatoPadraoTelefone">
          <label className="label-contato">Padrão</label>
          <input
            type="checkbox"
            value="true"
            name="contatoPadrao"
            checked={props.contatoPadrao}
            readOnly
          />
        </div>
        <div id="contatoTelefone">
          <label>({props.ddd})</label>
          <label>{props.contato}</label>
        </div>
        <div id="ramalTelefone">
          <label className="label-contato">Ramal</label>
          <label>{props.ramal}</label>
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
