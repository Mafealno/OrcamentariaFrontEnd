import React, { useState } from "react";
import "./AddItensCartaCobertura.css";
import * as cartaCoberturaActions from "../../../../store/actions/cartaCobertura";
import ModalValidacaoImportacao from "./ModalValidacaoImportacao/ModalValidacaoImportacao";
import ModalConfirm from "../../../ModalConfirm/ModalConfirm";
import ToastControl from "../../../ToastControl/ToastControl";
import { connect } from "react-redux";
import readXlsxFile from "read-excel-file";

function AddItensCartaCobertura(props) {
  let [arquivoSelecionado, setArquivoSelecionado] = useState("");
  let [referecia, setReferencia] = useState("");
  let [showModal, setShowModal] = useState(false);
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

  var dadosArquivo = [];

  const lerArquivo = () => {
    const input = document.getElementById("caminhoarquivo");

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
                hpa: valorHpa,
                espessura: colunas[i],
              };

              dadosArquivo[i].valores = [...dadosArquivo[i].valores, item];
            }
          }
        }

        setDadosValidadao([...dadosArquivo, dadosArquivo]);
      });
      dadosArquivo.splice(0, 1);
      setDadosValidadao([...dadosArquivo]);
    });
  };

  return (
    <>
      <div className="containerAddItensCartaCobertura">
        <div className="form">
          <div className="form-group">
            <div className="form-row">
              <div className="close-add">
                <a href="#" onClick={() => setShowModal(true)}>
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
              <label>Selecionar arquivo</label>
              <div className="custom-file">
                <label className="custom-file-label">
                  {arquivoSelecionado ? "Arquivo Selecionado" : ""}
                </label>
                <input
                  type="file"
                  className="custom-file-input"
                  name="fileImportacao"
                  id="caminhoarquivo"
                  onChange={(event) =>
                    setArquivoSelecionado(event.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              {dadosValidacao.length == 0 && (
                <button
                  type="button"
                  onClick={() => lerArquivo()}
                  className="btn btn-danger btn-add-item"
                >
                  Importar arquivo
                </button>
              )}

              {dadosValidacao.length > 0 && (
                <button
                  type="button"
                  className="btn btn-success btn-add-item"
                  onClick={() => setShowModalValidacao(true)}
                >
                  Validar arquivo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <ModalValidacaoImportacao
          show={showModalValidadao}
          onHide={() => setShowModalValidacao(false)}
          dadosValidacao={dadosValidacao}
        />
      </div>
      <div>
        <ModalConfirm
          show={showModal}
          onHide={() => setShowModal(false)}
          acaoConfirmada={() =>
            props.removerComponenteItems(
              props.listComponenteItems,
              props.keyComponente
            )
          }
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
});

const mapDispatchToProps = (dispatch) => ({
  removerComponenteItems: (listComponenteItems, indexComponente) =>
    dispatch(
      cartaCoberturaActions.removerComponenteItems(
        listComponenteItems,
        indexComponente
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItensCartaCobertura);
