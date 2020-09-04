import React, { useState, useEffect } from "react";
import "./BasicRegOrcamento.css";
import ResultSearchClient from "./ResultSearchClient/ResultSearchClient";
import * as orcamentoActions from "../../../store/actions/orcamento";
import ModalConfirm from "../../ModalConfirm/ModalConfirm";
import ToastControl from "../../ToastControl/ToastControl";

import { connect } from "react-redux";

function BasicRegOrcamento(props) {
  let [stringBuscaCliente, setStringBuscaCliente] = useState("");
  let [showResultadoCliente, setShowResultadoCliente] = useState(false);
  let [dataClientes, setDataClientes] = useState([]);
  let [itemContatoDisplay, setItemContatoDisplay] = useState([]);

  let [showToast, setShowToast] = useState(false);
  let [showModalConfirm, setShowModalConfirm] = useState(false);
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
    orcamentoId: "",
    nomeObra: "",
    a_c: "",
    prazoEntrega: "",
    dataCriacaoOrcamento: undefined,
    tipoObra: props.tipoObra,
  });

  let [dadosCadastroCliente, setDadosCadastroCliente] = useState({
    pessoaId: "",
    nomePessoa: "",
    rg: "",
    cpf: "",
    cnpj: "",
    listContato: [],
  });

  let [
    dadosCadastroClienteEndereco,
    setDadosCadastroClienteEndereco,
  ] = useState({
    enderecoId: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  useEffect(() => {
    if (dadosCadastro.orcamentoId) {
      props.mostrarAbas(true);
    } else {
      props.mostrarAbas(false);
      props.selecionarClienteOrcamento({});
    }

    setDadosCadastro({
      orcamentoId: "",
      nomeObra: "",
      a_c: "",
      prazoEntrega: "",
      dataCriacaoOrcamento: undefined,
      tipoObra: props.tipoObra,
    });

    setDadosCadastroCliente({
      pessoaId: "",
      nomePessoa: "",
      rg: "",
      cpf: "",
      cnpj: "",
      listContato: [],
    });

    setDadosCadastroClienteEndereco({
      enderecoId: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      uf: "",
    });

    setItemContatoDisplay([]);

    if (dadosCadastro.tipoObra == "Geral") {
      if (props.orcamentoGeral.ORCAMENTO_ID) {
        setDadosCadastro({
          orcamentoId: props.orcamentoGeral.ORCAMENTO_ID,
          nomeObra: props.orcamentoGeral.NOME_OBRA,
          a_c: props.orcamentoGeral.A_C,
          prazoEntrega: props.orcamentoGeral.PRAZO_ENTREGA,
          dataCriacaoOrcamento: formatatData(
            props.orcamentoGeral.DATA_CRIACAO_ORCAMENTO
          ),
          tipoObra: props.orcamentoGeral.TIPO_OBRA,
        });

        setDadosCadastroCliente({
          pessoaId: props.orcamentoGeral.CLIENTE_ORCAMENTO.PESSOA_ID,
          nomePessoa: props.orcamentoGeral.CLIENTE_ORCAMENTO.NOME_PESSOA,
          rg: props.orcamentoGeral.CLIENTE_ORCAMENTO.RG,
          cpf: props.orcamentoGeral.CLIENTE_ORCAMENTO.CPF,
          cnpj: props.orcamentoGeral.CLIENTE_ORCAMENTO.CNPJ,
          listContato: props.orcamentoGeral.CLIENTE_ORCAMENTO.LIST_CONTATO.filter(
            (contato) => contato.CONTATO_PADRAO == true
          ),
        });

        const enderecoPadrao = props.orcamentoGeral.CLIENTE_ORCAMENTO.LIST_ENDERECO.filter(
          (endereco) => endereco.ENDERECO_PADRAO == true
        );

        if (enderecoPadrao[0]) {
          setDadosCadastroClienteEndereco({
            enderecoId: enderecoPadrao[0].ENDERECO_ID,
            logradouro: enderecoPadrao[0].LOGRADOURO,
            numero: enderecoPadrao[0].NUMERO_ENDERECO,
            bairro: enderecoPadrao[0].BAIRRO,
            cidade: enderecoPadrao[0].CIDADE,
            uf: enderecoPadrao[0].UF,
          });
        } else {
          setDadosCadastroClienteEndereco({
            enderecoId: "",
            logradouro: "",
            numero: "",
            bairro: "",
            cidade: "",
            uf: "",
          });
        }
      }
    } else {
      if (props.orcamentoIntumescente.ORCAMENTO_ID) {
        setDadosCadastro({
          orcamentoId: props.orcamentoIntumescente.ORCAMENTO_ID,
          nomeObra: props.orcamentoIntumescente.NOME_OBRA,
          a_c: props.orcamentoIntumescente.A_C,
          prazoEntrega: props.orcamentoIntumescente.PRAZO_ENTREGA,
          dataCriacaoOrcamento: formatatData(
            props.orcamentoIntumescente.DATA_CRIACAO_ORCAMENTO
          ),
          tipoObra: props.orcamentoIntumescente.TIPO_OBRA,
        });

        setDadosCadastroCliente({
          pessoaId: props.orcamentoIntumescente.CLIENTE_ORCAMENTO.PESSOA_ID,
          nomePessoa: props.orcamentoIntumescente.CLIENTE_ORCAMENTO.NOME_PESSOA,
          rg: props.orcamentoIntumescente.CLIENTE_ORCAMENTO.RG,
          cpf: props.orcamentoIntumescente.CLIENTE_ORCAMENTO.CPF,
          cnpj: props.orcamentoIntumescente.CLIENTE_ORCAMENTO.CNPJ,
          listContato: props.orcamentoIntumescente.CLIENTE_ORCAMENTO.LIST_CONTATO.filter(
            (contato) => contato.CONTATO_PADRAO == true
          ),
        });

        const enderecoPadrao = props.orcamentoIntumescente.CLIENTE_ORCAMENTO.LIST_ENDERECO.filter(
          (endereco) => endereco.ENDERECO_PADRAO == true
        );

        if (enderecoPadrao[0]) {
          setDadosCadastroClienteEndereco({
            enderecoId: enderecoPadrao[0].ENDERECO_ID,
            logradouro: enderecoPadrao[0].LOGRADOURO,
            numero: enderecoPadrao[0].NUMERO_ENDERECO,
            bairro: enderecoPadrao[0].BAIRRO,
            cidade: enderecoPadrao[0].CIDADE,
            uf: enderecoPadrao[0].UF,
          });
        } else {
          setDadosCadastroClienteEndereco({
            enderecoId: "",
            logradouro: "",
            numero: "",
            bairro: "",
            cidade: "",
            uf: "",
          });
        }
      }
    }
  }, [
    props.orcamentoGeral.ORCAMENTO_ID,
    props.orcamentoIntumescente.ORCAMENTO_ID,
    dadosCadastro.orcamentoId,
  ]);

  useEffect(() => {
    if (props.clienteOrcamento.PESSOA_ID) {
      setDadosCadastroCliente({
        pessoaId: props.clienteOrcamento.PESSOA_ID,
        nomePessoa: props.clienteOrcamento.NOME_PESSOA,
        rg: props.clienteOrcamento.RG,
        cpf: props.clienteOrcamento.CPF,
        cnpj: props.clienteOrcamento.CNPJ,
        listContato: props.clienteOrcamento.LIST_CONTATO.filter(
          (contato) => contato.CONTATO_PADRAO == true
        ),
      });

      const enderecoPadrao = props.clienteOrcamento.LIST_ENDERECO.filter(
        (endereco) => endereco.ENDERECO_PADRAO == true
      );

      if (enderecoPadrao[0]) {
        setDadosCadastroClienteEndereco({
          enderecoId: enderecoPadrao[0].ENDERECO_ID,
          logradouro: enderecoPadrao[0].LOGRADOURO,
          numero: enderecoPadrao[0].NUMERO_ENDERECO,
          bairro: enderecoPadrao[0].BAIRRO,
          cidade: enderecoPadrao[0].CIDADE,
          uf: enderecoPadrao[0].UF,
        });
      } else {
        setDadosCadastroClienteEndereco({
          enderecoId: "",
          logradouro: "",
          numero: "",
          bairro: "",
          cidade: "",
          uf: "",
        });
      }
    }
  }, [props.clienteOrcamento.PESSOA_ID]);

  useEffect(() => {
    if (dadosCadastroCliente.pessoaId) {
      setItemContatoDisplay(
        dadosCadastroCliente.listContato.map((contato) => {
          let contatoFormatado = "";
          if (contato.TIPO_CONTATO != "Email") {
            contatoFormatado = "(" + contato.DDD + ") " + contato.CONTATO;
          } else {
            contatoFormatado = contato.CONTATO;
          }

          return (
            <div
              className="container-item-contato-cliente-orcamento"
              key={contato.CONTATO_ID}
            >
              <div>Tipo: {contato.TIPO_CONTATO}</div>
              <div>{contatoFormatado}</div>
            </div>
          );
        })
      );
    }
  }, [dadosCadastroCliente.pessoaId]);

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
          delayToast: 6000,
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

  const formatatData = (data) => {
    const dateFormat =
      new Date(data).toLocaleDateString("en", { year: "numeric" }) +
      "-" +
      new Date(data).toLocaleDateString("en", { month: "2-digit" }) +
      "-" +
      new Date(data).toLocaleDateString("en", { day: "2-digit" });

    return dateFormat;
  };

  const montarObj = () => {
    return {
      ORCAMENTO_ID:
        dadosCadastro.orcamentoId == "" ? 0 : dadosCadastro.orcamentoId,
      NOME_OBRA: dadosCadastro.nomeObra,
      REFERENCIA: props.referencia,
      PRAZO_ENTREGA: dadosCadastro.prazoEntrega,
      DATA_CRIACAO_ORCAMENTO:
        dadosCadastro.dataCriacaoOrcamento || new Date().toJSON(),
      A_C: dadosCadastro.a_c,
      TIPO_OBRA: dadosCadastro.tipoObra,
      TOTAIS_ORCAMENTO: {},
      CLIENTE_ORCAMENTO: {
        PESSOA_ID: dadosCadastroCliente.pessoaId,
        NOME_CLIENTE: dadosCadastroCliente.nomePessoa,
        RG: "",
        CPF: "",
        CNPJ: "",
        TIPO_CADASTRO: "",
        TIPO_PESSOA: "",
        LIST_ENDERECO: [
          {
            PESSOA_ID: dadosCadastroCliente.pessoaId,
            ENDERECO_ID: dadosCadastroClienteEndereco.enderecoId,
            CEP: "",
            LOGRADOURO: "",
            NUMERO_ENDERECO: "",
            COMPLEMENTO: "",
            BAIRRO: dadosCadastroClienteEndereco.bairro,
            CIDADE: dadosCadastroClienteEndereco.cidade,
            ESTADO: "",
            UF: dadosCadastroClienteEndereco.uf,
            ENDERECO_PADRAO: true,
          },
        ],
        LIST_CONTATO: [],
      },
      LIST_ITENS_ORCAMENTO_GERAL: [],
      LIST_MAO_OBRA_ORCAMENTO: [],
      LIST_CUSTO_ORCAMENTO: [],
      LIST_EQUIPAMENTO_ORCAMENTO: [],
    };
  };

  const salvarOrcamento = () => {
    fetch(props.linkBackEnd + "/orcamento/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj()),
    })
      .then((response) => response.json())
      .then((data) => {
        const msg = "Cadastro efetuado com sucesso";

        exibirTost("sucesso", msg);

        if (data.TIPO_OBRA == "Geral") {
          props.selecionarOrcamentoGeral(data);
        } else {
        }
      })
      .catch(() => {
        const msg = "Erro ao efetuar cadastro";

        exibirTost("erro", msg);
      });
  };

  const deletarOrcamento = () => {
    let tipoRota = "";
    if (dadosCadastro.tipoObra == "Geral") {
      tipoRota = "/orcamento/";
    } else {
      tipoRota = "/orcamentoIntumescente/";
    }

    fetch(props.linkBackEnd + tipoRota + dadosCadastro.orcamentoId, {
      method: "DELETE",
    }).then((data) => {
      if (data.ok) {
        const msg = "Exclusão efetuada com sucesso";

        exibirTost("sucesso", msg);

        if ((dadosCadastro.tipoObra = "Geral")) {
          props.selecionarOrcamentoGeral({});
        } else {
        }
      } else {
        const msg = "Erro ao efetuar exlusão";

        exibirTost("erro", msg);
      }
    });
  };

  const editarOrcamento = () => {
    fetch(props.linkBackEnd + "/orcamento/" + dadosCadastro.orcamentoId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj()),
    }).then((data) => {
      if (data.ok) {
        const msg = "Cadastro atualizado com sucesso";

        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar atualização";

        exibirTost("erro", msg);
      }
    });
  };

  const buscarClientes = () => {
    if (showResultadoCliente) {
      return;
    }
    if (!stringBuscaCliente) {
      fetch(props.linkBackEnd + "/pessoas/", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setDataClientes(
            data.filter((cliente) => {
              return cliente.TIPO_CADASTRO == "Cliente";
            })
          );
          setShowResultadoCliente(true);
        });
    } else {
      if (stringBuscaCliente.match(/\d/)) {
        stringBuscaCliente = "buscar?pessoaId=" + stringBuscaCliente;
      } else {
        stringBuscaCliente = "buscar?nomePessoa=" + stringBuscaCliente;
      }

      fetch(props.linkBackEnd + "/pessoas/" + stringBuscaCliente, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setDataClientes(
            data.filter((cliente) => {
              return cliente.TIPO_CADASTRO == "Cliente";
            })
          );
          setShowResultadoCliente(true);
        });
    }
  };

  const listenerClick = () => {
    setShowResultadoCliente(false);
  };

  if (showResultadoCliente) {
    window.addEventListener("click", listenerClick);
  } else {
    window.removeEventListener("click", listenerClick);
  }

  const pressEnter = (event) => {
    if (event.key == "Enter") {
      buscarClientes();
    }
  };

  const handleInputChange = (event) => {
    setDadosCadastro({
      ...dadosCadastro,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div id="containerBasicRegOrcamento">
      <div className="form">
        <div id="cadastro-orcamento">
          <div id="containerBasicRegCusto">
            <div className="container-form">
              <div className="form-group">
                <div className="form-row">
                  <label className="col-form-label">Código: </label>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    name="orcamentoId"
                    id="input-orcamento-id"
                    value={dadosCadastro.orcamentoId}
                    readOnly
                  />
                  {dadosCadastro.orcamentoId && (
                    <>
                      <div className="close-select-custo">
                        <a
                          href="#"
                          onClick={() =>
                            props.selecionarOrcamentoGeral(
                              {},
                              props.selecionarOrcamentoIntumescente({})
                            )
                          }
                        >
                          <span className="fa fa-close close-orcamento"></span>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-xl-8 col-12">
                    <label>Nome da obra</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nomeObra"
                      value={dadosCadastro.nomeObra}
                      onChange={(event) => handleInputChange(event)}
                    />
                  </div>
                  <div className="col-xl col-12">
                    <label>Contato da obra</label>
                    <input
                      type="text"
                      className="form-control"
                      name="a_c"
                      value={dadosCadastro.a_c}
                      onChange={(event) => handleInputChange(event)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-xl col-12">
                    <label>Prazo da Obra</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prazoEntrega"
                      value={dadosCadastro.prazoEntrega}
                      onChange={(event) => handleInputChange(event)}
                    />
                  </div>
                  <div className="col-xl col-12">
                    <label>Data de criação</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dadosCadastro.dataCriacaoOrcamento}
                      readOnly
                    />
                  </div>
                  <div className="col-xl col-12">
                    <label>Tipo da obra</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tipoObra"
                      value={dadosCadastro.tipoObra}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="informacoes-cliente-orcamento">
          <fieldset>
            <legend>Dados do cliente</legend>
            <div id="container-cliente">
              <div id="busca-cliente">
                <div className="form-group">
                  <div className="row">
                    <div className="col-xl">
                      <input
                        className="form-control"
                        placeholder="Buscar Cliente"
                        name="buscarCliente"
                        onChange={(event) =>
                          setStringBuscaCliente(event.target.value)
                        }
                        onKeyDown={(event) => pressEnter(event)}
                      />
                    </div>
                    <div className="col-xl-3 div-btn-buscar-cliente">
                      <button
                        type="button"
                        className="btn"
                        id="btn-buscar-cliente"
                        onClick={() => buscarClientes()}
                      >
                        Buscar cliente
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-xl">
                      <ResultSearchClient
                        show={showResultadoCliente}
                        resultados={dataClientes}
                      />
                    </div>
                    <div className="col-xl-3 div-btn-buscar-cliente"></div>
                  </div>
                </div>
              </div>
              <div id="principal-cliente">
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-xl-3 div-codigo-Cliente">
                      <label className="col-form-label">
                        Código do cliente
                      </label>
                      <input
                        className="form-control"
                        name="pessoaId"
                        value={dadosCadastroCliente.pessoaId}
                        readOnly
                      />
                    </div>
                    <div className="col-xl-9">
                      <label className="col-form-label">Nome do cliente</label>
                      <input
                        className="form-control"
                        name="nomePessoa"
                        value={dadosCadastroCliente.nomePessoa}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-xl col-12">
                      <label>RG</label>
                      <input
                        type="text"
                        className="form-control"
                        name="rg"
                        value={dadosCadastroCliente.rg}
                        readOnly
                      />
                    </div>
                    <div className="col-xl col-12">
                      <label>CPF</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cpf"
                        value={dadosCadastroCliente.cpf}
                        readOnly
                      />
                    </div>
                    <div className="col-xl col-12">
                      <label>CNPJ</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cnpj"
                        value={dadosCadastroCliente.cnpj}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-xl-6 col-12">
                      <fieldset className="sub-fieldset">
                        <legend>Informções do contato</legend>
                        <div id="contato-cliente-orcamento">
                          {itemContatoDisplay}
                        </div>
                      </fieldset>
                    </div>
                    <div className="col-xl-6 col-12">
                      <fieldset className="sub-fieldset">
                        <legend>Informções do endereço</legend>
                        <div className="form-group">
                          <div className="form-row">
                            <div className="col">
                              <label>Logradouro</label>
                              <input
                                type="text"
                                className="form-control"
                                name="logradouro"
                                value={dadosCadastroClienteEndereco.logradouro}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="form-row">
                            <div className="col-xl-4 col-4">
                              <label>Número</label>
                              <input
                                type="text"
                                className="form-control"
                                name="numeroEndereco"
                                value={dadosCadastroClienteEndereco.numero}
                                readOnly
                              />
                            </div>
                            <div className="col-xl-8 col-8 ">
                              <label>Bairro</label>
                              <input
                                type="text"
                                className="form-control"
                                name="bairro"
                                value={dadosCadastroClienteEndereco.bairro}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="form-row">
                            <div className="col-xl-10 col-8">
                              <label>Cidade</label>
                              <input
                                type="text"
                                className="form-control"
                                name="cidade"
                                value={dadosCadastroClienteEndereco.cidade}
                                readOnly
                              />
                            </div>
                            <div className="col-xl-2 col-4">
                              <label>UF</label>
                              <input
                                type="text"
                                className="form-control"
                                name="uf"
                                value={dadosCadastroClienteEndereco.uf}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div id="acoes-cadastro-orcamento">
          {!dadosCadastro.orcamentoId && (
            <button
              type="button"
              className="btn btn-primary btn-100-px btn-float-right"
              onClick={() => salvarOrcamento()}
            >
              Salvar
            </button>
          )}
          {dadosCadastro.orcamentoId && (
            <>
              <button
                type="button"
                className="btn btn-success btn-100-px btn-float-right"
                onClick={() => editarOrcamento()}
              >
                Atualizar
              </button>
              <button
                type="button"
                className="btn btn-orcamentaria btn-100-px btn-float-right"
                onClick={() => setShowModalConfirm(true)}
              >
                Excluir
              </button>
            </>
          )}
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
          acaoConfirmada={() => deletarOrcamento()}
          tituloModalConfirm={
            "Confirma exclusão? O dados não poderão ser recuperados"
          }
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  clienteOrcamento: state.orcamento.clienteOrcamento,
  orcamentoGeral: state.orcamento.orcamentoGeral,
  orcamentoIntumescente: state.orcamento.orcamentoIntumescente,
});

const mapDispatchToProps = (dispatch) => ({
  selecionarOrcamentoGeral: (orcamentoGeral) =>
    dispatch(orcamentoActions.selecionarOrcamentoGeral(orcamentoGeral)),
  selecionarOrcamentoIntumescente: (orcamentoIntumescente) =>
    dispatch(
      orcamentoActions.selecionarOrcamentoIntumescente(orcamentoIntumescente)
    ),
  selecionarClienteOrcamento: (clienteOrcamento) =>
    dispatch(orcamentoActions.selecionarClienteOrcamento(clienteOrcamento)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicRegOrcamento);
