import React, { useState, useEffect } from "react";
import "./LinhaTabelaTempoFogo.css";
import ModalConfirm from "../../../../ModalConfirm/ModalConfirm";
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

  let [id, setId] = useState(0);

  useEffect(() => {
    setId(props.idLinha);
  }, []);

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
    if (!props.cartaCoberturaAprovada) {
      if (showBotoesOpcoes) {
        setBotoesOpcoes("show-botoes-opcoes");
        ReactDOM.render(
          <input
            type="number"
            defaultValue={dados.espessura}
            className="form-control input-editar-espessura-linha-tempo-fogo"
            id={dados.tempoResistenciaFogo + dados.hpA}
          />,
          document.getElementById(id)
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
          document.getElementById(id)
        );
      }
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
    let valorEspessuraNovo = parseFloat(
      document.getElementById(dados.tempoResistenciaFogo + dados.hpA).value
    );

    if (valorEspessuraNovo < 0) {
      valorEspessuraNovo = 0;
      setDados({
        ...dados,
        espessura: valorEspessuraNovo,
      });
      document.getElementById(
        dados.tempoResistenciaFogo + dados.hpA
      ).value = valorEspessuraNovo;
    }

    if (props.itensCartaCoberturaId) {
      const objItensCartaCobertura = {
        ITENS_CARTA_COBERTURA_ID: dados.itensCartaCoberturaId,
        CARTA_COBERTURA_ID: dados.cartaCoberturaId,
        VALOR_HP_A: dados.hpA,
        TEMPO_RESISTENCIA_FOGO: dados.tempoResistenciaFogo,
        VALOR_ESPESSURA: valorEspessuraNovo,
      };

      props.acaoAtualizar(dados.tempoResistenciaFogo, objItensCartaCobertura);
    } else {
      const objItensCartaCobertura = {
        idLinha: id,
        VALOR_ESPESSURA: valorEspessuraNovo,
      };

      props.acaoAtualizar(dados.tempoResistenciaFogo, objItensCartaCobertura);
    }

    finalizarAtualizarTabela();
  };

  const removerElementoTela = () => {
    if (dados.itensCartaCoberturaId) {
      props.acaoRemover(
        dados.tempoResistenciaFogo,
        dados.itensCartaCoberturaId
      );
    } else {
      props.acaoRemover(dados.tempoResistenciaFogo, id);
    }
    ReactDOM.render(<></>, document.getElementById(dados.hpA + id));
  };

  return (
    <>
      <div id={dados.hpA + id}>
        <div className="linha-tabela-tempo-fogo">
          <div
            className="coluna-tabela-tempo-fogo"
            onDoubleClick={() =>
              setShowBotoesOpcoes(showBotoesOpcoes ? false : true)
            }
          >
            {dados.hpA}
          </div>
          <div className="coluna-tabela-tempo-fogo" id={id}>
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
              className="btn btn-orcamentaria botao-opcoes-visualizao"
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
