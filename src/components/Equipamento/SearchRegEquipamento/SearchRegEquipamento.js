import React, { useState } from "react";
import "./SearchRegEquipamento.css";
import ResultSearchEquipamento from "./ResultSearchEquipamento/ResultSearchEquipamento";

import { connect } from "react-redux";

function SearchRegEquipamento(props) {
  const [data, setData] = useState([]);
  const [stringPesquisa, setStringPesquisa] = useState("");
  const [showResultado, setShowResultado] = useState(false);

  const buscarEquipamento = () => {
    if (!stringPesquisa) {
      fetch(props.linkBackEnd + "/equipamento/", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setShowResultado(true);
        });
    } else {
      if (stringPesquisa.match(/\d/)) {
        stringPesquisa = "buscar?equipamentoId=" + stringPesquisa;
      } else {
        stringPesquisa = "buscar?nomeEquipamento=" + stringPesquisa;
      }

      fetch(props.linkBackEnd + "/equipamento/" + stringPesquisa, {
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
    if (event.key === "Enter") {
      buscarEquipamento();
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
            id="text-busca-equipamento"
            onChange={(event) => setStringPesquisa(event.target.value)}
            onKeyDown={(event) => pressEnter(event)}
          />
        </div>
        <div className="col-4 div-buscar-equipamento">
          <button
            type="submit"
            id="btn-buscar-equipamento"
            className="btn"
            onClick={() => buscarEquipamento()}
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ResultSearchEquipamento
            id="id-resultados"
            show={showResultado}
            resultados={data}
          />
        </div>
        <div className="col-4 div-buscar-equipamento"></div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchRegEquipamento);
