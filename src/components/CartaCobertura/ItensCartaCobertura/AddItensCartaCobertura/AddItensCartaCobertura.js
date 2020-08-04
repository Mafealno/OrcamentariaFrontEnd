import React, { useState, useEffect } from "react";
import "./AddItensCartaCobertura.css";
import * as cartaCoberturaActions from "../../../../store/actions/cartaCobertura";
import ModalValidacaoImportacao from "./ModalValidacaoImportacao/ModalValidacaoImportacao";
import ModalConfirm from "../../../ModalConfirm/ModalConfirm";
import ToastControl from "../../../ToastControl/ToastControl";
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
  let [showModalValidadao, setShowModalValidacao] = useState(false);
  let [dadosValidacao, setDadosValidadao] = useState([]);
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

  useEffect(() => {
    setBtn(btnImportar);
    removerCartaAprovada();
    props.alterarStatusComponente(
      props.listComponenteItems,
      props.keyComponente,
      "Criado"
    );
  }, [arquivo, referencia, props.materialCartaCobertura.MATERIAL_ID]);

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
        className="btn btn-danger btn-add-item"
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
        onClick={() => setShowModalValidacao(true)}
      >
        Validar
      </button>
    </>,
  ];

  const carregando = [
    <span className="fa fa-spinner fa-spin carregando"></span>,
  ];

  var dadosArquivo = [];

  const lerArquivo = () => {
    const input = document.getElementById(
      "caminhoarquivo-" + props.keyComponente
    );

    if (input.files.length == 0) {
      setConfigToast({
        estiloToast: "",
        estiloToastHeader: "estiloToastErro",
        estiloToastBody: "estiloToastErro",
        delayToast: 3000,
        autoHideToast: true,
        hideToastHeader: false,
        conteudoHeader: "",
        conteudoBody: "Selecione um aquivo para importação",
        closeToast: () => setShowToast(),
      });
      setShowToast(true);
      return;
    }

    setBtn(carregando);

    if (input.files[0].name.split(".")[1] != "xlsx") {
      setConfigToast({
        estiloToast: "",
        estiloToastHeader: "estiloToastErro",
        estiloToastBody: "estiloToastErro",
        delayToast: 3000,
        autoHideToast: true,
        hideToastHeader: false,
        conteudoHeader: "",
        conteudoBody: "Arquivo selecionado com formato inválido",
        closeToast: () => setShowToast(),
      });
      setShowToast(true);
      return;
    }

    readXlsxFile(input.files[0]).then((linhas) => {
      linhas.forEach((colunas) => {
        let valorHpa = "";

        if (linhas.indexOf(colunas) == 0) {
          colunas.forEach((cabecalho) => {
            const item = {
              nome: cabecalho.replace(/[^\d]+/g, ""),
              valores: [],
            };
            dadosArquivo = [...dadosArquivo, item];
          });
        } else {
          for (let i = 0; i < dadosArquivo.length; i++) {
            if (i == 0) {
              valorHpa = colunas[i];
            } else {
              const item = {
                hpa: valorHpa.toString(),
                espessura: colunas[i],
              };

              dadosArquivo[i].valores = [...dadosArquivo[i].valores, item];
            }
          }
        }
        setDadosValidadao([...dadosArquivo, dadosArquivo]);
        props.alterarStatusComponente(
          props.listComponenteItems,
          props.keyComponente,
          "Importado"
        );
      });
      dadosArquivo.splice(0, 1);
      setDadosValidadao([...dadosArquivo]);

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
      const tempoFogo = item.nome;
      item.valores.forEach((valor) => {
        itensCartaCoberturaFormatado = [
          ...itensCartaCoberturaFormatado,
          {
            ITENS_CARTA_COBERTURA_ID: 0,
            CARTA_COBERTURA_ID: 0,
            VALOR_HP_A: valor.hpa,
            TEMPO_RESISTENCIA_FOGO: tempoFogo,
            VALOR_ESPESSURA: tratarValorEspessura(valor.espessura),
          },
        ];
      });
    });

    const cartaCobertura = {
      CARTA_COBERTURA_ID: 0,
      REFERENCIA: itensCartaCoberturaAprovado.referencia,
      MATERIAL: {
        MATERIAL_ID: props.materialCartaCobertura.MATERIAL_ID,
        NOME_MATERIAL: props.materialCartaCobertura.NOME_MATERIAL,
        DESCRICAO_MATERIAL: props.materialCartaCobertura.DESCRICAO_MATERIAL,
        TIPO_MATERIAL: props.materialCartaCobertura.TIPO_MATERIAL,
        FABRICANTE: {
          PESSOA_ID: props.materialCartaCobertura.FABRICANTE.PESSOA_ID,
          NOME_PESSOA: props.materialCartaCobertura.FABRICANTE.NOME_PESSOA,
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
      setConfigToast({
        estiloToast: "",
        estiloToastHeader: "estiloToastSucesso",
        estiloToastBody: "estiloToastSucesso",
        delayToast: 3000,
        autoHideToast: true,
        hideToastHeader: false,
        conteudoHeader: "",
        conteudoBody: "Importação aprovada com sucesso",
        closeToast: () => setShowToast(),
      }),
      setShowToast(true),
      props.alterarStatusComponente(
        props.listComponenteItems,
        props.keyComponente,
        "Aprovado"
      )
    );
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
                  className="form-control"
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
        <ModalValidacaoImportacao
          referencia={referencia}
          show={showModalValidadao}
          cartaCoberturaAprovada={cartaCoberturaAprovada}
          onHide={() => setShowModalValidacao(false)}
          dadosValidacao={dadosValidacao}
          aprovarCartaCobertura={(itensCartaCoberturaAprovado) =>
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
  materialCartaCobertura: state.cartaCobertura.materialCartaCobertura,
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
