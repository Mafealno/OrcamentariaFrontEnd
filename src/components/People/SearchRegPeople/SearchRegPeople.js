import React, { useState } from "react";
import "./SearchRegPeople.css";
import ResultSearchPeople from "./ResultSearchPeople/ResultSearchPeople";
import { getElementError } from "@testing-library/react";

export default function SearchRegPeople() {
  const [data, setData] = useState([]);
  const [stringPesquisa, setStringPesquisa] = useState("");
  const [showResultado, setShowResultado] = useState(false);

  const buscarPessoa = (stringPesquisa) => {
    if (!stringPesquisa) {
      fetch("http://localhost:5000/api/pessoas/", {
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

      fetch("http://localhost:5000/api/pessoas/" + stringPesquisa, {
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
    if (event.key === "Enter") {
      buscarPessoa(stringPesquisa);
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
            onClick={() => buscarPessoa(stringPesquisa)}
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
          ></ResultSearchPeople>
        </div>
        <div className="col-4 div-buscar-pessoas"></div>
      </div>
    </>
  );
}
