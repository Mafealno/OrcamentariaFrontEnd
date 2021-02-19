/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "./SearchRegPeople.css";
import ResultSearchPeople from "./ResultSearchPeople/ResultSearchPeople";
import { connect } from "react-redux";

function SearchRegPeople(props) {
  let [data, setData] = useState([]);
  let [showResultado, setShowResultado] = useState(false);
  let [stringPesquisa, setStringPesquisa] = useState("");

  const buscarPessoa = () => {
    if (!stringPesquisa) {
      fetch(props.linkBackEnd + "/pessoas/", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setShowResultado(true);
        });
    } else {
      if (stringPesquisa.match(/\d/)) {
        stringPesquisa = "buscar?pessoaId=" + stringPesquisa;
      } else {
        stringPesquisa = "buscar?nomePessoa=" + stringPesquisa;
      }

      fetch(props.linkBackEnd + "/pessoas/" + stringPesquisa, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setShowResultado(true);
        });
    }
  };

  const pressEnter = (event) => {
    if (event.key == "Enter") {
      buscarPessoa();
    }
  };

  const listenerClick = () => {
    setShowResultado(false);
  };

  if (showResultado) {
    window.addEventListener("click", listenerClick);
  } else {
    window.removeEventListener("click", listenerClick);
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <input
            type="text"
            name="buscaCadastro"
            className="form-control"
            id="text-busca-cliente"
            onChange={(event) => setStringPesquisa(event.target.value)}
            onKeyDown={(event) => pressEnter(event)}
          />
        </div>
        <div className="col-4 div-buscar-pessoas">
          <button
            type="submit"
            id="btn-buscar-pessoas"
            className="btn btn-primary"
            onClick={() => buscarPessoa()}
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ResultSearchPeople
            id="id-resultados"
            show={showResultado}
            resultados={data}
          />
        </div>
        <div className="col-4 div-buscar-pessoas"></div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchRegPeople);
