import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2';


function GraficoPizza(props) {

    const [informacaoGrafico, setInformacaoGrafico] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['Red', 'Blue', 'Gray', 'Green'],
            borderColor: 'transparent'
        }]
    })
    const [configuracaoLayout, setConfiguracaoLayout] = useState({
        legenda:{
            //display: false,
            labels:{
                position: 'top', //top, left, rigth, bottom
                align: 'center', //center, start, end,   
                fontColor: 'white',
                fontSize: 15
            },
        }
    })

    useEffect(() => {
        if(props.dadosGrafico){
            const labels = props.dadosGrafico.map((item)=> item.titulo)
            const dados = props.dadosGrafico.map((item)=> item.valor)


            setInformacaoGrafico({
                ...informacaoGrafico,
                labels: labels,
                datasets: [{...informacaoGrafico.datasets[0], data: dados}]
            })
        }
    }, [props.dadosGrafico])

    return (
        <>
        <Pie 
        data={informacaoGrafico}
        legend={configuracaoLayout.legenda}
        />
        </>
    )
}

export default GraficoPizza