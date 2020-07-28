import React from "react";
import "./Contact.css";
import FormContactCelular from "./FormContactCelular/FormContactCelular";
import FormContactTelefone from "./FormContactTelefone/FormContactTelefone";
import FormContactEmail from "./FormContactEmail/FormContactEmail";
import * as PeopleActions from "../../../../store/actions/people";
import { connect } from "react-redux";

function Contact(props) {
  const deletarContato = () => {
    fetch(
      props.linkBackEnd +
        "/contato/deletar?contatoId=" +
        props.objContato.contatO_ID,
      {
        method: "DELETE",
      }
    ).then(() => {
      props.recarregarPessoa(props.objContato.pessoA_ID, props.linkBackEnd);
    });
  };

  return (
    <>
      {props.objContato.tipO_CONTATO === "Telefone" && (
        <FormContactTelefone
          objContato={props.objContato}
          editarContato={(objAtualizar) => props.editarContato(objAtualizar)}
          deletarContato={(objContato) => props.deletarContato(objContato)}
        />
      )}
      {props.objContato.tipO_CONTATO === "Celular" && (
        <FormContactCelular
          objContato={props.objContato}
          editarContato={(objAtualizar) => props.editarContato(objAtualizar)}
          deletarContato={(objContato) => props.deletarContato(objContato)}
        />
      )}
      {props.objContato.tipO_CONTATO === "Email" && (
        <FormContactEmail
          objContato={props.objContato}
          editarContato={(objAtualizar) => props.editarContato(objAtualizar)}
          deletarContato={(objContato) => props.deletarContato(objContato)}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({
  recarregarPessoa: (pessoaId, linkBackEnd) =>
    dispatch(PeopleActions.recarregarPessoa(pessoaId, linkBackEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
