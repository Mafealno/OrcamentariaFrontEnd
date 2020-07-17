import React, { useState, useEffect } from "react";
import "./FormRegEmployee.css";
import { connect } from "react-redux";
import * as PeopleActions from "../../../../store/actions/people";

function FormRegEmployee({
  pessoaSelecionada,
  selecionarPessoa,
  linkBackEnd,
  recarregarPessoa,
}) {
  const [dadosCadastro, setDados] = useState({
    nome: "",
    tipo: "F",
    rg: "",
    cpf: "",
    cargo: "pintor",
    valorDiario: 0,
    dataAdmissao: "",
    status: "Ativo",
  });

  const montarObj = (pessoaId) => {
    return {
      pessoA_ID: dadosCadastro.pessoaId ?? pessoaId,
      nomE_PESSOA: dadosCadastro.nome,
      rg: dadosCadastro.rg,
      cpf: dadosCadastro.cpf,
      cnpj: dadosCadastro.cnpj,
      cargO_FUNCIONARIO: dadosCadastro.cargo,
      valoR_DIARIO: dadosCadastro.valorDiario,
      datA_ADMISSAO: dadosCadastro.dataAdmissao,
      valoR_DIA_TRABALHADO: parseFloat(dadosCadastro.valorDiario),
      statuS_FUNCIONARIO: dadosCadastro.status,
      tipO_CADASTRO: "Funcionario",
      tipO_PESSOA: dadosCadastro.tipo,
      lisT_ENDERECO: [],
      lisT_CONTATO: [],
    };
  };
  useEffect(() => {
    if (
      pessoaSelecionada.pessoA_ID &&
      pessoaSelecionada.tipO_CADASTRO == "Funcionario"
    ) {
      fetch(
        linkBackEnd +
          "/funcionario/buscar?pessoaId=" +
          pessoaSelecionada.pessoA_ID,
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((data) => {
          setDados({
            nome: data[0].nomE_PESSOA,
            tipo: data[0].tipO_PESSOA,
            rg: data[0].rg,
            cpf: data[0].cpf,
            cargo: data[0].cargO_FUNCIONARIO,
            valorDiario: data[0].valoR_DIA_TRABALHADO,
            dataAdmissao: data[0].datA_ADMISSAO.replace("T00:00:00", ""),
            status: data[0].statuS_FUNCIONARIO,
          });
        });
    }
  }, [pessoaSelecionada.pessoA_ID]);

  const salvarCadastroFuncionario = () => {
    fetch(linkBackEnd + "/funcionario/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj()),
    })
      .then((response) => response.json())
      .then((data) => {
        recarregarPessoa(data.pessoA_ID, linkBackEnd);
      });
  };

  const atualizarCadastro = () => {
    fetch(linkBackEnd + "/funcionario/" + pessoaSelecionada.pessoA_ID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj()),
    }).then(() => {
      recarregarPessoa(dadosCadastro.pessoaId, linkBackEnd);
    });
  };

  const deletarCadastroFuncionario = () => {
    fetch(linkBackEnd + "/funcionario/" + pessoaSelecionada.pessoA_ID, {
      method: "DELETE",
    }).then(() => {
      selecionarPessoa({});
    });
  };

  const handleInputChange = (event) => {
    setDados({
      ...dadosCadastro,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <div className="form-row">
        <label>Nome Completo</label>
        <input
          type="text"
          className="form-control"
          name="nome"
          value={dadosCadastro.nome}
          placeholder="João da Silva"
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className="form-group">
        <div className="form-row">
          <div className="col-xl-6 div-rg">
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
      <div className="form-group">
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
              <option value="Pintor">Pintor</option>
              <option value="Ajudante">Ajudante</option>
              <option value="Outro">Outro</option>
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
      </div>
      <div className="form-group">
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
              <option value="Ativo">Ativo</option>
              <option value="Nao_Ativo">Não Ativo</option>
            </select>
          </div>
        </div>
        <div className="form-group btn-salvar">
          {!pessoaSelecionada.pessoA_ID && (
            <>
              <button
                className="btn btn-primary btn-options"
                onClick={() => salvarCadastroFuncionario()}
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
                onClick={() => deletarCadastroFuncionario()}
              >
                Deletar
              </button>
            </>
          )}
        </div>
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormRegEmployee);
