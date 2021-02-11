import React, { useState, useEffect } from "react";
import "./TotaisItensOrcamentoGeral.css";

import { connect } from "react-redux";

function TotaisItensOrcamentoGeral(props) {
  let [totaisItensOrcamentoGeral, setTotaisItensOrcamentoGeral] = useState({
    totalLinhas: 0,
    totalArea: 0,
    totalValor: 0,
  });

  useEffect(() => {
    if (props.listItensOrcamentoGeral.length > 0) {
      let linhas,
        area,
        valor = 0;

      linhas = props.listItensOrcamentoGeral.length;

      area = props.listItensOrcamentoGeral.reduce(
        (acumulador, itemAtual) => acumulador + itemAtual.AREA,
        0
      );

      valor = props.listItensOrcamentoGeral.reduce((acumulador, itemAtual) => {
        return acumulador + itemAtual.AREA * itemAtual.VALOR_M_2;
      }, 0);

      setTotaisItensOrcamentoGeral({
        totalLinhas: linhas,
        totalArea: area,
        totalValor: valor,
      });
    }else{
      setTotaisItensOrcamentoGeral({
        totalLinhas: 0,
        totalArea: 0,
        totalValor: 0,
      });
    }
  }, [props.listItensOrcamentoGeral]);

  return (
    <div id="containerTotaisItensOrcamentoGeral">
      <div id="quantidade-linhas">
        <div className="form-group">
          <label className="titulo-totais-itens-orcamento-geral">
            Quantidade de linhas
          </label>
        </div>
        <div className="form-group">
          {totaisItensOrcamentoGeral.totalLinhas}
        </div>
      </div>
      <div id="total-area">
        <div className="form-group">
          <label className="titulo-totais-itens-orcamento-geral">
            Área total (M²)
          </label>
        </div>
        <div className="form-group">{totaisItensOrcamentoGeral.totalArea ?? ""}</div>
      </div>
      <div id="total-valor">
        <div className="form-group">
          <label className="titulo-totais-itens-orcamento-geral">
            Valor total dos itens (R$)
          </label>
        </div>
        <div className="form-group">{totaisItensOrcamentoGeral.totalValor ?? ""}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listItensOrcamentoGeral: state.orcamento.listItensOrcamentoGeral,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TotaisItensOrcamentoGeral);
