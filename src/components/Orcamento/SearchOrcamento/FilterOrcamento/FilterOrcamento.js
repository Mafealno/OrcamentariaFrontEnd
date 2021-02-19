/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "./FilterOrcamento.css";
import SelecaoFiltroSimples from "../../../SelecaoFiltroSimples/SelecaoFiltroSimples";
import * as orcamentoActions from "../../../../store/actions/orcamento";
import { connect } from "react-redux";

function FilterOrcamento(props) {
  let [stringPesquisa, setStringPesquisa] = useState("");
  let [filtrarPor, setFiltrarPor] = useState("Orcamento");
  let [filtrado, setFiltrado] = useState(false);

  const itensFiltro = 
  [
    {
      nome: "Orcamento", 
      valor: "Orcamento", 
      selecionado: true
    }, 
    { 
      nome: "Cliente", 
      valor: "Cliente", 
      selecionado: false 
    }
  ]

  const filtrarOrcamento = () => {
    if (stringPesquisa && !filtrado) {
      props.filtrarListOrcamentoEditar(
        props.listOrcamento,
        filtrarPor,
        stringPesquisa,
        setFiltrado(true)
      );
    }
  };

  const resetarFiltro = () => {
    props.listarOrcamento(props.linkBackEnd, setFiltrado(false));
  };

  const pressEnter = (event) => {
    if (event.key == "Enter") {
      filtrarOrcamento();
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-8 col">
          <input
            type="text"
            name="buscaCadastro"
            className="form-control"
            id="text-busca-material"
            onChange={(event) => setStringPesquisa(event.target.value)}
            onKeyDown={(event) => pressEnter(event)}
          />
        </div>
        <div className={filtrado ? "col-xl col-4  showReset" : "hideReset"}>
          <button
            type="button"
            className="btn btn-resetar-filtro"
            onClick={() => resetarFiltro()}
          >
            Resetar
          </button>
        </div>
        <div className="col div-buscar-material">
          <button
            type="submit"
            id="btn-buscar-material"
            className="btn"
            disabled={filtrado}
            onClick={() => filtrarOrcamento()}
          >
            Buscar
          </button>
        </div>
      </div>
      <SelecaoFiltroSimples 
        camposMontar={itensFiltro}
        retornarFiltro={(valor)=> setFiltrarPor(valor)} 
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listOrcamento: state.orcamento.listOrcamento,
});

const mapDispatchToProps = (dispatch) => ({
  filtrarListOrcamentoEditar : (
    listOrcamentoEditar,
    filtrarPor,
    stringFiltro
  ) =>
    dispatch(
      orcamentoActions.filtrarListOrcamentoEditar(
        listOrcamentoEditar,
        filtrarPor,
        stringFiltro
      )
    ),
    listarOrcamento: (
      linkBackEnd
    ) => dispatch(
      orcamentoActions.listarOrcamento(
        linkBackEnd
        )
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterOrcamento);
