import React, { useState, useEffect } from "react";
import "./BasicRegPeople.css";
import FormRegClientProvider from "./FormRegClientProvider/FormRegClientProvider";
import FormRegEmployee from "./FormRegEmployee/FormRegEmployee";
import * as PeopleActions from "../../../store/actions/people";
import { connect } from "react-redux";

function BasicRegPeople({ pessoaSelecionada, selecionarPessoa }) {
  const [tipoCadastro, setTipoCadastro] = useState("naoSelecionado");
  const [pessoaId, setPessoaId] = useState("");

  useEffect(() => {
    setPessoaId(pessoaSelecionada.pessoA_ID ?? "");
    setTipoCadastro(pessoaSelecionada.tipO_CADASTRO ?? "");
  }, [pessoaSelecionada.pessoA_ID]);

  return (
    <div className="form">
      <div className="container-form">
        <div className="form-group">
          <div className="form-row">
            <label className="col-form-label">Código: </label>
            <input
              type="text"
              className="form-control-plaintext"
              name="pessoaId"
              value={pessoaId}
              id="input-pessoa-id"
              onChange={(event) => setPessoaId(event.target.value)}
              readOnly
            />
            {pessoaSelecionada.pessoA_ID && (
              <>
                <div className="close-select-people">
                  <a href="#" onClick={() => selecionarPessoa({})}>
                    <span className="fa fa-close close-select-people"></span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <label>Tipo de Cadastro</label>
            <select
              id="select-tipo-cadstro"
              className="form-control"
              value={tipoCadastro}
              onChange={(event) => setTipoCadastro(event.target.value)}
            >
              <option value="naoSelecionado">Escolher...</option>
              <option value="Cliente">Cliente</option>
              <option value="Fornecedor">Fornecedor</option>
              <option value="Funcionario">Funcionário</option>
            </select>
          </div>
        </div>
        {tipoCadastro === "Cliente" ? (
          <FormRegClientProvider
            tipoCadastroPessoa={tipoCadastro}
          ></FormRegClientProvider>
        ) : (
          tipoCadastro === "Fornecedor" && (
            <FormRegClientProvider
              tipoCadastroPessoa={tipoCadastro}
            ></FormRegClientProvider>
          )
        )}
        {tipoCadastro === "Funcionario" && <FormRegEmployee></FormRegEmployee>}
        <div className="form-group btn-salvar"></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  pessoaSelecionada: state.people.pessoaSelecionada,
});

const mapDispatchToProps = (dispatch) => ({
  selecionarPessoa: (pessoa) =>
    dispatch(PeopleActions.selecionarPessoa(pessoa)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicRegPeople);
