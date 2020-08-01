import React, { useState, useEffect } from "react";
import "./FormRegEmployee.css";
import { connect } from "react-redux";
import ModalConfirm from "../../../ModalConfirm/ModalConfirm";

function FormRegEmployee(props) {
  let [showModal, setShowModal] = useState(false);
  let [dadosCadastro, setDados] = useState({
    nome: "",
    tipo: "F",
    rg: "",
    cpf: "",
    cargo: "pintor",
    valorDiario: 0,
    dataAdmissao: "",
    status: "Ativo",
  });

  const montarObj = () => {
    return {
      PESSOA_ID: dadosCadastro.pessoaId,
      NOME_PESSOA: dadosCadastro.nome,
      RG: dadosCadastro.rg,
      CPF: dadosCadastro.cpf,
      CNPJ: dadosCadastro.cnpj,
      CARGO_FUNCIONARIO: dadosCadastro.cargo,
      VALOR_DIARIO: dadosCadastro.valorDiario,
      DATA_ADMISSAO: dadosCadastro.dataAdmissao,
      VALOR_DIA_TRABALHADO: parseFloat(dadosCadastro.valorDiario),
      STATUS_FUNCIONARIO: dadosCadastro.status,
      TIPO_CADASTRO: "Funcionario",
      TIPO_PESSOA: dadosCadastro.tipo,
      LIST_ENDERECO: [],
      LIST_CONTATO: [],
    };
  };

  useEffect(() => {
    if (
      props.pessoaSelecionada.PESSOA_ID &&
      props.pessoaSelecionada.TIPO_CADASTRO == "Funcionario"
    ) {
      fetch(
        props.linkBackEnd +
          "/funcionario/buscar?pessoaId=" +
          props.pessoaSelecionada.PESSOA_ID,
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((data) => {
          setDados({
            nome: data[0].NOME_PESSOA,
            tipo: data[0].TIPO_PESSOA,
            rg: data[0].RG,
            cpf: data[0].CPF,
            cargo: data[0].CARGO_FUNCIONARIO,
            valorDiario: data[0].VALOR_DIA_TRABALHADO,
            dataAdmissao: data[0].DATA_ADMISSAO.replace("T00:00:00", ""),
            status: data[0].STATUS_FUNCIONARIO,
          });
        });
    }
  }, [
    props.pessoaSelecionada.PESSOA_ID,
    props.pessoaSelecionada.TIPO_CADASTRO,
  ]);

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
          placeholder="Ex: João da Silva"
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
              placeholder="Ex: 00.000.000-0"
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
              placeholder="Ex: 000.000.000-00"
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
              placeholder="Ex: 100"
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
              placeholder="Ex: 00/00/0000"
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
        <div className="form-group">
          {!props.pessoaSelecionada.PESSOA_ID && (
            <>
              <button
                className="btn btn-primary btn-options"
                onClick={() => props.salvarCadastro(montarObj())}
              >
                Salvar
              </button>
            </>
          )}
          {props.pessoaSelecionada.PESSOA_ID && (
            <>
              <button
                className="btn btn-success btn-options"
                onClick={() => props.atualizarCadastro(montarObj())}
              >
                Atualizar
              </button>

              <button
                className="btn btn-danger btn-options"
                onClick={() => setShowModal(true)}
              >
                Deletar
              </button>
            </>
          )}
        </div>
      </div>

      <div>
        <ModalConfirm
          show={showModal}
          onHide={() => setShowModal(false)}
          acaoConfirmada={() => props.deletarCadastro(setShowModal(false))}
          tituloModalConfirm={"Confirmar exclusão: " + dadosCadastro.nome}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  pessoaSelecionada: state.people.pessoaSelecionada,
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FormRegEmployee);
