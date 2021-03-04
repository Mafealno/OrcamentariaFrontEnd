/* eslint-disable array-callback-return */
/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { mask, unMask } from 'remask'
import "./FormRegClientProvider.css";
import { connect } from "react-redux";
import ModalConfirm from "../../../ModalConfirm/ModalConfirm";
import ToastControl from "../../../ToastControl/ToastControl";
import * as validacaoDadosUtils from "../../../../utils/validacaoDados";

function FormClientReg(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [showModalConfirm, setShowModalConfirm] = useState(false);
  let [tipoCadastro, setTipoCadastro] = useState("");
  let [showToast, setShowToast] = useState(false);
    
  let [configToast, setConfigToast] = useState({
    estiloToast: "",
    estiloToastHeader: "",
    estiloToastBody: "",
    delayToast: 0,
    autoHideToast: false,
    hideToastHeader: true,
    conteudoHeader: "",
    conteudoBody: "",
    closeToast: {},
  });

  let [dadosCadastro, setDadosCadastro] = useState({
    tipoPessoa: { ...dadosCampo, requerido: true },
    nome: { ...dadosCampo, requerido: true, tamanhoMax: 60 },
    rg: { ...dadosCampo, formato: /^\d{2}(\.)?\d{3}(\.)?\d{3}(\-)?\d{1}$/, tamanhoMax: 9 },
    cpf: { ...dadosCampo, formato: /^\d{3}(\.)?\d{3}(\.)?\d{3}(\-)?\d{2}$/, tamanhoMax: 14 },
    cnpj: { ...dadosCampo, formato: /^\d{2}(\.)?\d{3}(\.)?\d{3}(\/)?\d{4}(\-)?\d{2}$/, tamanhoMax: 14 },
  });

  useEffect(() => {
    setTipoCadastro(props.tipoCadastroPessoa);
  });

  useEffect(() => {
    setDadosCadastro({
      nome: {
        ...dadosCadastro.nome,
        valor: props.pessoaSelecionada.NOME_PESSOA,
      },
      tipoPessoa: {
        ...dadosCadastro.tipoPessoa,
        valor: props.pessoaSelecionada.TIPO_PESSOA,
      },
      rg: { ...dadosCadastro.rg, valor: props.pessoaSelecionada.RG },
      cpf: { ...dadosCadastro.cpf, valor: props.pessoaSelecionada.CPF },
      cnpj: { ...dadosCadastro.cnpj, valor: props.pessoaSelecionada.CNPJ },
    });

    setTipoCadastro(props.pessoaSelecionada.TIPO_CADASTRO);
  }, [props.pessoaSelecionada.PESSOA_ID]);

  const monstarObj = (obj) => {
    return {
      PESSOA_ID: props.pessoaSelecionada.PESSOA_ID || 0,
      NOME_PESSOA: obj.nome.valor,
      RG: obj.rg.valor,
      CPF: obj.cpf.valor,
      CNPJ: obj.cnpj.valor,
      TIPO_CADASTRO: tipoCadastro,
      TIPO_PESSOA: obj.tipoPessoa.valor,
      LIST_ENDERECO: [],
      LIST_CONTATO: [],
    };
  };

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

  const exibirTost = (tipo, mensagem) => {
    switch (tipo) {
      case "sucesso":
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastSucesso",
          estiloToastBody: "estiloToastSucesso",
          delayToast: 3000,
          autoHideToast: true,
          hideToastHeader: false,
          conteudoHeader: "",
          conteudoBody: mensagem,
          closeToast: () => setShowToast(),
        });
        setShowToast(true);
        break;
      case "erro":
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastErro",
          estiloToastBody: "estiloToastErro",
          delayToast: 6000,
          autoHideToast: true,
          hideToastHeader: false,
          conteudoHeader: "",
          conteudoBody: mensagem,
          closeToast: () => setShowToast(),
        });
        setShowToast(true);
        break;
      default:
        break;
    }
  };

  const definirRequerimentoTipoPessoa = (dadosCadastro) => {
    if (dadosCadastro.tipoPessoa.valor == "F") {
      dadosCadastro.cpf.requerido = true;
      dadosCadastro.cnpj.requerido = false;
    } else {
      dadosCadastro.cnpj.requerido = true;
      dadosCadastro.rg.requerido = false;
      dadosCadastro.cpf.requerido = false;
    }

    return dadosCadastro;
  };

  const salvarCadastro = () => {
    let dadosPessoa = { ...dadosCadastro };

    dadosPessoa = validacaoDadosUtils.validarDados(
      definirRequerimentoTipoPessoa(dadosPessoa)
    );

    let houveErro = false;

    houveErro = exibirCamposErro(dadosPessoa);

    if (houveErro) {
      const msgErro = "Houveram erros na validação dos campos";
      exibirTost("erro", msgErro);
      return;
    }

    props.salvarCadastro(monstarObj(dadosPessoa));
  };

  const editarCadastro = () => {
    let dadosPessoa = { ...dadosCadastro };

    dadosPessoa = validacaoDadosUtils.validarDados(
      definirRequerimentoTipoPessoa(dadosPessoa)
    );
    let houveErro = false;

    houveErro = exibirCamposErro(dadosPessoa);

    if (houveErro) {
      const msgErro = "Houveram erros na validação dos campos";
      exibirTost("erro", msgErro);
      return;
    }

    props.atualizarCadastro(monstarObj(dadosCadastro));
  };

  const handleInputChange = (event) => {
    setDadosCadastro({
      ...dadosCadastro,
      [event.target.name]: {
        ...dadosCadastro[event.target.name],
        valor: unMask(event.target.value || '', ['999.999.999-99']),
      },
    });
  };

  return (
    <>
      <div className="form-group">
        <div className="form-group check">
          <div id="campo-tipoPessoa">
            <div className="form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="tipoPessoa"
                value="F"
                checked={dadosCadastro.tipoPessoa.valor == "F" ? "F" : ""}
                onChange={(event) => handleInputChange(event)}
                onFocus={() => removerErro("campo-tipoPessoa")}
              />
              <label className="form-check-label">Física</label>
            </div>
            <div className="form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="tipoPessoa"
                id="campo-tipoPessoa"
                value="J"
                checked={dadosCadastro.tipoPessoa.valor == "J" ? "J" : ""}
                onChange={(event) => handleInputChange(event)}
                onFocus={() => removerErro("campo-tipoPessoa")}
              />
              <label className="form-check-label">Jurídica</label>
            </div>
          </div>
          <span className="invalid-feedback" id="erro-tipoPessoa"></span>
        </div>
        <div className="form-group">
          <div className="form-row">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              name="nome"
              id="campo-nome"
              value={dadosCadastro.nome.valor}
              placeholder="Ex: João da Silva"
              maxLength={dadosCadastro.nome.tamanhoMax}
              onChange={(event) => handleInputChange(event)}
              onFocus={(event) => removerErro(event.target.id)}
            />
            <span className="invalid-feedback" id="erro-nome"></span>
          </div>
        </div>
        {dadosCadastro.tipoPessoa.valor == "F" && (
          <div className="form-group">
            <div className="form-row">
              <div className="col-xl-6">
                <label>RG</label>
                <input
                  type="text"
                  className="form-control"
                  name="rg"
                  id="campo-rg"
                  value={dadosCadastro.rg.valor}
                  placeholder="Ex: 000000000"
                  maxLength={dadosCadastro.rg.tamanhoMax}
                  onChange={(event) => handleInputChange(event)}
                  onFocus={(event) => removerErro(event.target.id)}
                />
                <span className="invalid-feedback" id="erro-rg"></span>
              </div>
              <div className="col-xl-6">
                <label>CPF</label>
                <input
                  type="text"
                  className="form-control"
                  name="cpf"
                  id="campo-cpf"
                  placeholder="Ex: 00000000000"
                  value={mask(dadosCadastro.cpf.valor || '', ['999.999.999-99'])}
                  maxLength={dadosCadastro.cpf.tamanhoMax}
                  onChange={(event) => handleInputChange(event)}
                  onFocus={(event) => removerErro(event.target.id)}
                />
                <span className="invalid-feedback" id="erro-cpf"></span>
              </div>
            </div>
          </div>
        )}
        {dadosCadastro.tipoPessoa.valor == "J" && (
          <div className="form-group">
            <div className="form-row">
              <label>CNPJ</label>
              <input
                type="text"
                className="form-control"
                name="cnpj"
                id="campo-cnpj"
                placeholder="Ex: 00000000000000"
                value={dadosCadastro.cnpj.valor}
                maxLength={dadosCadastro.cnpj.tamanhoMax}
                onChange={(event) => handleInputChange(event)}
                onFocus={(event) => removerErro(event.target.id)}
              />
              <span className="invalid-feedback" id="erro-cnpj"></span>
            </div>
          </div>
        )}
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
      <div>
        <ToastControl
          showToast={showToast}
          closeToast={configToast.closeToast}
          delayToast={configToast.delayToast}
          autoHideToast={configToast.autoHideToast}
          estiloToastHeader={configToast.estiloToastHeader}
          estiloToastBody={configToast.estiloToastBody}
          hideToastHeader={configToast.hideToastHeader}
          conteudoHeader={configToast.conteudoHeader}
          conteudoBody={configToast.conteudoBody}
        ></ToastControl>
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
