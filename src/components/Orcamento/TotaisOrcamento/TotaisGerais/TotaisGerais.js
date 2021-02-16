/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import "./TotaisGerais.css";
import { connect } from "react-redux";

function TotaisGerais(props) {

    const [totalArea, setTotalArea] = useState(0);
    const [totalGeral, seTotalGeral] = useState(0);
    const [totalGeralComPorcentagem, seTotalGeralComPorcentagem] = useState(0);
    const [porcentagemAcrescimo, setPorcentagemAcrescimo] = useState(20);

    useEffect(() => {
       
        setTotalArea(props.totaisOrcamento.AREA_TOTAL);

        seTotalGeral(props.totaisOrcamento.TOTAL_GERAL)

        calcularPorcentegemAcrescimo(props.totaisOrcamento.TOTAL_GERAL, porcentagemAcrescimo);

    }, [props.listCustoOrcamento, 
        props.listEquipamentoOrcamento, 
        props.listItensOrcamentoGeral, 
        props.listMaoObraOrcamento, 
        props.orcamentoSelecionado.DIAS_TRABALHADO, 
        props.orcamentoSelecionado.TIPO_OBRA, 
        props.totaisOrcamento, 
        props.totaisOrcamento.TOTAIS_CUSTOS]);

    const calcularPorcentegemAcrescimo = (valor, porcentagem) =>{
        let porcentagemAux = porcentagem / 100
        let valorAcrescimo = valor * porcentagemAux
        seTotalGeralComPorcentagem((valorAcrescimo + valor).toFixed(2))
    }

    useEffect(() => {
        calcularPorcentegemAcrescimo(props.totaisOrcamento.TOTAL_GERAL, 20)
    }, [])


    return (
        <div id="containerTotaisGerais">
            <div id="total-area" className="orientacao-coluna-totais">
                <div className="titulo-totais-gerais">
                    AREA (M²)
                </div>
                <div>
                    {totalArea}
                </div>
            </div>
            <div id="total-valor-geral" className="orientacao-coluna-totais">
                <div className="titulo-totais-gerais">
                    TOTAL GERAL (R$)
                </div>
                <div>
                    {totalGeral}
                </div>
            </div>
            <div id="calcular-porcentagem" className="row orientacao-coluna-calculo">
                <div className="col-6 padding-right">
                    <div className="input-group mb-5">
                        <input 
                            type="number" 
                            class="form-control text-center" 
                            value={porcentagemAcrescimo} 
                            onChange={(event)=> setPorcentagemAcrescimo(event.target.value)}/>
                        <div class="input-group-append">
                            <span class="input-group-text">%</span>
                        </div>
                    </div>
                </div>
                    <div className="col-6">
                        <button 
                        type="button" 
                        className="btn btn-primary w-100-pc" 
                        onClick={()=>calcularPorcentegemAcrescimo(totalGeral, porcentagemAcrescimo)}>Calcular</button>
                    </div>
            </div>
            <div id="total-valor-porcentagem" className="orientacao-coluna-calculo">
                <div className="estilo-total-com-porcentagem orientacao-coluna-calculo">
                    {'R$ ' + totalGeralComPorcentagem}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    linkBackEnd: state.backEnd.link,
    totaisOrcamento: state.orcamento.totaisOrcamento,
    listCustoOrcamento: state.orcamento.listCustoOrcamento ,
    listEquipamentoOrcamento: state.orcamento.listEquipamentoOrcamento ,
    listMaoObraOrcamento: state.orcamento.listMaoObraOrcamento ,
    listItensOrcamentoGeral: state.orcamento.listItensOrcamentoGeral ,
    itensOrcamentoIntumescente: state.orcamento.itensOrcamentoIntumescente ,
    orcamentoSelecionado: state.orcamento.orcamentoSelecionado ,
  });
  
const mapDispatchToProps = (dispatch) => ({});
  
export default connect(mapStateToProps, mapDispatchToProps)(TotaisGerais);