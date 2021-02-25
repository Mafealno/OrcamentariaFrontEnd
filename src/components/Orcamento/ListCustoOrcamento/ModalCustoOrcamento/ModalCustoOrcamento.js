/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import "./ModalCustoOrcamento.css"
import ModalControl from "../../../ModalControl/ModalControl";
import ModalConfirm from "../../../ModalConfirm/ModalConfirm";
import ToastControl from "../../../ToastControl/ToastControl";
import * as validacaoDadosUtils from "../../../../utils/validacaoDados";
import ResultSearchCusto from "./ResultSearchCusto/ResultSearchCusto";
import { connect } from "react-redux";

function ModalCustoOrcamento(props) {

    let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

    let [stringBuscaCusto, setStringBuscaCusto] = useState("");
    let [showResultadoCusto, setShowResultadoCusto] = useState(false);
    let [dataCusto, setDataCusto] = useState([]);
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
        custoOrcamentoId: { ...dadosCampo, valorPadrao: 0 },
        modalCustoId: { ...dadosCampo, requerido: true },
        nomeCusto: { ...dadosCampo },
        descricaoCusto: { ...dadosCampo },
        tipoCusto: { ...dadosCampo },
        valorCusto: { ...dadosCampo, requerido: true}
        });
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

    useEffect(() => {
    if (props.show) {
        if (props.custoOrcamento) {
        setDadosCadastro({
            custoOrcamentoId: {
            ...dadosCadastro.custoOrcamentoId,
            valor: props.custoOrcamento.CUSTO_ORCAMENTO_ID,
            },
            modalCustoId: {
            ...dadosCadastro.modalCustoId,
            valor: props.custoOrcamento.CUSTO_OBRA.CUSTO_ID,
            },
            nomeCusto: {
            ...dadosCadastro.nomeCusto,
            valor: props.custoOrcamento.CUSTO_OBRA.NOME_CUSTO,
            },
            descricaoCusto: {
            ...dadosCadastro.descricaoCusto,
            valor: props.custoOrcamento.CUSTO_OBRA.DESCRICAO,
            },
            tipoCusto: {
            ...dadosCadastro.tipoCusto,
            valor: props.custoOrcamento.CUSTO_OBRA.TIPO_CUSTO,
            },
            valorCusto: {
            ...dadosCadastro.valorCusto,
            valor: props.custoOrcamento.VALOR_CUSTO,
            }
        });
        }
    } else {
        limparCampos();
    }
    }, [props.show]);


    const limparCampos = () => {
    setDadosCadastro({
        custoOrcamentoId: {
        ...dadosCadastro.custoOrcamentoId,
        valor: dadosCadastro.custoOrcamentoId.valorPadrao,
        },
        modalCustoId: {
        ...dadosCadastro.modalCustoId,
        valor: dadosCadastro.modalCustoId.valorPadrao,
        },
        nomeCusto: {
        ...dadosCadastro.nomeCusto,
        valor: dadosCadastro.nomeCusto.valorPadrao,
        },
        descricaoCusto: {
        ...dadosCadastro.descricaoCusto,
        valor: dadosCadastro.descricaoCusto.valorPadrao,
        },
        tipoCusto: {
        ...dadosCadastro.tipoCusto,
        valor: dadosCadastro.tipoCusto.valorPadrao,
        },
        valorCusto: {
        ...dadosCadastro.valorCusto,
        valor: dadosCadastro.valorCusto.valorPadrao,
        }
    });
    };

    const buscarCusto = () => {
        
        let rota = "/custo/";
        if (stringBuscaCusto) {
            rota = rota + "buscar?nomeCusto=" + stringBuscaCusto;
        }
    
        fetch(props.linkBackEnd + rota, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setDataCusto(data);
            setShowResultadoCusto(true);
          });
      };

      const selecionarCustoOrcamento = (custo) => {
        setDadosCadastro({
          ...dadosCadastro,
          modalCustoId: {
            ...dadosCadastro.modalCustoId,
            valor: custo.CUSTO_ID,
          },
          nomeCusto: {
            ...dadosCadastro.nomeCusto,
            valor: custo.NOME_CUSTO,
          },
          descricaoCusto: {
            ...dadosCadastro.descricaoCusto,
            valor: custo.DESCRICAO,
          },
          tipoCusto: {
            ...dadosCadastro.tipoCusto,
            valor: custo.TIPO_CUSTO,
          },
          valorCusto: {
              ...dadosCadastro.valorCusto,
              valor: custo.VALOR_CUSTO
          }
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
          CUSTO_ORCAMENTO_ID: obj.custoOrcamentoId.valor,
          VALOR_CUSTO: parseFloat(obj.valorCusto.valor),
          ORCAMENTO_ID: props.orcamentoSelecionado.ORCAMENTO_ID,
          CUSTO_OBRA: {
            CUSTO_ID: obj.modalCustoId.valor,
            NOME_CUSTO: obj.nomeCusto.valor,
            DESCRICAO: obj.descricaoCusto.valor,
            TIPO_CUSTO: obj.tipoCusto.valor,
            VALOR_CUSTO: parseFloat(obj.valorCusto.valor)
          },
        };
      };

      const fazerAposCadastrar = (objCadastrado) => {
        setDadosCadastro({
          ...dadosCadastro,
          custoOrcamentoId: {
            ...dadosCadastro.custoOrcamentoId,
            valor: objCadastrado.CUSTO_ORCAMENTO_ID,
          },
        });
      };

      const salvarCadastro = () => {
        const dadosCusto = validacaoDadosUtils.validarDados(dadosCadastro);
    
        let houveErro = false;
    
        houveErro = exibirCamposErro(dadosCadastro);
    
        if (houveErro) {
          const msgErro = "Houveram erros na validação dos campos";
          exibirTost("erro", msgErro);
          return;
        }
    
        props.salvarCustoOrcamento(
          montarObj(dadosCusto),
          fazerAposCadastrar
        );
      };

      const listenerClick = () => {
        setShowResultadoCusto(false);
      };
    
      if (showResultadoCusto) {
        window.addEventListener("click", listenerClick);
      } else {
        window.removeEventListener("click", listenerClick);
      }
    
      const pressEnter = (event) => {
        if (event.key == "Enter") {
          buscarCusto();
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
            tituloModal="Informações do custo"
            conteudoBody={
                <>
                  <div className="form">
                    <div className="container-form">
                      <div id="containerModalEquipamentoOrcamento">
                        <div id="search-custo">
                          <div className="form-group margin-bottom-0">
                            <div className="row">
                              <div className="col-xl">
                                <input
                                  className="form-control"
                                  placeholder="Buscar custo"
                                  name="buscarCusto"
                                  onChange={(event) =>
                                    setStringBuscaCusto(event.target.value)
                                  }
                                  onKeyDown={(event) => pressEnter(event)}
                                  onFocus={() =>
                                    removerErro("campo-modalCustoId")
                                  }
                                />
                              </div>
                              <div className="col-xl-3 div-btn-buscar-custo-orcamento">
                                <button
                                  type="button"
                                  className="btn"
                                  id="btn-buscar-custo-orcamento"
                                  onClick={() => buscarCusto()}
                                  onFocus={() =>
                                    removerErro("campo-modalCustoId")
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
                                <ResultSearchCusto
                                  show={showResultadoCusto}
                                  resultados={dataCusto}
                                  selecionarCustoOrcamento={(custo) =>
                                    selecionarCustoOrcamento(custo)
                                  }
                                />
                              </div>
                              <div className="col-xl-3"></div>
                            </div>
                          </div>
                        </div>
                        <div id="informacoes-custo">
                          <div className="form-group">
                            <div className="form-row">
                              <div className="col-3">
                                <label>Código</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="campo-modalCustoId"
                                  name="modalCustoId"
                                  value={dadosCadastro.modalCustoId.valor}
                                  readOnly
                                />
                                <span
                                  className="invalid-feedback"
                                  id="erro-custoId"
                                ></span>
                              </div>
                              <div className="col">
                                <label>Nome do custo</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="campo-nomeCusto"
                                  name="nomeCusto"
                                  value={dadosCadastro.nomeCusto.valor}
                                  readOnly
                                />
                                <span
                                  className="invalid-feedback"
                                  id="erro-nomeCusto"
                                ></span>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="form-row">
                                <div className="col">
                                  <label>Descrição do custo</label>
                                  <textarea
                                    type="text"
                                    className="form-control"
                                    id="campo-descricaoCusto"
                                    name="descricaoCusto"
                                    rows="5"
                                    value={dadosCadastro.descricaoCusto.valor}
                                    readOnly
                                  />
                                  <span
                                    className="invalid-feedback"
                                    id="erro-descricaoCusto"
                                  ></span>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="form-row">
                                <div className="col">
                                  <label>Tipo de custo</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="campo-tipoCusto"
                                    name="tipoCusto"
                                    value={dadosCadastro.tipoCusto.valor}
                                    onChange={(event) => handleInputChange(event)}
                                    onFocus={(event) => removerErro(event.target.id)}
                                    readOnly
                                  />
                                  <span
                                    className="invalid-feedback"
                                    id="erro-tipoCusto"
                                  ></span>
                                </div>
                                <div className="col">
                                  <label>Valor do custo</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="campo-valorCusto"
                                    name="valorCusto"
                                    value={dadosCadastro.valorCusto.valor}
                                    onChange={(event) => handleInputChange(event)}
                                    onFocus={(event) => removerErro(event.target.id)}
                                    readOnly
                                  />
                                  <span
                                    className="invalid-feedback"
                                    id="erro-valorCusto"
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
                  {dadosCadastro.custoOrcamentoId.valor > 0 && (
                    <div>
                    <button
                        type="button"
                        className="btn btn-orcamentaria btn-100-px"
                        onClick={() => setShowModalConfirm(true)}
                    >
                        Excluir
                    </button>
                    </div>
                  )}
                  {!dadosCadastro.custoOrcamentoId.valor && (
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
                          props.deletarCustoOrcamento(
                            dadosCadastro.custoOrcamentoId.valor
                          )
                        )
                      }
                      tituloModalConfirm="Confirmar exclusão?"
                    />
                  </div>
                </>
              }
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
            ></ToastControl>
          </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    linkBackEnd: state.backEnd.link,
    orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
  });
  
  const mapDispatchToProps = (dispatch) => ({});
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModalCustoOrcamento);
