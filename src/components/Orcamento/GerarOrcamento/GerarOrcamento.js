/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import "./GerarOrcamento.css";
import ArquivoOrcamento from "./ArquivoOrcamento/ArquivoOrcamento"
import * as orcamentoActions from "../../../store/actions/orcamento";
import { Provider } from "react-redux";
import store from "../../../store/store";
import { connect } from "react-redux";
import { render } from '@testing-library/react';

function GerarOrcamento(props) {

  const [dadosFormaPagamento, setDadosFormaPagamento] = useState([
    {
      FORNECEDOR: "",
      ITEM: "",
      PRAZO: ""
    },
    {
      FORNECEDOR: "",
      ITEM: "",
      PRAZO: ""
    },
    {
      FORNECEDOR: "",
      ITEM: "",
      PRAZO: ""
    }
  ])

  const duploCliqueFornecedor = (index) => {
    if(!dadosFormaPagamento[index].FORNECEDOR){
      setDadosFormaPagamento([...dadosFormaPagamento, dadosFormaPagamento[index].FORNECEDOR = "DCP Pinturas Técnicas"])
    }
  }

  const gerarOrcamento = () => {

    const forma1 = document.getElementById("forma-1");
    const forma2 = document.getElementById("forma-2");
    const forma3 = document.getElementById("forma-3");

    let listFormaPagtoAdd = []

    if(forma1.checked){
      listFormaPagtoAdd = [...listFormaPagtoAdd, dadosFormaPagamento[0]]
    }
    if(forma2.checked){
      listFormaPagtoAdd = [...listFormaPagtoAdd, dadosFormaPagamento[1]]
    }
    if(forma3.checked){
      listFormaPagtoAdd = [...listFormaPagtoAdd, dadosFormaPagamento[2]]
    }

    props.adicionarListFormaPagto(props.listFormaPagto, listFormaPagtoAdd)

    render(<Provider store={store}><ArquivoOrcamento /></Provider>)
    
  }

  return (
      <div id="containerGerarOrcamento">
        <div className="container-forma-pagamento">
          <fieldset>
            <legend>Forma de pagamento 1</legend>
            <div className="row">
              <div className="col">
                <label>Fornecedor</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="fornecedor"
                  value={dadosFormaPagamento[0].FORNECEDOR}
                  onDoubleClick={()=> duploCliqueFornecedor(0)}
                  onChange={(event) => setDadosFormaPagamento([...dadosFormaPagamento, dadosFormaPagamento[0].FORNECEDOR = event.target.value])}
                />
              </div>
              <div className="col">
                <label>Item</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="item"
                  value={dadosFormaPagamento[0].ITEM}
                  onChange={(event) => setDadosFormaPagamento([...dadosFormaPagamento, dadosFormaPagamento[0].ITEM = event.target.value])}
                  />
              </div>
              <div className="col">
                <label>Prazo</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="prazo"
                  value={dadosFormaPagamento[0].PRAZO}
                  onChange={(event) => setDadosFormaPagamento([...dadosFormaPagamento, dadosFormaPagamento[0].PRAZO = event.target.value])}/>
              </div>
              <div className="col-2 center">
                <label>Gerar</label>
                <input type="checkbox" id="forma-1" className="form-control" />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="container-forma-pagamento">
        <fieldset>
            <legend>Forma de pagamento 2</legend>
            <div className="row">
              <div className="col">
                <label>Fornecedor</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="fornecedor"
                  onDoubleClick={()=> duploCliqueFornecedor(1)}
                  value={dadosFormaPagamento[1].FORNECEDOR}
                  onChange={(event) => setDadosFormaPagamento([...dadosFormaPagamento, dadosFormaPagamento[1].FORNECEDOR = event.target.value])}
                />
              </div>
              <div className="col">
                <label>Item</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="item"
                  value={dadosFormaPagamento[1].ITEM}
                  onChange={(event) => setDadosFormaPagamento([...dadosFormaPagamento, dadosFormaPagamento[1].ITEM = event.target.value])}
                  />
              </div>
              <div className="col">
                <label>Prazo</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="prazo"
                  value={dadosFormaPagamento[1].PRAZO}
                  onChange={(event) => setDadosFormaPagamento([...dadosFormaPagamento, dadosFormaPagamento[1].PRAZO = event.target.value])}/>
              </div>
              <div className="col-2 center">
                <label>Gerar</label>
                <input type="checkbox" id="forma-2" className="form-control" />
              </div>
            </div>
          </fieldset>
          </div>
        <div className="container-forma-pagamento">
        <fieldset>
            <legend>Forma de pagamento 3</legend>
            <div className="row">
              <div className="col">
                <label>Fornecedor</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="fornecedor"
                  onDoubleClick={()=> duploCliqueFornecedor(2)}
                  value={dadosFormaPagamento[2].FORNECEDOR}
                  onChange={(event) => setDadosFormaPagamento([...dadosFormaPagamento, dadosFormaPagamento[2].FORNECEDOR = event.target.value])}
                />
              </div>
              <div className="col">
                <label>Item</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="item"
                  value={dadosFormaPagamento[2].ITEM}
                  onChange={(event) => setDadosFormaPagamento([...dadosFormaPagamento, dadosFormaPagamento[2].ITEM = event.target.value])}
                  />
              </div>
              <div className="col">
                <label>Prazo</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="prazo"
                  value={dadosFormaPagamento[2].PRAZO}
                  onChange={(event) => setDadosFormaPagamento([...dadosFormaPagamento, dadosFormaPagamento[2].PRAZO = event.target.value])}/>
              </div>
              <div className="col-2 center">
                <label>Gerar</label>
                <input type="checkbox" id="forma-3" className="form-control" />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="container-btn-gerar-orcamento">
          {/* <Link to="/orcamentoPDF"> */}
            <button 
            type="button" 
            className="btn btn-orcamentaria" 
            onClick={() => gerarOrcamento()}>
              Gerar orçamento
            </button>
          {/* </Link> */}
        </div>
      </div>
      
    )
}

const mapStateToProps = (state) => ({
  listFormaPagto: state.orcamento.listFormaPagto
});

const mapDispatchToProps = (dispatch) => ({
  adicionarListFormaPagto: (listFormaPagto, listAddFormaPagto) => 
  dispatch(orcamentoActions.adicionarListFormaPagto(listFormaPagto, listAddFormaPagto))
});

export default connect(mapStateToProps, mapDispatchToProps)(GerarOrcamento);