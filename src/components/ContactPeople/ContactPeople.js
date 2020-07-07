import React, { useState } from "react";
import "./ContactPeople.css";
import Contact from "../Contact/Contact";
import ModalContact from "../ModalContact/ModalContact";

export default function ContactPeople(props) {
  const [modalShow, setModalShow] = useState(false);

  const contatos = [
    {
      contatoId: "1",
      tipoContato: "celular",
      contato: "986984107",
      ddd: "11",
      ramal: "",
      contatoPadrao: false,
    },
    {
      contatoId: "2",
      tipoContato: "celular",
      contato: "949679592",
      ddd: "11",
      ramal: "",
      contatoPadrao: true,
    },
    {
      contatoId: "3",
      tipoContato: "email",
      contato: "mafealno@gmail.com",
      ddd: "",
      ramal: "",
      contatoPadrao: true,
    },
    {
      contatoId: "4",
      tipoContato: "telefone",
      contato: "28559095",
      ddd: "11",
      ramal: "150",
      contatoPadrao: false,
    },
  ];

  const contatoDisplay = contatos.map((contato) => (
    <Contact
      key={contato.contatoId}
      contatoId={contato.contatoId}
      tipoContato={contato.tipoContato}
      contato={contato.contato}
      ddd={contato.ddd}
      ramal={contato.ramal}
      contatoPadrao={contato.contatoPadrao}
    ></Contact>
  ));

  return (
    <>
      <div id="quadrado-contato">{contatoDisplay}</div>
      <div className="btn-adicionar">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setModalShow(true)}
        >
          Adicionar contato
        </button>
        <ModalContact
          show={modalShow}
          onHide={() => setModalShow(false)}
        ></ModalContact>
      </div>
    </>
  );
}
