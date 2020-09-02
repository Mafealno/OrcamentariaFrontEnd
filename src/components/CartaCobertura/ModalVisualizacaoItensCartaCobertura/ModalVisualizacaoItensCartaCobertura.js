import React, { useState, useEffect } from "react";
import "./ModalVisualizacaoItensCartaCobertura.css";
import TabelaTempoFogo from "./TabelaTempoFogo/TabelaTempoFogo";
import ModalControl from "../../ModalControl/ModalControl";
import BotaoExcluirCartaCobertura from "./BotaoExcluirCartaCobertura/BotaoExcluirCartaCobertura";
import ModalConfirm from "../../ModalConfirm/ModalConfirm";

export default function ModalVisualizacaoItensCartaCobertura(props) {
  let [tempoFogoDisplay, setTempoFogoDisplay] = useState([]);
  let [referencia, setReferencia] = useState("");
  let [showModalConfirm, setShowModalConfirm] = useState(false);

  useEffect(() => {
    if (props.show) {
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
              cartaCoberturaAprovada={props.cartaCoberturaAprovada}
              acaoRemover={(tempoResistenciaFogo, itensCartaCoberturaId) =>
                props.acaoRemover(tempoResistenciaFogo, itensCartaCoberturaId)
              }
              acaoAtualizar={(tempoResistenciaFogo, objItensCartaCobertura) =>
                props.acaoAtualizar(
                  tempoResistenciaFogo,
                  objItensCartaCobertura
                )
              }
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
    }
  }, [props.listTempoFogo, props.show]);

  useEffect(() => {
    setReferencia(props.referencia);
  }, [props.referencia]);

  const montarObj = () => {
    return {
      referencia: props.referencia,
      itens: props.listTempoFogo,
    };
  };

  return (
    <>
      <ModalControl
        {...props}
        tamanhoModal="xl"
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal estilo-body-modal-visualizacao-itens-carta-cobertura"
        estiloModalFooter="backgroundModal"
        tituloModal="Carta de Cobertura"
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
        conteudoFooter={
          !props.cartaCoberturaAprovada &&
          props.acaoAprovarCartaCobertura && (
            <>
              <div>
                <button
                  type="button"
                  className="btn btn-aprovar-carta-cobertura"
                  onClick={() => setShowModalConfirm(true)}
                >
                  Aprovar
                </button>
              </div>
              <div>
                <ModalConfirm
                  show={showModalConfirm}
                  onHide={() => setShowModalConfirm(false)}
                  acaoConfirmada={() =>
                    props.acaoAprovarCartaCobertura(montarObj(), props.onHide())
                  }
                  tituloModalConfirm={
                    "Deseja aprovar importação? Os valores negativos serão zerados."
                  }
                />
              </div>
            </>
          )
        }
      />
    </>
  );
}
