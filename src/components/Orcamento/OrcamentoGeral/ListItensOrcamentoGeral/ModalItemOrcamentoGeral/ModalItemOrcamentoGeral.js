import React, { useState, useEffect } from "react";
import "./ModalItemOrcamentoGeral.css";
import ModalControl from "../../../../ModalControl/ModalControl";
import ResultSearchMaterial from "./ResultSearchMaterial/ResultSearchMaterial";
import ModalConfirm from "../../../../ModalConfirm/ModalConfirm";
import * as validacaoDadosUtils from "../../../../../utils/validacaoDados";

import { connect } from "react-redux";

function ModalItemOrcamentoGeral(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [optAmbienteDisplay, setOptAmbienteDisplay] = useState([]);
  let [stringBuscaMaterial, setStringBuscaMaterial] = useState("");
  let [showResultadoMaterial, setShowResultadoMaterial] = useState(false);
  let [dataMaterial, setDataMaterial] = useState([]);
  let [showModalConfirm, setShowModalConfirm] = useState(false);

  let [dadosCadastro, setDadosCadastro] = useState({
    orcamentoId: { ...dadosCampo, valorPadrao: 0 },
    itensOrcamentoId: { ...dadosCampo, valorPadrao: 0 },
    numeroLinha: { ...dadosCampo, valorPadrao: 0 },
    valorComprimento: {
      ...dadosCampo,
      valorPadrao: 0,
      formato: /^\d{1,7}([,.])?\d{0,2}$/,
    },
    valorLargura: {
      ...dadosCampo,
      valorPadrao: 0,
      formato: /^\d{1,7}([,.])?\d{0,2}$/,
    },
    valorM2: {
      ...dadosCampo,
      requerido: true,
      formato: /^\d{1,7}([,.])?\d{0,2}$/,
    },
    area: {
      ...dadosCampo,
      requerido: true,
      formato: /^\d{1,7}([,.])?\d{0,2}$/,
    },
    ambienteAplicacao: {
      ...dadosCampo,
      requerido: true,
    },
    localAplicacao: { ...dadosCampo },
    acaoAplicar: { ...dadosCampo },
  });

  let [dadosCadastroMaterial, setDadosCadastroMaterial] = useState({
    materialIdItemOrcamentogeral: { ...dadosCampo, requerido: true },
    nomeMaterial: { ...dadosCampo },
    pessoaId: { ...dadosCampo },
    nomePessoa: { ...dadosCampo },
  });

  useEffect(() => {
    setDadosCadastro({
      ...dadosCadastro,
      orcamentoId: {
        ...dadosCadastro.orcamentoId,
        valor: props.orcamentoSelecionado.ORCAMENTO_ID,
      },
    });
    if (props.dados) {
      setDadosCadastro({
        orcamentoId: {
          ...dadosCadastro.orcamentoId,
          valor: props.dados.ORCAMENTO_ID,
        },
        itensOrcamentoId: {
          ...dadosCadastro.itensOrcamentoId,
          valor: props.dados.ITENS_ORCAMENTO_ID,
        },
        numeroLinha: {
          ...dadosCadastro.numeroLinha,
          valor: props.dados.NUMERO_LINHA,
        },
        valorComprimento: {
          ...dadosCadastro.valorComprimento,
          valor: props.dados.VALOR_COMPRIMENTO,
        },
        valorLargura: {
          ...dadosCadastro.valorLargura,
          valor: props.dados.VALOR_LARGURA,
        },
        valorM2: { ...dadosCadastro.valorM2, valor: props.dados.VALOR_M_2 },
        area: { ...dadosCadastro.area, valor: props.dados.AREA },
        ambienteAplicacao: {
          ...dadosCadastro.ambienteAplicacao,
          valor: props.dados.AMBIENTE_APLICACAO,
        },
        localAplicacao: {
          ...dadosCadastro.localAplicacao,
          valor: props.dados.LOCAL_APLICACAO,
        },
        acaoAplicar: {
          ...dadosCadastro.acaoAplicar,
          valor: props.dados.ACAO_APLICAR,
        },
      });
      setDadosCadastroMaterial({
        materialIdItemOrcamentogeral: {
          ...dadosCadastroMaterial,
          valor: props.dados.PRODUTO.MATERIAL_ID,
        },
        nomeMaterial: {
          ...dadosCadastroMaterial,
          valor: props.dados.PRODUTO.NOME_MATERIAL,
        },
        pessoaId: {
          ...dadosCadastroMaterial,
          valor: props.dados.PRODUTO.PESSOA_ID,
        },
        nomePessoa: {
          ...dadosCadastroMaterial,
          valor: props.dados.PRODUTO.FABRICANTE.NOME_PESSOA,
        },
      });
    }

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

  const limparCampos = () => {
    setDadosCadastro({
      orcamentoId: {
        ...dadosCadastro.orcamentoId,
        valor: dadosCadastro.orcamentoId.valorPadrao,
      },
      itensOrcamentoId: {
        ...dadosCadastro.itensOrcamentoId,
        valor: dadosCadastro.itensOrcamentoId.valorPadrao,
      },
      numeroLinha: {
        ...dadosCadastro.numeroLinha,
        valor: dadosCadastro.numeroLinha.valorPadrao,
      },
      valorComprimento: {
        ...dadosCadastro.valorComprimento,
        valor: dadosCadastro.valorComprimento.valorPadrao,
      },
      valorLargura: {
        ...dadosCadastro.valorLargura,
        valor: dadosCadastro.valorLargura.valorPadrao,
      },
      valorM2: {
        ...dadosCadastro.valorM2,
        valor: dadosCadastro.valorM2.valorPadrao,
      },
      area: { ...dadosCadastro.area, valor: dadosCadastro.area.valorPadrao },
      ambienteAplicacao: {
        ...dadosCadastro.ambienteAplicacao,
        valor: dadosCadastro.ambienteAplicacao.valorPadrao,
      },
      localAplicacao: {
        ...dadosCadastro.localAplicacao,
        valor: dadosCadastro.localAplicacao.valorPadrao,
      },
      acaoAplicar: {
        ...dadosCadastro.acaoAplicar,
        valor: dadosCadastro.acaoAplicar.valorPadrao,
      },
    });

    setDadosCadastroMaterial({
      materialIdItemOrcamentogeral: {
        ...dadosCadastroMaterial.materialIdItemOrcamentogeral,
        valor: dadosCadastroMaterial.materialIdItemOrcamentogeral.valorPadrao,
      },
      nomeMaterial: {
        ...dadosCadastroMaterial.nomeMaterial,
        valor: dadosCadastroMaterial.nomeMaterial.valorPadrao,
      },
      pessoaId: {
        ...dadosCadastroMaterial.pessoaId,
        valor: dadosCadastroMaterial.pessoaId.valorPadrao,
      },
      nomePessoa: {
        ...dadosCadastroMaterial.nomePessoa,
        valor: dadosCadastroMaterial.nomePessoa.valorPadrao,
      },
    });
  };

  const montarObj = (obj) => {
    return {
      ORCAMENTO_ID: obj.orcamentoId.valor,
      ITENS_ORCAMENTO_ID: obj.itensOrcamentoId.valor,
      NUMERO_LINHA: obj.numeroLinha.valor,
      VALOR_COMPRIMENTO: parseFloat(
        obj.valorComprimento.valor.toString().replace(",", ".")
      ),
      VALOR_LARGURA: parseFloat(
        obj.valorLargura.valor.toString().replace(",", ".")
      ),
      VALOR_M_2: parseFloat(obj.valorM2.valor.toString().replace(",", ".")),
      AREA: parseFloat(obj.area.valor.toString().replace(",", ".")),
      AMBIENTE_APLICACAO: obj.ambienteAplicacao.valor,
      LOCAL_APLICACAO: obj.localAplicacao.valor,
      ACAO_APLICAR: obj.acaoAplicar.valor,
      PRODUTO: {
        MATERIAL_ID: obj.material.materialIdItemOrcamentogeral.valor,
        NOME_MATERIAL: obj.material.nomeMaterial.valor,
        DESCRICAO_MATERIAL: "",
        TIPO_MATERIAL: "",
        FABRICANTE: {
          PESSOA_ID: obj.material.pessoaId.valor,
          NOME_PESSOA: obj.material.nomePessoa.valor,
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
    const dadosItemOrcamentoGeral = validacaoDadosUtils.validarDados(
      dadosCadastro
    );
    const dadosMaterialItemOrcamentoGeral = validacaoDadosUtils.validarDados(
      dadosCadastroMaterial
    );
    let houveErro = false;
    houveErro = exibirCamposErro(dadosItemOrcamentoGeral, houveErro);

    houveErro = exibirCamposErro(dadosMaterialItemOrcamentoGeral, houveErro);
    if (houveErro) {
      return;
    }

    dadosItemOrcamentoGeral.material = dadosMaterialItemOrcamentoGeral;

    props.salvarItemOrcamentoGeral(
      montarObj(dadosItemOrcamentoGeral),
      fazerAposCadastrar
    );
  };

  const atualizarItemOrcamentoGeral = () => {
    const dadosItemOrcamentoGeral = validacaoDadosUtils.validarDados(
      dadosCadastro
    );
    const dadosMaterialItemOrcamentoGeral = validacaoDadosUtils.validarDados(
      dadosCadastroMaterial
    );
    let houveErro = false;
    houveErro = exibirCamposErro(dadosItemOrcamentoGeral, houveErro);

    houveErro = exibirCamposErro(dadosMaterialItemOrcamentoGeral, houveErro);
    if (houveErro) {
      return;
    }

    dadosItemOrcamentoGeral.material = dadosMaterialItemOrcamentoGeral;

    props.atualizarItemOrcamentoGeral(montarObj(dadosItemOrcamentoGeral));
  };

  const fazerAposCadastrar = (objCadastrado) => {
    setDadosCadastro({
      ...dadosCadastro,
      itensOrcamentoId: {
        ...dadosCadastro.itensOrcamentoId,
        valor: objCadastrado.ITENS_ORCAMENTO_ID,
      },
      numeroLinha: {
        ...dadosCadastro.numeroLinha,
        valor: objCadastrado.NUMERO_LINHA,
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
      materialIdItemOrcamentogeral: {
        ...dadosCadastroMaterial,
        valor: material.MATERIAL_ID,
      },
      nomeMaterial: { ...dadosCadastroMaterial, valor: material.NOME_MATERIAL },
      pessoaId: {
        ...dadosCadastroMaterial,
        valor: material.FABRICANTE.PESSOA_ID,
      },
      nomePessoa: {
        ...dadosCadastroMaterial,
        valor: material.FABRICANTE.NOME_PESSOA,
      },
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
        tituloModal="Informações do item"
        conteudoBody={
          <>
            <div className="form form-modal-item-orcamento-geral">
              <div className="container-form">
                <div className="form-group">
                  <div className="form-row">
                    <label className="col-form-label">Linha:</label>
                    <input
                      type="text"
                      value={dadosCadastro.numeroLinha.valor || ""}
                      id="campo-orcamentoId"
                      className="form-control-plaintext input-numero-linha"
                      readOnly
                    />
                    <span
                      className="invalid-feedback"
                      id="erro-numeroLinha"
                    ></span>
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
                        id="campo-ambienteAplicacao"
                        value={dadosCadastro.ambienteAplicacao.valor}
                        onChange={(event) => handleInputChange(event)}
                        onFocus={(event) => removerErro(event.target.id)}
                        list={"ambiente"}
                      />
                      <datalist id="ambiente">{optAmbienteDisplay}</datalist>
                      <span
                        className="invalid-feedback"
                        id="erro-ambienteAplicacao"
                      ></span>
                    </div>
                    <div className="col">
                      <label>Local</label>
                      <input
                        type="text"
                        className="form-control"
                        name="localAplicacao"
                        id="campo-localAplicacao"
                        value={dadosCadastro.localAplicacao.valor}
                        onChange={(event) => handleInputChange(event)}
                        onFocus={(event) => removerErro(event.target.id)}
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
                        id="campo-acaoAplicar"
                        rows="3"
                        value={dadosCadastro.acaoAplicar.valor}
                        onChange={(event) => handleInputChange(event)}
                        onFocus={(event) => removerErro(event.target.id)}
                      />
                      <span
                        className="invalid-feedback"
                        id="erro-acaoAplicar"
                      ></span>
                    </div>
                    <div className="col-xl-6 col-12">
                      <div className="form-group">
                        <div className="form-row">
                          <div className="col">
                            <label>Altura</label>
                            <input
                              type="text"
                              className="form-control"
                              name="valorComprimento"
                              id="campo-valorComprimento"
                              value={dadosCadastro.valorComprimento.valor}
                              onChange={(event) => handleInputChange(event)}
                              onFocus={(event) => removerErro(event.target.id)}
                            />
                            <span
                              className="invalid-feedback"
                              id="erro-valorComprimento"
                            ></span>
                          </div>
                          <div className="col">
                            <label>Largura</label>
                            <input
                              type="text"
                              className="form-control"
                              name="valorLargura"
                              id="campo-valorLargura"
                              value={dadosCadastro.valorLargura.valor}
                              onChange={(event) => handleInputChange(event)}
                              onFocus={(event) => removerErro(event.target.id)}
                            />
                            <span
                              className="invalid-feedback"
                              id="erro-valorLargura"
                            ></span>
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
                              id="campo-valorM2"
                              value={dadosCadastro.valorM2.valor}
                              onChange={(event) => handleInputChange(event)}
                              onFocus={(event) => removerErro(event.target.id)}
                            />
                            <span
                              className="invalid-feedback"
                              id="erro-valorM2"
                            ></span>
                          </div>
                          <div className="col">
                            <label>Área (M²)</label>
                            <input
                              type="text"
                              className="form-control"
                              name="area"
                              id="campo-area"
                              value={dadosCadastro.area.valor}
                              onChange={(event) => handleInputChange(event)}
                              onFocus={(event) => removerErro(event.target.id)}
                            />
                            <span
                              className="invalid-feedback"
                              id="erro-area"
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col">
                      <fieldset
                        className="fieldset-height-100"
                        id="campo-materialIdItemOrcamentogeral"
                      >
                        <legend>Dados do material</legend>
                        <div id="informacoes-material-orcamento-geral">
                          <div id="busca-material-orcamento-geral">
                            <div className="form-group margin-bottom-0">
                              <div className="row">
                                <div className="col-xl">
                                  <input
                                    className="form-control"
                                    placeholder="Buscar Material"
                                    name="buscarMaterial"
                                    onChange={(event) =>
                                      setStringBuscaMaterial(event.target.value)
                                    }
                                    onKeyDown={(event) => pressEnter(event)}
                                    onFocus={() =>
                                      removerErro(
                                        "campo-materialIdItemOrcamentogeral"
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-xl-3 div-btn-buscar-material">
                                  <button
                                    type="button"
                                    className="btn"
                                    id="btn-buscar-material"
                                    onClick={() => buscarMaterial()}
                                    onFocus={() =>
                                      removerErro(
                                        "campo-materialIdItemOrcamentogeral"
                                      )
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
                                    name="materialIdItemOrcamentogeral"
                                    value={
                                      dadosCadastroMaterial
                                        .materialIdItemOrcamentogeral.valor
                                    }
                                    readOnly
                                  />
                                </div>
                                <div className="col-xl col-12">
                                  <label>Nome do Material</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      dadosCadastroMaterial.nomeMaterial.valor
                                    }
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
                                    value={
                                      dadosCadastroMaterial.nomePessoa.valor
                                    }
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <span
                        className="invalid-feedback"
                        id="erro-materialIdItemOrcamentogeral"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        conteudoFooter={
          <>
            {!dadosCadastro.itensOrcamentoId.valor && (
              <div>
                <button
                  type="submit"
                  className="btn btn-primary btn-100-px"
                  onClick={() => salvarItemOrcamentoGeral()}
                >
                  Salvar
                </button>
              </div>
            )}
            {dadosCadastro.itensOrcamentoId.valor > 0 && (
              <div>
                <button
                  onClick={() => setShowModalConfirm(true)}
                  className="btn btn-orcamentaria btn-100-px"
                >
                  Excluir
                </button>
                <button
                  type="submit"
                  onClick={() => atualizarItemOrcamentoGeral()}
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
            props.deletarItemOrcamentoGeral(
              dadosCadastro.itensOrcamentoId.valor
            )
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
  orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalItemOrcamentoGeral);
