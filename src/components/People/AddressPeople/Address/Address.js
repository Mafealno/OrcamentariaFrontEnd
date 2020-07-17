import React, { useState } from "react";
import "./Address.css";
import ModalAddress from "../ModalAddress/ModalAddress";
import * as PeopleActions from "../../../../store/actions/people";
import { connect } from "react-redux";

function Address({ objEndereco, linkBackEnd, recarregarPessoa }) {
  const [modalShow, setModalShow] = useState(false);

  const deletarEndereco = () => {
    fetch(
      linkBackEnd + "/endereco/deletar?enderecoId=" + objEndereco.enderecO_ID,
      {
        method: "DELETE",
      }
    ).then(() => {
      recarregarPessoa(objEndereco.pessoA_ID, linkBackEnd);
    });
  };

  return (
    <>
      <div
        id="item-endereco"
        data-toggle="collapse"
        data-target={"#opcoes-" + objEndereco.enderecO_ID}
        aria-expanded={"opcoes-" + objEndereco.enderecO_ID}
        aria-controls={"opcoes-" + objEndereco.enderecO_ID}
      >
        <div id="logradouro">
          <label className="label-endereco">Logradouro: </label>
          <label>
            {objEndereco.logradouro}{" "}
            {objEndereco.numerO_ENDERECO !== false
              ? ", " + objEndereco.numerO_ENDERECO
              : ""}
          </label>
        </div>
        <div id="complemento">
          <label className="label-endereco">Complemento: </label>
          <label>{objEndereco.complemento}</label>
        </div>
        <div id="enderecoPadrao">
          <label className="label-endereco">Padrão</label>
          <input
            type="checkbox"
            value="true"
            name="enderecoPadrao"
            checked={objEndereco.enderecO_PADRAO}
            readOnly
          />
        </div>
        <div id="bairro">
          <label className="label-endereco">Bairro: </label>
          <label>{objEndereco.bairro}</label>
        </div>
        <div id="cidade">
          <label className="label-endereco">Cidade: </label>
          <label>{objEndereco.cidade}</label>
        </div>
      </div>
      <div id={"opcoes-" + objEndereco.enderecO_ID} className="collapse opcoes">
        <button
          className="btn editarContato"
          onClick={() => setModalShow(true)}
        >
          Editar
        </button>
        <button
          className="btn excluirContato"
          onClick={() => deletarEndereco()}
        >
          Excluir
        </button>
        <ModalAddress
          {...objEndereco}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Address);
