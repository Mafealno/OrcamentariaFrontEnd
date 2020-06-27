import React from "react";
import "./FormContactCelular.css";

export default function FormContactCelular(props) {
  return (
    <div id="item-contato-celular">
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
        />
      </div>
    </div>
  );
}
