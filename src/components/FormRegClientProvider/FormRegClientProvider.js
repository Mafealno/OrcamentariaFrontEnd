import React, { useState } from "react";
import "./FormRegClientProvider.css";

export default function FormClientReg() {
  const [dadosCadastro, setDados] = useState({
    tipo: "",
    rg: "",
    cpf: "",
  });

  const handleInputChange = (event) => {
    setDados({
      ...dadosCadastro,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="form-group">
      <div className="form-group check">
        <div className="form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="tipo"
            id="rd-fisica"
            value="F"
            onChange={(event) => handleInputChange(event)}
          />
          <label className="form-check-label">Física</label>
        </div>
        <div className="form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="tipo"
            id="radio-juridica"
            value="J"
            onChange={(event) => handleInputChange(event)}
          />
          <label className="form-check-label">Jurídica</label>
        </div>
      </div>
      <div className="form-group">
        <label>Nome</label>
        <input
          type="text"
          className="form-control"
          id="nome"
          placeholder="João da Silva"
        />
      </div>
      {dadosCadastro.tipo === "F" && (
        <div className="form-group">
          <div className="form-group">
            <label>RG</label>
            <input
              type="text"
              value={dadosCadastro.rg}
              className="form-control"
              id="txt-rg"
              name="rg"
              placeholder="00.000.000-0"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="form-group">
            <label>CPF</label>
            <input
              type="text"
              name="cpf"
              className="form-control"
              value={dadosCadastro.cpf}
              id="txt-cpf"
              placeholder="000.000.000-00"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
        </div>
      )}
      {dadosCadastro.tipo === "J" && (
        <div className="form-group">
          <div className="form-group">
            <label>CNPJ</label>
            <input
              type="text"
              className="form-control"
              id="txt-cnpj"
              name="cnpj"
              value={dadosCadastro.cnpj}
              placeholder="00.000.000/0000-00"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
