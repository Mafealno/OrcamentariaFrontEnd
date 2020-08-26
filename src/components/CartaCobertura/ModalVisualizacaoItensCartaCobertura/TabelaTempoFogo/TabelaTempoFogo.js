import React, { useState, useEffect } from "react";
import "./TabelaTempoFogo.css";
import LinhaTabelaTempoFogo from "./LinhaTabelaTempoFogo/LinhaTabelaTempoFogo";
import { connect } from "react-redux";

function TabelaTempoFogo(props) {
  let [linhaTempoFogoDisplay, setLinhaTempoFogoDisplay] = useState([]);
  let [idLinhaAux, setIdLinhaAux] = useState(0);

  useEffect(() => {
    setLinhaTempoFogoDisplay(
      props.tempoFogo.LIST_ITENS_CARTA_COBERTURA.map((itemCartaCobertura) => {
        if (!itemCartaCobertura.idLinha) {
          setIdLinhaAux((idLinhaAux = idLinhaAux + 1));
          itemCartaCobertura.idLinha =
            idLinhaAux + props.tempoFogo.TEMPO_RESISTENCIA_FOGO;
        }

        return (
          <LinhaTabelaTempoFogo
            key={itemCartaCobertura.idLinha}
            cartaCoberturaAprovada={props.cartaCoberturaAprovada}
            idLinha={itemCartaCobertura.idLinha}
            tempoResistenciaFogo={props.tempoFogo.TEMPO_RESISTENCIA_FOGO}
            cartaCoberturaId={itemCartaCobertura.CARTA_COBERTURA_ID}
            itensCartaCoberturaId={itemCartaCobertura.ITENS_CARTA_COBERTURA_ID}
            hpA={itemCartaCobertura.VALOR_HP_A}
            espessura={itemCartaCobertura.VALOR_ESPESSURA}
            acaoRemover={(tempoResistenciaFogo, itensCartaCoberturaId) =>
              props.acaoRemover(tempoResistenciaFogo, itensCartaCoberturaId)
            }
            acaoAtualizar={(tempoResistenciaFogo, objItensCartaCobertura) =>
              props.acaoAtualizar(tempoResistenciaFogo, objItensCartaCobertura)
            }
          />
        );
      })
    );
  }, [
    props.tempoFogo.LIST_ITENS_CARTA_COBERTURA,
    props.cartaCoberturaAprovada,
  ]);

  return (
    <>
      <div className="containerTabelaTempoFogo">
        <div className="linha-tabela-tempo-fogo">
          <div className="coluna-tabela-tempo-fogo titulo-tabela-tempo-fogo">
            HP/A
          </div>
          <div className="coluna-tabela-tempo-fogo titulo-tabela-tempo-fogo">
            Espessura
          </div>
        </div>
        <>{linhaTempoFogoDisplay}</>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TabelaTempoFogo);
