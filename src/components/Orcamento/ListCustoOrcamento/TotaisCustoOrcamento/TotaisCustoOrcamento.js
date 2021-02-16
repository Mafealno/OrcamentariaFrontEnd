import React, { useState, useEffect } from 'react'
import "./TotaisCustoOrcamento.css"
import * as calculoUtils from "../../../../utils/calculo";
import { connect } from "react-redux";

function TotaisCustoOrcamento(props) {
    let [totaisCustoOrcamento, setTotaisCustoOrcamento] = useState({
        totalCustos: 0,
        totalValorCustos: 0,
      });

      useEffect(() => {
        if (props.listCustoOrcamento.length > 0) {
          
            let custos = props.listCustoOrcamento.length;
    
          let valoresCalculados = calculoUtils.calcularTotaisCustosOrcamento(props.listCustoOrcamento, props.orcamentoSelecionado.DIAS_TRABALHADO);
    
          setTotaisCustoOrcamento({
            totalCustos: custos,
            totalValorCustos: valoresCalculados.totalValorCustos,
          });
        }else{
          setTotaisCustoOrcamento({
            totalCustos: 0,
            totalValorCustos: 0,
          });
        }
      }, [props.listCustoOrcamento, props.totaisOrcamento]);

    return (
        <div id="containerTotaisEquipamentoOrcamento">
      <div id="quantidade-equipamentos">
        <div className="form-group">
          <label className="titulo-totais-mao-obra-orcamento ">
            Quantidade de custos
          </label>
        </div>
        <div className="form-group">
          {totaisCustoOrcamento.totalCustos}
        </div>
      </div>
      <div id="total-valor-equipamentos">
        <div className="form-group">
          <label className="titulo-totais-mao-obra-orcamento ">
            Valor total de custos (R$)
          </label>
        </div>
        <div className="form-group">
        {totaisCustoOrcamento.totalValorCustos ?? ""}
        </div>
      </div>
    </div>
    )
}

const mapStateToProps = (state) => ({
    linkBackEnd: state.backEnd.link,
    listCustoOrcamento: state.orcamento.listCustoOrcamento,
    orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
    totaisOrcamento: state.orcamento.totaisOrcamento
  });
  
  const mapDispatchToProps = (dispatch) => ({});
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TotaisCustoOrcamento);
