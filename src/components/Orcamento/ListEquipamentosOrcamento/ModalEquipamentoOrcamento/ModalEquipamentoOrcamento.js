/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "./ModalEquipamentoOrcamento.css";
import ModalControl from "../../../ModalControl/ModalControl";
import ResultSearchEquipamento from "./ResultSearchEquipamento/ResultSearchEquipamento";
import ModalConfirm from "../../../ModalConfirm/ModalConfirm";
import * as validacaoDadosUtils from "../../../../utils/validacaoDados";
import { connect } from "react-redux";

export function ModalEquipamentoOrcamento(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [stringBuscaEquipamento, setStringBuscaEquipamento] = useState("");
  let [showResultadoEquipamento, setShowResultadoEquipamento] = useState(false);
  let [dataEquipamento, setDataEquipamento] = useState([]);
  let [showModalConfirm, setShowModalConfirm] = useState(false);
  let [dadosCadastro, setDadosCadastro] = useState({
    equipamentoOrcamentoId: { ...dadosCampo, valorPadrao: 0 },
    modalEquipamentoId: { ...dadosCampo, requerido: true },
    nomeEquipamento: { ...dadosCampo },
    descricaoEquipamento: { ...dadosCampo },
    pessoaId: { ...dadosCampo },
    valorUnitario: {
      ...dadosCampo,
      requerido: true,
      formato: /^\d{1,7}([,.])?\d{0,2}$/,
      valorPadrao: 1,
    },
    quantidade: {
      ...dadosCampo,
      requerido: true,
      formato: /^\d{1,7}$/,
      valorPadrao: 1,
    },
  });

  useEffect(() => {
    if (props.show) {
      if (props.equipamentoOrcamento) {
        setDadosCadastro({
          equipamentoOrcamentoId: {
            ...dadosCadastro.equipamentoOrcamentoId,
            valor: props.equipamentoOrcamento.EQUIPAMENTO_ORCAMENTO_ID,
          },
          modalEquipamentoId: {
            ...dadosCadastro.modalEquipamentoId,
            valor: props.equipamentoOrcamento.EQUIPAMENTO.EQUIPAMENTO_ID,
          },
          nomeEquipamento: {
            ...dadosCadastro.nomeEquipamento,
            valor: props.equipamentoOrcamento.EQUIPAMENTO.NOME_EQUIPAMENTO,
          },
          descricaoEquipamento: {
            ...dadosCadastro.descricaoEquipamento,
            valor: props.equipamentoOrcamento.EQUIPAMENTO.DESCRICAO,
          },
          pessoaId: {
            ...dadosCadastro.pessoaId,
            valor: props.equipamentoOrcamento.EQUIPAMENTO.FABRICANTE.PESSOA_ID,
          },
          valorUnitario: {
            ...dadosCadastro.valorUnitario,
            valor: props.equipamentoOrcamento.VALOR_UNITARIO_EQUIPAMENTO,
          },
          quantidade: {
            ...dadosCadastro.quantidade,
            valor: props.equipamentoOrcamento.QTDE_EQUIPAMENTO,
          },
        });
      }
    } else {
      limparCampos();
    }
  }, [props.show]);

  const limparCampos = () => {
    setDadosCadastro({
      equipamentoOrcamentoId: {
        ...dadosCadastro.equipamentoOrcamentoId,
        valor: dadosCadastro.equipamentoOrcamentoId.valorPadrao,
      },
      modalEquipamentoId: {
        ...dadosCadastro.modalEquipamentoId,
        valor: dadosCadastro.modalEquipamentoId.valorPadrao,
      },
      nomeEquipamento: {
        ...dadosCadastro.nomeEquipamento,
        valor: dadosCadastro.nomeEquipamento.valorPadrao,
      },
      descricaoEquipamento: {
        ...dadosCadastro.descricaoEquipamento,
        valor: dadosCadastro.descricaoEquipamento.valorPadrao,
      },
      pessoaId: {
        ...dadosCadastro.pessoaId,
        valor: dadosCadastro.pessoaId.valorPadrao,
      },
      valorUnitario: {
        ...dadosCadastro.valorUnitario,
        valor: dadosCadastro.valorUnitario.valorPadrao,
      },
      quantidade: {
        ...dadosCadastro.quantidade,
        valor: dadosCadastro.quantidade.valorPadrao,
      },
    });
  };

  const buscarEquipamento = () => {
    let rota = "/equipamento/";
    if (stringBuscaEquipamento) {
        rota = rota + "buscar?nomeEquipamento=" + stringBuscaEquipamento;
    }

    fetch(props.linkBackEnd + rota, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setDataEquipamento(data);
        setShowResultadoEquipamento(true);
      });
  };

  const selecionarEquipamentoOrcamento = (equipamento) => {
    setDadosCadastro({
      ...dadosCadastro,
      modalEquipamentoId: {
        ...dadosCadastro.modalEquipamentoId,
        valor: equipamento.EQUIPAMENTO_ID,
      },
      nomeEquipamento: {
        ...dadosCadastro.nomeEquipamento,
        valor: equipamento.NOME_EQUIPAMENTO,
      },
      descricaoEquipamento: {
        ...dadosCadastro.descricaoEquipamento,
        valor: equipamento.DESCRICAO,
      },
      pessoaId: {
        ...dadosCadastro.pessoaId,
        valor: equipamento.FABRICANTE.PESSOA_ID,
      },
    });
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

  const montarObj = (obj) => {
    return {
      EQUIPAMENTO_ORCAMENTO_ID: obj.equipamentoOrcamentoId.valor,
      ORCAMENTO_ID: props.orcamentoSelecionado.ORCAMENTO_ID,
      VALOR_UNITARIO_EQUIPAMENTO: parseFloat(obj.valorUnitario.valor),
      QTDE_EQUIPAMENTO: parseInt(obj.quantidade.valor),
      EQUIPAMENTO: {
        EQUIPAMENTO_ID: obj.modalEquipamentoId.valor,
        NOME_EQUIPAMENTO: obj.nomeEquipamento.valor,
        DESCRICAO: obj.descricaoEquipamento.valor,
        FABRICANTE: {
          PESSOA_ID: obj.pessoaId.valor,
          NOME_PESSOA: "",
          RG: "",
          CPF: "",
          CNPJ: "",
          TIPO_CADASTRO: "",
          TIPO_PESSOA: "",
          LIST_ENDERECO: [],
          LIST_CONTATO: [],
        },
      },
    };
  };

  const fazerAposCadastrar = (objCadastrado) => {
    setDadosCadastro({
      ...dadosCadastro,
      equipamentoOrcamentoId: {
        ...dadosCadastro.equipamentoOrcamentoId,
        valor: objCadastrado.EQUIPAMENTO_ORCAMENTO_ID,
      },
    });
  };

  const salvarCadastro = () => {
    const dadosEquipamento = validacaoDadosUtils.validarDados(dadosCadastro);

    let houveErro = false;

    houveErro = exibirCamposErro(dadosCadastro);

    if (houveErro) {
      return;
    }

    props.salvarEquipamentoOrcamento(
      montarObj(dadosEquipamento),
      fazerAposCadastrar
    );
  };

  const editarCadastro = () => {
    const dadosEquipamento = validacaoDadosUtils.validarDados(dadosCadastro);

    let houveErro = false;

    houveErro = exibirCamposErro(dadosCadastro);

    if (houveErro) {
      return;
    }

    props.atualizarEquipamentoOrcamento(montarObj(dadosEquipamento));
  };

  const listenerClick = () => {
    setShowResultadoEquipamento(false);
  };

  if (showResultadoEquipamento) {
    window.addEventListener("click", listenerClick);
  } else {
    window.removeEventListener("click", listenerClick);
  }

  const pressEnter = (event) => {
    if (event.key == "Enter") {
      buscarEquipamento();
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
    <>
      <ModalControl
        {...props}
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal modal-body-item-orcamento-geral"
        estiloModalFooter="backgroundModal"
        tituloModal="Informações do equipamento"
        conteudoBody={
          <>
            <div className="form">
              <div className="container-form">
                <div id="containerModalEquipamentoOrcamento">
                  <div id="search-equipamento">
                    <div className="form-group margin-bottom-0">
                      <div className="row">
                        <div className="col-xl">
                          <input
                            className="form-control"
                            placeholder="Buscar equipamento"
                            name="buscarFuncionario"
                            onChange={(event) =>
                              setStringBuscaEquipamento(event.target.value)
                            }
                            onKeyDown={(event) => pressEnter(event)}
                            onFocus={() =>
                              removerErro("campo-modalEquipamentoId")
                            }
                          />
                        </div>
                        <div className="col-xl-3 div-btn-buscar-equipamento-orcamento">
                          <button
                            type="button"
                            className="btn"
                            id="btn-buscar-equipamento-orcamento"
                            onClick={() => buscarEquipamento()}
                            onFocus={() =>
                              removerErro("campo-modalEquipamentoId")
                            }
                          >
                            Buscar
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-xl">
                          <ResultSearchEquipamento
                            show={showResultadoEquipamento}
                            resultados={dataEquipamento}
                            selecionarEquipamentoOrcamento={(equipamento) =>
                              selecionarEquipamentoOrcamento(equipamento)
                            }
                          />
                        </div>
                        <div className="col-xl-3"></div>
                      </div>
                    </div>
                  </div>
                  <div id="informacoes-equipamento">
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-3">
                          <label>Código</label>
                          <input
                            type="text"
                            className="form-control"
                            id="campo-modalEquipamentoId"
                            name="modalEquipamentoId"
                            value={dadosCadastro.modalEquipamentoId.valor}
                            readOnly
                          />
                          <span
                            className="invalid-feedback"
                            id="erro-modalEquipamentoId"
                          ></span>
                        </div>
                        <div className="col">
                          <label>Nome do equipamento</label>
                          <input
                            type="text"
                            className="form-control"
                            id="campo-nomeEquipamento"
                            name="nomeEquipamento"
                            value={dadosCadastro.nomeEquipamento.valor}
                            readOnly
                          />
                          <span
                            className="invalid-feedback"
                            id="erro-nomeEquipamento"
                          ></span>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-row">
                          <div className="col">
                            <label>Descrição do equipamento</label>
                            <textarea
                              type="text"
                              className="form-control"
                              id="campo-descricaoEquipamento"
                              name="descricaoEquipamento"
                              rows="5"
                              value={dadosCadastro.descricaoEquipamento.valor}
                              readOnly
                            />
                            <span
                              className="invalid-feedback"
                              id="erro-descricaoEquipamento"
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-row">
                          <div className="col">
                            <label>Valor unitário</label>
                            <input
                              type="text"
                              className="form-control"
                              id="campo-valorUnitario"
                              name="valorUnitario"
                              value={dadosCadastro.valorUnitario.valor}
                              onChange={(event) => handleInputChange(event)}
                              onFocus={(event) => removerErro(event.target.id)}
                            />
                            <span
                              className="invalid-feedback"
                              id="erro-valorUnitario"
                            ></span>
                          </div>
                          <div className="col">
                            <label>Quantidade</label>
                            <input
                              type="text"
                              className="form-control"
                              id="campo-quantidade"
                              name="quantidade"
                              value={dadosCadastro.quantidade.valor}
                              onChange={(event) => handleInputChange(event)}
                              onFocus={(event) => removerErro(event.target.id)}
                            />
                            <span
                              className="invalid-feedback"
                              id="erro-quantidade"
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        conteudoFooter={
          <>
            {dadosCadastro.equipamentoOrcamentoId.valor > 0 && (
              <>
                <div>
                  <button
                    type="button"
                    className="btn btn-orcamentaria btn-100-px"
                    onClick={() => setShowModalConfirm(true)}
                  >
                    Excluir
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-success btn-100-px"
                    onClick={() => editarCadastro()}
                  >
                    Atualizar
                  </button>
                </div>
              </>
            )}
            {!dadosCadastro.equipamentoOrcamentoId.valor && (
              <div>
                <button
                  type="button"
                  className="btn btn-primary btn-100-px"
                  onClick={() => salvarCadastro()}
                >
                  Salvar
                </button>
              </div>
            )}
            <div>
              <ModalConfirm
                show={showModalConfirm}
                onHide={() => setShowModalConfirm(false)}
                acaoConfirmada={() =>
                  props.onHide(
                    props.deletarEquipamentoOrcamento(
                      dadosCadastro.equipamentoOrcamentoId.valor
                    )
                  )
                }
                tituloModalConfirm="Confirmar exclusão?"
              />
            </div>
          </>
        }
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEquipamentoOrcamento);
