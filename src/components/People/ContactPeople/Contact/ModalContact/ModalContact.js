import React, { useState, useEffect } from "react";
import "./ModalContact.css";
import ModalControl from "../../../../ModalControl/ModalControl";
import * as PeopleActions from "../../../../../store/actions/people";
import { connect } from "react-redux";

function ModalContact(props) {
  let [telefone, setTelefone] = useState(true);
  let [celular, setCelular] = useState(true);
  let [email, setEmail] = useState(true);

  let [dadosCadastro, setDadosCadastro] = useState({
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
      pessoaId: props.PESSOA_ID,
      contatoId: props.CONTATO_ID,
      tipoContato: props.TIPO_CONTATO,
      contato: props.CONTATO,
      ddd: props.DDD ?? "",
      ramal: props.RAMAL ?? "",
      contatoPadrao: props.CONTATO_PADRAO,
    });
  }, [
    props.PESSOA_ID,
    props.CONTATO_ID,
    props.TIPO_CONTATO,
    props.contato,
    props.ddd,
    props.ramal,
    props.CONTATO_PADRAO,
    props.show,
  ]);

  useEffect(() => {
    setDadosCadastro({
      pessoaId: props.pessoaSelecionada.PESSOA_ID,
      contatoId: props.novoContatoId,
      tipoContato: props.tipoContato,
      contato: dadosCadastro.contato,
      ddd: dadosCadastro.ddd ?? "",
      ramal: dadosCadastro.ramal ?? "",
      contatoPadrao: dadosCadastro.contatoPadrao,
    });
  }, [props.novoContatoId, props.tipoContato, props.contatoPadrao]);

  const handleInputChange = (event) => {
    setDadosCadastro({
      ...dadosCadastro,
      [event.target.name]: event.target.value,
    });
  };

  const montarObj = () => {
    return {
      PESSOA_ID: props.pessoaSelecionada.PESSOA_ID,
      CONTATO_ID: dadosCadastro.contatoId,
      TIPO_CONTATO: dadosCadastro.tipoContato,
      CONTATO: dadosCadastro.contato,
      DDD: dadosCadastro.tipoContato == "Email" ? "" : dadosCadastro.ddd,
      RAMAL: dadosCadastro.tipoContato == "Email" ? "" : dadosCadastro.ramal,
      CONTATO_PADRAO: document.querySelector("#form-contato-padrao").checked,
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
        tituloModal={
          dadosCadastro.contatoId ? "Editar Contato" : "Novo contato"
        }
        conteudoHeader={
          <div className="close-contact">
            <a href="#" onClick={() => props.onHide(limparCampos())}>
              <span className="fa fa-close close-contact"></span>
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
        conteudoFooter={
          <>
            {!dadosCadastro.contatoId && (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => props.salvarContato(montarObj())}
                >
                  Salvar
                </button>
              </div>
            )}
            {dadosCadastro.contatoId && (
              <div>
                <button
                  onClick={() => props.editarContato(montarObj())}
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
