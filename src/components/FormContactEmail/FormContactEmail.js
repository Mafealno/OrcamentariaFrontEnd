import React from "react";
import "./FormContactEmail.css";

export default function FormContactEmail(props) {
  return (
    <div id="item-contato-email">
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
        />
      </div>
    </div>
  );
}
