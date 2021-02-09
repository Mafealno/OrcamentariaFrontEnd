/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./BasicRegOrcamento.css";
import ResultSearchClient from "./ResultSearchClient/ResultSearchClient";
import * as orcamentoActions from "../../../store/actions/orcamento";
import ModalConfirm from "../../ModalConfirm/ModalConfirm";
import ToastControl from "../../ToastControl/ToastControl";
import * as validacaoDadosUtils from "../../../utils/validacaoDados";
import { connect } from "react-redux";

function BasicRegOrcamento(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

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
    orcamentoId: { ...dadosCampo, valorPadrao: 0 },
    nomeObra: { ...dadosCampo, requerido: true },
    a_c: { ...dadosCampo, requerido: true },
    prazoEntrega: { ...dadosCampo, requerido: true },
    diasTrabalhado: {
      ...dadosCampo,
      requerido: true,
      formato: /^[0-9]+$/,
    },
    dataCriacaoOrcamento: { ...dadosCampo, valorPadrao: new Date().toJSON() },
    tipoObra: {
      ...dadosCampo,
      valor: props.tipoObra,
      valorPadrao: props.tipoObra,
    },
  });

  let [dadosCadastroCliente, setDadosCadastroCliente] = useState({
    pessoaId: { ...dadosCampo, requerido: true },
    nomePessoa: { ...dadosCampo },
    rg: { ...dadosCampo },
    cpf: { ...dadosCampo },
    cnpj: { ...dadosCampo },
    listContato: { ...dadosCampo, valorPadrao: [] },
  });

  let [
    dadosCadastroClienteEndereco,
    setDadosCadastroClienteEndereco,
  ] = useState({
    enderecoId: { ...dadosCampo },
    logradouro: { ...dadosCampo },
    numero: { ...dadosCampo },
    bairro: { ...dadosCampo },
    cidade: { ...dadosCampo },
    uf: { ...dadosCampo },
  });

  useEffect(() => {
    if (dadosCadastro.orcamentoId.valor) {
      props.mostrarAbas(true);
    } else {
      props.mostrarAbas(false);
      props.selecionarClienteOrcamento({});
    }

    limparCampos();

    setItemContatoDisplay([]);

    if (props.orcamentoSelecionado.ORCAMENTO_ID) {
      setDadosCadastro({
        orcamentoId: {
          ...dadosCadastro.orcamentoId,
          valor: props.orcamentoSelecionado.ORCAMENTO_ID,
        },
        nomeObra: {
          ...dadosCadastro.nomeObra,
          valor: props.orcamentoSelecionado.NOME_OBRA,
        },
        a_c: { ...dadosCadastro.a_c, valor: props.orcamentoSelecionado.A_C },
        prazoEntrega: {
          ...dadosCadastro.prazoEntrega,
          valor: props.orcamentoSelecionado.PRAZO_ENTREGA,
        },
        diasTrabalhado: {
          ...dadosCadastro.diasTrabalhado,
          valor: props.orcamentoSelecionado.DIAS_TRABALHADO,
        },
        dataCriacaoOrcamento: {
          ...dadosCadastro.dataCriacaoOrcamento,
          valor: formatatData(
            props.orcamentoSelecionado.DATA_CRIACAO_ORCAMENTO
          ),
        },
        tipoObra: {
          ...dadosCadastro.tipoObra,
          valor: props.orcamentoSelecionado.TIPO_OBRA,
        },
      });

      setDadosCadastroCliente({
        pessoaId: {
          ...dadosCadastroCliente.pessoaId,
          valor: props.orcamentoSelecionado.CLIENTE_ORCAMENTO.PESSOA_ID,
        },
        nomePessoa: {
          ...dadosCadastroCliente.nomePessoa,
          valor: props.orcamentoSelecionado.CLIENTE_ORCAMENTO.NOME_PESSOA,
        },
        rg: {
          ...dadosCadastroCliente.rg,
          valor: props.orcamentoSelecionado.CLIENTE_ORCAMENTO.RG,
        },
        cpf: {
          ...dadosCadastroCliente.cpf,
          valor: props.orcamentoSelecionado.CLIENTE_ORCAMENTO.CPF,
        },
        cnpj: {
          ...dadosCadastroCliente.cnpj,
          valor: props.orcamentoSelecionado.CLIENTE_ORCAMENTO.CNPJ,
        },
        listContato: {
          ...dadosCadastroCliente.listContato,
          valor: props.orcamentoSelecionado.CLIENTE_ORCAMENTO.LIST_CONTATO.filter(
            (contato) => contato.CONTATO_PADRAO == true
          ),
        },
      });

      const enderecoPadrao = props.orcamentoSelecionado.CLIENTE_ORCAMENTO.LIST_ENDERECO.filter(
        (endereco) => endereco.ENDERECO_PADRAO == true
      );

      if (enderecoPadrao[0]) {
        setDadosCadastroClienteEndereco({
          enderecoId: {
            ...dadosCadastroClienteEndereco.enderecoId,
            valor: enderecoPadrao[0].ENDERECO_ID,
          },
          logradouro: {
            ...dadosCadastroClienteEndereco.logradouro,
            valor: enderecoPadrao[0].LOGRADOURO,
          },
          numero: {
            ...dadosCadastroClienteEndereco.numero,
            valor: enderecoPadrao[0].NUMERO_ENDERECO,
          },
          bairro: {
            ...dadosCadastroClienteEndereco.bairro,
            valor: enderecoPadrao[0].BAIRRO,
          },
          cidade: {
            ...dadosCadastroClienteEndereco.cidade,
            valor: enderecoPadrao[0].CIDADE,
          },
          uf: {
            ...dadosCadastroClienteEndereco.uf,
            valor: enderecoPadrao[0].UF,
          },
        });
      } else {
        limparCamposEndereco();
      }
    }
  }, [
    props.orcamentoSelecionado.ORCAMENTO_ID,
    dadosCadastro.orcamentoId.valor,
  ]);

  useEffect(() => {
    if (props.clienteOrcamento.PESSOA_ID) {
      setDadosCadastroCliente({
        pessoaId: {
          ...dadosCadastroCliente.pessoaId,
          valor: props.clienteOrcamento.PESSOA_ID,
        },
        nomePessoa: {
          ...dadosCadastroCliente.nomePessoa,
          valor: props.clienteOrcamento.NOME_PESSOA,
        },
        rg: {
          ...dadosCadastroCliente.rg,
          valor: props.clienteOrcamento.RG,
        },
        cpf: {
          ...dadosCadastroCliente.cpf,
          valor: props.clienteOrcamento.CPF,
        },
        cnpj: {
          ...dadosCadastroCliente.cnpj,
          valor: props.clienteOrcamento.CNPJ,
        },
        listContato: {
          ...dadosCadastroCliente.listContato,
          valor: props.clienteOrcamento.LIST_CONTATO.filter(
            (contato) => contato.CONTATO_PADRAO == true
          ),
        },
      });

      const enderecoPadrao = props.clienteOrcamento.LIST_ENDERECO.filter(
        (endereco) => endereco.ENDERECO_PADRAO == true
      );

      if (enderecoPadrao[0]) {
        setDadosCadastroClienteEndereco({
          enderecoId: {
            ...dadosCadastroClienteEndereco.enderecoId,
            valor: enderecoPadrao[0].ENDERECO_ID,
          },
          logradouro: {
            ...dadosCadastroClienteEndereco.logradouro,
            valor: enderecoPadrao[0].LOGRADOURO,
          },
          numero: {
            ...dadosCadastroClienteEndereco.numero,
            valor: enderecoPadrao[0].NUMERO_ENDERECO,
          },
          bairro: {
            ...dadosCadastroClienteEndereco.bairro,
            valor: enderecoPadrao[0].BAIRRO,
          },
          cidade: {
            ...dadosCadastroClienteEndereco.cidade,
            valor: enderecoPadrao[0].CIDADE,
          },
          uf: {
            ...dadosCadastroClienteEndereco.uf,
            valor: enderecoPadrao[0].UF,
          },
        });
      } else {
        limparCamposEndereco();
      }
    }
  }, [props.clienteOrcamento.PESSOA_ID]);

  useEffect(() => {
    if (dadosCadastroCliente.pessoaId.valor) {
      setItemContatoDisplay(
        dadosCadastroCliente.listContato.valor.map((contato) => {
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
  }, [dadosCadastroCliente.pessoaId.valor]);

  const limparCamposEndereco = () => {
    setDadosCadastroClienteEndereco({
      enderecoId: {
        ...dadosCadastroClienteEndereco.enderecoId,
        valor: dadosCadastroClienteEndereco.enderecoId.valorPadrao,
      },
      logradouro: {
        ...dadosCadastroClienteEndereco.logradouro,
        valor: dadosCadastroClienteEndereco.logradouro.valorPadrao,
      },
      numero: {
        ...dadosCadastroClienteEndereco.numero,
        valor: dadosCadastroClienteEndereco.numero.valorPadrao,
      },
      bairro: {
        ...dadosCadastroClienteEndereco.bairro,
        valor: dadosCadastroClienteEndereco.bairro.valorPadrao,
      },
      cidade: {
        ...dadosCadastroClienteEndereco.cidade,
        valor: dadosCadastroClienteEndereco.cidade.valorPadrao,
      },
      uf: {
        ...dadosCadastroClienteEndereco.uf,
        valor: dadosCadastroClienteEndereco.uf.valorPadrao,
      },
    });
  };

  const limparCampos = () => {
    setDadosCadastro({
      orcamentoId: {
        ...dadosCadastro.orcamentoId,
        valor: dadosCadastro.orcamentoId.valorPadrao,
      },
      nomeObra: {
        ...dadosCadastro.nomeObra,
        valor: dadosCadastro.nomeObra.valorPadrao,
      },
      a_c: { ...dadosCadastro.a_c, valor: dadosCadastro.a_c.valorPadrao },
      prazoEntrega: {
        ...dadosCadastro.prazoEntrega,
        valor: dadosCadastro.prazoEntrega.valorPadrao,
      },
      diasTrabalhado: {
        ...dadosCadastro.diasTrabalhado,
        valor: dadosCadastro.diasTrabalhado.valorPadrao,
      },
      dataCriacaoOrcamento: {
        ...dadosCadastro.dataCriacaoOrcamento,
        valor: dadosCadastro.dataCriacaoOrcamento.valorPadrao,
      },
      tipoObra: {
        ...dadosCadastro.tipoObra,
        valor: dadosCadastro.tipoObra.valorPadrao,
      },
    });

    setDadosCadastroCliente({
      pessoaId: {
        ...dadosCadastroCliente.pessoaId,
        valor: dadosCadastroCliente.pessoaId.valorPadrao,
      },
      nomePessoa: {
        ...dadosCadastroCliente.nomePessoa,
        valor: dadosCadastroCliente.nomePessoa.valorPadrao,
      },
      rg: {
        ...dadosCadastroCliente.rg,
        valor: dadosCadastroCliente.rg.valorPadrao,
      },
      cpf: {
        ...dadosCadastroCliente.cpf,
        valor: dadosCadastroCliente.cpf.valorPadrao,
      },
      cnpj: {
        ...dadosCadastroCliente.cnpj,
        valor: dadosCadastroCliente.cnpj.valorPadrao,
      },
      listContato: {
        ...dadosCadastroCliente.listContato,
        valor: dadosCadastroCliente.listContato.valorPadrao,
      },
    });

    setDadosCadastroClienteEndereco({
      enderecoId: {
        ...dadosCadastroClienteEndereco.enderecoId,
        valor: dadosCadastroClienteEndereco.enderecoId.valorPadrao,
      },
      logradouro: {
        ...dadosCadastroClienteEndereco.logradouro,
        valor: dadosCadastroClienteEndereco.logradouro.valorPadrao,
      },
      numero: {
        ...dadosCadastroClienteEndereco.numero,
        valor: dadosCadastroClienteEndereco.numero.valorPadrao,
      },
      bairro: {
        ...dadosCadastroClienteEndereco.bairro,
        valor: dadosCadastroClienteEndereco.bairro.valorPadrao,
      },
      cidade: {
        ...dadosCadastroClienteEndereco.cidade,
        valor: dadosCadastroClienteEndereco.cidade.valorPadrao,
      },
      uf: {
        ...dadosCadastroClienteEndereco.uf,
        valor: dadosCadastroClienteEndereco.uf.valorPadrao,
      },
    });
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

  const montarObj = (obj) => {
    return {
      ORCAMENTO_ID: obj.orcamentoId.valor,
      NOME_OBRA: obj.nomeObra.valor,
      REFERENCIA: props.referencia.valor,
      PRAZO_ENTREGA: obj.prazoEntrega.valor,
      DIAS_TRABALHADO: parseInt(obj.diasTrabalhado.valor),
      DATA_CRIACAO_ORCAMENTO: obj.dataCriacaoOrcamento.valor,
      A_C: obj.a_c.valor,
      TIPO_OBRA: obj.tipoObra.valor,
      TOTAIS_ORCAMENTO: {},
      CLIENTE_ORCAMENTO: {
        PESSOA_ID: obj.pessoa.pessoaId.valor,
        NOME_CLIENTE: obj.pessoa.nomePessoa.valor,
        RG: "",
        CPF: "",
        CNPJ: "",
        TIPO_CADASTRO: "",
        TIPO_PESSOA: "",
        LIST_ENDERECO: [
          {
            PESSOA_ID: obj.pessoa.pessoaId.valor,
            ENDERECO_ID: obj.pessoa.endereco.enderecoId.valor,
            CEP: "",
            LOGRADOURO: "",
            NUMERO_ENDERECO: "",
            COMPLEMENTO: "",
            BAIRRO: obj.pessoa.endereco.bairro.valor,
            CIDADE: obj.pessoa.endereco.cidade.valor,
            ESTADO: "",
            UF: obj.pessoa.endereco.uf.valor,
            ENDERECO_PADRAO: false,
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

  const salvarOrcamento = () => {
    const dadosOrcamento = validacaoDadosUtils.validarDados(dadosCadastro);
    const dadosCliente = validacaoDadosUtils.validarDados(dadosCadastroCliente);
    const dadosEnderecoCliente = validacaoDadosUtils.validarDados(
      dadosCadastroClienteEndereco
    );

    let houveErro = false;

    houveErro = exibirCamposErro(dadosOrcamento, houveErro);
    houveErro = exibirCamposErro(dadosCliente, houveErro);
    houveErro = exibirCamposErro(dadosEnderecoCliente, houveErro);

    if (houveErro) {
      return;
    }

    if (
      dadosOrcamento.diasTrabalhado.valor > dadosOrcamento.prazoEntrega.valor
    ) {
      const msg =
        "O dias de trabalho não podem ser maiores que o prazo da obra";
      exibirTost("erro", msg);
      return;
    }

    dadosCliente.endereco = dadosEnderecoCliente;
    dadosOrcamento.pessoa = dadosCliente;

    fetch(props.linkBackEnd + "/orcamento/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj(dadosOrcamento)),
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

    fetch(props.linkBackEnd + tipoRota + dadosCadastro.orcamentoId.valor, {
      method: "DELETE",
    }).then((data) => {
      if (data.ok) {
        const msg = "Exclusão efetuada com sucesso";

        exibirTost("sucesso", msg);

        if ((dadosCadastro.tipoObra.valor = "Geral")) {
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
    const dadosOrcamento = validacaoDadosUtils.validarDados(dadosCadastro);
    const dadosCliente = validacaoDadosUtils.validarDados(dadosCadastroCliente);
    const dadosEnderecoCliente = validacaoDadosUtils.validarDados(
      dadosCadastroClienteEndereco
    );

    let houveErro = false;

    houveErro = exibirCamposErro(dadosOrcamento, houveErro);
    houveErro = exibirCamposErro(dadosCliente, houveErro);
    houveErro = exibirCamposErro(dadosEnderecoCliente, houveErro);

    if (houveErro) {
      return;
    }

    if (
      dadosOrcamento.diasTrabalhado.valor > dadosOrcamento.prazoEntrega.valor
    ) {
      const msg =
        "O dias de trabalho não podem ser maiores que o prazo da obra";
      exibirTost("erro", msg);
      return;
    }

    dadosCliente.endereco = dadosEnderecoCliente;
    dadosOrcamento.pessoa = dadosCliente;

    fetch(props.linkBackEnd + "/orcamento/" + dadosCadastro.orcamentoId.valor, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj(dadosOrcamento)),
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
      [event.target.name]: {
        ...dadosCadastro[event.target.name],
        valor: event.target.value,
      },
    });
  };

  return (
    <div id="containerBasicRegOrcamento">
      <div className="form-orcamento">
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
                    id="campo-orcamentoId"
                    value={dadosCadastro.orcamentoId.valor || ""}
                    readOnly
                  />
                  <span
                    className="invalid-feedback msg-erro-orcamento"
                    id="erro-orcamentoId"
                  ></span>
                  {dadosCadastro.orcamentoId.valor > 0 && (
                    <>
                      <div className="close-select-custo">
                        <a
                          href="#"
                          onClick={() => props.selecionarOrcamento({})}
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
                      id="campo-nomeObra"
                      value={dadosCadastro.nomeObra.valor}
                      onChange={(event) => handleInputChange(event)}
                      onFocus={(event) => removerErro(event.target.id)}
                    />
                    <span
                      className="invalid-feedback msg-erro-orcamento"
                      id="erro-nomeObra"
                    ></span>
                  </div>
                  <div className="col-xl col-12">
                    <label>Contato da obra</label>
                    <input
                      type="text"
                      className="form-control"
                      name="a_c"
                      id="campo-a_c"
                      value={dadosCadastro.a_c.valor}
                      onChange={(event) => handleInputChange(event)}
                      onFocus={(event) => removerErro(event.target.id)}
                    />
                    <span
                      className="invalid-feedback msg-erro-orcamento"
                      id="erro-a_c"
                    ></span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-xl col-6">
                    <label>Prazo da Obra</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prazoEntrega"
                      id="campo-prazoEntrega"
                      value={dadosCadastro.prazoEntrega.valor}
                      onChange={(event) => handleInputChange(event)}
                      onFocus={(event) => removerErro(event.target.id)}
                    />
                    <span
                      className="invalid-feedback msg-erro-orcamento"
                      id="erro-prazoEntrega"
                    ></span>
                  </div>
                  <div className="col-xl col-6">
                    <label>Dias de trabalho</label>
                    <input
                      type="text"
                      className="form-control"
                      name="diasTrabalhado"
                      id="campo-diasTrabalhado"
                      value={dadosCadastro.diasTrabalhado.valor}
                      onChange={(event) => handleInputChange(event)}
                      onFocus={(event) => removerErro(event.target.id)}
                    />
                    <span
                      className="invalid-feedback msg-erro-orcamento"
                      id="erro-diasTrabalhado"
                    ></span>
                  </div>
                  <div className="col-xl col-6 position-initial">
                    <label>Data de criação</label>
                    <input
                      type="date"
                      className="form-control"
                      id="campo-dataCriacaoOrcamento"
                      value={dadosCadastro.dataCriacaoOrcamento.valor}
                      readOnly
                    />
                    <span
                      className="invalid-feedback msg-erro-orcamento"
                      id="erro-dataCriacaoOrcamento"
                    ></span>
                  </div>
                  <div className="col-xl col-6 position-initial">
                    <label>Tipo da obra</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tipoObra"
                      id="campo-tipoObra"
                      value={dadosCadastro.tipoObra.valor}
                      readOnly
                    />
                    <span
                      className="invalid-feedback msg-erro-orcamento"
                      id="erro-tipoObra"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="informacoes-cliente-orcamento">
          <fieldset id="campo-pessoaId">
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
                        onFocus={() => removerErro("campo-pessoaId")}
                        onKeyDown={(event) => pressEnter(event)}
                      />
                    </div>
                    <div className="col-xl-3 div-btn-buscar-cliente">
                      <button
                        type="button"
                        className="btn"
                        id="btn-buscar-cliente"
                        onClick={() => buscarClientes()}
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
                        value={dadosCadastroCliente.pessoaId.valor}
                        readOnly
                      />
                    </div>
                    <div className="col-xl-9">
                      <label className="col-form-label">Nome do cliente</label>
                      <input
                        className="form-control"
                        name="nomePessoa"
                        value={dadosCadastroCliente.nomePessoa.valor}
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
                        value={dadosCadastroCliente.rg.valor}
                        readOnly
                      />
                    </div>
                    <div className="col-xl col-12">
                      <label>CPF</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cpf"
                        value={dadosCadastroCliente.cpf.valor}
                        readOnly
                      />
                    </div>
                    <div className="col-xl col-12">
                      <label>CNPJ</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cnpj"
                        value={dadosCadastroCliente.cnpj.valor}
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
                                value={
                                  dadosCadastroClienteEndereco.logradouro.valor
                                }
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
                                value={
                                  dadosCadastroClienteEndereco.numero.valor
                                }
                                readOnly
                              />
                            </div>
                            <div className="col-xl-8 col-8 ">
                              <label>Bairro</label>
                              <input
                                type="text"
                                className="form-control"
                                name="bairro"
                                value={
                                  dadosCadastroClienteEndereco.bairro.valor
                                }
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
                                value={
                                  dadosCadastroClienteEndereco.cidade.valor
                                }
                                readOnly
                              />
                            </div>
                            <div className="col-xl-2 col-4">
                              <label>UF</label>
                              <input
                                type="text"
                                className="form-control"
                                name="uf"
                                value={dadosCadastroClienteEndereco.uf.valor}
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
          <span
            className="invalid-feedback msg-erro-orcamento"
            id="erro-pessoaId"
          ></span>
        </div>
        <div id="acoes-cadastro-orcamento">
          {!dadosCadastro.orcamentoId.valor && (
            <button
              type="button"
              className="btn btn-primary btn-100-px btn-float-right"
              onClick={() => salvarOrcamento()}
            >
              Salvar
            </button>
          )}
          {dadosCadastro.orcamentoId.valor > 0 && (
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
  orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
});

const mapDispatchToProps = (dispatch) => ({
  selecionarOrcamento: (orcamento) =>
    dispatch(orcamentoActions.selecionarOrcamento(orcamento)),
  selecionarClienteOrcamento: (clienteOrcamento) =>
    dispatch(orcamentoActions.selecionarClienteOrcamento(clienteOrcamento)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicRegOrcamento);
