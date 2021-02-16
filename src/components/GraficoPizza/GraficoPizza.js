/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Pie } from 'react-chartjs-2';
import "chartjs-plugin-datalabels";

function GraficoPizza(props) {

    const [graficoDisplay, setGraficoDisplay] = useState(<></>);
    const [sizeWidth, setSizeWidth] = useState(0);
    const [legend, setLegend] = useState({
        position: 'right', //top, left, right, bottom
        labels:{
            align: 'center', //center, start, end,   
            fontColor: 'white',
            fontSize: 15,
        },
    })
    const [options, setOptions] = useState({
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
    
    let percentage = 0

    useLayoutEffect(() => {
        function updateSize() {
            setSizeWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
      }, []);
    

    useEffect(() => {
        setGraficoDisplay(<></>);
        setLegend({});
        if(sizeWidth < 1200){
            setLegend({
                ...legend,
                display: false
            })
        }else{
            setLegend({
                ...legend,
                display: true,
            })
        }
    }, [sizeWidth])

    useEffect(() => {
        if(legend){
            setGraficoDisplay(<Pie className="d-inline" id={props.idGrafico} data={informacaoGrafico} options={options} legend={legend}/>)
        }
    }, [legend])

    useEffect(() => {
        if(props.dadosGrafico){
            const labels = props.dadosGrafico.map((item)=> item.titulo.toUpperCase())
            const dados = props.dadosGrafico.map((item)=> parseFloat(item.valor.toFixed(2)))
            setInformacaoGrafico({
                ...informacaoGrafico,
                labels: labels,
                datasets: [{...informacaoGrafico.datasets[0], data: dados}]
            })
            calcularPorcentagemGrafico();

        }
    }, [props.dadosGrafico])
    
    useEffect(() => {
        setGraficoDisplay(<Pie className="d-inline" id={props.idGrafico} data={informacaoGrafico} options={options} legend={legend}/>)
    }, [informacaoGrafico])

const calcularPorcentagemGrafico = () => {
    setOptions({
        ...options,
        responsive: true,
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
            {graficoDisplay}
        </>
    )
}

export default GraficoPizza