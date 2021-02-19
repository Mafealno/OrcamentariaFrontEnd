/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
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
            objContato={contato || {}}
            editarContato={(objAtualizar) => editarContatoPessoa(objAtualizar)}
            deletarContato={(objContato) => deletarContatoPessoa(objContato)}
          />
        ))
      );
    } else {
      setContatoDisplay([]);
    }
  }, [props.pessoaSelecionada.LIST_CONTATO]);

  const exibirTost = (tipo, mensagem) => {
    switch (tipo) {
      case "sucesso":
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastSucesso",
          estiloToastBody: "estiloToastSucesso",
          delayToast: 3000,
          autoHideToast: true,
          hideToastHeader: false,
          conteudoHeader: "",
          conteudoBody: mensagem,
          closeToast: () => setShowToast(),
        });
        setShowToast(true);
        break;
      case "erro":
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastErro",
          estiloToastBody: "estiloToastErro",
          delayToast: 3000,
          autoHideToast: true,
          hideToastHeader: false,
          conteudoHeader: "",
          conteudoBody: mensagem,
          closeToast: () => setShowToast(),
        });
        setShowToast(true);
        break;
      default:
        break;
    }
  };

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
        const msg = "Cadastro efetuado com sucesso";

        exibirTost("sucesso", msg);
      })
      .catch(() => {
        const msg = "Erro ao efetuar cadastro";

        exibirTost("erro", msg);
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
        const msg = "Cadastro atualizado com sucesso";

        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar atualização";

        exibirTost("erro", msg);
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
        const msg = "Exclusão efetuada com sucesso";

        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar exclusão";

        exibirTost("erro", msg);
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
        onHide={() => setShowModal(false)}
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
