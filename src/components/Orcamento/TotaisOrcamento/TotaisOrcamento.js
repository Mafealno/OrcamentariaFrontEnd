import React, { useState, useEffect } from 'react'
import "./TotaisOrcamento.css";
import GraficoPizza from "../../GraficoPizza/GraficoPizza"
import { connect } from "react-redux"

function TotaisOrcamento(props) {

    const [valoresGrafico, setValoresGrafico] = useState([])

    useEffect(() => {
        if(props.totaisOrcamento.TOTAIS_ORCAMENTO_ID){
            var objGrafico = []

            if(props.totaisOrcamento.TOTAIS_ITENS){
                objGrafico = [...objGrafico, {
                    titulo: "Itens",
                    valor: props.totaisOrcamento.TOTAIS_ITENS
                }]
            }
            if(props.totaisOrcamento.TOTAIS_MAO_OBRA){
                objGrafico = [...objGrafico, {
                    titulo: "Mão de Obra",
                    valor: props.totaisOrcamento.TOTAIS_MAO_OBRA
                }]
            }
            if(props.totaisOrcamento.TOTAIS_EQUIPAMENTOS){
                objGrafico = [...objGrafico, {
                    titulo: "Equipamentos",
                    valor: props.totaisOrcamento.TOTAIS_EQUIPAMENTOS
                }]
            }
            if(props.totaisOrcamento.TOTAIS_CUSTOS){
                objGrafico = [...objGrafico, {
                    titulo: "Custos",
                    valor: props.totaisOrcamento.TOTAIS_CUSTOS
                }]
            }

            setValoresGrafico(objGrafico);
        }else{
            setValoresGrafico([])
        }
    }, [props.totaisOrcamento])
    
    return (
        <>
            <div id="containerTotaisOrcamento">
                <div id="espaco-grafico">
                    <GraficoPizza dadosGrafico={valoresGrafico}/>
                </div>
                <div id="espaco-list-totais"></div>
                <div id="espaco-totalizador"></div>
                
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    linkBackEnd: state.backEnd.link,
    totaisOrcamento: state.orcamento.totaisOrcamento
  });
  
const mapDispatchToProps = (dispatch) => ({});
  
export default connect(mapStateToProps, mapDispatchToProps)(TotaisOrcamento);
