import React from "react";
import "./FormContactTelefone.css";

export default function FormContactTelefone(props) {
  return (
    <div id="item-contato-telefone">
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
  );
}
