import React, { useState, useEffect } from "react";
import "./ContactPeople.css";
import Contact from "./Contact/Contact";
import ModalContact from "./Contact/ModalContact/ModalContact";
import { connect } from "react-redux";

function ContactPeople({ pessoaSelecionada }) {
  const [modalShow, setModalShow] = useState(false);
  var [contatoDisplay, setContatoDisplay] = useState([]);

  useEffect(() => {
    if (pessoaSelecionada.pessoA_ID) {
      setContatoDisplay(
        pessoaSelecionada.lisT_CONTATO.map((contato) => (
          <Contact key={contato.contatO_ID} objContato={contato ?? {}} />
        ))
      );
    } else {
      setContatoDisplay([]);
    }
  }, [pessoaSelecionada.lisT_CONTATO]);

  return (
    <>
      <div id="container-contato">{contatoDisplay}</div>
      {pessoaSelecionada.pessoA_ID && (
        <>
          <div className="btn-adicionar">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setModalShow(true)}
            >
              Adicionar contato
            </button>
          </div>
        </>
      )}
      <ModalContact
        show={modalShow}
        onHide={(limparCampos) => setModalShow(false)}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  pessoaSelecionada: state.people.pessoaSelecionada,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPeople);
