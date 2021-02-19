/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "./BasicRegEquipamento.css";
import ResultSearchProvider from "./ResultSearchProvider/ResultSearchProvider";
import ModalConfirm from "../../ModalConfirm/ModalConfirm";
import ToastControl from "../../ToastControl/ToastControl";
import * as EquipamentoActions from "../../../store/actions/equipamento";
import * as validacaoDadosUtils from "../../../utils/validacaoDados";
import { connect } from "react-redux";

function BasicRegEquipamento(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };
  let [stringBuscaFabricante, setStringBuscaFabricante] = useState("");
  let [showResultadoFabricante, setShowResultadoFabricante] = useState(false);
  let [dataFabricantes, setDataFabricantes] = useState([]);
  let [showModalConfirm, setShowModalConfirm] = useState(false);
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

  let [dadosCadastro, setDadosCadastro] = useState({
    equipamentoId: { ...dadosCampo, valorPadrao: 0 },
    nomeEquipamento: { ...dadosCampo, requerido: true },
    descricaoEquipamento: { ...dadosCampo },
  });

  let [dadosFabricante, setDadosFabricante] = useState({
    pessoaId: { ...dadosCampo, requerido: true },
    nomePessoa: { ...dadosCampo },
  });

  useEffect(() => {
    if (props.equipamentoSelecionado.EQUIPAMENTO_ID) {
      setDadosCadastro({
        equipamentoId: {
          ...dadosCadastro.equipamentoId,
          valor: props.equipamentoSelecionado.EQUIPAMENTO_ID,
        },
        nomeEquipamento: {
          ...dadosCadastro.nomeEquipamento,
          valor: props.equipamentoSelecionado.NOME_EQUIPAMENTO,
        },
        descricaoEquipamento: {
          ...dadosCadastro.descricaoEquipamento,
          valor: props.equipamentoSelecionado.DESCRICAO,
        },
      });
      setDadosFabricante({
        pessoaId: {
          ...dadosFabricante.pessoaId,
          valor: props.equipamentoSelecionado.FABRICANTE.PESSOA_ID,
        },
        nomePessoa: {
          ...dadosFabricante.nomePessoa,
          valor: props.equipamentoSelecionado.FABRICANTE.NOME_PESSOA,
        },
      });
    } else {
      limparCampos();
    }
  }, [props.equipamentoSelecionado.EQUIPAMENTO_ID]);

  const limparCampos = () => {
    setDadosCadastro({
      equipamentoId: {
        ...dadosCadastro.equipamentoId,
        valor: dadosCadastro.equipamentoId.valorPadrao,
      },
      nomeEquipamento: {
        ...dadosCadastro.nomeEquipamento,
        valor: dadosCadastro.nomeEquipamento.valorPadrao,
      },
      descricaoEquipamento: {
        ...dadosCadastro.descricaoEquipamento,
        valor: dadosCadastro.descricaoEquipamento.valorPadrao,
      },
    });

    setDadosFabricante({
      pessoaId: {
        ...dadosFabricante.pessoaId,
        valor: dadosFabricante.pessoaId.valorPadrao,
      },
      nomePessoa: {
        ...dadosFabricante.pessoaId,
        valor: dadosFabricante.nomePessoa.valorPadrao,
      },
    });
  };

  const montarObj = (obj) => {
    return {
      EQUIPAMENTO_ID: obj.equipamentoId.valor,
      NOME_EQUIPAMENTO: obj.nomeEquipamento.valor,
      DESCRICAO: obj.descricaoEquipamento.valor,
      FABRICANTE: {
        PESSOA_ID: obj.pessoa.pessoaId.valor,
        NOME_PESSOA: obj.pessoa.nomePessoa.valor,
        rg: "",
        cpf: "",
        cnpj: "",
        TIPO_CADASTRO: "",
        TIPO_PESSOA: "",
        LIST_ENDERECO: [],
        LIST_CONTATO: [],
      },
    };
  };

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

  const selecionarFabricanteEquipamento = (fabricante) => {
    setDadosFabricante({
      pessoaId: {
        ...dadosFabricante.pessoaId,
        valor: fabricante.PESSOA_ID,
      },
      nomePessoa: {
        ...dadosFabricante.pessoaId,
        valor: fabricante.NOME_PESSOA,
      },
    });
  };

  const salvarCadastro = () => {
    const dadosEquipameto = validacaoDadosUtils.validarDados(dadosCadastro);
    const dadosPessoa = validacaoDadosUtils.validarDados(dadosFabricante);

    let houveErro = false;
    houveErro = exibirCamposErro(dadosEquipameto, houveErro);
    houveErro = exibirCamposErro(dadosPessoa, houveErro);

    if (houveErro) {
      return;
    }

    dadosEquipameto.pessoa = dadosPessoa;

    fetch(props.linkBackEnd + "/equipamento/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj(dadosEquipameto)),
    })
      .then((response) => response.json())
      .then((data) => {
        props.recarregarEquipamento(data.EQUIPAMENTO_ID, props.linkBackEnd);

        const msg = "Cadastro efetuado com sucesso";

        exibirTost("sucesso", msg);
      })
      .catch(() => {
        const msg = "Erro ao efetuar cadastro";

        exibirTost("erro", msg);
      });
  };

  const deletarCadastro = () => {
    fetch(
      props.linkBackEnd + "/equipamento/" + dadosCadastro.equipamentoId.valor,
      {
        method: "DELETE",
      }
    ).then((data) => {
      if (data.ok) {
        props.selecionarEquipamento({});

        const msg = "Exclusão efetuada com sucesso";

        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar exclusão";

        exibirTost("erro", msg);
      }
    });
  };

  const atualizarCadastro = () => {
    const dadosEquipameto = validacaoDadosUtils.validarDados(dadosCadastro);
    const dadosPessoa = validacaoDadosUtils.validarDados(dadosFabricante);

    let houveErro = false;
    houveErro = exibirCamposErro(dadosEquipameto, houveErro);
    houveErro = exibirCamposErro(dadosPessoa, houveErro);

    if (houveErro) {
      return;
    }

    dadosEquipameto.pessoa = dadosPessoa;

    fetch(
      props.linkBackEnd + "/equipamento/" + dadosCadastro.equipamentoId.valor,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(montarObj(dadosEquipameto)),
      }
    ).then((data) => {
      if (data.ok) {
        props.recarregarEquipamento(
          dadosCadastro.equipamentoId.valor,
          props.linkBackEnd
        );
        const msg = "Atualização efetuada com sucesso";
        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar atualização";
        exibirTost("sucesso", msg);
      }
    });
  };

  const buscarFabricantes = () => {
    if (showResultadoFabricante) {
      return;
    }
    if (!stringBuscaFabricante) {
      fetch(props.linkBackEnd + "/pessoas/", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setDataFabricantes(
            data.filter((fabricante) => {
              return fabricante.TIPO_CADASTRO == "Fornecedor";
            })
          );
          setShowResultadoFabricante(true);
        });
    } else {
      if (stringBuscaFabricante.match(/\d/)) {
        stringBuscaFabricante = "buscar?pessoaId=" + stringBuscaFabricante;
      } else {
        stringBuscaFabricante = "buscar?nomePessoa=" + stringBuscaFabricante;
      }

      fetch(props.linkBackEnd + "/pessoas/" + stringBuscaFabricante, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setDataFabricantes(
            data.filter((fabricante) => {
              return fabricante.TIPO_CADASTRO == "Fornecedor";
            })
          );
          setShowResultadoFabricante(true);
        });
    }
  };

  const listenerClick = () => {
    setShowResultadoFabricante(false);
  };

  if (showResultadoFabricante) {
    window.addEventListener("click", listenerClick);
  } else {
    window.removeEventListener("click", listenerClick);
  }

  const pressEnter = (event) => {
    if (event.key == "Enter") {
      buscarFabricantes();
    }
  };

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
    <div className="form-equipamento">
      <div className="container-form">
        <div className="form-group">
          <div className="form-row">
            <label className="col-form-label">Código: </label>
            <input
              type="text"
              className="form-control-plaintext"
              name="equipamentoId"
              id="campo-equipamentoId"
              value={dadosCadastro.equipamentoId.valor || ""}
              readOnly
            />
            <span className="invalid-feedback" id="erro-equipamentoId"></span>
            {dadosCadastro.equipamentoId.valor > 0 && (
              <div className="close-select-equipamento">
                <a href="#" onClick={() => props.selecionarEquipamento({})}>
                  <span className="fa fa-close close-select-equipamento"></span>
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <div className="col-xl div-nome-equipamento">
              <label className="col-form-label">Nome</label>
              <input
                type="text"
                placeholder="Ex: Lixadeira sem pó"
                className="form-control"
                name="nomeEquipamento"
                id="campo-nomeEquipamento"
                value={dadosCadastro.nomeEquipamento.valor}
                onChange={(event) => handleInputChange(event)}
                onFocus={(event) => removerErro(event.target.id)}
              />
              <span
                className="invalid-feedback"
                id="erro-nomeEquipamento"
              ></span>
            </div>
          </div>
        </div>
        <div className="form-group width-99-5">
          <div className="form-row">
            <label className="col-form-label">Descrição do equipamento</label>
            <textarea
              className="form-control"
              rows="5"
              name="descricaoEquipamento"
              id="campo-descricaoEquipamento"
              value={dadosCadastro.descricaoEquipamento.valor}
              onChange={(event) => handleInputChange(event)}
              onFocus={(event) => removerErro(event.target.id)}
            />
            <span
              className="invalid-feedback"
              id="erro-descricaoEquipamento"
            ></span>
          </div>
        </div>
        <fieldset id="campo-pessoaId">
          <legend>Dados do fabricante</legend>
          <div id="container-fabricante">
            <div id="buscaFabricante">
              <div className="form-group margin-bottom-0">
                <div className="row">
                  <div className="col-xl">
                    <input
                      className="form-control"
                      placeholder="Buscar Fabricante"
                      name="buscarFabricante"
                      onChange={(event) =>
                        setStringBuscaFabricante(event.target.value)
                      }
                      onFocus={() => removerErro("campo-pessoaId")}
                      onKeyDown={(event) => pressEnter(event)}
                    />
                  </div>
                  <div className="col-xl-3 div-btn-buscar-fabricante">
                    <button
                      type="button"
                      className="btn"
                      id="btn-buscar-fabricante"
                      onClick={() => buscarFabricantes()}
                      onFocus={() => removerErro("campo-pessoaId")}
                    >
                      Buscar
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-xl">
                    <ResultSearchProvider
                      show={showResultadoFabricante}
                      resultados={dataFabricantes}
                      selecionarFabricante={(fabricante) =>
                        selecionarFabricanteEquipamento(fabricante)
                      }
                    />
                  </div>
                  <div className="col-xl-3 div-btn-buscar-fabricante"></div>
                </div>
              </div>
            </div>
            <div id="principalFabricante">
              <div className="form-group">
                <div className="form-row">
                  <div className="col-xl-3 div-codigo-fabricante">
                    <label className="col-form-label">
                      Código do Fabricante
                    </label>
                    <input
                      className="form-control"
                      name="pessoaId"
                      value={dadosFabricante.pessoaId.valor}
                      readOnly
                    />
                  </div>
                  <div className="col-xl-9">
                    <label className="col-form-label">Nome do Fabricante</label>
                    <input
                      className="form-control"
                      name="nomePessoa"
                      value={dadosFabricante.nomePessoa.valor}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <span className="invalid-feedback" id="erro-pessoaId"></span>
        <div className="form-group width-99-5">
          <div className="form-row options">
            {!props.equipamentoSelecionado.EQUIPAMENTO_ID && (
              <button
                type="button"
                className="btn btn-primary btn-options"
                onClick={() => salvarCadastro()}
              >
                Salvar
              </button>
            )}

            {props.equipamentoSelecionado.EQUIPAMENTO_ID && (
              <>
                <button
                  type="button"
                  className="btn btn-orcamentaria btn-options"
                  onClick={() => setShowModalConfirm(true)}
                >
                  Deletar
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-options"
                  onClick={() => atualizarCadastro()}
                >
                  Atualizar
                </button>
              </>
            )}
          </div>
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
      <div>
        <ModalConfirm
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          acaoConfirmada={() => deletarCadastro()}
          tituloModalConfirm={
            "Confirma exclusão? O dados não poderão ser recuperados"
          }
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  equipamentoSelecionado: state.equipamento.equipamentoSelecionado,
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({
  selecionarEquipamento: (equipamento) =>
    dispatch(EquipamentoActions.selecionarEquipamento(equipamento)),
  recarregarEquipamento: (equipamentoId, linkBackEnd) =>
    dispatch(
      EquipamentoActions.recarregarEquipamento(equipamentoId, linkBackEnd)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicRegEquipamento);
