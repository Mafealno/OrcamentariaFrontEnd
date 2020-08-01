import React, { useState, useEffect } from "react";
import "./BasicRegMaterial.css";
import ResultSearchProvider from "./ResultSearchProvider/ResultSearchProvider";
import { connect } from "react-redux";
import * as MaterialActions from "../../../store/actions/material";

function BasicRegMaterial(props) {
  let [stringBuscaFabricante, setStringBuscaFabricante] = useState("");
  let [showResultadoFabricante, setShowResultadoFabricante] = useState(false);
  let [dataFabricantes, setDataFabricantes] = useState([]);

  let [dadosCadastro, setDadosCadastro] = useState({
    materialId: "",
    nomeMaterial: "",
    descricaoMaterial: "",
    tipoMaterial: "",
  });

  let [dadosFabricante, setDadosFabricante] = useState({
    pessoaId: "",
    nomePessoa: "",
  });

  useEffect(() => {
    setDadosCadastro({
      materialId: props.materialSelecionado.MATERIAL_ID ?? "",
      nomeMaterial: props.materialSelecionado.NOME_MATERIAL ?? "",
      descricaoMaterial: props.materialSelecionado.DESCRICAO_MATERIAL ?? "",
      tipoMaterial: props.materialSelecionado.TIPO_MATERIAL ?? "",
    });

    if (props.materialSelecionado.MATERIAL_ID) {
      setDadosFabricante({
        pessoaId: props.materialSelecionado.FABRICANTE.PESSOA_ID,
        nomePessoa: props.materialSelecionado.FABRICANTE.NOME_PESSOA,
      });
    } else {
      setDadosFabricante({
        pessoaId: "",
        nomePessoa: "",
      });
    }
  }, [props.materialSelecionado.MATERIAL_ID]);

  const montarObj = () => {
    return {
      MATERIAL_ID:
        dadosCadastro.materialId == "" ? 0 : dadosCadastro.materialId,
      NOME_MATERIAL: dadosCadastro.nomeMaterial,
      DESCRICAO_MATERIAL: dadosCadastro.descricaoMaterial,
      TIPO_MATERIAL: dadosCadastro.tipoMaterial,
      FABRICANTE: {
        PESSOA_ID: dadosFabricante.pessoaId,
        NOME_PESSOA: dadosFabricante.nomePessoa,
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

  const salvarCadastro = () => {
    fetch(props.linkBackEnd + "/material/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj()),
    })
      .then((response) => response.json())
      .then((data) => {
        props.recarregarMaterial(data.MATERIAL_ID, props.linkBackEnd);
      });
  };

  const deletarCadastro = () => {
    fetch(
      props.linkBackEnd + "/material/" + props.materialSelecionado.MATERIAL_ID,
      {
        method: "DELETE",
      }
    ).then(() => {
      props.selecionarMaterial({});
    });
  };

  const atualizarCadastro = () => {
    fetch(
      props.linkBackEnd + "/material/" + props.materialSelecionado.MATERIAL_ID,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(montarObj()),
      }
    ).then(() => {
      props.recarregarMaterial(dadosCadastro.materialId, props.linkBackEnd);
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
    if (event.key === "Enter") {
      buscarFabricantes();
    }
  };

  const handleInputChange = (event) => {
    setDadosCadastro({
      ...dadosCadastro,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="form">
      <div className="container-form">
        <div className="form-group">
          <div className="form-row">
            <label className="col-form-label">Código: </label>
            <input
              type="text"
              className="form-control-plaintext"
              name="materialId"
              value={dadosCadastro.materialId}
              id="input-material-id"
              readOnly
            />
            {props.materialSelecionado.MATERIAL_ID && (
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
              <label className="col-form-label">Nome</label>
              <input
                type="text"
                placeholder="Ex: Tinta Acrílica"
                className="form-control"
                name="nomeMaterial"
                value={dadosCadastro.nomeMaterial}
                id="input-material-nome"
                onChange={(event) => handleInputChange(event)}
              />
            </div>
            <div className="col-xl-4">
              <label className="col-form-label">Tipo do material</label>
              <input
                type="text"
                placeholder="Ex: Tinta"
                className="form-control"
                name="tipoMaterial"
                value={dadosCadastro.tipoMaterial}
                id="input-tipo-material"
                onChange={(event) => handleInputChange(event)}
              />
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
              value={dadosCadastro.descricaoMaterial}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
        </div>
        <fieldset>
          <legend>Dados do fabricante</legend>
          <div id="container-fabricante">
            <div id="buscaFabricante">
              <div className="form-group">
                <div className="row">
                  <div className="col-xl">
                    <input
                      className="form-control"
                      placeholder="Buscar Fabricante"
                      name="buscarFabricante"
                      onChange={(event) =>
                        setStringBuscaFabricante(event.target.value)
                      }
                      onKeyDown={(event) => pressEnter(event)}
                    />
                  </div>
                  <div className="col-xl-3 div-btn-buscar-fabricante">
                    <button
                      type="button"
                      className="btn"
                      id="btn-buscar-fabricante"
                      onClick={() => buscarFabricantes()}
                    >
                      Buscar fabricante
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
                        setDadosFabricante({
                          pessoaId: fabricante.PESSOA_ID,
                          nomePessoa: fabricante.NOME_PESSOA,
                        })
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
                      value={dadosFabricante.pessoaId}
                      onChange={(event) => handleInputChange(event)}
                      readOnly
                    />
                  </div>
                  <div className="col-xl-9">
                    <label className="col-form-label">Nome do Fabricante</label>
                    <input
                      className="form-control"
                      name="nomePessoa"
                      value={dadosFabricante.nomePessoa}
                      onChange={(event) => handleInputChange(event)}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
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

            {props.materialSelecionado.MATERIAL_ID && (
              <>
                <button
                  type="button"
                  className="btn btn-success btn-options"
                  onClick={() => atualizarCadastro()}
                >
                  Atualizar
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-options"
                  onClick={() => deletarCadastro()}
                >
                  Deletar
                </button>
              </>
            )}
          </div>
        </div>
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
    dispatch(MaterialActions.selecionarMaterial(material)),
  recarregarMaterial: (materialId, linkBackEnd) =>
    dispatch(MaterialActions.recarregarMaterial(materialId, linkBackEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicRegMaterial);
