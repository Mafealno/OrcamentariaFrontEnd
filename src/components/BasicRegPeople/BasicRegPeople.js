import React, { useState } from "react";
import "./BasicRegPeople.css";
import FormRegClientProvider from "../FormRegClientProvider";
import FormRegEmployee from "../FormRegEmployee";

export default function BasicRegPeople() {
  const [tipoCadastro, setCadastro] = useState("");

  return (
    <div className="form">
      <form>
        <div className="form-inline">
          <label className="label-codigo">Código</label>
          <input
            type="text"
            className="form-control-plaintext"
            id="form-pessoa-id"
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Tipo de Cadastro</label>
          <select
            id="select-tipo-cadstro"
            className="form-control"
            onChange={(event) => setCadastro(event.target.value)}
          >
            <option value="naoSelecionado">Escolher...</option>
            <option value="cliente">Cliente</option>
            <option value="fornecedor">Fornecedor</option>
            <option value="funcionario">Funcionário</option>
          </select>
        </div>
        {tipoCadastro === "cliente" ? (
          <FormRegClientProvider></FormRegClientProvider>
        ) : (
          tipoCadastro === "fornecedor" && (
            <FormRegClientProvider></FormRegClientProvider>
          )
        )}
        {tipoCadastro === "funcionario" && <FormRegEmployee></FormRegEmployee>}

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
