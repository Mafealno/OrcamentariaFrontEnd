import React, { useState, useEffect } from "react";
import "./ModalItemOrcamentoGeral.css";
import ModalControl from "../../../../ModalControl/ModalControl";
import ResultSearchMaterial from "./ResultSearchMaterial/ResultSearchMaterial";

import * as orcamentoActions from "../../../../../store/actions/orcamento";

import { connect } from "react-redux";

function ModalItemOrcamentoGeral(props) {
  let [optAmbienteDisplay, setOptAmbienteDisplay] = useState([]);
  let [stringBuscaMaterial, setStringBuscaMaterial] = useState("");
  let [showResultadoMaterial, setShowResultadoMaterial] = useState(false);
  let [dataMaterial, setDataMaterial] = useState([]);

  let [dadosCadastro, setDadosCadastro] = useState({
    orcamentoId: "",
    itensOrcamentoId: "",
    numeroLinha: "",
    valorComprimento: 0,
    valorLargura: 0,
    valorM2: "",
    area: 0,
    ambienteAplicacao: "",
    localAplicacao: "",
    acaoAplicar: "",
  });

  let [dadosCadastroMaterial, setDadosCadastroMaterial] = useState({
    materialId: "",
    nomeMaterial: "",
    pessoaId: "",
    nomePessoa: "",
  });

  const limparCampos = () => {
    setDadosCadastro({
      orcamentoId: "",
      itensOrcamentoId: "",
      numeroLinha: "",
      valorComprimento: 0,
      valorLargura: 0,
      valorM2: "",
      area: 0,
      ambienteAplicacao: "",
      localAplicacao: "",
      acaoAplicar: "",
    });

    setDadosCadastroMaterial({
      materialId: "",
      nomeMaterial: "",
      pessoaId: "",
      nomePessoa: "",
    });
  };

  useEffect(() => {
    setDadosCadastro({
      ...dadosCadastro,
      orcamentoId: props.orcamentoGeral.ORCAMENTO_ID,
    });
  }, []);

  useEffect(() => {
    if (props.itensOrcamentoGeral.length > 0) {
      let arrAux = [];
      props.itensOrcamentoGeral.map((elementoAtual) => {
        if (
          arrAux.findIndex(
            (elemento) =>
              elemento.AMBIENTE_APLICACAO.toLowerCase() ==
              elementoAtual.AMBIENTE_APLICACAO.toLowerCase()
          ) == -1
        ) {
          arrAux.push(elementoAtual);
        }
      });

      if (arrAux.length > 0) {
        setOptAmbienteDisplay(
          arrAux.map((elemento) => (
            <option value={elemento.AMBIENTE_APLICACAO}>
              {elemento.AMBIENTE_APLICACAO}
            </option>
          ))
        );
      }
    }

    if (!props.show) {
      limparCampos();
    }
  }, [props.show]);

  const montarObj = () => {
    return {
      ORCAMENTO_ID:
        dadosCadastro.orcamentoId == "" ? 0 : dadosCadastro.orcamentoId,
      ITENS_ORCAMENTO_ID:
        dadosCadastro.itensOrcamentoId == ""
          ? 0
          : dadosCadastro.itensOrcamentoId,
      NUMERO_LINHA: dadosCadastro.numeroLinha,
      VALOR_COMPRIMENTO: dadosCadastro.valorComprimento ?? 0,
      VALOR_LARGURA: dadosCadastro.valorLargura ?? 0,
      VALOR_M_2: dadosCadastro.valorM2 ?? 0,
      AREA: dadosCadastro.area,
      AMBIENTE_APLICACAO: dadosCadastro.ambienteAplicacao,
      LOCAL_APLICACAO: dadosCadastro.localAplicacao,
      ACAO_APLICAR: dadosCadastro.acaoAplicar,
      PRODUTO: {
        MATERIAL_ID: dadosCadastroMaterial.materialId,
        NOME_MATERIAL: dadosCadastroMaterial.materialId,
        DESCRICAO_MATERIAL: "",
        TIPO_MATERIAL: "",
        FABRICANTE: {
          PESSOA_ID: dadosCadastroMaterial.pessoaId,
          NOME_PESSOA: dadosCadastroMaterial.nomePessoa,
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

  const salvarItemOrcamentoGeral = () => {
    fetch(props.linkBackEnd + "/itensOrcamentoGeral/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj()),
    })
      .then((response) => response.json())
      .then((data) => {
        props.adicionarItemOrcamentoGeral(props.itensOrcamentoGeral, data);
      })
      .catch(() => {});
  };

  const buscarMaterial = () => {
    if (showResultadoMaterial) {
      return;
    }
    if (!stringBuscaMaterial) {
      fetch(props.linkBackEnd + "/material/", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setDataMaterial(data);
          setShowResultadoMaterial(true);
        });
    } else {
      if (stringBuscaMaterial.match(/\d/)) {
        stringBuscaMaterial = "buscar?materialId=" + stringBuscaMaterial;
      } else {
        stringBuscaMaterial = "buscar?nomeMaterial=" + stringBuscaMaterial;
      }

      fetch(props.linkBackEnd + "/material/" + stringBuscaMaterial, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setDataMaterial(data);
          setShowResultadoMaterial(true);
        });
    }
  };

  const selecionarMaterialItemOrcamentoGeral = (material) => {
    setDadosCadastroMaterial({
      materialId: material.MATERIAL_ID,
      nomeMaterial: material.NOME_MATERIAL,
      pessoaId: material.FABRICANTE.PESSOA_ID,
      nomePessoa: material.FABRICANTE.NOME_PESSOA,
    });
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
    if (event.key === "Enter") {
      buscarMaterial();
    }
  };

  const handleInputChange = (event) => {
    setDadosCadastro({
      ...dadosCadastro,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <ModalControl
        {...props}
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal"
        estiloModalFooter="backgroundModal"
        tituloModal="Informações do item"
        conteudoBody={
          <>
            <div className="form form-modal-item-orcamento-geral">
              <div className="container-form">
                <form>
                  <div className="form-group">
                    <div className="form-row">
                      <label className="col-form-label">Linha:</label>
                      <input
                        value={dadosCadastro.numeroLinha}
                        type="text"
                        className="form-control-plaintext input-numero-linha"
                        id="input-linha-item-orcamento-geral"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col">
                        <label>Ambiente</label>
                        <input
                          type="text"
                          className="form-control"
                          name="ambienteAplicacao"
                          value={dadosCadastro.ambienteAplicacao}
                          onChange={(event) => handleInputChange(event)}
                          list={"ambiente"}
                        />
                        <datalist id="ambiente">{optAmbienteDisplay}</datalist>
                      </div>
                      <div className="col">
                        <label>Local</label>
                        <input
                          type="text"
                          className="form-control"
                          name="localAplicacao"
                          value={dadosCadastro.localAplicacao}
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-xl col-12">
                        <label>Oque será feito</label>
                        <textarea
                          className="form-control"
                          name="acaoAplicar"
                          rows="3"
                          value={dadosCadastro.acaoAplicar}
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                      <div className="col-xl-4 col-12">
                        <div className="form-group">
                          <div className="form-row">
                            <div className="col">
                              <label>Altura</label>
                              <input
                                type="text"
                                className="form-control"
                                name="valorComprimento"
                                value={dadosCadastro.valorComprimento}
                                onChange={(event) => handleInputChange(event)}
                              />
                            </div>
                            <div className="col">
                              <label>Largura</label>
                              <input
                                type="text"
                                className="form-control"
                                name="valorLargura"
                                value={dadosCadastro.valorLargura}
                                onChange={(event) => handleInputChange(event)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="form-row">
                            <div className="col">
                              <label>Valor do M²</label>
                              <input
                                type="text"
                                className="form-control"
                                name="valorM2"
                                value={dadosCadastro.valorM2}
                                onChange={(event) => handleInputChange(event)}
                              />
                            </div>
                            <div className="col">
                              <label>Área (M²)</label>
                              <input
                                type="text"
                                className="form-control"
                                name="area"
                                value={dadosCadastro.area}
                                onChange={(event) => handleInputChange(event)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col">
                        <fieldset className="fieldset-height-100">
                          <legend>Dados do material</legend>
                          <div id="informacoes-material-orcamento-geral">
                            <div id="busca-material-orcamento-geral">
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-xl">
                                    <input
                                      className="form-control"
                                      placeholder="Buscar Material"
                                      name="buscarMaterial"
                                      onChange={(event) =>
                                        setStringBuscaMaterial(
                                          event.target.value
                                        )
                                      }
                                      onKeyDown={(event) => pressEnter(event)}
                                    />
                                  </div>
                                  <div className="col-xl-3 div-btn-buscar-material">
                                    <button
                                      type="button"
                                      className="btn"
                                      id="btn-buscar-material"
                                      onClick={() => buscarMaterial()}
                                    >
                                      Buscar material
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
                                      selecionarMaterialItemOrcamentoGeral={(
                                        material
                                      ) =>
                                        selecionarMaterialItemOrcamentoGeral(
                                          material
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-xl-3 div-btn-buscar-material"></div>
                                </div>
                              </div>
                            </div>
                            <div id="principal-material-orcamento-geral">
                              <div className="form-group">
                                <div className="form-row">
                                  <div className="col-xl-2 col-12">
                                    <label>Código</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="materialId"
                                      value={dadosCadastroMaterial.materialId}
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-xl col-12">
                                    <label>Nome do Material</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={dadosCadastroMaterial.nomeMaterial}
                                      name="nomeMaterial"
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <div className="form-row">
                                  <div className="col">
                                    <label>Nome do Fabricante</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="nomePessoa"
                                      value={dadosCadastroMaterial.nomePessoa}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        }
        conteudoFooter={
          <>
            {!dadosCadastro.itensOrcamentoId && (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => salvarItemOrcamentoGeral()}
                >
                  Salvar
                </button>
              </div>
            )}
            {dadosCadastro.enderecoId && (
              <div>
                <button onClick={() => ""} className="btn btn-success">
                  Atualizar
                </button>
                <button onClick={() => ""} className="btn btn-danger">
                  Excluir
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
  linkBackEnd: state.backEnd.link,
  itensOrcamentoGeral: state.orcamento.itensOrcamentoGeral,
  orcamentoGeral: state.orcamento.orcamentoGeral,
});

const mapDispatchToProps = (dispatch) => ({
  adicionarItemOrcamentoGeral: (itensOrcamentoGeral, itemOrcamentoGeral) =>
    dispatch(
      orcamentoActions.adicionarItemOrcamentoGeral(
        itensOrcamentoGeral,
        itemOrcamentoGeral
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalItemOrcamentoGeral);
