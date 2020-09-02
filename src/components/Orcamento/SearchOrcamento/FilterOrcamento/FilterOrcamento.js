import React, { useState } from "react";
import "./FilterOrcamento.css";
import * as orcamentoActions from "../../../../store/actions/orcamento";
import { connect } from "react-redux";

function FilterOrcamento(props) {
  let [stringPesquisa, setStringPesquisa] = useState("");
  let [filtrarPor, setFiltrarPor] = useState("Orcamento");
  let [filtrado, setFiltrado] = useState(false);

  const filtrarOrcamento = () => {
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
      <div className="row padding">
        <label className="form-check-inline-filter">Filtrar por:</label>
        <div className="form-check-inline-filter">
          <input
            className="form-check-input"
            type="radio"
            name="tipoFiltro"
            id="radio-orcamento"
            value="Orcamento"
            onChange={(event) => setFiltrarPor(event.target.value)}
            defaultChecked
          />
          <label className="form-check-label"> Orcamento</label>
        </div>

        <div className="form-check-inline-filter">
          <input
            className="form-check-input"
            type="radio"
            name="tipoFiltro"
            id="radio-cliente"
            value="Cliente"
            onChange={(event) => setFiltrarPor(event.target.value)}
          />
          <label className="form-check-label"> Cliente</label>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listCartaCoberturaEditar: state.cartaCobertura.listCartaCoberturaEditar,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FilterOrcamento);
