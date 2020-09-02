import React, { useState, useEffect } from "react";
import "./ItensOrcamentoGeral.css";
import ModalItemOrcamentoGeral from "./ModalItemOrcamentoGeral/ModalItemOrcamentoGeral";
import ItemOrcamentoGeral from "./ItemOrcamentoGeral/ItemOrcamentoGeral";

import { connect } from "react-redux";

function ItensOrcamentoGeral(props) {
  let [showModalItemOrcamentoGeral, setShowModalItemOrcamentoGeral] = useState(
    false
  );
  let [
    listItensOrcamentoGeralDisplay,
    setListItensOrcamentoGeralDisplay,
  ] = useState([]);

  useEffect(() => {
    if (props.itensOrcamentoGeral.length > 0) {
      setListItensOrcamentoGeralDisplay(
        props.itensOrcamentoGeral.map((elemento) => <ItemOrcamentoGeral />)
      );
    }
  }, [props.itensOrcamentoGeral]);

  return (
    <div id="container-itens-orcamento-geral">
      <div className="form form-orcamento">
        <div className="form-row">
          <div className="col">
            <div id="btn-add-item-orcamento-geral">
              <button
                type="button"
                className="btn"
                onClick={() => setShowModalItemOrcamentoGeral(true)}
              >
                Adicionar Item
              </button>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <div id="list-itens-orcamento-geral">
              {listItensOrcamentoGeralDisplay}
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <div id="totais-itens-orcamento-geral"></div>
          </div>
        </div>
      </div>
      <div>
        <ModalItemOrcamentoGeral
          show={showModalItemOrcamentoGeral}
          onHide={() => setShowModalItemOrcamentoGeral(false)}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  linkBackEnd: state.backEnd.link,
  itensOrcamentoGeral: state.orcamento.itensOrcamentoGeral,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItensOrcamentoGeral);
