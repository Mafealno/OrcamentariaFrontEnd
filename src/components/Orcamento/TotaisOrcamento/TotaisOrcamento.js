import React from 'react'
import "./TotaisOrcamento.css";
import GraficoPizza from "../../GraficoPizza/GraficoPizza"

function TotaisOrcamento() {

    const teste = 
    [
        {
            titulo: "aksnd",
            valor: "244"
        },
        {
            titulo: "qqrqweqweaksnd",
            valor: "122"
        },
        {
            titulo: "1svsds",
            valor: "123"
        },
        {
            titulo: "2343234",
            valor: "50"
        },
    ]
    
    return (
        <>
            <div id="containerTotaisOrcamento">
                <div id="espaco-grafico">
                    <GraficoPizza dadosGrafico={teste}/>
                </div>
                <div id="espaco-list-totais"></div>
                <div id="espaco-totalizador"></div>
                
            </div>
        </>
    )
}

export default TotaisOrcamento