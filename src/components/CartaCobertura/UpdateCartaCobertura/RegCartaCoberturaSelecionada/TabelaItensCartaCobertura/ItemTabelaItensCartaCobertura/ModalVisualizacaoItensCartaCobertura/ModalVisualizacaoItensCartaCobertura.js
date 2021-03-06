import React, { useState, useEffect } from "react";
import "./ModalVisualizacaoItensCartaCobertura.css";
import TabelaTempoFogo from "./TabelaTempoFogo/TabelaTempoFogo";
import ModalControl from "../../../../../../ModalControl/ModalControl";
import BotaoExcluirCartaCobertura from "./BotaoExcluirCartaCobertura/BotaoExcluirCartaCobertura";

export default function ModalVisualizacaoItensCartaCobertura(props) {
  let [tempoFogoDisplay, setTempoFogoDisplay] = useState([]);
  let [referencia, setReferencia] = useState("");
  let [tempoResistenciaFogo, setTempoResistenciaFogo] = useState([]);

  useEffect(() => {
    setTempoFogoDisplay(
      props.listTempoFogo.map((tempo) => (
        <div>
          <div className="titulo-modal-visualizacao-itens-carta-cobertura">
            Tempo:{" "}
            <span className="titulo-linhas-modal-visualizacao-itens-carta-cobertura">
              {tempo.TEMPO_RESISTENCIA_FOGO} minutos
            </span>
          </div>
          <TabelaTempoFogo
            tempoFogo={tempo}
            key={tempo.TEMPO_RESISTENCIA_FOGO}
          />
          <div className="excluir-modal-visualizacao-itens-carta-cobertura">
            <BotaoExcluirCartaCobertura
              tempoFogo={tempo.TEMPO_RESISTENCIA_FOGO}
              acaoDeletarItensCartaCobertura={(tempoFogo) =>
                props.acaoDeletarItensCartaCobertura(tempoFogo)
              }
            />
          </div>
        </div>
      ))
    );
  }, [props.listTempoFogo]);

  useEffect(() => {
    setReferencia(props.referencia);
  }, [props.referencia]);

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
        conteudoBody={
          <div id="containerModalVisualizacaoItensCartaCobertura">
            <div id="referencia-modal-visualizacao-itens-carta-cobertura">
              <div className="form-row">
                <div className="titulo-modal-visualizacao-itens-carta-cobertura">
                  <label>Referência: </label>
                </div>
                {!props.editarReferecia && (
                  <>
                    <div className="col-1 titulo-linhas-modal-visualizacao-itens-carta-cobertura">
                      {" "}
                      {referencia}
                    </div>
                  </>
                )}
                {props.editarReferecia && (
                  <>
                    <div className="col-2">
                      <select
                        id="select-tipo-cadstro"
                        className="form-control select-modal-visualizacao-itens-carta-cobertura"
                        value={referencia}
                        name="referecia"
                        onChange={(event) => setReferencia(event.target.value)}
                      >
                        <option value="Viga">Viga</option>
                        <option value="Coluna">Coluna</option>
                        <option value="Tubo">Tubo</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>

                    {referencia != props.referencia && (
                      <>
                        <div className="col-3">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() =>
                              props.acaoAtualizarReferecia(referencia)
                            }
                          >
                            Salvar
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div id="tabela-tempo-fogo-modal-visualizacao-itens-carta-cobertura">
              {tempoFogoDisplay}
            </div>
          </div>
        }
        conteudoFooter={props.acoesFooter}
      />
    </>
  );
}
