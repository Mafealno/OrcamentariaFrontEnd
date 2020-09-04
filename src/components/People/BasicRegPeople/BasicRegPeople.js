import React, { useState, useEffect } from "react";
import "./BasicRegPeople.css";
import FormRegClientProvider from "./FormRegClientProvider/FormRegClientProvider";
import FormRegEmployee from "./FormRegEmployee/FormRegEmployee";
import * as PeopleActions from "../../../store/actions/people";
import { connect } from "react-redux";
import ToastControl from "../../ToastControl/ToastControl";

function BasicRegPeople(props) {
  let [tipoCadastro, setTipoCadastro] = useState("naoSelecionado");
  let [pessoaId, setPessoaId] = useState("");
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
    closeToast: {},
  });

  useEffect(() => {
    setPessoaId(props.pessoaSelecionada.PESSOA_ID || "");
    setTipoCadastro(props.pessoaSelecionada.TIPO_CADASTRO || "");
  }, [props.pessoaSelecionada.PESSOA_ID]);

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

  const salvarCadastroPessoa = (objCadastro) => {
    let linkTipo = "/pessoas/";
    if (objCadastro.TIPO_CADASTRO == "Funcionario") {
      linkTipo = "/funcionario/";
    }

    fetch(props.linkBackEnd + linkTipo, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objCadastro),
    })
      .then((response) => response.json())
      .then((data) => {
        props.recarregarPessoa(data.PESSOA_ID, props.linkBackEnd);
        const msg = "Cadastro efetuado com sucesso";

        exibirTost("sucesso", msg);
      })
      .catch(() => {
        const msg = "Erro ao efetuar cadastro";

        exibirTost("erro", msg);
      });
  };

  const deletarCadastroPessoa = () => {
    let linkTipo = "/pessoas/";
    if (props.pessoaSelecionada.TIPO_CADASTRO == "Funcionario") {
      linkTipo = "/funcionario/";
    }

    fetch(props.linkBackEnd + linkTipo + props.pessoaSelecionada.PESSOA_ID, {
      method: "DELETE",
    }).then((data) => {
      if (data.ok) {
        props.selecionarPessoa({});
        const msg = "Exclusão efetuada com sucesso";

        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar exclusão";

        exibirTost("erro", msg);
      }
    });
  };

  const atualizarCadastroPessoa = (objAtualizar) => {
    let linkTipo = "/pessoas/";
    if (objAtualizar.TIPO_CADASTRO == "Funcionario") {
      linkTipo = "/funcionario/";
    }

    fetch(props.linkBackEnd + linkTipo + props.pessoaSelecionada.PESSOA_ID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objAtualizar),
    }).then((data) => {
      if (data.ok) {
        props.recarregarPessoa(
          props.pessoaSelecionada.PESSOA_ID,
          props.linkBackEnd
        );
        const msg = "Cadastro atualizado com sucesso";

        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar atualização";

        exibirTost("erro", msg);
      }
    });
  };

  return (
    <>
      <div className="form">
        <div className="container-form">
          <div className="form-group">
            <div className="form-row">
              <label className="col-form-label">Código: </label>
              <input
                type="text"
                className="form-control-plaintext"
                name="pessoaId"
                value={pessoaId}
                id="input-pessoa-id"
                onChange={(event) => setPessoaId(event.target.value)}
                readOnly
              />
              {props.pessoaSelecionada.PESSOA_ID && (
                <>
                  <div className="close-select-people">
                    <a href="#" onClick={() => props.selecionarPessoa({})}>
                      <span className="fa fa-close close-select-people"></span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <label>Tipo de Cadastro</label>
              <select
                id="select-tipo-cadstro"
                className="form-control"
                value={tipoCadastro}
                onChange={(event) => setTipoCadastro(event.target.value)}
              >
                <option value="naoSelecionado">Escolher...</option>
                <option value="Cliente">Cliente</option>
                <option value="Fornecedor">Fornecedor</option>
                <option value="Funcionario">Funcionário</option>
              </select>
            </div>
          </div>
          {tipoCadastro == "Cliente" || tipoCadastro == "Fornecedor" ? (
            <FormRegClientProvider
              tipoCadastroPessoa={tipoCadastro}
              salvarCadastro={(objCadastro) =>
                salvarCadastroPessoa(objCadastro)
              }
              atualizarCadastro={(objAtualizar) =>
                atualizarCadastroPessoa(objAtualizar)
              }
              deletarCadastro={() => deletarCadastroPessoa()}
            />
          ) : (
            tipoCadastro == "Fornecedor" && (
              <FormRegClientProvider
                tipoCadastroPessoa={tipoCadastro}
                salvarCadastro={(objCadastro) =>
                  salvarCadastroPessoa(objCadastro)
                }
                atualizarCadastro={(objAtualizar) =>
                  atualizarCadastroPessoa(objAtualizar)
                }
                deletarCadastro={() => deletarCadastroPessoa()}
              />
            )
          )}
          {tipoCadastro == "Funcionario" && (
            <FormRegEmployee
              salvarCadastro={(objCadastro) =>
                salvarCadastroPessoa(objCadastro)
              }
              atualizarCadastro={(objAtualizar) =>
                atualizarCadastroPessoa(objAtualizar)
              }
              deletarCadastro={() => deletarCadastroPessoa()}
            />
          )}
          <div className="form-group btn-salvar"></div>
        </div>
      </div>

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
        ></ToastControl>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  pessoaSelecionada: state.people.pessoaSelecionada,
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({
  selecionarPessoa: (pessoa) =>
    dispatch(PeopleActions.selecionarPessoa(pessoa)),
  recarregarPessoa: (pessoaId, linkBackEnd) =>
    dispatch(PeopleActions.recarregarPessoa(pessoaId, linkBackEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicRegPeople);
