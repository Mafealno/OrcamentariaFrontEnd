import React, { useState } from "react";
import "./FilterCartaCobertura.css";
import ItemCartaCobertura from "../ListCartaCobertura/ItemCartaCobertura";

export default function FilterCartaCobertura() {
  let [stringPesquisa, setStringPesquisa] = useState("");

  const filtrarCartaCobertura = () => {};

  const pressEnter = (event) => {
    if (event.key === "Enter") {
      filtrarCartaCobertura();
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
          <button type="submit" id="btn-buscar-material" className="btn">
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
            value="material"
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
            value="fabricante"
          />
          <label className="form-check-label">Fabricante</label>
        </div>
      </div>
    </>
  );
}
