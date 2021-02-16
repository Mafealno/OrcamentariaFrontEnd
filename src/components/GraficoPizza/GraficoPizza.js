/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2';
import "chartjs-plugin-datalabels";


function GraficoPizza(props) {
   
    let percentage = 0
    const [options, setOptions] = useState({
        legend:{
            position: 'right', //top, left, right, bottom
            labels:{
            align: 'center', //center, start, end,   
            fontColor: 'white',
            fontSize: 15,
            },
        },
        layout: {
            padding: {
                top: 12,
                bottom: 12
            }
        }
    })

    const [informacaoGrafico, setInformacaoGrafico] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 1)', 
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: 'transparent',
            datalabels : {
                anchor: 'end',
                borderColor: 'white',
                borderRadius: 25,
                color: 'white',
                borderWidth: 2,
                backgroundColor: function(context) {
                return context.dataset.backgroundColor;
                },
                display: function(context) {
                var dataset = context.dataset;
                var count = dataset.data.length;
                var value = dataset.data[context.dataIndex];
                return value > count * 1.5;
                },
                font: {
                weight: 'bold'
                },
            }
        }]
    })

    useEffect(() => {

        if(props.dadosGrafico){
            const labels = props.dadosGrafico.map((item)=> item.titulo.toUpperCase())
            const dados = props.dadosGrafico.map((item)=> item.valor)
            setInformacaoGrafico({
                ...informacaoGrafico,
                labels: labels,
                datasets: [{...informacaoGrafico.datasets[0], data: dados}]
            })

            calcularPorcentagemGrafico()
        }
    }, [props.dadosGrafico])

const calcularPorcentagemGrafico = () => {
    setOptions({
        ...options,
        plugins: {
            datalabels: {
              formatter: (value, ctx) => {
                let datasets = ctx.chart.data.datasets;
                if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                    let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                    percentage = ((value / sum) * 100).toFixed(2) + "%";
                    return percentage;
                } else {
                    return percentage;
                }
              },
            }
          }
    })
    
}

    return (
        <>
        <Pie id={props.idGrafico} data={informacaoGrafico} options={options} />
        </>
    )
}

export default GraficoPizza