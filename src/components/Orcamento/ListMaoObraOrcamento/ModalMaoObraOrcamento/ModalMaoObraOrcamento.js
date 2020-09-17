import React, { useState, useEffect } from "react";
import "./ModalMaoObraOrcamento.css";
import ModalControl from "../../../ModalControl/ModalControl";
import ResultSearchFuncionario from "./ResultSearchFuncionario/ResultSearchFuncionario";
import ItemCustoMaoObraOrcamento from "./ItemCustoMaoObraOrcamento/ItemCustoMaoObraOrcamento";
import ModalConfirm from "../../../ModalConfirm/ModalConfirm";
import * as validacaoDadosUtils from "../../../../utils/validacaoDados";
import * as orcamentoActions from "../../../../store/actions/orcamento";
import { connect } from "react-redux";

function ModalMaoObraOrcamento(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [stringBuscaFuncionario, setStringBuscaFuncionario] = useState("");
  let [showResultadoFuncionario, setShowResultadoFuncionario] = useState(false);
  let [dataFuncionario, setDataFuncionario] = useState([]);
  let [showModalConfirm, setShowModalConfirm] = useState(false);
  let [keyComponente, setKeyComponente] = useState(0);

  let [dadosCadastro, setDadosCadastro] = useState({
    maoObraOrcamentoId: { ...dadosCampo, valorPadrao: 0 },
    pessoaId: { ...dadosCampo, requerido: true },
    nomePessoa: { ...dadosCampo },
    cargo: { ...dadosCampo },
    valorDiario: { ...dadosCampo },
    status: { ...dadosCampo },
  });

  useEffect(() => {
    if (props.show) {
      if (props.dadosMaoObraOrcamento) {
        setDadosCadastro({
          maoObraOrcamentoId: {
            ...dadosCadastro.maoObraOrcamentoId,
            valor: props.dadosMaoObraOrcamento.MAO_OBRA_ORCAMENTO_ID,
          },
          pessoaId: {
            ...dadosCadastro.pessoaId,
            valor: props.dadosMaoObraOrcamento.FUNCIONARIO.PESSOA_ID,
          },
          nomePessoa: {
            ...dadosCadastro.nomePessoa,
            valor: props.dadosMaoObraOrcamento.FUNCIONARIO.NOME_PESSOA,
          },
          cargo: {
            ...dadosCadastro.cargo,
            valor: props.dadosMaoObraOrcamento.FUNCIONARIO.CARGO_FUNCIONARIO,
          },
          valorDiario: {
            ...dadosCadastro.valorDiario,
            valor: props.dadosMaoObraOrcamento.FUNCIONARIO.VALOR_DIA_TRABALHADO,
          },
          status: {
            ...dadosCadastro.status,
            valor: props.dadosMaoObraOrcamento.FUNCIONARIO.STATUS_FUNCIONARIO,
          },
        });
        montarComponenteCusto(props.dadosMaoObraOrcamento.LIST_CUSTO);
      }
    } else {
      limparCampos();
      setKeyComponente(0);
    }
  }, [props.show]);

  useEffect(() => {
    if (document.getElementById("btn-add-custo-mao-obra")) {
      var containerAutoScrool = document.getElementById("list-custos-mao-obra");
      if (containerAutoScrool.scrollLeft !== containerAutoScrool.scrollWidth) {
        containerAutoScrool.scrollTo(containerAutoScrool.scrollWidth, 0);
      }
    }
  }, [props.listCustosMaoObraDisplay.length]);

  const limparCampos = () => {
    setDadosCadastro({
      maoObraOrcamentoId: {
        ...dadosCadastro.maoObraOrcamentoId,
        valor: dadosCadastro.maoObraOrcamentoId.valorPadrao,
      },
      pessoaId: {
        ...dadosCadastro.pessoaId,
        valor: dadosCadastro.pessoaId.valorPadrao,
      },
      nomePessoa: {
        ...dadosCadastro.nomePessoa,
        valor: dadosCadastro.nomePessoa.valorPadrao,
      },
      cargo: { ...dadosCadastro.cargo, valor: dadosCadastro.cargo.valorPadrao },
      valorDiario: {
        ...dadosCadastro.valorDiario,
        valor: dadosCadastro.valorDiario.valorPadrao,
      },
      status: {
        ...dadosCadastro.status,
        valor: dadosCadastro.status.valorPadrao,
      },
    });
  };

  const buscarFuncionario = () => {
    let rota = "/funcionario/";
    if (stringBuscaFuncionario) {
      if (stringBuscaFuncionario.match(/\d/)) {
        rota = rota + "buscar?pessoaId=" + stringBuscaFuncionario;
      } else {
        rota = rota + "buscar?nomePessoa=" + stringBuscaFuncionario;
      }
    }

    fetch(props.linkBackEnd + rota, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setDataFuncionario(data);
        setShowResultadoFuncionario(true);
      });
  };

  const montarComponenteCusto = (listCusto) => {
    if (listCusto.length > 0) {
      let keyContador = 0;

      let listCustosMaoObraDisplayAux = listCusto.map((elemento) => {
        setKeyComponente((keyComponente) => keyComponente + 1);
        keyContador += 1;
        setKeyComponente(keyContador);
        return (
          <ItemCustoMaoObraOrcamento
            key={keyContador}
            keyComponente={keyContador}
            dadosCustoMaoObraOrcamento={elemento}
            maoObraOrcamentoId={
              props.dadosMaoObraOrcamento.MAO_OBRA_ORCAMENTO_ID
            }
            pessoaId={props.dadosMaoObraOrcamento.FUNCIONARIO.PESSOA_ID}
            montarItemDisplay={() => props.montarItemDisplay()}
          />
        );
      });

      props.montarListCustosMaoObraDisplay(
        props.listCustosMaoObraDisplay,
        listCustosMaoObraDisplayAux
      );
    } else {
      props.montarListCustosMaoObraDisplay(props.listCustosMaoObraDisplay, []);
    }
  };

  const adicionarCusto = () => {
    let novakey = keyComponente + 1;
    let componente = (
      <ItemCustoMaoObraOrcamento
        key={novakey}
        keyComponente={novakey}
        maoObraOrcamentoId={dadosCadastro.maoObraOrcamentoId.valor}
        pessoaId={dadosCadastro.pessoaId.valor}
        montarItemDisplay={() => props.montarItemDisplay()}
      />
    );

    setKeyComponente(novakey);

    props.adicionarItemCustosMaoObraDisplay(
      props.listCustosMaoObraDisplay,
      componente
    );
  };

  const selecionarFuncionarioMaoObraOrcamento = (funcionario) => {
    setDadosCadastro({
      ...dadosCadastro,
      pessoaId: { ...dadosCadastro.pessoaId, valor: funcionario.PESSOA_ID },
      nomePessoa: {
        ...dadosCadastro.nomePessoa,
        valor: funcionario.NOME_PESSOA,
      },
      cargo: { ...dadosCadastro.cargo, valor: funcionario.CARGO_FUNCIONARIO },
      valorDiario: {
        ...dadosCadastro.valorDiario,
        valor: funcionario.VALOR_DIA_TRABALHADO,
      },
      status: {
        ...dadosCadastro.status,
        valor: funcionario.STATUS_FUNCIONARIO,
      },
    });
  };

  const montarObj = (obj) => {
    return {
      MAO_OBRA_ORCAMENTO_ID: obj.maoObraOrcamentoId.valor,
      ORCAMENTO_ID: props.orcamentoSelecionado.ORCAMENTO_ID,
      FUNCIONARIO: {
        PESSOA_ID: obj.pessoaId.valor,
        NOME_PESSOA: obj.nomePessoa.valor,
        RG: "",
        CPF: "",
        CNPJ: "",
        CARGO_FUNCIONARIO: obj.cargo.valor,
        VALOR_DIARIO: "",
        DATA_ADMISSAO: new Date(),
        VALOR_DIA_TRABALHADO: parseFloat(obj.valorDiario.valor),
        STATUS_FUNCIONARIO: obj.status.valor,
        TIPO_CADASTRO: "",
        TIPO_PESSOA: "",
        LIST_ENDERECO: [],
        LIST_CONTATO: [],
      },
      LIST_CUSTO: [],
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

  const salvarCadastro = () => {
    let dadosMaoObra = validacaoDadosUtils.validarDados(dadosCadastro);

    let houveErro = exibirCamposErro(dadosMaoObra, false);

    if (houveErro) {
      return;
    }

    props.salvarCadastro(montarObj(dadosMaoObra), fazerAposCadastrar);
  };

  const editarCadastro = () => {
    let dadosMaoObra = validacaoDadosUtils.validarDados(dadosCadastro);

    let houveErro = exibirCamposErro(dadosMaoObra, false);

    if (houveErro) {
      return;
    }

    props.editarCadastro(montarObj(dadosMaoObra));
  };

  const fazerAposCadastrar = (objCadastrado) => {
    setDadosCadastro({
      ...dadosCadastro,
      maoObraOrcamentoId: {
        ...dadosCadastro.maoObraOrcamentoId,
        valor: objCadastrado.MAO_OBRA_ORCAMENTO_ID,
      },
    });
  };

  const listenerClick = () => {
    setShowResultadoFuncionario(false);
  };

  if (showResultadoFuncionario) {
    window.addEventListener("click", listenerClick);
  } else {
    window.removeEventListener("click", listenerClick);
  }

  const pressEnter = (event) => {
    if (event.key == "Enter") {
      buscarFuncionario();
    }
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
      <ModalControl
        {...props}
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal overflow-x-y modal-body-mao-obra-orcamento"
        estiloModalFooter="backgroundModal"
        tituloModal="Mão de obra"
        conteudoBody={
          <div id="containerModalMaoObraOrcamento">
            <div className="form form-modal-mao-obra-orcamento">
              <div id="dados-funcionario">
                <div id="search-funcionario">
                  <div className="form-group margin-bottom-0">
                    <div className="row">
                      <div className="col-xl">
                        <input
                          className="form-control"
                          placeholder="Buscar Funcionário"
                          name="buscarFuncionario"
                          onChange={(event) =>
                            setStringBuscaFuncionario(event.target.value)
                          }
                          onKeyDown={(event) => pressEnter(event)}
                          onFocus={() => removerErro("campo-pessoaId")}
                        />
                      </div>
                      <div className="col-xl-3 div-btn-buscar-material">
                        <button
                          type="button"
                          className="btn"
                          id="btn-buscar-material"
                          onClick={() => buscarFuncionario()}
                          onFocus={() => removerErro("campo-pessoaId")}
                        >
                          Buscar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-xl">
                        <ResultSearchFuncionario
                          show={showResultadoFuncionario}
                          resultados={dataFuncionario}
                          selecionarFuncionarioMaoObraOrcamento={(
                            funcionario
                          ) =>
                            selecionarFuncionarioMaoObraOrcamento(funcionario)
                          }
                        />
                      </div>
                      <div className="col-xl-3 div-btn-buscar-funcionario"></div>
                    </div>
                  </div>
                </div>
                <div id="informacoes-funcionario">
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-xl-2 col-3">
                        <label>Código</label>
                        <input
                          type="text"
                          className="form-control"
                          name="pessoaId"
                          id="campo-pessoaId"
                          value={dadosCadastro.pessoaId.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                          readOnly
                        />
                        <span
                          className="invalid-feedback"
                          id="erro-pessoaId"
                        ></span>
                      </div>
                      <div className="col">
                        <label>Nome</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nomePessoa"
                          id="campo-nomePessoa"
                          value={dadosCadastro.nomePessoa.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                          readOnly
                        />
                        <span
                          className="invalid-feedback"
                          id="erro-nomePessoa"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-xl col">
                        <label>Cargo</label>
                        <input
                          type="text"
                          className="form-control"
                          name="cargo"
                          id="campo-cargo"
                          value={dadosCadastro.cargo.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                          readOnly
                        />
                        <span
                          className="invalid-feedback"
                          id="erro-cargo"
                        ></span>
                      </div>
                      <div className="col-xl col">
                        <label>Valor Diário (R$)</label>
                        <input
                          type="text"
                          className="form-control"
                          name="valorDiario"
                          id="campo-valorDiario"
                          value={dadosCadastro.valorDiario.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                          readOnly
                        />
                        <span
                          className="invalid-feedback"
                          id="erro-valorDiario"
                        ></span>
                      </div>
                      <div className="col-xl col-12">
                        <label>Status</label>
                        <input
                          type="text"
                          className="form-control"
                          name="status"
                          id="campo-status"
                          value={dadosCadastro.status.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                          readOnly
                        />
                        <span
                          className="invalid-feedback"
                          id="erro-status"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="dados-custo-funcionario">
                <fieldset className="fieldset-height-100" id="">
                  <legend>Custos</legend>
                  <div id="list-custos-mao-obra">
                    {props.listCustosMaoObraDisplay}
                    {dadosCadastro.maoObraOrcamentoId.valor > 0 && (
                      <div className="add-custo-mao-obra">
                        <button
                          type="button"
                          id="btn-add-custo-mao-obra"
                          className="btn btn-primary"
                          onClick={() => adicionarCusto()}
                        >
                          Adicionar
                        </button>
                      </div>
                    )}
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        }
        conteudoFooter={
          <>
            {dadosCadastro.maoObraOrcamentoId.valor > 0 && (
              <>
                <div>
                  <button
                    type="button"
                    className="btn btn-orcamentaria btn-100-px"
                    onClick={() => setShowModalConfirm(true)}
                  >
                    Excluir
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-success btn-100-px"
                    onClick={() => editarCadastro()}
                  >
                    Atualizar
                  </button>
                </div>
              </>
            )}
            {!dadosCadastro.maoObraOrcamentoId.valor && (
              <div>
                <button
                  type="button"
                  className="btn btn-primary btn-100-px"
                  onClick={() => salvarCadastro()}
                >
                  Salvar
                </button>
              </div>
            )}
            <div>
              <ModalConfirm
                show={showModalConfirm}
                onHide={() => setShowModalConfirm(false)}
                acaoConfirmada={() =>
                  props.onHide(
                    props.deletarCadastro(
                      dadosCadastro.maoObraOrcamentoId.valor
                    )
                  )
                }
                tituloModalConfirm={"Confirmar exclusão?"}
              />
            </div>
          </>
        }
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
  listCustosMaoObraDisplay: state.orcamento.listCustosMaoObraDisplay,
});

const mapDispatchToProps = (dispatch) => ({
  montarListCustosMaoObraDisplay: (
    listCustosMaoObraDisplay,
    listCustosMaoObraDisplayAux
  ) =>
    dispatch(
      orcamentoActions.montarListCustosMaoObraDisplay(
        listCustosMaoObraDisplay,
        listCustosMaoObraDisplayAux
      )
    ),
  adicionarItemCustosMaoObraDisplay: (
    listCustosMaoObraDisplay,
    itemCustoMaoObraDisplay
  ) =>
    dispatch(
      orcamentoActions.adicionarItemCustosMaoObraDisplay(
        listCustosMaoObraDisplay,
        itemCustoMaoObraDisplay
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalMaoObraOrcamento);
