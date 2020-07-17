import React, { useState, useEffect } from "react";
import "./ModalContact.css";
import ModalControl from "../../../../ModalControl/ModalControl";
import * as PeopleActions from "../../../../../store/actions/people";
import { connect } from "react-redux";

function ModalContact(props) {
  const [telefone, setTelefone] = useState(true);
  const [celular, setCelular] = useState(true);
  const [email, setEmail] = useState(true);

  const [dadosCadastro, setDadosCadastro] = useState({
    pessoaId: "",
    contatoId: "",
    tipoContato: "",
    contato: "",
    ddd: "",
    ramal: "",
    contatoPadrao: "",
  });

  useEffect(() => {
    setDadosCadastro({
      pessoaId: props.pessoA_ID,
      contatoId: props.contatO_ID,
      tipoContato: props.tipO_CONTATO,
      contato: props.contato,
      ddd: props.ddd ?? "",
      ramal: props.ramal ?? "",
      contatoPadrao: props.contatO_PADRAO,
    });
  }, [
    props.pessoA_ID,
    props.contatO_ID,
    props.tipO_CONTATO,
    props.contato,
    props.ddd,
    props.ramal,
    props.contatO_PADRAO,
    props.show,
  ]);

  const editarContato = (objContatoAtualizar) => {
    fetch(props.linkBackEnd + "/contato/" + objContatoAtualizar.contatO_ID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objContatoAtualizar),
    }).then(() => {
      props.recarregarPessoa(objContatoAtualizar.pessoA_ID, props.linkBackEnd);
    });
  };

  const salvarContato = (objContatoNovo) => {
    if (
      objContatoNovo.tipoContato ||
      objContatoNovo.tipoContato == "naoSelecionado"
    ) {
      return;
    }

    fetch(props.linkBackEnd + "/contato/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objContatoNovo),
    })
      .then((response) => response.json())
      .then((data) => {
        setDadosCadastro({
          pessoaId: objContatoNovo.pessoA_ID,
          contatoId: data.contatO_ID,
          tipoContato: objContatoNovo.tipO_CONTATO,
          contato: objContatoNovo.contato,
          ddd: objContatoNovo.ddd ?? "",
          ramal: objContatoNovo.ramal ?? "",
          contatoPadrao: objContatoNovo.contatO_PADRAO,
        });
      })
      .then(() => {
        props.recarregarPessoa(objContatoNovo.pessoA_ID, props.linkBackEnd);
      });
  };

  const handleInputChange = (event) => {
    setDadosCadastro({
      ...dadosCadastro,
      [event.target.name]: event.target.value,
    });
  };

  const montarObj = () => {
    return {
      pessoA_ID: props.pessoaSelecionada.pessoA_ID,
      contatO_ID: dadosCadastro.contatoId,
      tipO_CONTATO: dadosCadastro.tipoContato,
      contato: dadosCadastro.contato,
      ddd: dadosCadastro.tipoContato == "Email" ? "" : dadosCadastro.ddd,
      ramal: dadosCadastro.tipoContato == "Email" ? "" : dadosCadastro.ramal,
      contatO_PADRAO: document.querySelector("#form-contato-padrao").checked,
    };
  };

  const limparCampos = () => {
    setDadosCadastro({
      pessoaId: 0,
      contatoId: undefined,
      tipoContato: "",
      contato: "",
      ddd: "",
      ramal: "",
      contatoPadrao: "",
    });

    setTelefone(true);
    setCelular(true);
    setEmail(true);
  };

  function tipoContatoSeleciondo(event) {
    switch (event.target.value) {
      case "Telefone":
        setTelefone(false);
        setCelular(false);
        setEmail(false);
        break;
      case "Celular":
        setCelular(false);
        setTelefone(true);
        setEmail(false);
        break;
      case "Email":
        setEmail(false);
        setCelular(true);
        setTelefone(true);
        break;
      default:
        setTelefone(true);
        setCelular(true);
        setEmail(true);
    }

    handleInputChange(event);
  }

  return (
    <>
      <ModalControl
        {...props}
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal"
        estiloModalFooter="backgroundModal"
        tituloModal="Novo contato"
        conteudoHeader={
          <div className="close-modal-contact">
            <a href="#" onClick={() => props.onHide(limparCampos())}>
              <span className="fa fa-close close-select-people"></span>
            </a>
          </div>
        }
        conteudoBody={
          <div className="form">
            <div className="container-form">
              <form>
                <div className="form-group">
                  <div className="form-row">
                    <label className="col-form-label">Código:</label>
                    <input
                      value={dadosCadastro.contatoId}
                      type="text"
                      className="form-control-plaintext input-codigo"
                      id="input-contato-id"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-xl-4 div-tipo-contato">
                      <label>Tipo de contato</label>
                      <select
                        id="select-tipo-cadastro"
                        className="form-control"
                        value={dadosCadastro.tipoContato}
                        name="tipoContato"
                        onChange={(event) => tipoContatoSeleciondo(event)}
                      >
                        <option value="naoSelecionado">Escolher...</option>
                        <option value="Celular">Celular</option>
                        <option value="Telefone">Telefone</option>
                        <option value="Email">Email</option>
                      </select>
                    </div>
                    <div className="col-xl-8">
                      <label>Contato</label>
                      <input
                        value={dadosCadastro.contato}
                        disabled={dadosCadastro.tipoContato ? false : email}
                        type="text"
                        name="contato"
                        className="form-control"
                        id="form-contato"
                        onChange={(event) => handleInputChange(event)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-3">
                      <label>DDD</label>
                      <input
                        value={dadosCadastro.ddd}
                        disabled={
                          dadosCadastro.contatoId != null &&
                          (dadosCadastro.tipoContato == "telefone" ||
                            dadosCadastro.tipoContato == "celular")
                            ? false
                            : celular
                        }
                        name="ddd"
                        type="text"
                        id="form-ddd"
                        className="form-control"
                        onChange={(event) => handleInputChange(event)}
                      />
                    </div>
                    <div className="col-6">
                      <label>Ramal</label>
                      <input
                        value={dadosCadastro.ramal}
                        disabled={
                          dadosCadastro.contatoId != null &&
                          dadosCadastro.tipoContato == "telefone"
                            ? false
                            : telefone
                        }
                        name="ramal"
                        type="text"
                        id="form-ramal"
                        className="form-control"
                        onChange={(event) => handleInputChange(event)}
                      />
                    </div>
                    <div className="col-3">
                      <label>Padrão</label>
                      <input
                        disabled={dadosCadastro.tipoContato ? false : email}
                        name="contatoPadrao"
                        type="checkbox"
                        id="form-contato-padrao"
                        value={false}
                        checked={dadosCadastro.contatoPadrao}
                        className="form-control"
                        onChange={(event) => handleInputChange(event)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
        opcoesFooter={
          <>
            {!dadosCadastro.contatoId && (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={(objContatoNovo) => salvarContato(montarObj())}
                >
                  Salvar
                </button>
              </div>
            )}
            {dadosCadastro.contatoId && (
              <div>
                <button
                  onClick={(objContatoAtualizar) => editarContato(montarObj())}
                  className="btn btn-success"
                >
                  Atualizar
                </button>
              </div>
            )}
          </>
        }
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalContact);
