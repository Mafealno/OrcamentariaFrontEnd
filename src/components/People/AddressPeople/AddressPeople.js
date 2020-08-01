import React, { useState, useEffect } from "react";
import "./AddressPeople.css";
import Address from "./Address/Address";
import ModalAddress from "./ModalAddress/ModalAddress";
import * as PeopleActions from "../../../store/actions/people";
import ToastControl from "../../ToastControl/ToastControl";
import { connect } from "react-redux";

function AddressPeople(props) {
  let [modalShow, setModalShow] = useState(false);
  let [enderecoDisplay, setEnderecoDisplay] = useState([]);
  let [novoEnderecoId, setNovoEnderecoId] = useState("");
  let [showToast, setShowToast] = useState(false);

  let [configToast, setConfigToast] = useState({
    estiloToast: "",
    estiloToastHeader: "",
    estiloToastBody: "",
    delayToast: 0,
    autoHideToast: false,
    hideToastHeader: true,
    conteudoHeader: "",
    conteudoBody: "",
    closeToast: () => {},
  });

  useEffect(() => {
    if (props.pessoaSelecionada.PESSOA_ID) {
      setEnderecoDisplay(
        props.pessoaSelecionada.LIST_ENDERECO.map((endereco) => (
          <Address
            key={endereco.ENDERECO_ID}
            objEndereco={endereco ?? {}}
            editarEndereco={(objAtualizar) =>
              editarEnderecoPessoa(objAtualizar)
            }
            deletarEndereco={(objEndereco) =>
              deletarEnderecoPessoa(objEndereco)
            }
          />
        ))
      );
    } else {
      setEnderecoDisplay([]);
    }
  }, [props.pessoaSelecionada.LIST_CONTATO]);

  const salvarEnderecoPessoa = (objCadastro) => {
    fetch(props.linkBackEnd + "/endereco/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objCadastro),
    })
      .then((response) => response.json())
      .then((data) => {
        setNovoEnderecoId(data.ENDERECO_ID);
        props.recarregarPessoa(objCadastro.PESSOA_ID, props.linkBackEnd);
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastSucesso",
          estiloToastBody: "estiloToastSucesso",
          delayToast: 3000,
          autoHideToast: true,
          hideToastHeader: false,
          conteudoHeader: "",
          conteudoBody: "Cadastro efetuado com sucesso",
          closeToast: () => setShowToast(),
        });
        setShowToast(true);
      })
      .catch(() => {
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastErro",
          estiloToastBody: "estiloToastErro",
          delayToast: 3000,
          autoHideToast: true,
          hideToastHeader: false,
          conteudoHeader: "",
          conteudoBody: "Houve um erro",
          closeToast: () => setShowToast(),
        });
        setShowToast(true);
      });
  };

  const editarEnderecoPessoa = (objAtualizar) => {
    console.log(objAtualizar);
    fetch(props.linkBackEnd + "/endereco/" + objAtualizar.ENDERECO_ID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objAtualizar),
    }).then((data) => {
      if (data.ok) {
        props.recarregarPessoa(objAtualizar.PESSOA_ID, props.linkBackEnd);
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastSucesso",
          estiloToastBody: "estiloToastSucesso",
          delayToast: 3000,
          autoHideToast: true,
          hideToastHeader: false,
          conteudoHeader: "",
          conteudoBody: "Cadastro atualizado com sucesso",
          closeToast: () => setShowToast(),
        });
        setShowToast(true);
      } else {
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastErro",
          estiloToastBody: "estiloToastErro",
          delayToast: 3000,
          autoHideToast: true,
          hideToastHeader: false,
          conteudoHeader: "",
          conteudoBody: "Houve um erro",
          closeToast: () => setShowToast(),
        });
        setShowToast(true);
      }
    });
  };

  const deletarEnderecoPessoa = (objEndereco) => {
    fetch(
      props.linkBackEnd +
        "/endereco/deletar?enderecoId=" +
        objEndereco.ENDERECO_ID,
      {
        method: "DELETE",
      }
    ).then((data) => {
      if (data.ok) {
        props.recarregarPessoa(objEndereco.PESSOA_ID, props.linkBackEnd);
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastSucesso",
          estiloToastBody: "estiloToastSucesso",
          delayToast: 3000,
          autoHideToast: true,
          hideToastHeader: false,
          conteudoHeader: "",
          conteudoBody: "Exclusão efetuada com sucesso",
          closeToast: () => setShowToast(),
        });
        setShowToast(true);
      } else {
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastErro",
          estiloToastBody: "estiloToastErro",
          delayToast: 3000,
          autoHideToast: true,
          hideToastHeader: false,
          conteudoHeader: "",
          conteudoBody: "Houve um erro",
          closeToast: () => setShowToast(),
        });
        setShowToast(true);
      }
    });
  };

  return (
    <>
      <div id="container-endereco">{enderecoDisplay}</div>

      {props.pessoaSelecionada.PESSOA_ID && (
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
        showToast={showToast}
        show={modalShow}
        salvarEndereco={(objCadastro) => salvarEnderecoPessoa(objCadastro)}
        editarEndereco={(objAtualizar) => editarEnderecoPessoa(objAtualizar)}
        novoEnderecoId={novoEnderecoId}
        onHide={(limparCampos) => setModalShow(false)}
      />

      <div>
        <ToastControl
          showToast={showToast}
          closeToast={configToast.closeToast}
          delayToast={configToast.delayToast}
          autoHideToast={configToast.autoHideToast}
          estiloToastHeader={configToast.estiloToastHeader}
          estiloToastBody={configToast.estiloToastBody}
          hideToastHeader={configToast.hideToastHeader}
          conteudoHeader={configToast.conteudoHeader}
          conteudoBody={configToast.conteudoBody}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  pessoaSelecionada: state.people.pessoaSelecionada,
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({
  recarregarPessoa: (pessoaId, linkBackEnd) =>
    dispatch(PeopleActions.recarregarPessoa(pessoaId, linkBackEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressPeople);
