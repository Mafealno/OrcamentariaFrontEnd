import React from "react";
import "./ResultSearchClient.css";

import * as orcamentoActions from "../../../../store/actions/orcamento";

import { connect } from "react-redux";

function ResultSearchClient(props) {
  const itemDisplay = props.resultados.map((cliente) => (
    <div
      className="row container-result-client"
      key={cliente.PESSOA_ID}
      onClick={() => props.selecionarClienteOrcamento(cliente)}
    >
      <div className="col-2 item-result item-center">{cliente.PESSOA_ID}</div>
      <div className="col-10 item-result item-center">
        {cliente.NOME_PESSOA}
      </div>
    </div>
  ));
  return (
    <div
      id="container-result-client"
      className={props.show ? "show-result" : ""}
    >
      <div className="row result-cabecalho">
        <div className="col-2 item-center">Código</div>
        <div className="col-10 item-center">Nome</div>
      </div>
      {itemDisplay}
    </div>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({
  selecionarClienteOrcamento: (clienteOrcamento) =>
    dispatch(orcamentoActions.selecionarClienteOrcamento(clienteOrcamento)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultSearchClient);
