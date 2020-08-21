import React, { useState, useEffect } from "react";
import "./LinhaTabelaTempoFogo.css";
import ModalConfirm from "../../../../../../../../ModalConfirm/ModalConfirm";
import ReactDOM from "react-dom";

export default function LinhaTabelaTempoFogo(props) {
  let [botoesOpcoes, setBotoesOpcoes] = useState("hidden-botoes-opcoes");
  let [showBotoesOpcoes, setShowBotoesOpcoes] = useState(false);
  let [showModalConfirm, setShowModalConfirm] = useState(false);

  let [dados, setDados] = useState({
    cartaCoberturaId: 0,
    itensCartaCoberturaId: 0,
    tempoResistenciaFogo: "",
    hpA: "",
    espessura: "",
  });

  useEffect(() => {
    setDados({
      cartaCoberturaId: props.cartaCoberturaId,
      itensCartaCoberturaId: props.itensCartaCoberturaId,
      tempoResistenciaFogo: props.tempoResistenciaFogo,
      hpA: props.hpA,
      espessura: props.espessura,
    });
  }, [props]);

  useEffect(() => {
    if (showBotoesOpcoes) {
      setBotoesOpcoes("show-botoes-opcoes");
      ReactDOM.render(
        <input
          type="number"
          defaultValue={dados.espessura}
          className="form-control input-editar-espessura-linha-tempo-fogo"
          id={dados.tempoResistenciaFogo + dados.hpA}
        />,
        document.getElementById(dados.itensCartaCoberturaId)
      );
    } else {
      setBotoesOpcoes("hidden-botoes-opcoes");
      ReactDOM.render(
        <span
          onDoubleClick={() =>
            setShowBotoesOpcoes(showBotoesOpcoes ? false : true)
          }
        >
          {dados.espessura}
        </span>,
        document.getElementById(dados.itensCartaCoberturaId)
      );
    }
  }, [showBotoesOpcoes]);

  const finalizarAtualizarTabela = () => {
    setDados({
      ...dados,
      espessura: document.getElementById(dados.tempoResistenciaFogo + dados.hpA)
        .value,
    });
    setShowBotoesOpcoes(false);
  };

  const acaoAtualizar = () => {
    if (props.acaoAtualizar) {
    } else if (props.acaoAtualizarTabela) {
      const objItensCartaCobertura = {
        ITENS_CARTA_COBERTURA_ID: dados.itensCartaCoberturaId,
        CARTA_COBERTURA_ID: dados.cartaCoberturaId,
        VALOR_HP_A: dados.hpA,
        TEMPO_RESISTENCIA_FOGO: dados.tempoResistenciaFogo,
        VALOR_ESPESSURA: parseFloat(
          document.getElementById(dados.tempoResistenciaFogo + dados.hpA).value
        ),
      };

      props.acaoAtualizarTabela(
        objItensCartaCobertura,
        finalizarAtualizarTabela()
      );
    }
  };

  const removerElementoTela = () => {
    props.acaoRemover(
      dados.itensCartaCoberturaId,
      ReactDOM.render(
        <></>,
        document.getElementById(dados.hpA + dados.itensCartaCoberturaId)
      )
    );
  };

  return (
    <>
      <div id={dados.hpA + dados.itensCartaCoberturaId}>
        <div className="linha-tabela-tempo-fogo">
          <div
            className="coluna-tabela-tempo-fogo"
            onDoubleClick={() =>
              setShowBotoesOpcoes(showBotoesOpcoes ? false : true)
            }
          >
            {dados.hpA}
          </div>
          <div
            className="coluna-tabela-tempo-fogo"
            id={dados.itensCartaCoberturaId}
          >
            <span
              onDoubleClick={() =>
                setShowBotoesOpcoes(showBotoesOpcoes ? false : true)
              }
            >
              {dados.espessura}
            </span>
          </div>
        </div>
        <div className={"linha-tabela-tempo-fogo " + botoesOpcoes}>
          <div className="coluna-tabela-tempo-fogo">
            <button
              type="button"
              className="btn btn-danger botao-opcoes-visualizao"
              onClick={() => setShowModalConfirm(true)}
            >
              Excluir
            </button>
          </div>
          <div className="coluna-tabela-tempo-fogo">
            <button
              type="button"
              className="btn btn-success botao-opcoes-visualizao"
              onClick={() => acaoAtualizar()}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
      <div>
        <ModalConfirm
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          acaoConfirmada={() => removerElementoTela()}
          tituloModalConfirm={"Deseja excluir a linha selecionada?"}
        />
      </div>
    </>
  );
}
