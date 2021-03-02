import React, { useState } from 'react'
import "./ItemFormaPagto.css";
import { connect } from "react-redux";

function ItemFormaPagto(props) {

    const [dadosCadastro, setDadosCadastro] = useState({
        fornecedor: "DCP Pinturas Técnicas",
        item: "",
        prazo: ""
    })

    const handleInputChange = (event) => {
        setDadosCadastro({
          ...dadosCadastro,
          [event.target.name]: event.target.value,
        });
      };

    return (
        <div className="containerItemFormaPagto">
               <div className="row">
                <div className="col">
                  <label>Fornecedor</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="fornecedor"
                    value={dadosCadastro.fornecedor}
                    onChange={(event) => handleInputChange(event)}
                  />
                </div>
                <div className="col">
                  <label>Item</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="item"
                    value={dadosCadastro.item}
                    onChange={(event) => handleInputChange(event)}/>
                </div>
                <div className="col">
                  <label>Prazo</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="prazo"
                    value={dadosCadastro.prazo}
                    onChange={(event) => handleInputChange(event)}/>
                </div>
                <div className="col-2">
                  <button 
                  type="button" 
                  className="btn btn-orcamentaria h-100-pc w-100-pc" 
                  onClick={() => props.deletarFormaPagto(props.listItensFormaPagtoDisplay, props.keyComponente)}>X</button>
                </div>
               </div>
             </div>
    )
}

const mapStateToProps = (state) => ({
    listItensFormaPagtoDisplay: state.orcamento.listItensFormaPagtoDisplay
  });
  
  const mapDispatchToProps = (dispatch) => ({});
  
  export default connect(mapStateToProps, mapDispatchToProps)(ItemFormaPagto);
