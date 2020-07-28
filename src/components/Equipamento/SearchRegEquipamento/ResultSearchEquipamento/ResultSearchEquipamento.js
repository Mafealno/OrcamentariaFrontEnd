import React from "react";
import "./ResultSearchEquipamento.css";
import { connect } from "react-redux";
import * as EquipamentoActions from "../../../../store/actions/equipamento";

function ResultSearchEquipamento(props) {
  const itemDisplay = props.resultados.map((equipamento) => (
    <div
      className="row container-result"
      key={equipamento.equipamentO_ID}
      onClick={() => props.selecionarEquipamento(equipamento)}
    >
      <div className="col-2 item-result item-center">
        {equipamento.equipamentO_ID}
      </div>
      <div className="col-5 item-result item-center">
        {equipamento.nomE_EQUIPAMENTO}
      </div>
    </div>
  ));
  return (
    <div id="container-result" className={props.show ? "show-result" : ""}>
      <div className="row result-cabecalho">
        <div className="col-2 item-center">Código</div>
        <div className="col-10 item-center">Nome</div>
      </div>
      {itemDisplay}
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  selecionarEquipamento: (equipamento) =>
    dispatch(EquipamentoActions.selecionarEquipamento(equipamento)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultSearchEquipamento);
