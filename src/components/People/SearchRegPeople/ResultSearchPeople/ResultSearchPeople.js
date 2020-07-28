import React from "react";
import "./ResultSearchPeople.css";
import { connect } from "react-redux";
import * as PeopleActions from "../../../../store/actions/people";

function ResultSearchPeople({ show, resultados, selecionarPessoa }) {
  const itemDisplay = resultados.map((pessoa) => (
    <div
      className="row container-result"
      key={pessoa.pessoA_ID}
      onClick={() => selecionarPessoa(pessoa)}
    >
      <div className="col-2 item-result item-center">{pessoa.pessoA_ID}</div>
      <div className="col-5 item-result item-center">{pessoa.nomE_PESSOA}</div>
      <div className="col-5 item-result">{pessoa.tipO_CADASTRO}</div>
    </div>
  ));
  return (
    <div id="container-result" className={show ? "show-result" : ""}>
      <div className="row result-cabecalho">
        <div className="col-2 item-center">Código</div>
        <div className="col-5 item-center">Nome</div>
        <div className="col-5">Tipo</div>
      </div>
      {itemDisplay}
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  selecionarPessoa: (pessoa) =>
    dispatch(PeopleActions.selecionarPessoa(pessoa)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultSearchPeople);
