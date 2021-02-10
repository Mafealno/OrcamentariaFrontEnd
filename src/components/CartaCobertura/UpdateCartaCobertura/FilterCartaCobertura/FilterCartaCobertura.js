/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "./FilterCartaCobertura.css";
import SelecaoFiltroSimples from "../../../SelecaoFiltroSimples/SelecaoFiltroSimples";
import * as cartaCoberturaActions from "../../../../store/actions/cartaCobertura";
import { connect } from "react-redux";

function FilterCartaCobertura(props) {
  let [stringPesquisa, setStringPesquisa] = useState("");
  let [filtrarPor, setFiltrarPor] = useState("Material");
  let [filtrado, setFiltrado] = useState(false);

  const itensFiltro = 
  [
    {
      nome: "Material", 
      valor: "Material", 
      selecionado: true
    }, 
    { 
      nome: "Fabricante", 
      valor: "Fabricante", 
      selecionado: false 
    }
  ]

  const filtrarCartaCobertura = () => {
    if (stringPesquisa && !filtrado) {
      props.filtrarListCartaCoberturaEditar(
        props.listCartaCoberturaEditar,
        filtrarPor,
        stringPesquisa,
        setFiltrado(true)
      );
    }
  };

  const resetarFiltro = () => {
    props.listarCartaCoberturaEditar(props.linkBackEnd, setFiltrado(false));
  };

  const pressEnter = (event) => {
    if (event.key == "Enter") {
      filtrarCartaCobertura();
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
            onClick={() => filtrarCartaCobertura()}
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
  listCartaCoberturaEditar: state.cartaCobertura.listCartaCoberturaEditar,
});

const mapDispatchToProps = (dispatch) => ({
  filtrarListCartaCoberturaEditar: (
    listCartaCoberturaEditar,
    filtrarPor,
    stringFiltro
  ) =>
    dispatch(
      cartaCoberturaActions.filtrarListCartaCoberturaEditar(
        listCartaCoberturaEditar,
        filtrarPor,
        stringFiltro
      )
    ),
  listarCartaCoberturaEditar: (linkBackEnd) =>
    dispatch(cartaCoberturaActions.listarCartaCoberturaEditar(linkBackEnd)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterCartaCobertura);
