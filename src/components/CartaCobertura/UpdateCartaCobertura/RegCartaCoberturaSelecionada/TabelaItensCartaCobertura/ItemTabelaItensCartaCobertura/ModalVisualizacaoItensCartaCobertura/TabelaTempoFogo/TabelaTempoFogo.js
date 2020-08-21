import React, { useState, useEffect } from "react";
import "./TabelaTempoFogo.css";
import LinhaTabelaTempoFogo from "./LinhaTabelaTempoFogo/LinhaTabelaTempoFogo";
import { connect } from "react-redux";

function TabelaTempoFogo(props) {
  let [linhaTempoFogoDisplay, setLinhaTempoFogoDisplay] = useState([]);

  useEffect(() => {
    setLinhaTempoFogoDisplay(
      props.tempoFogo.LIST_ITENS_CARTA_COBERTURA.map((itemCartaCobertura) => (
        <LinhaTabelaTempoFogo
          tempoResistenciaFogo={props.tempoFogo.TEMPO_RESISTENCIA_FOGO}
          cartaCoberturaId={itemCartaCobertura.CARTA_COBERTURA_ID}
          itensCartaCoberturaId={itemCartaCobertura.ITENS_CARTA_COBERTURA_ID}
          hpA={itemCartaCobertura.VALOR_HP_A}
          espessura={itemCartaCobertura.VALOR_ESPESSURA}
          acaoRemover={(itensCartaCoberturaId) =>
            deletarItensCartaCobertura(itensCartaCoberturaId)
          }
          acaoAtualizarTabela={(objItensCartaCobertura) =>
            atualizarItensCartaCobertura(objItensCartaCobertura)
          }
        />
      ))
    );
  }, [props.tempoFogo.LIST_ITENS_CARTA_COBERTURA]);

  const atualizarItensCartaCobertura = (objItensCartaCobertura) => {
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
        const componenteFilho = props.tempoFogo.LIST_ITENS_CARTA_COBERTURA.find(
          (elemento) =>
            elemento.ITENS_CARTA_COBERTURA_ID ==
            objItensCartaCobertura.ITENS_CARTA_COBERTURA_ID
        );

        const indexComponenteFilho = props.tempoFogo.LIST_ITENS_CARTA_COBERTURA.indexOf(
          componenteFilho
        );

        props.tempoFogo.LIST_ITENS_CARTA_COBERTURA[
          indexComponenteFilho
        ].VALOR_ESPESSURA = objItensCartaCobertura.VALOR_ESPESSURA;
      } else {
        return;
      }
    });
  };

  const deletarItensCartaCobertura = (itensCartaCoberturaId) => {
    fetch(
      props.linkBackEnd +
        "/itensCartaCobertura/deletar?ItensCartaCoberturaId=" +
        itensCartaCoberturaId,
      {
        method: "DELETE",
      }
    ).then((data) => {
      if (data.ok) {
        const componenteFilho = props.tempoFogo.LIST_ITENS_CARTA_COBERTURA.find(
          (elemento) =>
            elemento.ITENS_CARTA_COBERTURA_ID == itensCartaCoberturaId
        );

        const indexComponenteFilho = props.tempoFogo.LIST_ITENS_CARTA_COBERTURA.indexOf(
          componenteFilho
        );

        props.tempoFogo.LIST_ITENS_CARTA_COBERTURA.splice(
          indexComponenteFilho,
          1
        );
      } else {
        return;
      }
    });
  };

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
