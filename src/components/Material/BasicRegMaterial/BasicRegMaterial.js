/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "./BasicRegMaterial.css";
import ResultSearchProvider from "./ResultSearchProvider/ResultSearchProvider";
import ModalConfirm from "../../ModalConfirm/ModalConfirm";
import ToastControl from "../../ToastControl/ToastControl";
import * as materialActions from "../../../store/actions/material";
import * as validacaoDadosUtils from "../../../utils/validacaoDados";
import { connect } from "react-redux";

function BasicRegMaterial(props) {
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
    materialId: { ...dadosCampo, valorPadrao: 0 },
    nomeMaterial: { ...dadosCampo, requerido: true },
    descricaoMaterial: { ...dadosCampo },
    tipoMaterial: { ...dadosCampo, requerido: true },
  });

  let [dadosFabricante, setDadosFabricante] = useState({
    pessoaId: { ...dadosCampo, requerido: true },
    nomePessoa: { ...dadosCampo },
  });

  useEffect(() => {
    if (props.materialSelecionado.MATERIAL_ID) {
      setDadosCadastro({
        materialId: {
          ...dadosCadastro.materialId,
          valor: props.materialSelecionado.MATERIAL_ID,
        },
        nomeMaterial: {
          ...dadosCadastro.nomeMaterial,
          valor: props.materialSelecionado.NOME_MATERIAL,
        },
        descricaoMaterial: {
          ...dadosCadastro.descricaoMaterial,
          valor: props.materialSelecionado.DESCRICAO_MATERIAL,
        },
        tipoMaterial: {
          ...dadosCadastro.tipoMaterial,
          valor: props.materialSelecionado.TIPO_MATERIAL,
        },
      });

      setDadosFabricante({
        pessoaId: {
          ...dadosFabricante.pessoaId,
          valor: props.materialSelecionado.FABRICANTE.PESSOA_ID,
        },
        nomePessoa: {
          ...dadosFabricante.nomePessoa,
          valor: props.materialSelecionado.FABRICANTE.NOME_PESSOA,
        },
      });
    } else {
      limparCadastro();
    }
  }, [props.materialSelecionado.MATERIAL_ID]);

  const limparCadastro = () => {
    setDadosCadastro({
      materialId: {
        ...dadosCadastro.materialId,
        valor: dadosCadastro.materialId.valorPadrao,
      },
      nomeMaterial: {
        ...dadosCadastro.nomeMaterial,
        valor: dadosCadastro.nomeMaterial.valorPadrao,
      },
      descricaoMaterial: {
        ...dadosCadastro.descricaoMaterial,
        valor: dadosCadastro.descricaoMaterial.valorPadrao,
      },
      tipoMaterial: {
        ...dadosCadastro.tipoMaterial,
        valor: dadosCadastro.tipoMaterial.valorPadrao,
      },
    });
    setDadosFabricante({
      pessoaId: {
        ...dadosFabricante.pessoaId,
        valor: dadosFabricante.pessoaId.valorPadrao,
      },
      nomePessoa: {
        ...dadosFabricante.nomePessoa,
        valor: dadosFabricante.nomePessoa.valorPadrao,
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

  const montarObj = (obj) => {
    return {
      MATERIAL_ID: obj.materialId.valor,
      NOME_MATERIAL: obj.nomeMaterial.valor,
      DESCRICAO_MATERIAL: obj.descricaoMaterial.valor,
      TIPO_MATERIAL: obj.tipoMaterial.valor,
      FABRICANTE: {
        PESSOA_ID: obj.pessoa.pessoaId.valor,
        NOME_PESSOA: obj.pessoa.nomePessoa.valor,
        RG: "",
        CPF: "",
        CNPJ: "",
        TIPO_CADASTRO: "",
        TIPO_PESSOA: "",
        LIST_ENDERECO: [],
        LIST_CONTATO: [],
      },
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
    const dadosMaterial = validacaoDadosUtils.validarDados(dadosCadastro);
    const dadosPessoa = validacaoDadosUtils.validarDados(dadosFabricante);

    let houveErro = false;
    houveErro = exibirCamposErro(dadosMaterial, houveErro);
    houveErro = exibirCamposErro(dadosPessoa, houveErro);

    if (houveErro) {
      const msgErro = "Houveram erros na validação dos campos";
      exibirTost("erro", msgErro);
      return;
    }

    dadosMaterial.pessoa = dadosPessoa;

    fetch(props.linkBackEnd + "/material/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj(dadosMaterial)),
    })
      .then((response) => response.json())
      .then((data) => {
        props.recarregarMaterial(data.MATERIAL_ID, props.linkBackEnd);

        const msg = "Cadastro efetuado com sucesso";

        exibirTost("sucesso", msg);
      })
      .catch(() => {
        const msg = "Erro ao efetuar cadastro";

        exibirTost("erro", msg);
      });
  };

  const deletarCadastro = () => {
    fetch(props.linkBackEnd + "/material/" + dadosCadastro.materialId.valor, {
      method: "DELETE",
    }).then((data) => {
      if (data.ok) {
        props.selecionarMaterial({});

        const msg = "Exclusão efetuada com sucesso";

        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar exclusão";

        exibirTost("erro", msg);
      }
    });
  };

  const atualizarCadastro = () => {
    const dadosMaterial = validacaoDadosUtils.validarDados(dadosCadastro);
    const dadosPessoa = validacaoDadosUtils.validarDados(dadosFabricante);

    let houveErro = false;
    houveErro = exibirCamposErro(dadosMaterial, houveErro);
    houveErro = exibirCamposErro(dadosPessoa, houveErro);

    if (houveErro) {
      const msgErro = "Houveram erros na validação dos campos";
      exibirTost("erro", msgErro);
      return;
    }

    dadosMaterial.pessoa = dadosPessoa;
    
    fetch(props.linkBackEnd + "/material/" + dadosCadastro.materialId.valor, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj(dadosMaterial)),
    }).then((data) => {
      if (data.ok) {
        props.recarregarMaterial(
          dadosCadastro.materialId.valor,
          props.linkBackEnd
        );

        const msg = "Atualização efetuada com sucesso";

        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar atualização";

        exibirTost("erro", msg);
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
    <div className="form-material">
      <div className="container-form">
        <div className="form-group">
          <div className="form-row">
            <label className="col-form-label">Código: </label>
            <input
              type="text"
              className="form-control-plaintext"
              name="materialId"
              id="campo-materialId"
              value={dadosCadastro.materialId.valor || ""}
              readOnly
            />
            <span className="invalid-feedback" id="erro-materialId"></span>
            {dadosCadastro.materialId.valor > 0 && (
              <>
                <div className="close-select-material">
                  <a href="#" onClick={() => props.selecionarMaterial({})}>
                    <span className="fa fa-close close-select-material"></span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <div className="col-xl-8 div-nome-material">
              <label className="col-form-label">Nome do material</label>
              <input
                type="text"
                placeholder="Ex: Tinta Acrílica"
                className="form-control"
                name="nomeMaterial"
                id="campo-nomeMaterial"
                value={dadosCadastro.nomeMaterial.valor}
                onChange={(event) => handleInputChange(event)}
                onFocus={(event) => removerErro(event.target.id)}
              />
              <span className="invalid-feedback" id="erro-nomeMaterial"></span>
            </div>
            <div className="col-xl-4">
              <label className="col-form-label">Tipo do material</label>
              <input
                type="text"
                placeholder="Ex: Tinta"
                className="form-control"
                name="tipoMaterial"
                id="campo-tipoMaterial"
                value={dadosCadastro.tipoMaterial.valor}
                onChange={(event) => handleInputChange(event)}
                onFocus={(event) => removerErro(event.target.id)}
              />
              <span className="invalid-feedback" id="erro-tipoMaterial"></span>
            </div>
          </div>
        </div>
        <div className="form-group width-99-5">
          <div className="form-row">
            <label className="col-form-label">Descrição do material</label>
            <textarea
              className="form-control"
              rows="5"
              name="descricaoMaterial"
              id="campo-descricaoMaterial"
              value={dadosCadastro.descricaoMaterial.valor}
              onChange={(event) => handleInputChange(event)}
              onFocus={(event) => removerErro(event.target.id)}
            />
            <span className="invalid-feedback" id="erro-descricao"></span>
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
            {!props.materialSelecionado.MATERIAL_ID && (
              <button
                type="button"
                className="btn btn-primary btn-options"
                onClick={() => salvarCadastro()}
              >
                Salvar
              </button>
            )}

            {props.materialSelecionado.MATERIAL_ID > 0 && (
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
  materialSelecionado: state.material.materialSelecionado,
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({
  selecionarMaterial: (material) =>
    dispatch(materialActions.selecionarMaterial(material)),
  recarregarMaterial: (materialId, linkBackEnd) =>
    dispatch(materialActions.recarregarMaterial(materialId, linkBackEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicRegMaterial);
