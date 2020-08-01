/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./FormRegClientProvider.css";
import { connect } from "react-redux";
import ModalConfirm from "../../../ModalConfirm/ModalConfirm";

function FormClientReg(props) {
  let [showModal, setShowModal] = useState(false);
  let [tipoCadastro, setTipoCadastro] = useState("");
  let [dadosCadastro, setDadosCadastro] = useState({
    tipoPessoa: "",
    nome: "",
    rg: "",
    cpf: "",
    cnpj: "",
  });

  useEffect(() => {
    setTipoCadastro(props.tipoCadastroPessoa);
  });

  useEffect(() => {
    setDadosCadastro({
      nome: props.pessoaSelecionada.NOME_PESSOA,
      tipoPessoa: props.pessoaSelecionada.TIPO_PESSOA,
      rg: props.pessoaSelecionada.RG ?? "",
      cpf: props.pessoaSelecionada.CPF ?? "",
      cnpj: props.pessoaSelecionada.CNPJ ?? "",
    });

    setTipoCadastro(props.pessoaSelecionada.TIPO_CADASTRO);
  }, [props.pessoaSelecionada.PESSOA_ID]);

  const monstarObj = () => {
    return {
      PESSOA_ID: props.pessoaSelecionada.PESSOA_ID ?? 0,
      NOME_PESSOA: dadosCadastro.nome,
      RG: dadosCadastro.tipoPessoa == "J" ? "" : dadosCadastro.rg,
      CPF: dadosCadastro.tipoPessoa == "J" ? "" : dadosCadastro.cpf,
      CNPJ: dadosCadastro.tipoPessoa == "F" ? "" : dadosCadastro.cnpj,
      TIPO_CADASTRO: tipoCadastro,
      TIPO_PESSOA: dadosCadastro.tipoPessoa,
      LIST_ENDERECO: [],
      LIST_CONTATO: [],
    };
  };

  const handleInputChange = (event) => {
    setDadosCadastro({
      ...dadosCadastro,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
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
              placeholder="Ex: João da Silva"
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
                placeholder="Ex: 00.000.000/0000-00"
                onChange={(event) => handleInputChange(event)}
              />
            </div>
          </div>
        )}
        <div className="form-group">
          {!props.pessoaSelecionada.PESSOA_ID && (
            <>
              <button
                className="btn btn-primary btn-options"
                onClick={() => props.salvarCadastro(monstarObj())}
              >
                Salvar
              </button>
            </>
          )}

          {props.pessoaSelecionada.PESSOA_ID && (
            <>
              <button
                className="btn btn-success btn-options"
                onClick={() => props.atualizarCadastro(monstarObj())}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormClientReg);
