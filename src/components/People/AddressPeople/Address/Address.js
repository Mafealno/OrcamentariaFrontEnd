import React, { useState } from "react";
import "./Address.css";
import ModalAddress from "../ModalAddress/ModalAddress";

export default function Address(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div
        id="item-endereco"
        data-toggle="collapse"
        data-target={"#opcoes-" + props.cep}
        aria-expanded={"opcoes-" + props.cep}
        aria-controls={"opcoes-" + props.cep}
      >
        <div id="logradouro">
          <label className="label-endereco">Logradouro: </label>
          <label>
            {props.logradouro}{" "}
            {props.numeroEndereco !== false ? ", " + props.numeroEndereco : ""}
          </label>
        </div>
        <div id="complemento">
          <label className="label-endereco">Complemento: </label>
          <label>{props.complemento}</label>
        </div>
        <div id="enderecoPadrao">
          <label className="label-endereco">Padrão</label>
          <input
            type="checkbox"
            value="true"
            name="enderecoPadrao"
            checked={props.enderecoPadrao}
            readOnly
          />
        </div>
        <div id="bairro">
          <label className="label-endereco">Bairro: </label>
          <label>{props.bairro}</label>
        </div>
        <div id="cidade">
          <label className="label-endereco">Cidade: </label>
          <label>{props.cidade}</label>
        </div>
      </div>
      <div id={"opcoes-" + props.cep} className="collapse opcoes">
        <button
          className="btn editarContato"
          onClick={() => setModalShow(true)}
        >
          Editar
        </button>
        <button className="btn excluirContato">Excluir</button>
        <ModalAddress
          {...props}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
}
