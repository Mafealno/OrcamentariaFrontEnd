/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "./ItemCustoMaoObraOrcamento.css";
import ResultSearchCusto from "./ResultSearchCusto/ResultSearchCusto";
import ToastControl from "../../../../ToastControl/ToastControl";
import ModalConfirm from "../../../../ModalConfirm/ModalConfirm";
import * as validacaoDadosUtils from "../../../../../utils/validacaoDados";
import * as orcamentoActions from "../../../../../store/actions/orcamento";
import { connect } from "react-redux";

function ItemCustoMaoObraOrcamento(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [stringBuscaCusto, setStringBuscaCusto] = useState("");
  let [showResultadoCusto, setShowResultadoCusto] = useState(false);
  let [dataCusto, setDataCusto] = useState([]);
  let [showToast, setShowToast] = useState(false);
  let [showModalConfirm, setShowModalConfirm] = useState(false);
  let [cadastrado, setCadastrado] = useState(false);

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
    custoId: { ...dadosCampo, requerido: true },
    nomeCusto: { ...dadosCampo },
    valorCusto: { ...dadosCampo },
    tipoCusto: { ...dadosCampo },
  });

  let [dadosCadastroMaoObra, setDadosCadastroMaoObra] = useState({
    maoObraOrcamentoId: { ...dadosCampo },
    pessoaId: { ...dadosCampo },
  });

  useEffect(() => {
    if (props.dadosCustoMaoObraOrcamento) {
      setDadosCadastro({
        custoId: {
          ...dadosCadastro.custoId,
          valor: props.dadosCustoMaoObraOrcamento.CUSTO_ID,
        },
        nomeCusto: {
          ...dadosCadastro.nomeCusto,
          valor: props.dadosCustoMaoObraOrcamento.NOME_CUSTO,
        },
        valorCusto: {
          ...dadosCadastro.valorCusto,
          valor: props.dadosCustoMaoObraOrcamento.VALOR_CUSTO,
        },
        tipoCusto: {
          ...dadosCadastro.tipoCusto,
          valor: props.dadosCustoMaoObraOrcamento.TIPO_CUSTO,
        },
      });

      setCadastrado(true);
    }
  }, [props.dadosCustoMaoObraOrcamento]);

  useEffect(() => {
    setDadosCadastroMaoObra({
      maoObraOrcamentoId: {
        ...dadosCadastro.maoObraOrcamentoId,
        valor: props.maoObraOrcamentoId,
      },
      pessoaId: {
        ...dadosCadastro.pessoaId,
        valor: props.pessoaId,
      },
    });
  }, [props.maoObraOrcamentoId]);

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

  const exibirCamposErro = (dados, houveErro) => {
    Object.keys(dados).map((nomeCampo) => {
      if (!dados[nomeCampo].valido) {
        houveErro = true;
        const msg = "Selecione um custo";
        exibirTost("erro", msg);
        return houveErro;
      }
    });
    return houveErro;
  };

  const removerErro = (id) => {
    document.getElementById(id).classList.remove("is-invalid");
  };

  const buscarCusto = () => {
    if(!cadastrado){
      let rota = "/custo/";
    if (stringBuscaCusto) {
      if (stringBuscaCusto.match(/\d/)) {
        rota = rota + "buscar?custoId=" + stringBuscaCusto;
      } else {
        rota = rota + "buscar?nomeCusto=" + stringBuscaCusto;
      }
    }

    fetch(props.linkBackEnd + rota, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setDataCusto(data);
        setShowResultadoCusto(true);
      });
    }
  };

  const montarObjCusto = (obj) => {
    return {
      CUSTO_ID: obj.custoId.valor,
      NOME_CUSTO: obj.nomeCusto.valor,
      DESCRICAO: "",
      TIPO_CUSTO: obj.tipoCusto.valor,
      VALOR_CUSTO: parseFloat(obj.valorCusto.valor),
    };
  };

  const montarObjMaoObraOrcamento = (obj, objCusto) => {
    return {
      MAO_OBRA_ORCAMENTO_ID: obj.maoObraOrcamentoId.valor,
      ORCAMENTO_ID: props.orcamentoSelecionado.ORCAMENTO_ID,
      FUNCIONARIO: {
        PESSOA_ID: obj.pessoaId.valor,
        NOME_PESSOA: "",
        RG: "",
        CPF: "",
        CNPJ: "",
        CARGO_FUNCIONARIO: "",
        VALOR_DIARIO: "",
        DATA_ADMISSAO: new Date(),
        VALOR_DIA_TRABALHADO: parseFloat(0),
        STATUS_FUNCIONARIO: "",
        TIPO_CADASTRO: "",
        TIPO_PESSOA: "",
        LIST_ENDERECO: [],
        LIST_CONTATO: [],
      },
      LIST_CUSTO: [montarObjCusto(objCusto)],
    };
  };

  const verificarCustoRepetido = async () => {
    const response = await fetch(
      props.linkBackEnd +
        "/custosMaoObra/buscar/" +
        dadosCadastroMaoObra.maoObraOrcamentoId.valor +
        "/" +
        dadosCadastro.custoId.valor,
      { method: "GET" }
    );
    const data = await response.json();
    if (data.CUSTO_ID) {
      return true;
    } else {
      return false;
    }
  };

  const salvarCadastro = async () => {
    const dadosCusto = validacaoDadosUtils.validarDados(dadosCadastro);
    const dadosMaoObra = validacaoDadosUtils.validarDados(dadosCadastroMaoObra);

    let houveErro = false;

    houveErro = exibirCamposErro(dadosCusto, houveErro);

    if (houveErro) {
      return;
    }

    if (await verificarCustoRepetido()) {
      const msg =
        "Esse custo já foi selecionado. Por favor, selecione um diferente";
      exibirTost("erro", msg);
      return;
    }

    props.salvarCadastroCustoMaoObra(montarObjMaoObraOrcamento(dadosMaoObra, dadosCusto), fazerAposCadastrar());
  };

  const excluirCadastro = () => {
    props.excluirCadastroCustoMaoObra(dadosCadastro.custoId.valor, props.keyComponente, dadosCadastroMaoObra.maoObraOrcamentoId.valor);
    props.removerItemCustosMaoObraDisplay(props.listCustosMaoObraDisplay, props.keyComponente);
  };
  const selecionarCustoMaoObraOrcamento = (custo) => {
    setDadosCadastro({
      custoId: {
        ...dadosCadastro.custoId,
        valor: custo.CUSTO_ID,
      },
      nomeCusto: {
        ...dadosCadastro.nomeCusto,
        valor: custo.NOME_CUSTO,
      },
      valorCusto: {
        ...dadosCadastro.valorCusto,
        valor: custo.VALOR_CUSTO,
      },
      tipoCusto: {
        ...dadosCadastro.tipoCusto,
        valor: custo.TIPO_CUSTO,
      },
    });
  };

  const editarCadastro = async () => {
    const dadosCusto = validacaoDadosUtils.validarDados(dadosCadastro);
    const dadosMaoObra = validacaoDadosUtils.validarDados(dadosCadastroMaoObra);

    let houveErro = false;

    houveErro = exibirCamposErro(dadosCusto, houveErro);

    if (houveErro) {
      return;
    }

    if (await verificarCustoRepetido()) {
      const msg =
        "Esse custo já foi selecionado. Por favor, selecione um diferente";
      exibirTost("erro", msg);
      return;
    }

    props.editarCadastroCustoMaoObra(
      montarObjMaoObraOrcamento(dadosMaoObra, dadosCusto),
      props.dadosCustoMaoObraOrcamento.CUSTO_ID
    );
  };

  const fazerAposCadastrar = () => {
      setCadastrado(true);
  };

  const listenerClick = () => {
    setShowResultadoCusto(false);
  };

  if (showResultadoCusto) {
    window.addEventListener("click", listenerClick);
  } else {
    window.removeEventListener("click", listenerClick);
  }

  const pressEnter = (event) => {
    if (event.key == "Enter") {
      buscarCusto();
    }
  };

  return (
    <>
      <div id="containerItemCustoMaoObraOrcamentoModal">
        <div id="search-custo">
          <div className="form-group margin-bottom-0">
            <div className="row">
              <div className="col-xl">
                <input
                  disabled={cadastrado}
                  className="form-control"
                  placeholder="Buscar custo"
                  name="buscarFuncionario"
                  onChange={(event) => setStringBuscaCusto(event.target.value)}
                  onDoubleClick={() => buscarCusto()}
                  onKeyDown={(event) => pressEnter(event)}
                  onFocus={() =>
                    removerErro("campo-custoId-" + dadosCadastro.custoId.valor)
                  }
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-xl">
                <ResultSearchCusto
                  show={showResultadoCusto}
                  resultados={dataCusto}
                  selecionarCustoMaoObraOrcamento={(custo) =>
                    selecionarCustoMaoObraOrcamento(custo)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div id="informacoes-custo">
          <div className="form-group">
            <div className="form-row">
              <div className="col-3">
                <label>Código</label>
                <input
                  type="text"
                  className="form-control"
                  id={"campo-custoId-" + dadosCadastro.custoId.valor}
                  value={dadosCadastro.custoId.valor}
                  readOnly
                />
              </div>
              <div className="col">
                <label>Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id={"campo-nomeCusto-" + dadosCadastro.custoId.valor}
                  value={dadosCadastro.nomeCusto.valor}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label>Valor (R$)</label>
                <input
                  type="text"
                  className="form-control"
                  id={"campo-valorCusto-" + dadosCadastro.custoId.valor}
                  value={dadosCadastro.valorCusto.valor}
                  readOnly
                />
              </div>
              <div className="col">
                <label>Tipo</label>
                <input
                  type="text"
                  className="form-control"
                  id={"campo-tipoCusto-" + dadosCadastro.custoId.valor}
                  value={dadosCadastro.tipoCusto.valor}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              {cadastrado && (
                <>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-orcamentaria btn-width-100"
                      onClick={() => setShowModalConfirm(true)}
                    >
                      Excluir
                    </button>
                  </div>

                  {/* <div className="col">
                    <button
                      type="button"
                      className="btn-success btn btn-width-100"
                      onClick={() => editarCadastro()}
                    >
                      Atualizar
                    </button>
                  </div> */}
                </>
              )}
              {!cadastrado && (
                <div className="col">
                  <button
                    type="button"
                    className="btn-primary btn btn-width-100"
                    onClick={() => salvarCadastro()}
                  >
                    Salvar
                  </button>
                </div>
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
          acaoConfirmada={() => excluirCadastro()}
          tituloModalConfirm={
            "Excluir '" + dadosCadastro.nomeCusto.valor + "'?"
          }
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listMaoObraOrcamento: state.orcamento.listMaoObraOrcamento,
  orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
  listCustosMaoObraDisplay: state.orcamento.listCustosMaoObraDisplay
});

const mapDispatchToProps = (dispatch) => ({
  adicionarItemCustoMaoObraOrcamento: (
    listMaoObraOrcamento,
    maoObraOrcamentoId,
    itemCustoMaoObraOrcamento
  ) =>
    dispatch(
      orcamentoActions.adicionarItemCustoMaoObraOrcamento(
        listMaoObraOrcamento,
        maoObraOrcamentoId,
        itemCustoMaoObraOrcamento
      )
    ),
    removerItemCustosMaoObraDisplay: (listCustosMaoObraDisplay, keyComponente) =>
    dispatch(
      orcamentoActions.removerItemCustosMaoObraDisplay(
        listCustosMaoObraDisplay,
        keyComponente
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemCustoMaoObraOrcamento);
