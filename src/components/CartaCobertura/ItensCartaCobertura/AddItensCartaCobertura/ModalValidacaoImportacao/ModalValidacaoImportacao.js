import React, { useState, useEffect } from "react";
import "./ModalValidacaoImportacao.css";
import ModalControl from "../../../../ModalControl/ModalControl";
import ModalConfirm from "../../../../ModalConfirm/ModalConfirm";
import ReactDOM from "react-dom";

export default function ModalValidacaoImportacao(props) {
  let [idLinhaInputAnterior, setIdLinhaInputAnterior] = useState("");
  let [idLinhaBotaoAnterior, setIdLinhaBotaoAnterior] = useState("");
  let [valorAnterior, setValorAnterior] = useState();
  let [showModal, setShowModal] = useState(false);
  let [valorEdicao, setValorEdicao] = useState();
  let tabelasValidacao = "";

  useEffect(() => {
    setIdLinhaInputAnterior("");
    setIdLinhaBotaoAnterior("");
  }, [props.show]);

  if (props.show) {
    tabelasValidacao = props.dadosValidacao.map((dados) => (
      <div className="tabela-validacao">
        <div className="titulo">
          Tempo: <span className="titulo-linhas">{dados.nome} minutos</span>
        </div>
        <table className="table table-striped">
          <tr>
            <th className="titulo-linhas">HP/A</th>
            <th className="titulo-linhas">Espessura</th>
            <th className="titulo-linhas"></th>
          </tr>

          {dados.valores.map((objValores) => (
            <tr
              id={
                props.dadosValidacao.indexOf(dados) +
                "-" +
                dados.valores.indexOf(objValores)
              }
              onDoubleClick={() =>
                showEditar(
                  dados.nome +
                    "-" +
                    objValores.hpa +
                    "-" +
                    objValores.espessura,
                  dados.nome + "-" + objValores.hpa,
                  props.dadosValidacao.indexOf(dados) +
                    "-" +
                    dados.valores.indexOf(objValores),
                  false
                )
              }
            >
              <td className="linhas ">{objValores.hpa}</td>
              <td
                className="linhas"
                id={
                  dados.nome + "-" + objValores.hpa + "-" + objValores.espessura
                }
              >
                {objValores.espessura}
              </td>
              <td
                id={dados.nome + "-" + objValores.hpa}
                className="editar"
              ></td>
            </tr>
          ))}
        </table>
      </div>
    ));
  }

  const showEditar = (idSubInput, idSubButton, indexEdicao, salvar) => {
    if (!props.cartaCoberturaAprovada) {
      if (salvar) {
        let novoId =
          idSubInput.split("-")[0] +
          "-" +
          idSubInput.split("-")[1] +
          "-" +
          document.getElementById("valor-edicao").value;
        document.getElementById(idSubInput).id = novoId;
        ReactDOM.render(
          <>{document.getElementById("valor-edicao").value}</>,
          document.getElementById(novoId)
        );
        setIdLinhaInputAnterior(novoId);
        ReactDOM.unmountComponentAtNode(document.getElementById(idSubButton));
        return;
      }

      if (document.getElementById(idSubInput)) {
        if (document.getElementById(idSubInput).children.length == 0) {
          setValorAnterior(document.getElementById(idSubInput).innerHTML);
        } else {
          return;
        }
      }

      if (idLinhaBotaoAnterior || idLinhaInputAnterior) {
        ReactDOM.render(
          <>{valorAnterior}</>,
          document.getElementById(idLinhaInputAnterior)
        );
        ReactDOM.unmountComponentAtNode(
          document.getElementById(idLinhaBotaoAnterior)
        );
      }

      setIdLinhaInputAnterior(idSubInput);
      setIdLinhaBotaoAnterior(idSubButton);

      setValorEdicao(document.getElementById(idSubInput).innerHTML);

      ReactDOM.render(
        <input
          type="number"
          defaultValue={document.getElementById(idSubInput).innerHTML ?? 0}
          className="form-control input-editar-espessura"
          id="valor-edicao"
          onChange={(event) => setValorEdicao(event.target.value)}
        />,
        document.getElementById(idSubInput)
      );

      ReactDOM.render(
        <button
          type="button"
          className="btn btn-success btn-editar-espessura"
          onClick={() =>
            salvarValorEspessura(
              indexEdicao.split("-")[0],
              indexEdicao.split("-")[1],
              idSubInput,
              idSubButton
            )
          }
        >
          Salvar
        </button>,
        document.getElementById(idSubButton)
      );
    }
  };

  const salvarValorEspessura = (
    indexPai,
    indexFilho,
    idSubInput,
    idSubButton
  ) => {
    props.dadosValidacao[indexPai].valores[indexFilho].espessura =
      document.getElementById("valor-edicao").value ?? 0.0;

    showEditar(idSubInput, idSubButton, 0, true);

    setValorAnterior(document.getElementById("valor-edicao").value);
  };

  const montarObj = () => {
    return {
      referencia: props.referencia,
      itens: props.dadosValidacao,
    };
  };

  return (
    <>
      <ModalControl
        {...props}
        tamanhoModal="xl"
        estiloModal="estiloModal"
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal overflow-x padding-body"
        estiloModalFooter="backgroundModal"
        tituloModal="Validação dos dados importados"
        conteudoHeader={
          <>
            <div className="close-modal">
              <a href="#" onClick={() => props.onHide()}>
                <span className="fa fa-close tituloModal"></span>
              </a>
            </div>
          </>
        }
        conteudoBody={
          <>
            <div className="titulo titulo-referencia">
              Referência:{" "}
              <span className="titulo-linhas">{props.referencia}</span>
            </div>
            <div id="container-tabela-validacao">{tabelasValidacao}</div>
          </>
        }
        conteudoFooter={
          <>
            {!props.cartaCoberturaAprovada && (
              <div>
                <button
                  type="button"
                  className="btn btn-aprovar"
                  onClick={() => setShowModal(true)}
                >
                  Aprovar
                </button>
              </div>
            )}
            <div>
              <ModalConfirm
                show={showModal}
                onHide={() => setShowModal(false)}
                acaoConfirmada={() =>
                  props.aprovarCartaCobertura(montarObj(), props.onHide())
                }
                tituloModalConfirm={
                  "Deseja aprovar importação? Os valores negativos serão zerados."
                }
              />
            </div>
          </>
        }
      />
    </>
  );
}
