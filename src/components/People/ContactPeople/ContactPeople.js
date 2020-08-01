import React, { useState, useEffect } from "react";
import "./ContactPeople.css";
import Contact from "./Contact/Contact";
import ModalContact from "./Contact/ModalContact/ModalContact";
import * as PeopleActions from "../../../store/actions/people";
import ToastControl from "../../ToastControl/ToastControl";
import { connect } from "react-redux";

function ContactPeople(props) {
  let [novoContatoId, setNovoContatoId] = useState("");
  let [tipoContato, setTipoContato] = useState("");
  let [contatoPadrao, setContatoPadrao] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [contatoDisplay, setContatoDisplay] = useState([]);
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
      setContatoDisplay(
        props.pessoaSelecionada.LIST_CONTATO.map((contato) => (
          <Contact
            key={contato.CONTATO_ID}
            objContato={contato ?? {}}
            editarContato={(objAtualizar) => editarContatoPessoa(objAtualizar)}
            deletarContato={(objContato) => deletarContatoPessoa(objContato)}
          />
        ))
      );
    } else {
      setContatoDisplay([]);
    }
  }, [props.pessoaSelecionada.LIST_CONTATO]);

  const salvarContatoPessoa = (objCadastro) => {
    if (
      objCadastro.tipoContato ||
      objCadastro.tipoContato == "naoSelecionado"
    ) {
      return;
    }

    fetch(props.linkBackEnd + "/contato/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objCadastro),
    })
      .then((response) => response.json())
      .then((data) => {
        setNovoContatoId(data.CONTATO_ID);
        setTipoContato(data.TIPO_CONTATO);
        setContatoPadrao(data.CONTATO_PADRAO);
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

  const editarContatoPessoa = (objAtualizar) => {
    fetch(props.linkBackEnd + "/contato/" + objAtualizar.CONTATO_ID, {
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

  const deletarContatoPessoa = (objContato) => {
    fetch(
      props.linkBackEnd + "/contato/deletar?contatoId=" + objContato.CONTATO_ID,
      {
        method: "DELETE",
      }
    ).then((data) => {
      if (data.ok) {
        props.recarregarPessoa(objContato.PESSOA_ID, props.linkBackEnd);
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
      <div id="container-contato">{contatoDisplay}</div>
      {props.pessoaSelecionada.PESSOA_ID && (
        <>
          <div className="btn-adicionar">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Adicionar contato
            </button>
          </div>
        </>
      )}

      <ModalContact
        novoContatoId={novoContatoId}
        tipoContato={tipoContato}
        contatoPadrao={contatoPadrao}
        show={showModal}
        salvarContato={(objCadastro) => salvarContatoPessoa(objCadastro)}
        editarContato={(objAtualizar) => editarContatoPessoa(objAtualizar)}
        onHide={(limparCampos) => setShowModal(false)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactPeople);
