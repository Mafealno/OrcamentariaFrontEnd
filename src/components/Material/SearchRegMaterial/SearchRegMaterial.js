/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "./SearchRegMaterial.css";
import ResultSearchMaterial from "./ResultSearchMaterial/ResultSearchMaterial";
import ResetTelas from "../../ResetTelas/ResetTelas";
import { connect } from "react-redux";

function SearchRegMaterial(props) {
  let [data, setData] = useState([]);
  let [stringPesquisa, setStringPesquisa] = useState("");
  let [showResultado, setShowResultado] = useState(false);

  const buscarMaterial = () => {
    if (!stringPesquisa) {
      fetch(props.linkBackEnd + "/material/", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setShowResultado(true);
        });
    } else {
      if (stringPesquisa.match(/\d/)) {
        stringPesquisa = "buscar?materialId=" + stringPesquisa;
      } else {
        stringPesquisa = "buscar?nomeMaterial=" + stringPesquisa;
      }

      fetch(props.linkBackEnd + "/material/" + stringPesquisa, {
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
      buscarMaterial();
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
            id="text-busca-material"
            onChange={(event) => setStringPesquisa(event.target.value)}
            onKeyDown={(event) => pressEnter(event)}
          />
        </div>
        <div className="col-4 div-buscar-material">
          <button
            type="submit"
            id="btn-buscar-material"
            className="btn"
            onClick={() => buscarMaterial()}
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ResultSearchMaterial
            id="id-resultados"
            show={showResultado}
            resultados={data}
          />
        </div>
        <div className="col-4 div-buscar-material"></div>
      </div>
      <>
        <ResetTelas />
      </>
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchRegMaterial);
