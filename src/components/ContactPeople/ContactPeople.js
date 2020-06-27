import React from "react";
import "./ContactPeople.css";
import Contact from "../Contact/Contact";

export default function ContactPeople() {
  const contatos = [
    {
      tipoContato: "celular",
      contato: "986984107",
      ddd: "11",
      ramal: "",
      contatoPadrao: false,
    },
    {
      tipoContato: "celular",
      contato: "949679592",
      ddd: "11",
      ramal: "",
      contatoPadrao: true,
    },
    {
      tipoContato: "email",
      contato: "mafealno@gmail.com",
      ddd: "",
      ramal: "",
      contatoPadrao: true,
    },
    {
      tipoContato: "telefone",
      contato: "28559095",
      ddd: "11",
      ramal: "150",
      contatoPadrao: false,
    },
  ];

  const contatoDisplay = contatos.map((contato) => (
    <Contact
      tipoContato={contato.tipoContato}
      contato={contato.contato}
      ddd={contato.ddd}
      ramal={contato.ramal}
      contatoPadrao={contato.contatoPadrao}
    ></Contact>
  ));

  return <div id="quadrado">{contatoDisplay}</div>;
}
