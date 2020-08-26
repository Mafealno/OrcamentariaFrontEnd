import React, { useState, useEffect } from "react";
import "./ItemTabelaItensCartaCobertura.css";
import * as cartaCoberturaActions from "../../../../../../store/actions/cartaCobertura";
import ModalVisualizacaoItensCartaCobertura from "../../../../ModalVisualizacaoItensCartaCobertura/ModalVisualizacaoItensCartaCobertura";
import ToastControl from "../../../../../ToastControl/ToastControl";
import ModalConfirm from "../../../../../ModalConfirm/ModalConfirm";

import { connect } from "react-redux";

function ItemTabelaItensCartaCobertura(props) {
  let [showModalVisualizacao, setShowModalVisualizacao] = useState(false);
  let [showModalConfirm, setShowModalConfirm] = useState(false);
  let [listTempoFogo, setListTempoFogo] = useState([]);
  let [listTempoFogoDisplay, setListTempoFogoDisplay] = useState([]);
  let [referencia, setReferencia] = useState("");
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
    if (props.dados.LIST_ITENS_CARTA_COBERTURA) {
      ordernarCartaCoberturaPorTempoFogo();
    }
  }, [props.dados.LIST_ITENS_CARTA_COBERTURA]);

  useEffect(() => {
    if (props.dados.LIST_ITENS_CARTA_COBERTURA) {
      montarElementoDisplay();
    }
  }, [listTempoFogo.length]);

  useEffect(() => {
    setReferencia(props.dados.REFERENCIA);
  }, [props.dados.CARTA_COBERTURA_ID]);

  const deletarItensPorTempoResistenciaFogo = (tempoFogo) => {
    fetch(
      props.linkBackEnd +
        "/itensCartaCobertura/" +
        props.dados.CARTA_COBERTURA_ID +
        "/" +
        tempoFogo,
      {
        method: "DELETE",
      }
    ).then((data) => {
      if (data.ok) {
        const itensCartaCobertura = listTempoFogo.find(
          (elemento) => elemento.TEMPO_RESISTENCIA_FOGO == tempoFogo
        );

        const index = listTempoFogo.indexOf(itensCartaCobertura);

        listTempoFogo.splice(index, 1);

        setListTempoFogo([...listTempoFogo]);

        if (!listTempoFogo.length) {
          props.deletarCartaCobertura(
            props.dados,
            setShowModalVisualizacao(false)
          );
        }
      } else {
        setConfigToast({
          estiloToast: "",
          estiloToastHeader: "estiloToastErro",
          estiloToastBody: "estiloToastErro",
          delayToast: 3000,
          autoHideToast: false,
          hideToastHeader: true,
          conteudoHeader: "",
          conteudoBody: "Erro ao deletar tempo " + tempoFogo + ".",
          closeToast: () => setShowToast(),
        });
        setShowToast(true);

        return;
      }
    });
  };

  const atualizarReferencia = (novaReferecia) => {
    const retorno = props.atualizarReferencia(
      props.dados.CARTA_COBERTURA_ID,
      novaReferecia,
      setReferencia
    );

    if (retorno) {
      if (retorno.ok) {
        setReferencia(novaReferecia);
      }
    }
  };

  const atualizarItensCartaCobertura = (
    tempoResistenciaFogo,
    objItensCartaCobertura
  ) => {
    fetch(
      props.linkBackEnd +
        "/itensCartaCobertura/" +
        objItensCartaCobertura.ITENS_CARTA_COBERTURA_ID,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objItensCartaCobertura),
      }
    ).then((data) => {
      if (data.ok) {
        const indexComponentePai = listTempoFogo.findIndex(
          (elemento) => elemento.TEMPO_RESISTENCIA_FOGO == tempoResistenciaFogo
        );

        const indexComponenteFilho = listTempoFogo[
          indexComponentePai
        ].LIST_ITENS_CARTA_COBERTURA.findIndex(
          (elemento) =>
            elemento.ITENS_CARTA_COBERTURA_ID ==
            objItensCartaCobertura.ITENS_CARTA_COBERTURA_ID
        );

        listTempoFogo[indexComponentePai].LIST_ITENS_CARTA_COBERTURA[
          indexComponenteFilho
        ].VALOR_ESPESSURA = objItensCartaCobertura.VALOR_ESPESSURA;
      } else {
        return;
      }
    });
  };

  const deletarItensCartaCobertura = (
    tempoResistenciaFogo,
    itensCartaCoberturaId
  ) => {
    fetch(
      props.linkBackEnd +
        "/itensCartaCobertura/deletar?ItensCartaCoberturaId=" +
        itensCartaCoberturaId,
      {
        method: "DELETE",
      }
    ).then((data) => {
      if (data.ok) {
        const componentePai = listTempoFogo.find(
          (elemento) => elemento.TEMPO_RESISTENCIA_FOGO == tempoResistenciaFogo
        );

        const indexComponentePai = listTempoFogo.indexOf(componentePai);

        const componenteFilho = componentePai.LIST_ITENS_CARTA_COBERTURA.find(
          (elemento) =>
            elemento.ITENS_CARTA_COBERTURA_ID == itensCartaCoberturaId
        );

        const indexComponenteFilho = componentePai.LIST_ITENS_CARTA_COBERTURA.indexOf(
          componenteFilho
        );

        listTempoFogo[indexComponentePai].LIST_ITENS_CARTA_COBERTURA.splice(
          indexComponenteFilho,
          1
        );
      } else {
        return;
      }
    });
  };

  const ordernarCartaCoberturaPorTempoFogo = () => {
    let listTempoFogoAux = [];

    props.dados.LIST_ITENS_CARTA_COBERTURA.map((elementoAtual) => {
      const tempoFogo = listTempoFogoAux.find(
        (elemento) =>
          elemento.TEMPO_RESISTENCIA_FOGO ==
          elementoAtual.TEMPO_RESISTENCIA_FOGO
      );

      if (tempoFogo) {
        const indexElemento = listTempoFogoAux.indexOf(tempoFogo);

        const objItemCartaCobertura = {
          CARTA_COBERTURA_ID: elementoAtual.CARTA_COBERTURA_ID,
          ITENS_CARTA_COBERTURA_ID: elementoAtual.ITENS_CARTA_COBERTURA_ID,
          VALOR_ESPESSURA: elementoAtual.VALOR_ESPESSURA,
          VALOR_HP_A: elementoAtual.VALOR_HP_A,
        };
        listTempoFogoAux[indexElemento].LIST_ITENS_CARTA_COBERTURA.push(
          objItemCartaCobertura
        );
      } else {
        const objTempoFogo = {
          TEMPO_RESISTENCIA_FOGO: elementoAtual.TEMPO_RESISTENCIA_FOGO,
          LIST_ITENS_CARTA_COBERTURA: [
            {
              CARTA_COBERTURA_ID: elementoAtual.CARTA_COBERTURA_ID,
              ITENS_CARTA_COBERTURA_ID: elementoAtual.ITENS_CARTA_COBERTURA_ID,
              VALOR_ESPESSURA: elementoAtual.VALOR_ESPESSURA,
              VALOR_HP_A: elementoAtual.VALOR_HP_A,
            },
          ],
        };

        listTempoFogoAux.push(objTempoFogo);
      }
    });

    setListTempoFogo(listTempoFogoAux);
  };

  const montarElementoDisplay = () => {
    let tempoFogoCartaCoberuraDisplayAux = [];

    tempoFogoCartaCoberuraDisplayAux = listTempoFogo.map((elementoAtual) => (
      <div className="item-tempo-fogo" onClick={() => elementoAtual}>
        {elementoAtual.TEMPO_RESISTENCIA_FOGO}
      </div>
    ));

    setListTempoFogoDisplay(tempoFogoCartaCoberuraDisplayAux);
  };

  return (
    <>
      <div className="container-item-carta-cobertura">
        <div className="referencia">
          <label className="titulo-item-carta">Referência</label>
          <label>{referencia}</label>
        </div>
        <label className="titulo-item-carta">Tempo de Resistência</label>
        <div className="container-tempo-fogo">{listTempoFogoDisplay}</div>
        <div className="container-btn-opcoes-carta-cobertura">
          <button
            type="button"
            className="btn btn-danger btn-opcoes-carta-cobertura"
            onClick={() => setShowModalConfirm(true)}
          >
            Excluir
          </button>

          <button
            type="button"
            className="btn btn-primary btn-opcoes-carta-cobertura"
            onClick={() => setShowModalVisualizacao(true)}
          >
            Visualizar
          </button>
        </div>
      </div>
      <div>
        <ModalVisualizacaoItensCartaCobertura
          show={showModalVisualizacao}
          editarReferecia={true}
          referencia={referencia}
          listTempoFogo={listTempoFogo}
          onHide={() => setShowModalVisualizacao(false)}
          acaoAtualizarReferecia={(novaReferecia) =>
            atualizarReferencia(novaReferecia)
          }
          acaoDeletarItensCartaCobertura={(tempoFogo) =>
            deletarItensPorTempoResistenciaFogo(tempoFogo)
          }
          acaoRemover={(tempoResistenciaFogo, itensCartaCoberturaId) =>
            deletarItensCartaCobertura(
              tempoResistenciaFogo,
              itensCartaCoberturaId
            )
          }
          acaoAtualizar={(tempoResistenciaFogo, objItensCartaCobertura) =>
            atualizarItensCartaCobertura(
              tempoResistenciaFogo,
              objItensCartaCobertura
            )
          }
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
      <div>
        <ModalConfirm
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          acaoConfirmada={() => props.deletarCartaCobertura(props.dados)}
          tituloModalConfirm={
            "Deletar referecia '" +
            referencia +
            "'? O dados não poderão ser recuperados."
          }
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  cartaCoberturaEditar: state.cartaCobertura.cartaCoberturaEditar,
});

const mapDispatchToProps = (dispatch) => ({
  listarCartaCoberturaEditar: (linkBackEnd) =>
    dispatch(cartaCoberturaActions.listarCartaCoberturaEditar(linkBackEnd)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemTabelaItensCartaCobertura);
