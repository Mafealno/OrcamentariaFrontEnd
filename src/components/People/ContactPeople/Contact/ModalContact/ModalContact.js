import React, { useState, useEffect } from "react";
import "./ModalContact.css";
import ModalControl from "../../../../ModalControl/ModalControl";
import * as PeopleActions from "../../../../../store/actions/people";
import * as validacaoDadosUtils from "../../../../../utils/validacaoDados";
import { connect } from "react-redux";

function ModalContact(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [telefone, setTelefone] = useState(true);
  let [celular, setCelular] = useState(true);
  let [email, setEmail] = useState(true);

  let [dadosCadastro, setDadosCadastro] = useState({
    pessoaId: { ...dadosCampo },
    contatoId: { ...dadosCampo, valorPadrao: 0 },
    tipoContato: { ...dadosCampo, requerido: true },
    contato: { ...dadosCampo, requerido: true },
    ddd: { ...dadosCampo, formato: /^[1-9]{1}[0-9]{1}$/ },
    ramal: { ...dadosCampo, formato: /^\d{1,10}$/ },
    contatoPadrao: { ...dadosCampo, valorPadrao: false },
  });

  useEffect(() => {
    if (props.PESSOA_ID) {
      setDadosCadastro({
        pessoaId: { ...dadosCadastro.pessoaId, valor: props.PESSOA_ID },
        contatoId: { ...dadosCadastro.contatoId, valor: props.CONTATO_ID },
        tipoContato: {
          ...dadosCadastro.tipoContato,
          valor: props.TIPO_CONTATO,
        },
        contato: { ...dadosCadastro.contato, valor: props.CONTATO },
        ddd: { ...dadosCadastro.ddd, valor: props.DDD },
        ramal: { ...dadosCadastro.ramal, valor: props.RAMAL },
        contatoPadrao: {
          ...dadosCadastro.contatoPadrao,
          valor: props.CONTATO_PADRAO,
        },
      });

      tipoContatoSelecionado(props.TIPO_CONTATO);
    } else {
      limparCampos();
    }
  }, [props.show]);

  useEffect(() => {
    setDadosCadastro({
      ...dadosCadastro,
      pessoaId: {
        ...dadosCadastro.pessoaId,
        valor: props.pessoaSelecionada.PESSOA_ID,
      },
      contatoId: { ...dadosCadastro.contatoId, valor: props.novoContatoId },
    });
  }, [
    props.novoContatoId,
    props.tipoContato,
    props.contatoPadrao,
    props.pessoaSelecionada.PESSOA_ID,
  ]);

  const limparCampos = () => {
    setDadosCadastro({
      ...dadosCadastro,
      contatoId: {
        ...dadosCadastro.contatoId,
        valor: dadosCadastro.contatoId.valorPadrao,
      },
      tipoContato: {
        ...dadosCadastro.tipoContato,
        valor: dadosCadastro.tipoContato.valorPadrao,
      },
      contato: {
        ...dadosCadastro.contato,
        valor: dadosCadastro.contato.valorPadrao,
      },
      ddd: { ...dadosCadastro.ddd, valor: dadosCadastro.ddd.valorPadrao },
      ramal: { ...dadosCadastro.ramal, valor: dadosCadastro.ramal.valorPadrao },
      contatoPadrao: {
        ...dadosCadastro.contatoPadrao,
        valor: dadosCadastro.contatoPadrao.valorPadrao,
      },
    });
  };

  const montarObj = (obj) => {
    return {
      PESSOA_ID: obj.pessoaId.valor,
      CONTATO_ID: obj.contatoId.valor,
      TIPO_CONTATO: obj.tipoContato.valor,
      CONTATO: obj.contato.valor,
      DDD: obj.tipoContato.valor == "Email" ? "" : obj.ddd.valor,
      RAMAL: obj.tipoContato.valor == "Email" ? "" : obj.ramal.valor,
      CONTATO_PADRAO: document.querySelector("#campo-contatoPadrao").checked,
    };
  };

  const exibirCamposErro = (dados, houveErro) => {
    Object.keys(dados).map((nomeCampo) => {
      if (!dados[nomeCampo].valido) {
        houveErro = true;

        if (document.getElementById("campo-" + nomeCampo)) {
          document.getElementById("erro-" + nomeCampo).innerHTML =
            dados[nomeCampo].msgErro;
          document
            .getElementById("campo-" + nomeCampo)
            .classList.add("is-invalid");
        }
      }
    });
    return houveErro;
  };

  const removerErro = (id) => {
    document.getElementById(id).classList.remove("is-invalid");
  };

  const definirFormatoPorTipoContato = (dadosCadastro) => {
    switch (dadosCadastro.tipoContato.valor) {
      case "Telefone":
        dadosCadastro.contato.formato = /^(\d{4})(-)?(\d{4})$/;
        dadosCadastro.ddd.requerido = true;
        break;
      case "Celular":
        dadosCadastro.contato.formato = /^((9)?\d{4})(-)?(\d{4})$/;
        dadosCadastro.ddd.requerido = true;
        break;
      case "Email":
        dadosCadastro.contato.formato = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        break;
      default:
        dadosCadastro.contato.formato = "";
        break;
    }

    return dadosCadastro;
  };

  const salvarCadastro = () => {
    let dadosContato = { ...dadosCadastro };

    dadosContato = validacaoDadosUtils.validarDados(
      definirFormatoPorTipoContato(dadosContato)
    );

    let houveErro = false;

    houveErro = exibirCamposErro(dadosContato, houveErro);

    if (houveErro) {
      return;
    }
    props.salvarContato(montarObj(dadosContato));
  };
  const editarCadastro = () => {
    let dadosContato = { ...dadosCadastro };

    dadosContato = validacaoDadosUtils.validarDados(
      definirFormatoPorTipoContato(dadosContato)
    );

    let houveErro = false;

    houveErro = exibirCamposErro(dadosContato, houveErro);

    if (houveErro) {
      return;
    }

    props.editarContato(montarObj(dadosContato));
  };

  function tipoContatoSelecionado(value) {
    switch (value) {
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
        break;
    }
  }

  const handleInputChange = (event) => {
    setDadosCadastro({
      ...dadosCadastro,
      [event.target.name]: {
        ...dadosCadastro[event.target.name],
        valor: event.target.value,
      },
    });
  };

  return (
    <>
      <ModalControl
        {...props}
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal"
        estiloModalFooter="backgroundModal"
        tituloModal={
          dadosCadastro.contatoId.valor ? "Editar Contato" : "Novo contato"
        }
        conteudoBody={
          <div className="form">
            <div className="container-form">
              <form>
                <div className="form-group">
                  <div className="form-row">
                    <label className="col-form-label">Código:</label>
                    <input
                      className="form-control-plaintext input-codigo"
                      type="text"
                      id="campo-contatoId"
                      value={dadosCadastro.contatoId.valor || ""}
                      readOnly
                    />
                    <span
                      className="invalid-feedback"
                      id="erro-constoId"
                    ></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-xl-4 div-tipo-contato">
                      <label>Tipo de contato</label>
                      <select
                        className="form-control"
                        name="tipoContato"
                        id="campo-tipoContato"
                        value={dadosCadastro.tipoContato.valor}
                        onChange={(event) =>
                          handleInputChange(
                            event,
                            tipoContatoSelecionado(
                              event.target.value,
                              handleInputChange(event)
                            )
                          )
                        }
                        onFocus={(event) => removerErro(event.target.id)}
                      >
                        <option value="">Escolher...</option>
                        <option value="Celular">Celular</option>
                        <option value="Telefone">Telefone</option>
                        <option value="Email">Email</option>
                      </select>
                      <span
                        className="invalid-feedback"
                        id="erro-tipoContato"
                      ></span>
                    </div>
                    <div className="col-xl-8">
                      <label>Contato</label>
                      <input
                        disabled={
                          dadosCadastro.tipoContato.valor ? false : email
                        }
                        type="text"
                        className="form-control"
                        name="contato"
                        id="campo-contato"
                        value={dadosCadastro.contato.valor}
                        onChange={(event) => handleInputChange(event)}
                        onFocus={(event) => removerErro(event.target.id)}
                      />
                      <span
                        className="invalid-feedback"
                        id="erro-contato"
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-3">
                      <label>DDD</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ddd"
                        id="campo-ddd"
                        disabled={
                          dadosCadastro.contatoId.valor != null &&
                          (dadosCadastro.tipoContato.valor == "telefone" ||
                            dadosCadastro.tipoContato.valor == "celular")
                            ? false
                            : celular
                        }
                        value={dadosCadastro.ddd.valor}
                        onChange={(event) => handleInputChange(event)}
                        onFocus={(event) => removerErro(event.target.id)}
                      />
                      <span className="invalid-feedback" id="erro-ddd"></span>
                    </div>
                    <div className="col-6">
                      <label>Ramal</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ramal"
                        id="campo-ramal"
                        disabled={
                          dadosCadastro.contatoId.valor != null &&
                          dadosCadastro.tipoContato.valor == "telefone"
                            ? false
                            : telefone
                        }
                        value={dadosCadastro.ramal.valor}
                        onChange={(event) => handleInputChange(event)}
                        onFocus={(event) => removerErro(event.target.id)}
                      />
                      <span className="invalid-feedback" id="erro-ramal"></span>
                    </div>
                    <div className="col-3">
                      <label>Padrão</label>
                      <input
                        type="checkbox"
                        className="form-control"
                        name="contatoPadrao"
                        id="campo-contatoPadrao"
                        checked={dadosCadastro.contatoPadrao.valor}
                        disabled={
                          dadosCadastro.tipoContato.valor ? false : email
                        }
                        value={false}
                        onChange={(event) => handleInputChange(event)}
                        onFocus={(event) => removerErro(event.target.id)}
                      />
                      <span
                        className="invalid-feedback"
                        id="erro-contatoPadrao"
                      ></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
        conteudoFooter={
          <>
            {!dadosCadastro.contatoId.valor && (
              <div>
                <button
                  className="btn btn-primary btn-100-px"
                  onClick={() => salvarCadastro()}
                >
                  Salvar
                </button>
              </div>
            )}
            {dadosCadastro.contatoId.valor > 0 && (
              <div>
                <button
                  onClick={() => editarCadastro()}
                  className="btn btn-success btn-100-px"
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
