import React, { useState, useEffect } from "react";
import "./FormRegClientProvider.css";
import { connect } from "react-redux";
import * as PeopleActions from "../../../../store/actions/people";

function FormClientReg({
  tipoCadastroPessoa,
  pessoaSelecionada,
  selecionarPessoa,
  linkBackEnd,
  recarregarPessoa,
}) {
  const [tipoCadastro, setTipoCadastro] = useState("");
  const [dadosCadastro, setDadosCadastro] = useState({
    tipoPessoa: "",
    nome: "",
    rg: "",
    cpf: "",
    cnpj: "",
  });

  useEffect(() => {
    setTipoCadastro(tipoCadastroPessoa);
  });

  useEffect(() => {
    setDadosCadastro({
      nome: pessoaSelecionada.nomE_PESSOA,
      tipoPessoa: pessoaSelecionada.tipO_PESSOA,
      rg: pessoaSelecionada.rg ?? "",
      cpf: pessoaSelecionada.cpf ?? "",
      cnpj: pessoaSelecionada.cnpj ?? "",
    });

    setTipoCadastro(pessoaSelecionada.tipO_CADASTRO);
  }, [pessoaSelecionada.pessoA_ID]);

  const salvarCadastro = () => {
    fetch(linkBackEnd + "/pessoas/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(monstarObjPessoa()),
    })
      .then((response) => response.json())
      .then((data) => {
        recarregarPessoa(data.pessoA_ID, linkBackEnd);
      });
  };

  const deletarCadastro = () => {
    fetch(linkBackEnd + "/pessoas/" + pessoaSelecionada.pessoA_ID, {
      method: "DELETE",
    }).then(() => {
      selecionarPessoa({});
    });
  };

  const atualizarCadastro = () => {
    fetch(linkBackEnd + "/pessoas/" + pessoaSelecionada.pessoA_ID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(monstarObjPessoa()),
    }).then(() => {
      recarregarPessoa(dadosCadastro.pessoA_ID, linkBackEnd);
    });
  };

  const monstarObjPessoa = (pessoaId) => {
    return {
      pessoA_ID: dadosCadastro.pessoaId ?? pessoaId,
      nomE_PESSOA: dadosCadastro.nome,
      rg: dadosCadastro.rg,
      cpf: dadosCadastro.cpf,
      cnpj: dadosCadastro.cnpj,
      tipO_CADASTRO: tipoCadastro,
      tipO_PESSOA: dadosCadastro.tipoPessoa,
      lisT_ENDERECO: [],
      lisT_CONTATO: [],
    };
  };

  const handleInputChange = (event) => {
    setDadosCadastro({
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
            name="tipoPessoa"
            id="rd-fisica"
            value="F"
            checked={dadosCadastro.tipoPessoa == "F" ? "F" : ""}
            onChange={(event) => handleInputChange(event)}
          />
          <label className="form-check-label">Física</label>
        </div>
        <div className="form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="tipoPessoa"
            id="radio-juridica"
            value="J"
            checked={dadosCadastro.tipoPessoa == "J" ? "J" : ""}
            onChange={(event) => handleInputChange(event)}
          />
          <label className="form-check-label">Jurídica</label>
        </div>
      </div>
      <div className="form-group">
        <div className="form-row">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            name="nome"
            value={dadosCadastro.nome}
            placeholder="João da Silva"
            onChange={(event) => handleInputChange(event)}
          />
        </div>
      </div>
      {dadosCadastro.tipoPessoa == "F" && (
        <div className="form-group">
          <div className="form-row">
            <div className="col-xl-6">
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
            <div className="col-xl-6">
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
        </div>
      )}
      {dadosCadastro.tipoPessoa == "J" && (
        <div className="form-group">
          <div className="form-row">
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
      <div className="form-group">
        {!pessoaSelecionada.pessoA_ID && (
          <>
            <button
              className="btn btn-primary btn-options"
              onClick={() => salvarCadastro()}
            >
              Salvar
            </button>
          </>
        )}

        {pessoaSelecionada.pessoA_ID && (
          <>
            <button
              className="btn btn-success btn-options"
              onClick={() => atualizarCadastro()}
            >
              Atualizar
            </button>

            <button
              className="btn btn-danger btn-options"
              onClick={() => deletarCadastro()}
            >
              Deletar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  pessoaSelecionada: state.people.pessoaSelecionada,
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({
  selecionarPessoa: (pessoa) =>
    dispatch(PeopleActions.selecionarPessoa(pessoa)),
  recarregarPessoa: (pessoaId, linkBackEnd) =>
    dispatch(PeopleActions.recarregarPessoa(pessoaId, linkBackEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormClientReg);
