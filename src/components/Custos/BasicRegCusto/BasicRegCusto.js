import React, { useState, useEffect } from "react";
import "./BasicRegCusto.css";
import * as CustoActions from "../../../store/actions/custo";
import ModalConfirm from "../../ModalConfirm/ModalConfirm";
import ToastControl from "../../ToastControl/ToastControl";

import { connect } from "react-redux";

function BasicRegCusto(props) {
  let [showModalConfirm, setShowModalConfirm] = useState(false);
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
    custoId: "",
    nomeCusto: "",
    descricaoCusto: "",
    valorCusto: "",
    tipoCusto: "naoSelecionado",
  });

  useEffect(() => {
    setDadosCadastro({
      custoId: props.custoSelecionado.CUSTO_ID || "",
      nomeCusto: props.custoSelecionado.NOME_CUSTO || "",
      descricaoCusto: props.custoSelecionado.DESCRICAO || "",
      valorCusto: props.custoSelecionado.VALOR_CUSTO || "",
      tipoCusto: props.custoSelecionado.TIPO_CUSTO || "naoSelecionado",
    });
  }, [props.custoSelecionado.CUSTO_ID]);

  const montarObj = () => {
    return {
      CUSTO_ID: dadosCadastro.custoId == "" ? 0 : dadosCadastro.custoId,
      NOME_CUSTO: dadosCadastro.nomeCusto,
      DESCRICAO: dadosCadastro.descricaoCusto,
      VALOR_CUSTO: parseFloat(dadosCadastro.valorCusto),
      TIPO_CUSTO: dadosCadastro.tipoCusto,
    };
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
          delayToast: 3000,
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

  const salvarCadastro = () => {
    fetch(props.linkBackEnd + "/custo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj()),
    })
      .then((response) => response.json())
      .then((data) => {
        props.recarregarCusto(data.CUSTO_ID, props.linkBackEnd);

        const msg = "Cadastro efetuado com sucesso";
        exibirTost("sucesso", msg);
      })
      .catch(() => {
        const msg = "Erro ao efetuar cadastro";
        exibirTost("erro", msg);
      });
  };

  const deletarCadastro = () => {
    fetch(props.linkBackEnd + "/custo/" + props.custoSelecionado.CUSTO_ID, {
      method: "DELETE",
    }).then((data) => {
      if (data.ok) {
        props.selecionarCusto({});
        const msg = "Exclusão efetuada com sucesso";

        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar exclusão";

        exibirTost("erro", msg);
      }
    });
  };

  const atualizarCadastro = () => {
    fetch(props.linkBackEnd + "/custo/" + props.custoSelecionado.CUSTO_ID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj()),
    }).then((data) => {
      if (data.ok) {
        props.recarregarCusto(dadosCadastro.custoId, props.linkBackEnd);

        const msg = "Atualização efetuada com sucesso";

        exibirTost("sucesso", msg);
      } else {
        const msg = "Erro ao efetuar atualização";

        exibirTost("erro", msg);
      }
    });
  };

  const handleInputChange = (event) => {
    setDadosCadastro({
      ...dadosCadastro,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div id="containerBasicRegCusto">
      <div className="container-form">
        <div className="form">
          <div className="form-group">
            <div className="form-row">
              <label className="col-form-label">Código: </label>
              <input
                type="text"
                className="form-control-plaintext"
                name="custoId"
                id="input-custo-id"
                value={dadosCadastro.custoId}
                readOnly
              />
              {dadosCadastro.custoId && (
                <>
                  <div className="close-select-custo">
                    <a href="#" onClick={() => props.selecionarCusto({})}>
                      <span className="fa fa-close close-select-custo"></span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label>Nome do custo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Vale Transposte"
                  name="nomeCusto"
                  value={dadosCadastro.nomeCusto}
                  onChange={(event) => handleInputChange(event)}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label>Descrição do Custo</label>
                <textarea
                  className="form-control"
                  rows="11"
                  name="descricaoCusto"
                  value={dadosCadastro.descricaoCusto}
                  onChange={(event) => handleInputChange(event)}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col-xl-6 col-12 margin-bottom-15">
                <label>Valor do Custo</label>
                <div className="input-group position-initial">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend">
                      R$
                    </span>
                  </div>

                  <input
                    type="number"
                    className="form-control position-initial"
                    name="valorCusto"
                    value={dadosCadastro.valorCusto}
                    onChange={(event) => handleInputChange(event)}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-12">
                <label>Tipo do Custo</label>
                <select
                  className="form-control"
                  name="tipoCusto"
                  value={dadosCadastro.tipoCusto}
                  onChange={(event) => handleInputChange(event)}
                >
                  <option value="naoSelecionado">Não Selecionado</option>
                  <option value="DIARIO">Diário</option>
                  <option value="SEMANAL">Semanal</option>
                  <option value="MENSAL">Mensal</option>
                  <option value="ANUAL">Anual</option>
                  <option value="UNICO">Único</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group width-99-5">
            <div className="form-row options">
              {!props.custoSelecionado.CUSTO_ID && (
                <button
                  type="button"
                  className="btn btn-primary btn-options"
                  onClick={() => salvarCadastro()}
                >
                  Salvar
                </button>
              )}

              {props.custoSelecionado.CUSTO_ID && (
                <>
                  <button
                    type="button"
                    className="btn btn-orcamentaria btn-options"
                    onClick={() => setShowModalConfirm(true)}
                  >
                    Deletar
                  </button>
                  <button
                    type="button"
                    className="btn btn-success btn-options"
                    onClick={() => atualizarCadastro()}
                  >
                    Atualizar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
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
      <div>
        <ModalConfirm
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          acaoConfirmada={() => deletarCadastro()}
          tituloModalConfirm={
            "Confirma exclusão? O dados não poderão ser recuperados"
          }
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  custoSelecionado: state.custo.custoSelecionado,
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({
  selecionarCusto: (custo) => dispatch(CustoActions.selecionarCusto(custo)),
  recarregarCusto: (custoId, linkBackEnd) =>
    dispatch(CustoActions.recarregarCusto(custoId, linkBackEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicRegCusto);
