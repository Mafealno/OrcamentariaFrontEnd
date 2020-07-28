import React, { useState, useEffect } from "react";
import "./BasicRegEquipamento.css";
import ResultSearchProvider from "./ResultSearchProvider/ResultSearchProvider";
import { connect } from "react-redux";
import * as EquipamentoActions from "../../../store/actions/equipamento";

function BasicRegEquipamento(props) {
  var [stringBuscaFabricante, setStringBuscaFabricante] = useState("");
  const [showResultadoFabricante, setShowResultadoFabricante] = useState(false);
  const [dataFabricantes, setDataFabricantes] = useState([]);

  const [dadosCadastro, setDadosCadastro] = useState({
    equipamentoId: "",
    nomeEquipamento: "",
    descricao: "",
  });

  const [dadosFabricante, setDadosFabricante] = useState({
    pessoaId: "",
    nomePessoa: "",
  });

  useEffect(() => {
    setDadosCadastro({
      equipamentoId: props.equipamentoSelecionado.equipamentO_ID ?? "",
      nomeEquipamento: props.equipamentoSelecionado.nomE_EQUIPAMENTO ?? "",
      descricao: props.equipamentoSelecionado.descricao ?? "",
    });

    if (props.equipamentoSelecionado.equipamentO_ID) {
      setDadosFabricante({
        pessoaId: props.equipamentoSelecionado.fabricante.pessoA_ID,
        nomePessoa: props.equipamentoSelecionado.fabricante.nomE_PESSOA,
      });
    } else {
      setDadosFabricante({
        pessoaId: "",
        nomePessoa: "",
      });
    }
  }, [props.equipamentoSelecionado.equipamentO_ID]);

  const montarObj = () => {
    return {
      equipamentO_ID:
        dadosCadastro.equipamentoId == "" ? 0 : dadosCadastro.equipamentoId,
      nomE_EQUIPAMENTO: dadosCadastro.nomeEquipamento,
      descricao: dadosCadastro.descricao,
      fabricante: {
        pessoA_ID: dadosFabricante.pessoaId,
        nomE_PESSOA: dadosFabricante.nomePessoa,
        rg: "",
        cpf: "",
        cnpj: "",
        tipO_CADASTRO: "",
        tipO_PESSOA: "",
        lisT_ENDERECO: [],
        lisT_CONTATO: [],
      },
    };
  };

  const salvarCadastro = () => {
    fetch(props.linkBackEnd + "/equipamento/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj()),
    })
      .then((response) => response.json())
      .then((data) => {
        props.recarregarEquipamento(data.equipamentO_ID, props.linkBackEnd);
      });
  };

  const deletarCadastro = () => {
    fetch(
      props.linkBackEnd +
        "/equipamento/" +
        props.equipamentoSelecionado.equipamentO_ID,
      {
        method: "DELETE",
      }
    ).then(() => {
      props.selecionarEquipamento({});
    });
  };

  const atualizarCadastro = () => {
    fetch(
      props.linkBackEnd +
        "/equipamento/" +
        props.equipamentoSelecionado.equipamentO_ID,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(montarObj()),
      }
    ).then(() => {
      props.recarregarEquipamento(
        dadosCadastro.equipamentoId,
        props.linkBackEnd
      );
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
              return fabricante.tipO_CADASTRO == "Fornecedor";
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
              return fabricante.tipO_CADASTRO == "Fornecedor";
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
              name="equipamentoId"
              value={dadosCadastro.equipamentoId}
              id="input-equipamento-id"
              readOnly
            />
            {props.equipamentoSelecionado.equipamentO_ID && (
              <>
                <div className="close-select-equipamento">
                  <a href="#" onClick={() => props.selecionarEquipamento({})}>
                    <span className="fa fa-close close-select-equipamento"></span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <div className="col-xl div-nome-equipamento">
              <label className="col-form-label">Nome</label>
              <input
                type="text"
                placeholder="Ex: Lixadeira sem pó"
                className="form-control"
                name="nomeEquipamento"
                value={dadosCadastro.nomeEquipamento}
                id="input-equipamento-nome"
                onChange={(event) => handleInputChange(event)}
              />
            </div>
          </div>
        </div>
        <div className="form-group width-99-5">
          <div className="form-row">
            <label className="col-form-label">Descrição do equipamento</label>
            <textarea
              className="form-control"
              rows="5"
              name="descricao"
              value={dadosCadastro.descricao}
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
                          pessoaId: fabricante.pessoA_ID,
                          nomePessoa: fabricante.nomE_PESSOA,
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
            {!props.equipamentoSelecionado.equipamentO_ID && (
              <button
                type="button"
                className="btn btn-primary btn-options"
                onClick={() => salvarCadastro()}
              >
                Salvar
              </button>
            )}

            {props.equipamentoSelecionado.equipamentO_ID && (
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
  equipamentoSelecionado: state.equipamento.equipamentoSelecionado,
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({
  selecionarEquipamento: (equipamento) =>
    dispatch(EquipamentoActions.selecionarEquipamento(equipamento)),
  recarregarEquipamento: (equipamentoId, linkBackEnd) =>
    dispatch(
      EquipamentoActions.recarregarEquipamento(equipamentoId, linkBackEnd)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicRegEquipamento);
