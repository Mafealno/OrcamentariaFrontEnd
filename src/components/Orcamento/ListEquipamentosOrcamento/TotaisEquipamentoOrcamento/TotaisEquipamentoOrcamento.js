import React, { useState, useEffect } from "react";
import "./TotaisEquipamentoOrcamento.css";
import * as calculoUtils from "../../../../utils/calculo";
import { connect } from "react-redux";

function TotaisEquipamentoOrcamento(props) {
  let [totaisEquipamentoOrcamento, setTotaisEquipamentoOrcamento] = useState({
    totalEquipamentos: 0,
    totalValorEquipamentos: 0,
  });

  useEffect(() => {
    if (props.listEquipamentoOrcamento.length > 0) {
      let equipamentos = 0;

      equipamentos = props.listEquipamentoOrcamento.length;

      let valoresCalculados = calculoUtils.calcularTotaisEquipamentosOrcamento(props.listEquipamentoOrcamento);

      setTotaisEquipamentoOrcamento({
        totalEquipamentos: equipamentos,
        totalValorEquipamentos: valoresCalculados.totalValorEquipamentos,
      });
    }else{
      setTotaisEquipamentoOrcamento({
        totalEquipamentos: 0,
        totalValorEquipamentos: 0,
      });
    }
  }, [props.listEquipamentoOrcamento, props.totaisOrcamento]);

  return (
    <div id="containerTotaisEquipamentoOrcamento">
      <div id="quantidade-equipamentos">
        <div className="form-group">
          <label className="titulo-totais-mao-obra-orcamento ">
            Quantidade de equipamentos
          </label>
        </div>
        <div className="form-group">
          {totaisEquipamentoOrcamento.totalEquipamentos}
        </div>
      </div>
      <div id="total-valor-equipamentos">
        <div className="form-group">
          <label className="titulo-totais-mao-obra-orcamento ">
            Valor total de equipamento (R$)
          </label>
        </div>
        <div className="form-group">
        {totaisEquipamentoOrcamento.totalValorEquipamentos ?? ""}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listEquipamentoOrcamento: state.orcamento.listEquipamentoOrcamento,
  orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
  totaisOrcamento: state.orcamento.totaisOrcamento
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TotaisEquipamentoOrcamento);
