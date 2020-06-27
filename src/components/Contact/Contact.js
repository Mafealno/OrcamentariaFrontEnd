import React from "react";
import "./Contact.css";
import FormContactCelular from "../FormContactCelular/FormContactCelular";
import FormContactTelefone from "../FormContactTelefone/FormContactTelefone";
import FormContactEmail from "../FormContactEmail/FormContactEmail";

export default function Contact(props) {
  return (
    <>
      {props.tipoContato == "telefone" && (
        <FormContactTelefone
          tipoContato={props.tipoContato}
          contato={props.contato}
          ddd={props.ddd}
          contatoPadrao={props.contatoPadrao}
          ramal={props.ramal}
        ></FormContactTelefone>
      )}
      {props.tipoContato == "celular" && (
        <FormContactCelular
          tipoContato={props.tipoContato}
          contato={props.contato}
          ddd={props.ddd}
          contatoPadrao={props.contatoPadrao}
        ></FormContactCelular>
      )}
      {props.tipoContato == "email" && (
        <FormContactEmail
          tipoContato={props.tipoContato}
          contato={props.contato}
          contatoPadrao={props.contatoPadrao}
        >
          {props}
        </FormContactEmail>
      )}
    </>
  );
}
