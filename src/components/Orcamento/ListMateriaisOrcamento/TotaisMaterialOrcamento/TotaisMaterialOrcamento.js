import React, { useState, useEffect } from "react";
import "./TotaisMaterialOrcamento.css";
import * as calculoUtils from "../../../../utils/calculo";
import { connect } from "react-redux";

function TotaisMaterialOrcamento(props) {
  let [totaisMaterialOrcamento, setTotaisMaterialOrcamento] = useState({
    totalMaterial: 0,
    totalValorMaterial: 0,
  });

  useEffect(() => {
    if (props.listMaterialOrcamento.length > 0) {
      let material = 0;

      material = props.listMaterialOrcamento.length;

      let valoresCalculados = calculoUtils.calcularTotaisMaterialOrcamento(props.listMaterialOrcamento);

      setTotaisMaterialOrcamento({
        totalMaterial: material,
        totalValorMaterial: valoresCalculados.totalValorMaterial,
      });
    }else{
      setTotaisMaterialOrcamento({
        totalMaterial: 0,
        totalValorMaterial: 0,
      });
    }
  }, [props.listMaterialOrcamento, props.totaisOrcamento]);

  return (
    <div id="containerTotaisMaterialOrcamento">
      <div id="quantidade-material">
        <div className="form-group">
          <label className="titulo-totais-mao-obra-orcamento ">
            Quantidade de materiais
          </label>
        </div>
        <div className="form-group">
          {totaisMaterialOrcamento.totalMaterial}
        </div>
      </div>
      <div id="total-valor-material">
        <div className="form-group">
          <label className="titulo-totais-mao-obra-orcamento ">
            Valor total de materiais (R$)
          </label>
        </div>
        <div className="form-group">
        {totaisMaterialOrcamento.totalValorMaterial ?? ""}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listMaterialOrcamento: state.orcamento.listMaterialOrcamento,
  orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
  totaisOrcamento: state.orcamento.totaisOrcamento
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TotaisMaterialOrcamento);
