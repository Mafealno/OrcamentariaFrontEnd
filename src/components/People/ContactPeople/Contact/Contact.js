import React from "react";
import "./Contact.css";
import FormContactCelular from "./FormContactCelular/FormContactCelular";
import FormContactTelefone from "./FormContactTelefone/FormContactTelefone";
import FormContactEmail from "./FormContactEmail/FormContactEmail";
import * as PeopleActions from "../../../../store/actions/people";
import { connect } from "react-redux";

function Contact({ objContato, linkBackEnd, recarregarPessoa }) {
  const deletarContato = () => {
    fetch(linkBackEnd + "/contato/deletar?contatoId=" + objContato.contatO_ID, {
      method: "DELETE",
    }).then(() => {
      recarregarPessoa(objContato.pessoA_ID, linkBackEnd);
    });
  };

  return (
    <>
      {objContato.tipO_CONTATO === "Telefone" && (
        <FormContactTelefone
          objContato={objContato}
          deletarContato={() => deletarContato()}
        />
      )}
      {objContato.tipO_CONTATO === "Celular" && (
        <FormContactCelular
          objContato={objContato}
          deletarContato={() => deletarContato()}
        />
      )}
      {objContato.tipO_CONTATO === "Email" && (
        <FormContactEmail
          objContato={objContato}
          deletarContato={() => deletarContato()}
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
