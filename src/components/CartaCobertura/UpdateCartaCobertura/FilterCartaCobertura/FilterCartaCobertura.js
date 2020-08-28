import React, { useState } from "react";
import "./FilterCartaCobertura.css";
import * as cartaCoberturaActions from "../../../../store/actions/cartaCobertura";
import { connect } from "react-redux";

function FilterCartaCobertura(props) {
  let [stringPesquisa, setStringPesquisa] = useState("");
  let [filtrarPor, setFiltrarPor] = useState("Material");
  let [filtrado, setFiltrado] = useState(false);

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
    if (event.key === "Enter") {
      filtrarCartaCobertura();
    }
  };

  return (
    <>
      <div className="row">
        <div className="col col-xl-8">
          <input
            type="text"
            name="buscaCadastro"
            className="form-control"
            id="text-busca-material"
            onChange={(event) => setStringPesquisa(event.target.value)}
            onKeyDown={(event) => pressEnter(event)}
          />
        </div>
        <div className={filtrado ? "col-4 showReset" : "hideReset"}>
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
      <div className="row padding">
        <label className="form-check-inline-filter">Filtrar por:</label>
        <div className="form-check-inline-filter">
          <input
            className="form-check-input"
            type="radio"
            name="tipoFiltro"
            id="radio-material"
            value="Material"
            onChange={(event) => setFiltrarPor(event.target.value)}
            defaultChecked
          />
          <label className="form-check-label">Material</label>
        </div>

        <div className="form-check-inline-filter">
          <input
            className="form-check-input"
            type="radio"
            name="tipoFiltro"
            id="radio-fabricante"
            value="Fabricante"
            onChange={(event) => setFiltrarPor(event.target.value)}
          />
          <label className="form-check-label">Fabricante</label>
        </div>
      </div>
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
