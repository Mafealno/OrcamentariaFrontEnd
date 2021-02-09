import React, { useState, useEffect } from "react";
import "./ListOrcamento.css";
import * as orcamentoActions from "../../../../store/actions/orcamento";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OrcamentoGeral from "../../OrcamentoGeral/OrcamentoGeral";
import OrcamentoIntumescente from "../../OrcamentoIntumescente/OrcamentoIntumescente";

import { connect } from "react-redux";

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
            <div key={elemento.ORCAMENTO_ID}>
              <div
                className="item-orcamento"
                id={"opcoes-div-pai" + elemento.ORCAMENTO_ID}
                data-toggle="collapse"
                data-target={"#opcoes-" + elemento.ORCAMENTO_ID}
                aria-expanded={"opcoes-" + elemento.ORCAMENTO_ID}
                aria-controls={"opcoes-" + elemento.ORCAMENTO_ID}
              >
                <div className="row">
                  <div className="col-xl-2 col-3 center center-item">
                    {elemento.ORCAMENTO_ID}
                  </div>
                  <div className="col-xl-4 col-9 center center-item">
                    {elemento.NOME_OBRA}
                  </div>
                  <div className="col-xl-2 col-mobile-esconder center center-item">
                    {elemento.TIPO_OBRA}
                  </div>
                  <div className="col-xl-4 col-mobile-esconder center center-item">
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
            </div>
          );
        })
      );
    }else{
      setItemOrcamentoDisplay(<></>)
    }
  }, [props.listOrcamento.length]);

  const selecionarOrcamento = (orcamento) => {
    let caminho = "";
    let componente = {};

    if (orcamento.TIPO_OBRA == "Geral") {
      caminho = "/orcamentoGeral";
      componente = <OrcamentoGeral />;
    } else {
      caminho = "/orcamentoIntumescente";
      componente = <OrcamentoIntumescente />;
    }

    props.selecionarOrcamento(orcamento);

    return (
      <Router>
        <Route path={caminho} render={() => componente} />
      </Router>
    );
  };

  return (
    <div id="containerListOrcamento">
      <div id="cabecalho-list-item-orcamento">
        <div className="row">
          <div className="col-xl-2 col-3 center">Código</div>
          <div className="col-xl-4 col-9 center">Nome da obra</div>
          <div className="col-xl-2 col-mobile-esconder center">
            Tipo da obra
          </div>
          <div className="col-xl-4 col-mobile-esconder center">Cliente</div>
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
  selecionarOrcamento: (orcamento) =>
    dispatch(orcamentoActions.selecionarOrcamento(orcamento)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrcamento);
