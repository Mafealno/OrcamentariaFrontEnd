/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./TotaisMaoObraOrcamento.css";
import * as calculoUtils from "../../../../utils/calculo";
import { connect } from "react-redux";

function TotaisMaoObraOrcamento(props) {
  let [totaisMaoObraOrcamento, setTotaisMaoObraOrcamento] = useState({
    totalFuncionario: 0,
    totalSalario: 0,
    totalCustos: 0,
  });

  useEffect(() => {
    if (props.listMaoObraOrcamento.length > 0) {
      let funcionario = 0;

      funcionario = props.listMaoObraOrcamento.length;

      let valoresCalculados = calculoUtils.calcularTotaisMaoObraOrcamento(
        props.listMaoObraOrcamento,
        props.orcamentoSelecionado.DIAS_TRABALHADO
      );

      setTotaisMaoObraOrcamento({
        totalFuncionario: funcionario,
        totalSalario: valoresCalculados.valorTotalSalario,
        totalCustos: valoresCalculados.valorTotalCustos,
      });
    }else{
      setTotaisMaoObraOrcamento({
        totalFuncionario: 0,
        totalSalario: 0,
        totalCustos: 0,
      });
    }
  }, [props.listMaoObraOrcamento, props.totaisOrcamento]);

  return (
    <div id="containerTotaisMaoObraOrcamento">
      <div id="quantidade-mao-obra">
        <div className="form-group">
          <label className="titulo-totais-mao-obra-orcamento ">
            Quantidade de funcionários
          </label>
        </div>
        <div className="form-group">
          {totaisMaoObraOrcamento.totalFuncionario}
        </div>
      </div>
      <div id="total-salario">
        <div className="form-group">
          <label className="titulo-totais-mao-obra-orcamento ">
            Valor total do salário (R$)
          </label>
        </div>
        <div className="form-group">{totaisMaoObraOrcamento.totalSalario ?? ""}</div>
      </div>
      <div id="total-custos">
        <div className="form-group">
          <label className="titulo-totais-mao-obra-orcamento ">
            Valor total de custos (R$)
          </label>
        </div>
        <div className="form-group">{totaisMaoObraOrcamento.totalCustos.toFixed(2) ?? ""}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listMaoObraOrcamento: state.orcamento.listMaoObraOrcamento,
  orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
  totaisOrcamento: state.orcamento.totaisOrcamento
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TotaisMaoObraOrcamento);
