import React, { useState, useEffect } from "react";
import "./BasicRegPeople.css";
import FormRegClientProvider from "./FormRegClientProvider/FormRegClientProvider";
import FormRegEmployee from "./FormRegEmployee/FormRegEmployee";
import * as PeopleActions from "../../../store/actions/people";
import { connect } from "react-redux";
import ToastControl from "../../ToastControl/ToastControl";

function BasicRegPeople(props) {
  const [tipoCadastro, setTipoCadastro] = useState("naoSelecionado");
  const [pessoaId, setPessoaId] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [configToast, setConfigToast] = useState({
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
    setPessoaId(props.pessoaSelecionada.pessoA_ID ?? "");
    setTipoCadastro(props.pessoaSelecionada.tipO_CADASTRO ?? "");
  }, [props.pessoaSelecionada.pessoA_ID]);

  const deletarCadastroPessoa = () => {
    var linkTipo = "/pessoas/";
    if (props.pessoaSelecionada.tipO_CADASTRO == "Funcionario") {
      linkTipo = "/funcionario/";
    }

    fetch(props.linkBackEnd + linkTipo + props.pessoaSelecionada.pessoA_ID, {
      method: "DELETE",
    }).then((data) => {
      if (data.ok) {
        props.selecionarPessoa({});
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

  const salvarCadastroPessoa = (objCadastro) => {
    var linkTipo = "/pessoas/";
    if (objCadastro.tipO_CADASTRO == "Funcionario") {
      linkTipo = "/funcionario/";
    }

    fetch(props.linkBackEnd + linkTipo, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objCadastro),
    })
      .then((response) => response.json())
      .then((data) => {
        props.recarregarPessoa(data.pessoA_ID, props.linkBackEnd);
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

  const atualizarCadastroPessoa = (objAtualizar) => {
    var linkTipo = "/pessoas/";
    if (objAtualizar.tipO_CADASTRO == "Funcionario") {
      linkTipo = "/funcionario/";
    }

    fetch(props.linkBackEnd + linkTipo + props.pessoaSelecionada.pessoA_ID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objAtualizar),
    }).then((data) => {
      if (data.ok) {
        props.recarregarPessoa(
          props.pessoaSelecionada.pessoA_ID,
          props.linkBackEnd
        );
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
              {props.pessoaSelecionada.pessoA_ID && (
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
          {tipoCadastro === "Cliente" || tipoCadastro === "Fornecedor" ? (
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
            tipoCadastro === "Fornecedor" && (
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
          {tipoCadastro === "Funcionario" && (
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
