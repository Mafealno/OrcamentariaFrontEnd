import React, { useState } from "react";
import "./FormContactTelefone.css";
import ModalContact from "../ModalContact/ModalContact";

export default function FormContactTelefone({ objContato, deletarContato }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div
        id="item-contato-telefone"
        data-toggle="collapse"
        data-target={"#opcoes-" + objContato.contato}
        aria-expanded={"opcoes-" + objContato.contato}
        aria-controls={"opcoes-" + objContato.contato}
      >
        <div id="tipoContatoTelefone">
          <label className="label-contato">Tipo: </label>
          <label>{objContato.tipO_CONTATO}</label>
        </div>
        <div id="contatoPadraoTelefone">
          <label className="label-contato">Padrão</label>
          <input
            type="checkbox"
            value="true"
            name="contatoPadrao"
            checked={objContato.contatO_PADRAO}
            readOnly
          />
        </div>
        <div id="contatoTelefone">
          <label>({objContato.ddd})</label>
          <label>{objContato.contato}</label>
        </div>
        <div id="ramalTelefone">
          <label className="label-contato">Ramal</label>
          <label>{objContato.ramal}</label>
        </div>
      </div>
      <div id={"opcoes-" + objContato.contato} className="collapse opcoes">
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
