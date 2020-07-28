import React, { useState } from "react";
import "./Address.css";
import ModalAddress from "../ModalAddress/ModalAddress";
import * as PeopleActions from "../../../../store/actions/people";
import ModalConfirm from "../../ModalConfirm/ModalConfirm";
import { connect } from "react-redux";

function Address(props) {
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const deletarEndereco = () => {
    fetch(
      props.linkBackEnd +
        "/endereco/deletar?enderecoId=" +
        props.objEndereco.enderecO_ID,
      {
        method: "DELETE",
      }
    ).then(() => {
      props.recarregarPessoa(props.objEndereco.pessoA_ID, props.linkBackEnd);
    });
  };

  return (
    <>
      <div
        id="item-endereco"
        data-toggle="collapse"
        data-target={"#opcoes-" + props.objEndereco.enderecO_ID}
        aria-expanded={"opcoes-" + props.objEndereco.enderecO_ID}
        aria-controls={"opcoes-" + props.objEndereco.enderecO_ID}
      >
        <div id="logradouro">
          <label className="label-endereco">Logradouro: </label>
          <label>
            {props.objEndereco.logradouro}{" "}
            {props.objEndereco.numerO_ENDERECO !== false
              ? ", " + props.objEndereco.numerO_ENDERECO
              : ""}
          </label>
        </div>
        <div id="complemento">
          <label className="label-endereco">Complemento: </label>
          <label>{props.objEndereco.complemento}</label>
        </div>
        <div id="enderecoPadrao">
          <label className="label-endereco">Padrão</label>
          <input
            type="checkbox"
            value="true"
            name="enderecoPadrao"
            checked={props.objEndereco.enderecO_PADRAO}
            readOnly
          />
        </div>
        <div id="bairro">
          <label className="label-endereco">Bairro: </label>
          <label>{props.objEndereco.bairro}</label>
        </div>
        <div id="cidade">
          <label className="label-endereco">Cidade: </label>
          <label>{props.objEndereco.cidade}</label>
        </div>
      </div>
      <div
        id={"opcoes-" + props.objEndereco.enderecO_ID}
        className="collapse opcoes"
      >
        <button
          className="btn editarContato"
          onClick={() => setShowModal(true)}
        >
          Editar
        </button>
        <button
          className="btn excluirContato"
          onClick={() => setShowModalConfirm(true)}
        >
          Excluir
        </button>
        <ModalAddress
          {...props.objEndereco}
          editarEndereco={(objAtualizar) => props.editarEndereco(objAtualizar)}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      </div>

      <div>
        <ModalConfirm
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          acaoConfirmada={() => props.deletarEndereco(props.objEndereco)}
          tituloModalConfirm={"Confirmar exclusão?"}
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
