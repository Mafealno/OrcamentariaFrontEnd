import React, { useState, useEffect } from "react";
import "./BasicRegCusto.css";
import * as CustoActions from "../../../store/actions/custo";
import ModalConfirm from "../../ModalConfirm/ModalConfirm";
import ToastControl from "../../ToastControl/ToastControl";
import * as validacaoDadosUtils from "../../../utils/validacaoDados";

import { connect } from "react-redux";

function BasicRegCusto(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

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
    custoId: { ...dadosCampo, valorPadrao: 0 },
    nomeCusto: { ...dadosCampo, requerido: true },
    descricaoCusto: { ...dadosCampo },
    valorCusto: { ...dadosCampo, requerido: true },
    tipoCusto: {
      ...dadosCampo,
      requerido: true,
    },
  });

  useEffect(() => {
    if (props.custoSelecionado.CUSTO_ID) {
      setDadosCadastro({
        custoId: {
          ...dadosCadastro.custoId,
          valor: props.custoSelecionado.CUSTO_ID,
        },
        nomeCusto: {
          ...dadosCadastro.nomeCusto,
          valor: props.custoSelecionado.NOME_CUSTO,
        },
        descricaoCusto: {
          ...dadosCadastro.descricaoCusto,
          valor: props.custoSelecionado.DESCRICAO,
        },
        valorCusto: {
          ...dadosCadastro.valorCusto,
          valor: props.custoSelecionado.VALOR_CUSTO,
        },
        tipoCusto: {
          ...dadosCadastro.tipoCusto,
          valor: props.custoSelecionado.TIPO_CUSTO,
        },
      });
    } else {
      limparCampos();
    }
  }, [props.custoSelecionado.CUSTO_ID]);

  const limparCampos = () => {
    setDadosCadastro({
      custoId: {
        ...dadosCadastro.custoId,
        valor: dadosCadastro.custoId.valorPadrao,
      },
      nomeCusto: {
        ...dadosCadastro.nomeCusto,
        valor: dadosCadastro.nomeCusto.valorPadrao,
      },
      descricaoCusto: {
        ...dadosCadastro.descricaoCusto,
        valor: dadosCadastro.descricaoCusto.valorPadrao,
      },
      valorCusto: {
        ...dadosCadastro.valorCusto,
        valor: dadosCadastro.valorCusto.valorPadrao,
      },
      tipoCusto: {
        ...dadosCadastro.tipoCusto,
        valor: dadosCadastro.tipoCusto.valorPadrao,
      },
    });
  };

  const montarObj = (obj) => {
    return {
      CUSTO_ID: obj.custoId.valor,
      NOME_CUSTO: obj.nomeCusto.valor,
      DESCRICAO: obj.descricaoCusto.valor,
      VALOR_CUSTO: parseFloat(obj.valorCusto.valor),
      TIPO_CUSTO: obj.tipoCusto.valor,
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
    const dadosCusto = validacaoDadosUtils.validarDados(dadosCadastro);

    let houveErro = false;
    houveErro = exibirCamposErro(dadosCusto, houveErro);

    if (houveErro) {
      return;
    }

    if (dadosCusto.valorCusto.valor < 1) {
      const msg = "O valor deve ser maior que 0";
      exibirTost("erro", msg);
      return;
    }

    fetch(props.linkBackEnd + "/custo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj(dadosCusto)),
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
    fetch(props.linkBackEnd + "/custo/" + dadosCadastro.custoId.valor, {
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
    const dadosCusto = validacaoDadosUtils.validarDados(dadosCadastro);

    let houveErro = false;
    houveErro = exibirCamposErro(dadosCusto, houveErro);

    if (houveErro) {
      return;
    }

    fetch(props.linkBackEnd + "/custo/" + dadosCadastro.custoId.valor, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(montarObj(dadosCusto)),
    }).then((data) => {
      if (data.ok) {
        props.recarregarCusto(dadosCadastro.custoId.valor, props.linkBackEnd);

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
      [event.target.name]: {
        ...dadosCadastro[event.target.name],
        valor: event.target.value,
      },
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
                id="campo-custoId"
                value={dadosCadastro.custoId.valor || ""}
                readOnly
              />
              <span class="invalid-feedback" id="erro-custoId"></span>
              {dadosCadastro.custoId.valor > 0 && (
                <div className="close-select-custo">
                  <a href="#" onClick={() => props.selecionarCusto({})}>
                    <span className="fa fa-close close-select-custo"></span>
                  </a>
                </div>
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
                  id="campo-nomeCusto"
                  value={dadosCadastro.nomeCusto.valor}
                  onChange={(event) => handleInputChange(event)}
                  onFocus={(event) => removerErro(event.target.id)}
                />
                <span class="invalid-feedback" id="erro-nomeCusto"></span>
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
                  id="campo-descricaoCusto"
                  value={dadosCadastro.descricaoCusto.valor}
                  onChange={(event) => handleInputChange(event)}
                  onFocus={(event) => removerErro(event.target.id)}
                />
                <span class="invalid-feedback" id="erro-descricaoCusto"></span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col-xl-6 col-12 margin-bottom-15">
                <label>Valor do Custo</label>

                <input
                  type="number"
                  className="form-control"
                  name="valorCusto"
                  id="campo-valorCusto"
                  value={dadosCadastro.valorCusto.valor}
                  onChange={(event) => handleInputChange(event)}
                  onFocus={(event) => removerErro(event.target.id)}
                />
                <span class="invalid-feedback" id="erro-valorCusto"></span>
              </div>
              <div className="col-xl-6 col-12">
                <label>Tipo do Custo</label>
                <select
                  className="form-control"
                  name="tipoCusto"
                  id="campo-tipoCusto"
                  value={dadosCadastro.tipoCusto.valor}
                  onChange={(event) => handleInputChange(event)}
                  onFocus={(event) => removerErro(event.target.id)}
                >
                  <option value="">Não Selecionado</option>
                  <option value="DIARIO">Diário</option>
                  <option value="SEMANAL">Semanal</option>
                  <option value="MENSAL">Mensal</option>
                  <option value="ANUAL">Anual</option>
                  <option value="UNICO">Único</option>
                </select>
                <span class="invalid-feedback" id="erro-tipoCusto"></span>
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
