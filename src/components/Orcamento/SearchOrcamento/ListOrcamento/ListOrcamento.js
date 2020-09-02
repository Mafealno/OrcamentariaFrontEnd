import React, { useState, useEffect } from "react";
import "./ListOrcamento.css";
import * as orcamentoActions from "../../../../store/actions/orcamento";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OrcamentoGeral from "../../OrcamentoGeral/OrcamentoGeral";
import OrcamentoIntumescente from "../../OrcamentoIntumescente/OrcamentoIntumescente";

import { connect } from "react-redux";
import orcamento from "../../../../store/reducers/orcamento";

function ListOrcamento(props) {
  let [itemOrcamentoDisplay, setItemOrcamentoDisplay] = useState([]);

  useEffect(() => {
    props.listarOrcamento(props.linkBackEnd);
  }, []);

  useEffect(() => {
    if (props.listOrcamento.length > 0) {
      setItemOrcamentoDisplay(
        props.listOrcamento.map((elemento) => {
          let caminho =
            elemento.TIPO_OBRA == "Geral"
              ? "/orcamentoGeral"
              : "orcamentoIntumescente";

          return (
            <>
              <div
                className="item-orcamento"
                id={"opcoes-div-pai" + elemento.ORCAMENTO_ID}
                data-toggle="collapse"
                data-target={"#opcoes-" + elemento.ORCAMENTO_ID}
                aria-expanded={"opcoes-" + elemento.ORCAMENTO_ID}
                aria-controls={"opcoes-" + elemento.ORCAMENTO_ID}
              >
                <div className="row">
                  <div className="col-2 center center-item">
                    {elemento.ORCAMENTO_ID}
                  </div>
                  <div className="col-4 center center-item">
                    {elemento.NOME_OBRA}
                  </div>
                  <div className="col-2 center center-item">
                    {elemento.TIPO_OBRA}
                  </div>
                  <div className="col-4 center center-item">
                    {elemento.CLIENTE_ORCAMENTO.NOME_PESSOA}
                  </div>
                </div>
              </div>
              <div
                id={"opcoes-" + elemento.ORCAMENTO_ID}
                className="collapse opcoes-item-orcamento"
              >
                <Link to={caminho}>
                  <button
                    className="btn btn-success btn-selecionar-carta-cobertura"
                    onClick={() => selecionarOrcamento(elemento)}
                  >
                    Selecionar
                  </button>
                </Link>
              </div>
            </>
          );
        })
      );
    }
  }, [props.listOrcamento.length]);

  const selecionarOrcamento = (orcamento) => {
    let caminho = "";
    let componente = {};

    if (orcamento.TIPO_OBRA == "Geral") {
      props.selecionarOrcamentoGeral(orcamento);
      caminho = "/orcamentoGeral";
      componente = <OrcamentoGeral />;
    } else {
      caminho = "/orcamentoIntumescente";
      componente = <OrcamentoIntumescente />;
    }

    return (
      <Router>
        <Route path={caminho} render={() => componente} />
      </Router>
    );
  };

  return (
    <div className="form" id="containerListOrcamento">
      <div id="cabecalho-list-item-orcamento">
        <div className="row">
          <div className="col-2 center">Código</div>
          <div className="col-4 center">Nome da obra</div>
          <div className="col-2 center">Tipo da obra</div>
          <div className="col-4 center">Cliente</div>
        </div>
      </div>
      <div className="list-item-orcamento">{itemOrcamentoDisplay}</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  listOrcamento: state.orcamento.listOrcamento,
});

const mapDispatchToProps = (dispatch) => ({
  listarOrcamento: (linkBackEnd) =>
    dispatch(orcamentoActions.listarOrcamento(linkBackEnd)),
  selecionarOrcamentoGeral: (orcamentoGeral) =>
    dispatch(orcamentoActions.selecionarOrcamentoGeral(orcamentoGeral)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrcamento);
