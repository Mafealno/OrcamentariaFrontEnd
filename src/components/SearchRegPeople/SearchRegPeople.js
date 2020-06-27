import React from "react";
import "./SearchRegPeople.css";

export default function SearchRegPeople() {
  return (
    <div className="row">
      <div className="col-8">
        <input
          type="text"
          name="buscaCadastro"
          className="form-control"
          id="text-busca-cliente"
        />
      </div>
      <div className="col-4">
        <button type="submit" id="btn-buscar" className="btn btn-primary">
          Buscar
        </button>
      </div>
    </div>
  );
}
