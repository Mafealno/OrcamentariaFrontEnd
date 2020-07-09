import React from "react";
import "./Contact.css";
import FormContactCelular from "./FormContactCelular/FormContactCelular";
import FormContactTelefone from "./FormContactTelefone/FormContactTelefone";
import FormContactEmail from "./FormContactEmail/FormContactEmail";

export default function Contact(props) {
  return (
    <>
      {props.tipoContato === "telefone" && (
        <FormContactTelefone {...props}></FormContactTelefone>
      )}
      {props.tipoContato === "celular" && (
        <FormContactCelular {...props}></FormContactCelular>
      )}
      {props.tipoContato === "email" && (
        <FormContactEmail {...props}>{props}</FormContactEmail>
      )}
    </>
  );
}
