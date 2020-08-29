import React from "react";
import "./ResultSearchCustos.css";
import { connect } from "react-redux";
import * as CustoActions from "../../../../store/actions/custo";

function ResultSearchCustos(props) {
  const itemDisplay = props.resultados.map((custo) => (
    <div
      className="row container-result"
      key={custo.CUSTO_ID}
      onClick={() => props.selecionarCusto(custo)}
    >
      <div className="col-2 item-result item-center">{custo.CUSTO_ID}</div>
      <div className="col-6 item-result item-center">{custo.NOME_CUSTO}</div>
      <div className="col-4 item-result">{custo.TIPO_CUSTO}</div>
    </div>
  ));
  return (
    <div id="container-result" className={props.show ? "show-result" : ""}>
      <div className="row result-cabecalho">
        <div className="col-2 item-center">Código</div>
        <div className="col-6 item-center">Nome</div>
        <div className="col-4">Tipo</div>
      </div>
      {itemDisplay}
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  selecionarCusto: (custo) => dispatch(CustoActions.selecionarCusto(custo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultSearchCustos);
