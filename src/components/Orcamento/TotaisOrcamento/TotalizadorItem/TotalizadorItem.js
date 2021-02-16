import React, { useState, useEffect } from 'react';
import './TotalizadorItem.css';

function TotalizadorItem(props) {

    const [selecionado, setSelecionado] = useState(true);
    const [itensDisplay, setItensDisplay] = useState([]);
    const [itemTotal, setItemTotal] = useState(<></>);

    useEffect(() => {

        let itens = []
        for(var i = 0; props.dados.itens.length > i; i++){
            itens.push({
                titulo: props.dados.itens[i],
                valor: props.dados.valores[i]
            })
        }

        setItensDisplay(itens.map((item) => 
        <div className="item-filho">
            <div className="nome-item limitar-texto-1">{item.titulo}</div>
            <div className="valor-item">{"R$ " + item.valor.toFixed(2)}</div>
        </div>))

        let total = props.dados.valores.reduce((acumulador, itemAtual) => acumulador += itemAtual, 0)

        setItemTotal(
        <div className="item-filho">
            <div className="valor-item">{"R$ " + total.toFixed(2)}</div>
        </div>)
        
    }, [props.dados])

    const mostrarItens = () => {
        var elemento = document.getElementById(props.dados.titulo.toUpperCase())
        if(selecionado){
            elemento.classList.remove("esconder-itens");
            setSelecionado(false)
        }else{
            elemento.classList.add("esconder-itens");
            setSelecionado(true)
        }
    }

    return (
        <>
            <div className="item-pai" onClick={()=> mostrarItens()}>{props.dados.titulo.toUpperCase()}</div>
            <span className="esconder-itens" id={props.dados.titulo.toUpperCase()}>
                {itensDisplay}
                {itemTotal}
            </span>
        </>
    )
}

export default TotalizadorItem;