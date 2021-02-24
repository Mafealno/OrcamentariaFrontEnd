/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import "./TotaisOrcamento.css";
import GraficoPizza from "../../GraficoPizza/GraficoPizza";
import TotalizadorItem from "./TotalizadorItem/TotalizadorItem";
import TotaisGerais from "./TotaisGerais/TotaisGerais";
import * as calculoUtils from "../../../utils/calculo";
import { connect } from "react-redux";

function TotaisOrcamento(props) {

    const [valoresGrafico, setValoresGrafico] = useState([]);
    const [itensTotaisItensDisplay, setItensTotaisItensDisplay] = useState([]);
    const [itensTotaisMaoObraDisplay, setItensTotaisMaoObraDisplay] = useState([]);
    const [itensTotaisEquipamentosDisplay, setItensTotaisEquipamentosDisplay] = useState([]);
    const [itensTotaisMateriaisDisplay, setItensTotaisMateriaisDisplay] = useState([]);
    const [itensTotaisCustosDisplay, setItensTotaisCustosDisplay] = useState([]);
    

    useEffect(() => {
        if(props.totaisOrcamento.TOTAIS_ORCAMENTO_ID){
            var objGrafico = []

            if(props.totaisOrcamento.TOTAIS_ITENS){

                let itens = 0.0;

                if(props.orcamentoSelecionado.TIPO_OBRA === "Geral"){
                    objGrafico = [...objGrafico, {
                        titulo: "Itens",
                        valor: props.totaisOrcamento.TOTAIS_ITENS
                    }]

                    itens = transformarLista("ITENS_GERAL", props.orcamentoSelecionado.DIAS_TRABALHADO, props.listItensOrcamentoGeral);

                }else{
                    objGrafico = [ ...objGrafico, {
                        titulo: "Itens",
                        valor: props.totaisOrcamento.TOTAIS_ITENS
                    }]

                    itens = transformarLista("ITENS_INTUMESCENTE", props.orcamentoSelecionado.DIAS_TRABALHADO, props.listItensOrcamentoIntumescente)
                    itens.itens = [...itens.itens, "Valor produto intumescente"]  
                    itens.valores = [...itens.valores, (Math.round(props.orcamentoSelecionado.QTDE_BALDES_REAL + 0.4)) * props.orcamentoSelecionado.VALOR_BALDE_INTUMESCENTE]  
                }

                    setItensTotaisItensDisplay(<></>);
                    setItensTotaisItensDisplay(<TotalizadorItem dados={itens}/>);
            }
            if(props.totaisOrcamento.TOTAIS_MAO_OBRA){
                objGrafico = [...objGrafico, {
                    titulo: "Mão de Obra",
                    valor: props.totaisOrcamento.TOTAIS_MAO_OBRA
                }]

                const maoObra = transformarLista("MAO_OBRA", props.orcamentoSelecionado.DIAS_TRABALHADO, props.listMaoObraOrcamento);

                setItensTotaisMaoObraDisplay(<></>);
                setItensTotaisMaoObraDisplay(<TotalizadorItem dados={maoObra}/>);
            }
            if(props.totaisOrcamento.TOTAIS_EQUIPAMENTOS){
                objGrafico = [...objGrafico, {
                    titulo: "Equipamentos",
                    valor: props.totaisOrcamento.TOTAIS_EQUIPAMENTOS
                }]

                const equipamentos = transformarLista("EQUIPAMENTOS", props.orcamentoSelecionado.DIAS_TRABALHADO, props.listEquipamentoOrcamento);

                setItensTotaisEquipamentosDisplay(<></>);
                setItensTotaisEquipamentosDisplay(<TotalizadorItem dados={equipamentos}/>);
            }

            if(props.totaisOrcamento.TOTAIS_MATERIAL){
                objGrafico = [...objGrafico, {
                    titulo: "Materiais",
                    valor: props.totaisOrcamento.TOTAIS_MATERIAL
                }]

                const materiais = transformarLista("MATERIAIS", props.orcamentoSelecionado.DIAS_TRABALHADO, props.listMaterialOrcamento);

                setItensTotaisMateriaisDisplay(<></>);
                setItensTotaisMateriaisDisplay(<TotalizadorItem dados={materiais}/>);
            }

            if(props.totaisOrcamento.TOTAIS_CUSTOS){
                objGrafico = [...objGrafico, {
                    titulo: "Custos",
                    valor: props.totaisOrcamento.TOTAIS_CUSTOS
                }]

                const custos = transformarLista("CUSTOS", props.orcamentoSelecionado.DIAS_TRABALHADO, props.listCustoOrcamento);

                setItensTotaisCustosDisplay(<></>)
                setItensTotaisCustosDisplay(<TotalizadorItem dados={custos}/>)
            }

            preencherGrafico(objGrafico);
            
        }else{
            preencherGrafico([]);
        }
    }, [props.listCustoOrcamento, 
        props.listEquipamentoOrcamento,
        props.listMaterialOrcamento,
        props.listItensOrcamentoGeral, 
        props.listItensOrcamentoIntumescente, 
        props.listMaoObraOrcamento, 
        props.orcamentoSelecionado.DIAS_TRABALHADO, 
        props.orcamentoSelecionado.TIPO_OBRA, 
        props.totaisOrcamento, 
        props.totaisOrcamento.TOTAIS_CUSTOS]);

        const preencherGrafico = (valores) => {
            setValoresGrafico(valores)
        }

    const transformarLista = (tipo, diasTrabalhado, lista,) => {
        switch (tipo) {
            case "ITENS_GERAL":
                return {
                    titulo: "ITENS",
                    itens: lista.map((item) => item.LOCAL_APLICACAO ? item.AMBIENTE_APLICACAO + " - " + item.LOCAL_APLICACAO : item.AMBIENTE_APLICACAO),
                    valores: lista.map((item) => item.AREA * item.VALOR_M_2)
                }
            case "ITENS_INTUMESCENTE":
                return {
                    titulo: "ITENS",
                    itens: lista.map((item) => item.REFERENCIA + " - " + item.PERFIL.NOME_PERFIL),
                    valores: lista.map((item) => item.AREA * props.orcamentoSelecionado.VALOR_UNITARIO_INTUMESCENTE || 0)
                }
            case "MAO_OBRA":
                return {
                    titulo: "MÃO DE OBRA",
                    itens: lista.map((item) => item.FUNCIONARIO.NOME_PESSOA),
                    valores: lista.map((item) => {
                        let salario = item.FUNCIONARIO.VALOR_DIA_TRABALHADO * diasTrabalhado
                        let custos = item.LIST_CUSTO.reduce((acumulador, itemAtual) => {
                            let fator = calculoUtils.verificaTipoCusto(itemAtual.TIPO_CUSTO, diasTrabalhado);
                            return acumulador += fator * itemAtual.VALOR_CUSTO
                        }, 0)

                        return salario + custos;
                    })
                }
            case "EQUIPAMENTOS":
                return {
                    titulo: "EQUIPAMENTOS",
                    itens: lista.map((item) => item.EQUIPAMENTO.NOME_EQUIPAMENTO),
                    valores: lista.map((item) => item.QTDE_EQUIPAMENTO * item.VALOR_UNITARIO_EQUIPAMENTO)
                }
                case "MATERIAIS":
                    return {
                        titulo: "MATERIAIS",
                        itens: lista.map((item) => item.MATERIAL.NOME_MATERIAL),
                        valores: lista.map((item) => item.QTDE_MATERIAL * item.VALOR_UNITARIO_MATERIAL)
                    }
            case "CUSTOS":
                return {
                    titulo: "CUSTOS",
                    itens: lista.map((item) => item.CUSTO_OBRA.NOME_CUSTO),
                    valores: lista.map((item) => item.VALOR_CUSTO * calculoUtils.verificaTipoCusto(item.CUSTO_OBRA.TIPO_CUSTO, diasTrabalhado))
                }
            default:
            break;
        }
    }
    
    return (
        <>
            <div id="containerTotaisOrcamento">
                <div id="espaco-grafico">
                    <GraficoPizza dadosGrafico={valoresGrafico} idGrafico="graficoPizzaOrcamento"/>
                </div>
                <div id="espaco-list-totais">
                    {itensTotaisItensDisplay}
                    {itensTotaisMaoObraDisplay}
                    {itensTotaisEquipamentosDisplay}
                    {itensTotaisMateriaisDisplay}
                    {itensTotaisCustosDisplay}
                </div>
                <div id="espaco-totalizador">
                    <TotaisGerais/>
                </div>
                
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    linkBackEnd: state.backEnd.link,
    totaisOrcamento: state.orcamento.totaisOrcamento,
    listCustoOrcamento: state.orcamento.listCustoOrcamento,
    listEquipamentoOrcamento: state.orcamento.listEquipamentoOrcamento,
    listMaterialOrcamento: state.orcamento.listMaterialOrcamento,
    listMaoObraOrcamento: state.orcamento.listMaoObraOrcamento,
    listItensOrcamentoGeral: state.orcamento.listItensOrcamentoGeral,
    listItensOrcamentoIntumescente: state.orcamento.listItensOrcamentoIntumescente,
    orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
  });
  
const mapDispatchToProps = (dispatch) => ({});
  
export default connect(mapStateToProps, mapDispatchToProps)(TotaisOrcamento);
