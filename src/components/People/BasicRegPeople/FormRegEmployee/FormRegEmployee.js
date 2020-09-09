import React, { useState, useEffect } from "react";
import "./FormRegEmployee.css";
import { connect } from "react-redux";
import ModalConfirm from "../../../ModalConfirm/ModalConfirm";
import * as validacaoDadosUtils from "../../../../utils/validacaoDados";

function FormRegEmployee(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [showModalConfirm, setShowModalConfirm] = useState(false);
  let [dadosCadastro, setDadosCadastro] = useState({
    pessoaId: { ...dadosCampo, valorPadrao: 0 },
    nome: { ...dadosCampo, requerido: true },
    tipo: { ...dadosCampo, valorPadrao: "F" },
    rg: { ...dadosCampo, formato: /^\d{2}(\.)?\d{3}(\.)?\d{3}(\-)?\d{1}$/ },
    cpf: {
      ...dadosCampo,
      requerido: true,
      formato: /^\d{3}(\.)?\d{3}(\.)?\d{3}(\-)?\d{2}$/,
    },
    cnpj: { ...dadosCampo },
    cargo: { ...dadosCampo, valorPadrao: "Pintor" },
    valorDiario: { ...dadosCampo, requerido: true },
    dataAdmissao: { ...dadosCampo, valorPadrao: new Date() },
    status: { ...dadosCampo, valorPadrao: "Ativo" },
  });

  const montarObj = (obj) => {
    return {
      PESSOA_ID: obj.pessoaId.valor,
      NOME_PESSOA: obj.nome.valor,
      RG: obj.rg.valor,
      CPF: obj.cpf.valor,
      CNPJ: obj.cnpj.valor,
      CARGO_FUNCIONARIO: obj.cargo.valor,
      VALOR_DIARIO: obj.valorDiario.valor,
      DATA_ADMISSAO: obj.dataAdmissao.valor,
      VALOR_DIA_TRABALHADO: parseFloat(obj.valorDiario.valor),
      STATUS_FUNCIONARIO: obj.status.valor,
      TIPO_CADASTRO: "Funcionario",
      TIPO_PESSOA: obj.tipo.valor,
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
          setDadosCadastro({
            ...dadosCadastro,
            pessoaId: { ...dadosCadastro.pessoaId, valor: data[0].PESSOA_ID },
            nome: { ...dadosCadastro.nome, valor: data[0].NOME_PESSOA },
            tipo: { ...dadosCadastro.tipo, valor: data[0].TIPO_PESSOA },
            rg: { ...dadosCadastro.rg, valor: data[0].RG },
            cpf: { ...dadosCadastro.cpf, valor: data[0].CPF },
            cargo: { ...dadosCadastro.cargo, valor: data[0].CARGO_FUNCIONARIO },
            valorDiario: {
              ...dadosCadastro.valorDiario,
              valor: data[0].VALOR_DIA_TRABALHADO,
            },
            dataAdmissao: {
              ...dadosCadastro.dataAdmissao,
              valor: data[0].DATA_ADMISSAO.replace(/T\d{2}\:\d{2}\:\d{2}/, ""),
            },
            status: {
              ...dadosCadastro.status,
              valor: data[0].STATUS_FUNCIONARIO,
            },
          });
        });
    }
  }, [
    props.pessoaSelecionada.PESSOA_ID,
    props.pessoaSelecionada.TIPO_CADASTRO,
  ]);

  const exibirCamposErro = (dados, houveErro) => {
    Object.keys(dados).map((nomeCampo) => {
      if (!dados[nomeCampo].valido) {
        houveErro = true;

        if (document.getElementById("campo-" + nomeCampo)) {
          document.getElementById("erro-" + nomeCampo).innerHTML =
            dados[nomeCampo].msgErro;
          document
            .getElementById("campo-" + nomeCampo)
            .classList.add("is-invalid");
        }
      }
    });
    return houveErro;
  };

  const removerErro = (id) => {
    document.getElementById(id).classList.remove("is-invalid");
  };

  const salvarCadastro = () => {
    const dadosFuncionario = validacaoDadosUtils.validarDados(dadosCadastro);

    let houveErro = false;

    houveErro = exibirCamposErro(dadosFuncionario);

    if (houveErro) {
      return;
    }

    if (dadosFuncionario.valorDiario.valor < 1) {
      const msg = "O valor diário deve ser maior que 0";
      document.getElementById("erro-valorDiario").innerHTML = msg;
      document.getElementById("campo-valorDiario").classList.add("is-invalid");
    }

    props.salvarCadastro(montarObj(dadosFuncionario));
  };

  const editarCadastro = () => {
    const dadosFuncionario = validacaoDadosUtils.validarDados(dadosCadastro);

    let houveErro = false;

    houveErro = exibirCamposErro(dadosFuncionario);

    if (houveErro) {
      return;
    }

    if (dadosFuncionario.valorDiario.valor < 1) {
      const msg = "O valor diário deve ser maior que 0";
      document.getElementById("erro-valorDiario").innerHTML = msg;
      document.getElementById("campo-valorDiario").classList.add("is-invalid");
      return;
    }

    props.atualizarCadastro(montarObj(dadosFuncionario));
  };

  const handleInputChange = (event) => {
    setDadosCadastro({
      ...dadosCadastro,
      [event.target.name]: {
        ...dadosCadastro[event.target.name],
        valor: event.target.value,
      },
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
          id="campo-nome"
          value={dadosCadastro.nome.valor}
          placeholder="Ex: João da Silva"
          onChange={(event) => handleInputChange(event)}
          onFocus={(event) => removerErro(event.target.id)}
        />
        <span class="invalid-feedback" id="erro-nome"></span>
      </div>
      <div className="form-group">
        <div className="form-row">
          <div className="col-xl-6 div-rg">
            <label>RG</label>
            <input
              type="text"
              className="form-control"
              name="rg"
              id="campo-rg"
              value={dadosCadastro.rg.valor}
              placeholder="Ex: 00.000.000-0"
              onChange={(event) => handleInputChange(event)}
              onFocus={(event) => removerErro(event.target.id)}
            />
            <span class="invalid-feedback" id="erro-rg"></span>
          </div>
          <div className="col-xl-6">
            <label>CPF</label>
            <input
              type="text"
              className="form-control"
              name="cpf"
              id="campo-cpf"
              value={dadosCadastro.cpf.valor}
              placeholder="Ex: 000.000.000-00"
              onChange={(event) => handleInputChange(event)}
              onFocus={(event) => removerErro(event.target.id)}
            />
            <span class="invalid-feedback" id="erro-cpf"></span>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="form-row">
          <div className="col">
            <label>Cargo</label>
            <select
              className="form-control"
              name="cargo"
              id="campo-cargo"
              value={dadosCadastro.cargo.valor}
              onChange={(event) => handleInputChange(event)}
              onFocus={(event) => removerErro(event.target.id)}
            >
              <option value="Pintor">Pintor</option>
              <option value="Ajudante">Ajudante</option>
              <option value="Outro">Outro</option>
            </select>
            <span class="invalid-cargo" id="erro-nome"></span>
          </div>
          <div className="col">
            <label>Valor Diário</label>
            <input
              type="number"
              className="form-control"
              name="valorDiario"
              id="campo-valorDiario"
              value={dadosCadastro.valorDiario.valor}
              placeholder="Ex: 100"
              onChange={(event) => handleInputChange(event)}
              onFocus={(event) => removerErro(event.target.id)}
            />
            <span class="invalid-feedback" id="erro-valorDiario"></span>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="form-row">
          <div className="col">
            <label>Data de Admissão</label>
            <input
              type="date"
              className="form-control"
              name="dataAdmissao"
              id="campo-dataAdmissao"
              value={dadosCadastro.dataAdmissao.valor}
              placeholder="Ex: 00/00/0000"
              onChange={(event) => handleInputChange(event)}
              onFocus={(event) => removerErro(event.target.id)}
            />
            <span class="invalid-feedback" id="erro-dataAdmissao"></span>
          </div>
          <div className="col">
            <label>Status</label>
            <select
              className="form-control"
              name="status"
              id="campo-status"
              value={dadosCadastro.status.valor}
              onChange={(event) => handleInputChange(event)}
              onFocus={(event) => removerErro(event.target.id)}
            >
              <option value="Ativo">Ativo</option>
              <option value="Nao_Ativo">Não Ativo</option>
            </select>
            <span class="invalid-feedback" id="erro-status"></span>
          </div>
        </div>
        <div className="form-group">
          {!props.pessoaSelecionada.PESSOA_ID && (
            <>
              <button
                className="btn btn-primary btn-options"
                onClick={() => salvarCadastro()}
              >
                Salvar
              </button>
            </>
          )}
          {props.pessoaSelecionada.PESSOA_ID > 0 && (
            <>
              <button
                className="btn btn-success btn-options"
                onClick={() => editarCadastro()}
              >
                Atualizar
              </button>

              <button
                className="btn btn-orcamentaria btn-options"
                onClick={() => setShowModalConfirm(true)}
              >
                Deletar
              </button>
            </>
          )}
        </div>
      </div>

      <div>
        <ModalConfirm
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          acaoConfirmada={() =>
            props.deletarCadastro(setShowModalConfirm(false))
          }
          tituloModalConfirm={"Confirmar exclusão: " + dadosCadastro.nome.valor}
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
