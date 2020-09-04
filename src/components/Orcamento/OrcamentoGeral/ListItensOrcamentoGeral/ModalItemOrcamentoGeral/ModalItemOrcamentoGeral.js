import React, { useState, useEffect } from "react";
import "./ModalItemOrcamentoGeral.css";
import ModalControl from "../../../../ModalControl/ModalControl";
import ResultSearchMaterial from "./ResultSearchMaterial/ResultSearchMaterial";
import ModalConfirm from "../../../../ModalConfirm/ModalConfirm";

import { connect } from "react-redux";

function ModalItemOrcamentoGeral(props) {
  let [optAmbienteDisplay, setOptAmbienteDisplay] = useState([]);
  let [stringBuscaMaterial, setStringBuscaMaterial] = useState("");
  let [showResultadoMaterial, setShowResultadoMaterial] = useState(false);
  let [dataMaterial, setDataMaterial] = useState([]);
  let [showModalConfirm, setShowModalConfirm] = useState(false);

  let [dadosCadastro, setDadosCadastro] = useState({
    orcamentoId: "",
    itensOrcamentoId: "",
    numeroLinha: "",
    valorComprimento: 0,
    valorLargura: 0,
    valorM2: 0,
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
    if (props.dados) {
      setDadosCadastro({
        orcamentoId: props.dados.ORCAMENTO_ID,
        itensOrcamentoId: props.dados.ITENS_ORCAMENTO_ID,
        numeroLinha: props.dados.NUMERO_LINHA,
        valorComprimento: props.dados.VALOR_COMPRIMENTO,
        valorLargura: props.dados.VALOR_LARGURA,
        valorM2: props.dados.VALOR_M_2,
        area: props.dados.AREA,
        ambienteAplicacao: props.dados.AMBIENTE_APLICACAO,
        localAplicacao: props.dados.LOCAL_APLICACAO,
        acaoAplicar: props.dados.AMBIENTE_APLICACAO,
      });
      setDadosCadastroMaterial({
        materialId: props.dados.PRODUTO.MATERIAL_ID,
        nomeMaterial: props.dados.PRODUTO.NOME_MATERIAL,
        pessoaId: props.dados.PRODUTO.PESSOA_ID,
        nomePessoa: props.dados.PRODUTO.FABRICANTE.NOME_PESSOA,
      });
    }
  }, [props.show]);

  useEffect(() => {
    if (props.listItensOrcamentoGeral.length > 0) {
      let arrAux = [];
      props.listItensOrcamentoGeral.map((elementoAtual) => {
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
            <option
              value={elemento.AMBIENTE_APLICACAO}
              key={elemento.AMBIENTE_APLICACAO}
            >
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
      NUMERO_LINHA: dadosCadastro.numeroLinha || 0,
      VALOR_COMPRIMENTO:
        parseFloat(dadosCadastro.valorComprimento) || parseFloat(0),
      VALOR_LARGURA: parseFloat(dadosCadastro.valorLargura) || parseFloat(0),
      VALOR_M_2: parseFloat(dadosCadastro.valorM2) || parseFloat(0),
      AREA: parseFloat(dadosCadastro.area),
      AMBIENTE_APLICACAO: dadosCadastro.ambienteAplicacao,
      LOCAL_APLICACAO: dadosCadastro.localAplicacao,
      ACAO_APLICAR: dadosCadastro.acaoAplicar,
      PRODUTO: {
        MATERIAL_ID: dadosCadastroMaterial.materialId,
        NOME_MATERIAL: dadosCadastroMaterial.nomeMaterial,
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

  const fazerAposCadastrar = (objCadastrado) => {
    setDadosCadastro({
      ...dadosCadastro,
      itensOrcamentoId: objCadastrado.ITENS_ORCAMENTO_ID,
      numeroLinha: objCadastrado.NUMERO_LINHA,
    });
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
    if (event.key == "Enter") {
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
                          required
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
                          required
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
                          required
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
                  type="submit"
                  className="btn btn-primary btn-100-px"
                  onClick={() =>
                    props.salvarItemOrcamentoGeral(
                      montarObj(),
                      fazerAposCadastrar
                    )
                  }
                >
                  Salvar
                </button>
              </div>
            )}
            {dadosCadastro.itensOrcamentoId && (
              <div>
                <button
                  onClick={() => setShowModalConfirm(true)}
                  className="btn btn-orcamentaria btn-100-px"
                >
                  Excluir
                </button>
                <button
                  type="submit"
                  onClick={() => props.atualizarItemOrcamentoGeral(montarObj())}
                  className="btn btn-success btn-100-px"
                >
                  Atualizar
                </button>
              </div>
            )}
          </>
        }
      />

      <div>
        <ModalConfirm
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          acaoConfirmada={() =>
            props.deletarItemOrcamentoGeral(dadosCadastro.itensOrcamentoId)
          }
          tituloModalConfirm={
            "Confirma exclusão? O dados não poderão ser recuperados"
          }
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listItensOrcamentoGeral: state.orcamento.listItensOrcamentoGeral,
  orcamentoGeral: state.orcamento.orcamentoGeral,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalItemOrcamentoGeral);
