import React, { useState, useEffect } from "react";
import "./ModalVisualizacaoItensCartaCobertura.css";
import TabelaTempoFogo from "./TabelaTempoFogo/TabelaTempoFogo";
import ModalControl from "../../../../../../ModalControl/ModalControl";

export default function ModalVisualizacaoItensCartaCobertura(props) {
  let [tempoFogoDisplay, setTempoFogoDisplay] = useState([]);
  useEffect(() => {
    setTempoFogoDisplay(
      props.listTempoFogo.map((tempo) => (
        <>
          <div>
            <div className="titulo-modal-visualizacao-itens-carta-cobertura">
              Tempo:{" "}
              <span className="titulo-linhas-modal-visualizacao-itens-carta-cobertura">
                {tempo.TEMPO_RESISTENCIA_FOGO} minutos
              </span>
            </div>
            <TabelaTempoFogo tempoFogo={tempo} />
            <div className="excluir-modal-visualizacao-itens-carta-cobertura ">
              <button
                type="type"
                className="btn btn-danger btn-excluir-modal-visualizacao-itens-carta-cobertura"
              >
                Excluir
              </button>
            </div>
          </div>
        </>
      ))
    );
  }, [props.listTempoFogo]);

  return (
    <>
      <ModalControl
        {...props}
        tamanhoModal="xl"
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal estilo-body-modal-visualizacao-itens-carta-cobertura"
        estiloModalFooter="backgroundModal"
        tituloModal="Teste"
        conteudoHeader={
          <div className="close-modal">
            <a href="#" onClick={() => props.onHide()}>
              <span className="fa fa-close tituloModal"></span>
            </a>
          </div>
        }
        conteudoBody={<>{tempoFogoDisplay}</>}
      />
    </>
  );
}
