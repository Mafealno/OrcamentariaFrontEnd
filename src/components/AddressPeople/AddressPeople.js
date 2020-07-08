import React, { useState } from "react";
import "./AddressPeople.css";
import Address from "../Address";
import ModalAddress from "../ModalAddress/ModalAddress";

export default function AddressPeople() {
  const [modalShow, setModalShow] = useState(false);
  const enderecos = [
    {
      enderecoId: "1",
      logradouro: "Rua Agapito José da Silva",
      cep: "04334010",
      numeroEndereco: "101",
      complemento: "casa 03",
      bairro: "Jabaquara",
      cidade: "São Paulo",
      estado: "São Paulo",
      uf: "SP",
      enderecoPadrao: true,
    },
    {
      enderecoId: "2",
      logradouro: "Rua Xavier Golveia",
      cep: "0000000",
      numeroEndereco: "24B",
      complemento: "",
      bairro: "Brooklyn",
      cidade: "São Paulo",
      estado: "São Paulo",
      uf: "SP",
      enderecoPadrao: false,
    },
  ];

  const enderecoDisplay = enderecos.map((endereco) => (
    <Address
      key={endereco.enderecoId}
      enderecoId={endereco.enderecoId}
      cep={endereco.cep}
      logradouro={endereco.logradouro}
      numeroEndereco={endereco.numeroEndereco}
      complemento={endereco.complemento}
      bairro={endereco.bairro}
      cidade={endereco.cidade}
      estado={endereco.estado}
      uf={endereco.uf}
      enderecoPadrao={endereco.enderecoPadrao}
    ></Address>
  ));

  return (
    <>
      <div id="quadrado-endereco">{enderecoDisplay}</div>
      <div className="btn-adicionar">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setModalShow(true)}
        >
          Adicionar endereço
        </button>
        <ModalAddress show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
  );
}
