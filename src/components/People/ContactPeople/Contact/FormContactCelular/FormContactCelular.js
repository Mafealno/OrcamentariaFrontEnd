import React, { useState } from "react";
import "./FormContactCelular.css";
import ModalContact from "../ModalContact/ModalContact";

export default function FormContactCelular({ objContato, deletarContato }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div
        id="item-contato-celular"
        data-toggle="collapse"
        data-target={"#opcoes-" + objContato.contatO_ID}
        aria-expanded={"opcoes-" + objContato.contatO_ID}
        aria-controls={"opcoes-" + objContato.contatO_ID}
      >
        <div id="tipoContatoCelular">
          <label className="label-contato">Tipo: </label>
          <label>{objContato.tipO_CONTATO}</label>
        </div>
        <div id="contatoCelular">
          <label>({objContato.ddd})</label>
          <label>{objContato.contato}</label>
        </div>
        <div id="contatoPadraoCelular">
          <label className="label-contato">Padrão</label>
          <input
            type="checkbox"
            value="true"
            name="contatoPadrao"
            checked={objContato.contatO_PADRAO}
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
          {...objContato}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
}
