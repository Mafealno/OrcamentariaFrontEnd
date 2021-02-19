/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "./AddItensCartaCobertura.css";
import * as cartaCoberturaActions from "../../../../../store/actions/cartaCobertura";
import ModalVisualizacaoItensCartaCobertura from "../../../../CartaCobertura/ModalVisualizacaoItensCartaCobertura/ModalVisualizacaoItensCartaCobertura";
import ModalConfirm from "../../../../ModalConfirm/ModalConfirm";
import ToastControl from "../../../../ToastControl/ToastControl";
import { connect } from "react-redux";
import readXlsxFile from "read-excel-file";

function AddItensCartaCobertura(props) {
  let [componente, setComponente] = useState({
    statusComponente: props.statusComponente,
  });
  let [referencia, setReferencia] = useState("naoSelecionado");
  let [cartaCoberturaAprovada, setCartaCoberturaAprovada] = useState(undefined);
  let [arquivo, setArquivo] = useState("");
  let [btn, setBtn] = useState(<span></span>);
  let [showModalConfirm, setShowModalConfirm] = useState(false);
  let [showModalVisualizacao, setShowModalVisualizacao] = useState(false);
  let [dadosValidacao, setDadosValidacao] = useState([]);
  let [showToast, setShowToast] = useState(false);
  let [idLinha, setIdLinha] = useState(0);

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

  useEffect(() => {
    setBtn(btnImportar);
    removerCartaAprovada();
    props.alterarStatusComponente(
      props.listComponenteItems,
      props.keyComponente,
      "Criado"
    );
  }, [arquivo, referencia, props.materialCartaCoberturaSalvar.MATERIAL_ID]);

  useEffect(() => {
    setComponente(
      props.listComponenteItems.find(
        (elemento) => elemento.key == props.keyComponente
      ).props
    );
  }, [props.listComponenteItems]);

  const btnImportar = [
    <>
      <button
        type="button"
        onClick={() => lerArquivo()}
        className="btn btn-orcamentaria btn-add-item"
      >
        Importar arquivo
      </button>
    </>,
  ];
  const btnValidar = [
    <>
      <button
        type="button"
        className="btn btn-success btn-add-item"
        onClick={() => setShowModalVisualizacao(true)}
      >
        Validar
      </button>
    </>,
  ];

  const carregando = [
    <span className="fa fa-spinner fa-spin carregando"></span>,
  ];

  var dadosArquivo = [];

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

  const lerArquivo = () => {
    const input = document.getElementById(
      "caminhoarquivo-" + props.keyComponente
    );

    if (input.files.length == 0) {
      const msg = "Selecione um aquivo para importação";
      exibirTost("erro", msg);
      return;
    }

    setBtn(carregando);

    if (input.files[0].name.split(".")[1] != "xlsx") {
      const msg = "Arquivo selecionado com formato inválido";
      exibirTost("erro", msg);
      return;
    }

    readXlsxFile(input.files[0]).then((linhas) => {
      linhas.forEach((colunas) => {
        let valorHpa = "";

        if (linhas.indexOf(colunas) == 0) {
          colunas.forEach((cabecalho) => {
            const item = {
              TEMPO_RESISTENCIA_FOGO: cabecalho.replace(/[^\d]+/g, ""),
              LIST_ITENS_CARTA_COBERTURA: [],
            };
            dadosArquivo.push(item);
          });
        } else {
          for (let i = 0; i < dadosArquivo.length; i++) {
            if (i == 0) {
              valorHpa = colunas[i];
            } else {
              setIdLinha((idLinha = idLinha + 1));

              const item = {
                idLinha: idLinha + dadosArquivo[i].TEMPO_RESISTENCIA_FOGO,
                VALOR_HP_A: valorHpa.toString(),
                VALOR_ESPESSURA: colunas[i],
              };

              dadosArquivo[i].LIST_ITENS_CARTA_COBERTURA.push(item);
            }
          }
        }
        setDadosValidacao([...dadosArquivo, dadosArquivo]);
        props.alterarStatusComponente(
          props.listComponenteItems,
          props.keyComponente,
          "Importado"
        );
      });
      dadosArquivo.splice(0, 1);
      setDadosValidacao([...dadosArquivo]);

      setBtn(btnValidar);
    });
  };

  const tratarValorEspessura = (valorEspessura) => {
    let valorEspessuraFloat = parseFloat(
      valorEspessura.toString().replace(",", ".")
    );

    if (!valorEspessuraFloat) {
      valorEspessuraFloat = 0;
    } else if (valorEspessuraFloat < 0) {
      valorEspessuraFloat = 0;
    }

    return valorEspessuraFloat;
  };

  const adicionarCartaCoberturaAprovada = (itensCartaCoberturaAprovado) => {
    let itensCartaCoberturaFormatado = [];

    itensCartaCoberturaAprovado.itens.forEach((item) => {
      const tempoFogo = item.TEMPO_RESISTENCIA_FOGO;
      item.LIST_ITENS_CARTA_COBERTURA.forEach((valor) => {
        itensCartaCoberturaFormatado = [
          ...itensCartaCoberturaFormatado,
          {
            ITENS_CARTA_COBERTURA_ID: 0,
            CARTA_COBERTURA_ID: 0,
            VALOR_HP_A: valor.VALOR_HP_A,
            TEMPO_RESISTENCIA_FOGO: tempoFogo,
            VALOR_ESPESSURA: tratarValorEspessura(valor.VALOR_ESPESSURA),
          },
        ];
      });
    });

    const cartaCobertura = {
      CARTA_COBERTURA_ID: 0,
      REFERENCIA: itensCartaCoberturaAprovado.referencia,
      MATERIAL: {
        MATERIAL_ID: props.materialCartaCoberturaSalvar.MATERIAL_ID,
        NOME_MATERIAL: props.materialCartaCoberturaSalvar.NOME_MATERIAL,
        DESCRICAO_MATERIAL:
          props.materialCartaCoberturaSalvar.DESCRICAO_MATERIAL,
        TIPO_MATERIAL: props.materialCartaCoberturaSalvar.TIPO_MATERIAL,
        FABRICANTE: {
          PESSOA_ID: props.materialCartaCoberturaSalvar.FABRICANTE.PESSOA_ID,
          NOME_PESSOA:
            props.materialCartaCoberturaSalvar.FABRICANTE.NOME_PESSOA,
          RG: "",
          CPF: "",
          CNPJ: "",
          TIPO_CADASTRO: "",
          TIPO_PESSOA: "",
          LIST_ENDERECO: [],
          LIST_CONTATO: [],
        },
      },
      LIST_ITENS_CARTA_COBERTURA: itensCartaCoberturaFormatado,
    };

    const objCartaCoberturaCompleto = {
      keyComponente: props.keyComponente,
      cartaCobertura: cartaCobertura,
    };

    setCartaCoberturaAprovada(cartaCobertura);

    props.adicionarCartaCoberturaSalvar(
      props.listCartaCoberturaSalvar,
      objCartaCoberturaCompleto,
      exibirTost("sucesso", "Importação aprovada com sucesso"),
      props.alterarStatusComponente(
        props.listComponenteItems,
        props.keyComponente,
        "Aprovado"
      )
    );
  };

  const deletarItensCartaCobertura = (tempoResistenciaFogo, idLinha) => {
    const componentePai = dadosValidacao.find(
      (elemento) => elemento.TEMPO_RESISTENCIA_FOGO == tempoResistenciaFogo
    );

    const indexComponentePai = dadosValidacao.indexOf(componentePai);

    const componenteFilho = componentePai.LIST_ITENS_CARTA_COBERTURA.find(
      (elemento) => elemento.idLinha == idLinha
    );

    const indexComponenteFilho = componentePai.LIST_ITENS_CARTA_COBERTURA.indexOf(
      componenteFilho
    );

    dadosValidacao[indexComponentePai].LIST_ITENS_CARTA_COBERTURA.splice(
      indexComponenteFilho,
      1
    );
  };

  const atualizarItensCartaCobertura = (
    tempoResistenciaFogo,
    objItensCartaCobertura
  ) => {
    const indexComponentePai = dadosValidacao.findIndex(
      (elemento) => elemento.TEMPO_RESISTENCIA_FOGO == tempoResistenciaFogo
    );

    const indexComponenteFilho = dadosValidacao[
      indexComponentePai
    ].LIST_ITENS_CARTA_COBERTURA.findIndex(
      (elemento) => elemento.idLinha == objItensCartaCobertura.idLinha
    );

    dadosValidacao[indexComponentePai].LIST_ITENS_CARTA_COBERTURA[
      indexComponenteFilho
    ].VALOR_ESPESSURA = objItensCartaCobertura.VALOR_ESPESSURA;
  };

  const deletarItensPorTempoResistenciaFogo = (tempoFogo) => {
    const indexItensCartaCobertura = dadosValidacao.findIndex(
      (elemento) => elemento.TEMPO_RESISTENCIA_FOGO == tempoFogo
    );

    dadosValidacao.splice(indexItensCartaCobertura, 1);

    setDadosValidacao([...dadosValidacao]);
  };

  const removerCartaAprovada = () => {
    if (cartaCoberturaAprovada) {
      props.removerCartaCoberturaSalvar(
        props.listCartaCoberturaSalvar,
        cartaCoberturaAprovada
      );
      setCartaCoberturaAprovada(undefined);
    }
  };

  const removerComponente = () => {
    removerCartaAprovada();

    props.removerComponenteItems(
      props.listComponenteItems,
      props.keyComponente
    );
  };

  return (
    <>
      <div className="containerAddItensCartaCobertura">
        <div className="form">
          <div className="form-group">
            <div className="form-row">
              <div className="close-add">
                <a href="#" onClick={() => setShowModalConfirm(true)}>
                  <span className="fa fa-close close-add"></span>
                </a>
              </div>
            </div>
            <div className="form-row">
              <label>Referência</label>
              <select
                id="select-tipo-cadstro"
                className="form-control"
                name="referecia"
                onChange={(event) => setReferencia(event.target.value)}
              >
                <option value="naoSelecionado">Escolher...</option>
                <option value="Viga">Viga</option>
                <option value="Coluna">Coluna</option>
                <option value="Tubo">Tubo</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label>Selecionar arquivo</label>
                <input
                  type="file"
                  className="form-control importacao-arquivo-carta-cobertura"
                  name="fileImportacao"
                  value={arquivo}
                  disabled={referencia == "naoSelecionado" ? true : false}
                  id={"caminhoarquivo-" + props.keyComponente}
                  onChange={(event) => setArquivo(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row center">
              {dadosValidacao.length == 0 && btn}

              {dadosValidacao.length > 0 && btn}
            </div>
          </div>
          <div className="form-group center status-componente">
            Status: {componente.statusComponente[0]}
          </div>
        </div>
      </div>
      <div>
        <ModalVisualizacaoItensCartaCobertura
          show={showModalVisualizacao}
          editarReferecia={false}
          referencia={referencia}
          cartaCoberturaAprovada={cartaCoberturaAprovada}
          listTempoFogo={dadosValidacao}
          onHide={() => setShowModalVisualizacao(false)}
          acaoRemover={(tempoResistenciaFogo, idLinha) =>
            deletarItensCartaCobertura(tempoResistenciaFogo, idLinha)
          }
          acaoDeletarItensCartaCobertura={(tempoFogo) =>
            deletarItensPorTempoResistenciaFogo(tempoFogo)
          }
          acaoAtualizar={(tempoResistenciaFogo, objItensCartaCobertura) =>
            atualizarItensCartaCobertura(
              tempoResistenciaFogo,
              objItensCartaCobertura
            )
          }
          acaoAprovarCartaCobertura={(itensCartaCoberturaAprovado) =>
            adicionarCartaCoberturaAprovada(itensCartaCoberturaAprovado)
          }
        />
      </div>
      <div>
        <ModalConfirm
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          acaoConfirmada={() => removerComponente()}
          tituloModalConfirm={"Remover elemento selecionado?"}
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
  listComponenteItems: state.cartaCobertura.listComponenteItems,
  materialCartaCoberturaSalvar:
    state.cartaCobertura.materialCartaCoberturaSalvar,
  listCartaCoberturaSalvar: state.cartaCobertura.listCartaCoberturaSalvar,
});

const mapDispatchToProps = (dispatch) => ({
  removerComponenteItems: (listComponenteItems, indexComponente) =>
    dispatch(
      cartaCoberturaActions.removerComponenteItems(
        listComponenteItems,
        indexComponente
      )
    ),

  removerCartaCoberturaSalvar: (
    listCartaCoberturaSalvar,
    ObjCartaCoberturaRemover
  ) =>
    dispatch(
      cartaCoberturaActions.removerCartaCoberturaSalvar(
        listCartaCoberturaSalvar,
        ObjCartaCoberturaRemover
      )
    ),
  adicionarCartaCoberturaSalvar: (
    listCartaCoberturaSalvar,
    novoObjCartaCobertura
  ) =>
    dispatch(
      cartaCoberturaActions.adicionarCartaCoberturaSalvar(
        listCartaCoberturaSalvar,
        novoObjCartaCobertura
      )
    ),
  alterarStatusComponente: (
    listComponenteItems,
    keyComponente,
    statusAlteracao
  ) =>
    dispatch(
      cartaCoberturaActions.alterarStatusComponente(
        listComponenteItems,
        keyComponente,
        statusAlteracao
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItensCartaCobertura);
