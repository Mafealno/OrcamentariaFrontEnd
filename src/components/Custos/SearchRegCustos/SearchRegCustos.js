/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "./SearchRegCustos.css";
import ResultSearchCustos from "./ResultSearchCustos/ResultSearchCustos";
import { connect } from "react-redux";

function SearchRegCustos(props) {
  let [data, setData] = useState([]);
  let [stringPesquisa, setStringPesquisa] = useState("");
  let [showResultado, setShowResultado] = useState(false);

  const buscarCusto = () => {
    if (!stringPesquisa) {
      fetch(props.linkBackEnd + "/custo/", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setShowResultado(true);
        });
    } else {
      if (stringPesquisa.match(/\d/)) {
        stringPesquisa = "buscar?custoId=" + stringPesquisa;
      } else {
        stringPesquisa = "buscar?nomeCusto=" + stringPesquisa;
      }

      fetch(props.linkBackEnd + "/custo/" + stringPesquisa, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setShowResultado(true);
        });
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

  const pressEnter = (event) => {
    if (event.key == "Enter") {
      buscarCusto();
    }
  };
  return (
    <>
      <div className="row">
        <div className="col">
          <input
            type="text"
            name="buscaCadastro"
            className="form-control"
            id="text-busca-custos"
            onChange={(event) => setStringPesquisa(event.target.value)}
            onKeyDown={(event) => pressEnter(event)}
          />
        </div>
        <div className="col-4 div-buscar-custos">
          <button
            type="submit"
            id="btn-buscar-custos"
            className="btn"
            onClick={() => buscarCusto()}
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ResultSearchCustos
            id="id-resultados"
            show={showResultado}
            resultados={data}
          />
        </div>
        <div className="col-4 div-buscar-custos"></div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchRegCustos);
