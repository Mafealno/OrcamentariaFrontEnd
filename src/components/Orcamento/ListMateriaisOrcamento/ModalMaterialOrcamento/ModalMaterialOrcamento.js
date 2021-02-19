/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "./ModalMaterialOrcamento.css";
import ModalControl from "../../../ModalControl/ModalControl";
import ResultSearchMaterial from "./ResultSearchMaterial/ResultSearchMaterial";
import ModalConfirm from "../../../ModalConfirm/ModalConfirm";
import * as validacaoDadosUtils from "../../../../utils/validacaoDados";
import { connect } from "react-redux";

export function ModalMaterialOrcamento(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [stringBuscaMaterial, setStringBuscaMaterial] = useState("");
  let [showResultadoMaterial, setShowResultadoMaterial] = useState(false);
  let [dataMaterial, setDataMaterial] = useState([]);
  let [showModalConfirm, setShowModalConfirm] = useState(false);
  let [dadosCadastro, setDadosCadastro] = useState({
    materialOrcamentoId: { ...dadosCampo, valorPadrao: 0 },
    modalMaterialId: { ...dadosCampo, requerido: true },
    nomeMaterial: { ...dadosCampo },
    descricaoMaterial: { ...dadosCampo },
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
      if (props.materialOrcamento) {
        setDadosCadastro({
          materialOrcamentoId: {
            ...dadosCadastro.materialOrcamentoId,
            valor: props.materialOrcamento.MATERIAL_ORCAMENTO_ID,
          },
          modalMaterialId: {
            ...dadosCadastro.modalMaterialId,
            valor: props.materialOrcamento.MATERIAL.MATERIAL_ID,
          },
          nomeMaterial: {
            ...dadosCadastro.nomeMaterial,
            valor: props.materialOrcamento.MATERIAL.NOME_MATERIAL,
          },
          descricaoMaterial: {
            ...dadosCadastro.descricaoMaterial,
            valor: props.materialOrcamento.MATERIAL.DESCRICAO,
          },
          pessoaId: {
            ...dadosCadastro.pessoaId,
            valor: props.materialOrcamento.MATERIAL.FABRICANTE.PESSOA_ID,
          },
          valorUnitario: {
            ...dadosCadastro.valorUnitario,
            valor: props.materialOrcamento.VALOR_UNITARIO_MATERIAL,
          },
          quantidade: {
            ...dadosCadastro.quantidade,
            valor: props.materialOrcamento.QTDE_MATERIAL,
          },
        });
      }
    } else {
      limparCampos();
    }
  }, [props.show]);

  const limparCampos = () => {
    setDadosCadastro({
      materialOrcamentoId: {
        ...dadosCadastro.materialOrcamentoId,
        valor: dadosCadastro.materialOrcamentoId.valorPadrao,
      },
      modalMaterialId: {
        ...dadosCadastro.modalMaterialId,
        valor: dadosCadastro.modalMaterialId.valorPadrao,
      },
      nomeMaterial: {
        ...dadosCadastro.nomeMaterial,
        valor: dadosCadastro.nomeMaterial.valorPadrao,
      },
      descricaoMaterial: {
        ...dadosCadastro.descricaoMaterial,
        valor: dadosCadastro.descricaoMaterial.valorPadrao,
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

  const buscarMaterial = () => {
    let rota = "/material/";
    if (stringBuscaMaterial) {
        rota = rota + "buscar?nomeMaterial=" + stringBuscaMaterial;
    }

    fetch(props.linkBackEnd + rota, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setDataMaterial(data);
        setShowResultadoMaterial(true);
      });
  };

  const selecionarMaterialOrcamento = (material) => {
    setDadosCadastro({
      ...dadosCadastro,
      modalMaterialId: {
        ...dadosCadastro.modalMaterialId,
        valor: material.MATERIAL_ID,
      },
      nomeMaterial: {
        ...dadosCadastro.nomeMaterial,
        valor: material.NOME_MATERIAL,
      },
      descricaoMaterial: {
        ...dadosCadastro.descricaoMaterial,
        valor: material.DESCRICAO,
      },
      pessoaId: {
        ...dadosCadastro.pessoaId,
        valor: material.FABRICANTE.PESSOA_ID,
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
      MATERIAL_ORCAMENTO_ID: obj.materialOrcamentoId.valor,
      ORCAMENTO_ID: props.orcamentoSelecionado.ORCAMENTO_ID,
      VALOR_UNITARIO_MATERIAL: parseFloat(obj.valorUnitario.valor),
      QTDE_MATERIAL: parseInt(obj.quantidade.valor),
      MATERIAL: {
        MATERIAL_ID: obj.modalMaterialId.valor,
        NOME_MATERIAL: obj.nomeMaterial.valor,
        DESCRICAO: obj.descricaoMaterial.valor,
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
      materialOrcamentoId: {
        ...dadosCadastro.materialOrcamentoId,
        valor: objCadastrado.MATERIAL_ORCAMENTO_ID,
      },
    });
  };

  const salvarCadastro = () => {
    const dadosMaterial = validacaoDadosUtils.validarDados(dadosCadastro);

    let houveErro = false;

    houveErro = exibirCamposErro(dadosCadastro);

    if (houveErro) {
      return;
    }

    props.salvarMaterialOrcamento(
      montarObj(dadosMaterial),
      fazerAposCadastrar
    );
  };

  const editarCadastro = () => {
    const dadosMaterial = validacaoDadosUtils.validarDados(dadosCadastro);

    let houveErro = false;

    houveErro = exibirCamposErro(dadosCadastro);

    if (houveErro) {
      return;
    }

    props.atualizarMaterialOrcamento(montarObj(dadosMaterial));
  };

  const listenerClick = () => {
    setShowResultadoMaterial(false);
  };

  if (showResultadoMaterial) {
    window.addEventListener("click", listenerClick);
  } else {
    window.removeEventListener("click", listenerClick);
  }

  const pressEnter = (event) => {
    if (event.key == "Enter") {
      buscarMaterial();
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
        tituloModal="Informações do material"
        conteudoBody={
          <>
            <div className="form">
              <div className="container-form">
                <div id="containerModalMaterialOrcamento">
                  <div id="search-material">
                    <div className="form-group margin-bottom-0">
                      <div className="row">
                        <div className="col-xl">
                          <input
                            className="form-control"
                            placeholder="Buscar material"
                            name="buscarFuncionario"
                            onChange={(event) =>
                              setStringBuscaMaterial(event.target.value)
                            }
                            onKeyDown={(event) => pressEnter(event)}
                            onFocus={() =>
                              removerErro("campo-modalMaterialId")
                            }
                          />
                        </div>
                        <div className="col-xl-3 div-btn-buscar-material-orcamento">
                          <button
                            type="button"
                            className="btn"
                            id="btn-buscar-material-orcamento"
                            onClick={() => buscarMaterial()}
                            onFocus={() =>
                              removerErro("campo-modalMaterialId")
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
                          <ResultSearchMaterial
                            show={showResultadoMaterial}
                            resultados={dataMaterial}
                            selecionarMaterialOrcamento={(material) =>
                              selecionarMaterialOrcamento(material)
                            }
                          />
                        </div>
                        <div className="col-xl-3"></div>
                      </div>
                    </div>
                  </div>
                  <div id="informacoes-material">
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-3">
                          <label>Código</label>
                          <input
                            type="text"
                            className="form-control"
                            id="campo-modalMaterialId"
                            name="modalMaterialId"
                            value={dadosCadastro.modalMaterialId.valor}
                            readOnly
                          />
                          <span
                            className="invalid-feedback"
                            id="erro-modalMaterialId"
                          ></span>
                        </div>
                        <div className="col">
                          <label>Nome do material</label>
                          <input
                            type="text"
                            className="form-control"
                            id="campo-nomeMaterial"
                            name="nomeMaterial"
                            value={dadosCadastro.nomeMaterial.valor}
                            readOnly
                          />
                          <span
                            className="invalid-feedback"
                            id="erro-nomeMaterial"
                          ></span>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-row">
                          <div className="col">
                            <label>Descrição do material</label>
                            <textarea
                              type="text"
                              className="form-control"
                              id="campo-descricaoMaterial"
                              name="descricaoMaterial"
                              rows="5"
                              value={dadosCadastro.descricaoMaterial.valor}
                              readOnly
                            />
                            <span
                              className="invalid-feedback"
                              id="erro-descricaoMaterial"
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
            {dadosCadastro.materialOrcamentoId.valor > 0 && (
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
            {!dadosCadastro.materialOrcamentoId.valor && (
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
                    props.deletarMaterialOrcamento(
                      dadosCadastro.materialOrcamentoId.valor
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
)(ModalMaterialOrcamento);
