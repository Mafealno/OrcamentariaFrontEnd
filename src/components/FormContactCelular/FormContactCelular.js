import React, { useState } from "react";
import "./FormContactCelular.css";
import ModalContact from "../ModalContact/ModalContact";

export default function FormContactCelular(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div
        id="item-contato-celular"
        data-toggle="collapse"
        data-target={"#opcoes-" + props.contato}
        aria-expanded={"opcoes-" + props.contato}
        aria-controls={"opcoes-" + props.contato}
      >
        <div id="tipoContatoCelular">
          <label className="label-contato">Tipo: </label>
          <label>{props.tipoContato}</label>
        </div>
        <div id="contatoCelular">
          <label>({props.ddd})</label>
          <label>{props.contato}</label>
        </div>
        <div id="contatoPadraoCelular">
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
        ></ModalContact>
      </div>
    </>
  );
}
