import React, { useState, useEffect } from "react";
import "./AddressPeople.css";
import Address from "./Address/Address";
import ModalAddress from "./ModalAddress/ModalAddress";
import { connect } from "react-redux";

function AddressPeople({ pessoaSelecionada }) {
  const [modalShow, setModalShow] = useState(false);
  const [enderecoDisplay, setEnderecoDisplay] = useState([]);

  useEffect(() => {
    if (pessoaSelecionada.pessoA_ID) {
      setEnderecoDisplay(
        pessoaSelecionada.lisT_ENDERECO.map((endereco) => (
          <Address key={endereco.enderecO_ID} objEndereco={endereco ?? {}} />
        ))
      );
    } else {
      setEnderecoDisplay([]);
    }
  }, [pessoaSelecionada.lisT_CONTATO]);

  return (
    <>
      <div id="container-endereco">{enderecoDisplay}</div>

      {pessoaSelecionada.pessoA_ID && (
        <div className="btn-adicionar">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setModalShow(true)}
          >
            Adicionar endereço
          </button>
        </div>
      )}
      <ModalAddress
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressPeople);
