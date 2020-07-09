import React, { useState } from "react";
import "./SearchRegPeople.css";
import ResultSearchPeople from "./ResultSearchPeople/ResultSearchPeople";

export default function SearchRegPeople() {
  const [data, setData] = useState([]);
  const [stringPesquisa, setStringPesquisa] = useState("");
  const [showResultado, setShowResultado] = useState(false);

  const buscarPessoa = (stringPesquisa) => {
    if (!stringPesquisa) {
      fetch("http://localhost:5000/api/pessoas/")
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

      fetch("http://localhost:5000/api/pessoas/" + stringPesquisa)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setShowResultado(true);
        });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-8">
          <input
            type="text"
            name="buscaCadastro"
            className="form-control"
            id="text-busca-cliente"
            onChange={(event) => setStringPesquisa(event.target.value)}
          />
        </div>
        <div className="col-4">
          <button
            type="submit"
            id="btn-buscar"
            className="btn btn-primary"
            onClick={() => buscarPessoa(stringPesquisa)}
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <ResultSearchPeople show={showResultado} resultados={data} />{" "}
        </div>
      </div>
    </>
  );
}
