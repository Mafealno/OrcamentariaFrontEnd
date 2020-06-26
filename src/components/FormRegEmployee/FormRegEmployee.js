import React, { useState } from "react";
import "./FormRegEmployee.css";

export default function FormRegEmployee() {
  const [dadosCadastro, setDados] = useState({
    tipo: "F",
    rg: "",
    cpf: "",
    cargo: "pintor",
    valorDiario: "",
    dataAdmissao: "",
    status: "ativo",
  });

  const handleInputChange = (event) => {
    setDados({
      ...dadosCadastro,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="form-group">
      <div className="form-group">
        <label>Nome Completo</label>
        <input
          type="text"
          className="form-control"
          id="nome"
          placeholder="João da Silva"
        />
      </div>
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
      <div className="form-row">
        <div className="col">
          <label>Cargo</label>
          <select
            id="select-cargo"
            name="cargo"
            value={dadosCadastro.cargo}
            className="form-control"
            onChange={(event) => handleInputChange(event)}
          >
            <option value="pintor">Pintor</option>
            <option value="ajudante">Ajudante</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div className="col">
          <label>Valor Diário</label>
          <input
            type="number"
            name="valorDiario"
            value={dadosCadastro.valorDiario}
            className="form-control"
            id="txt-valorDiario"
            placeholder="100"
            onChange={(event) => handleInputChange(event)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="col">
          <label>Data de Admissão</label>
          <input
            type="date"
            name="dataAdmissao"
            value={dadosCadastro.dataAdmissao}
            className="form-control"
            id="txt-data-admissao"
            placeholder="00/00/0000"
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="col">
          <label>Status</label>
          <select
            id="select-status"
            name="status"
            value={dadosCadastro.status}
            className="form-control"
            onChange={(event) => handleInputChange(event)}
          >
            <option value="ativo">Ativo</option>
            <option value="nao_ativo">Não Ativo</option>
          </select>
        </div>
      </div>
    </div>
  );
}
