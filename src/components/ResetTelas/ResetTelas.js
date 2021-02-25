/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import * as peopleActions from "../../store/actions/people";
import * as orcamentoActions from "../../store/actions/orcamento";
import * as materialActions from "../../store/actions/material";
import * as equipamentoActons from "../../store/actions/equipamento";
import * as custoActions from "../../store/actions/custo";
import * as cartaCoberturaActions from "../../store/actions/cartaCobertura";

import { connect } from "react-redux"; 

function ResetTelas(props) {

    useEffect(() => {

        if(props.telaAtual !== "orcamento"){
            props.selecionarOrcamento({});
            props.selecionarClienteOrcamento({});
        }   
            props.selecionarPessoa({});
            props.selecionarMaterial({});
            props.selecionarEquipamento({});
            props.selecionarCartaCoberturaEditar({ LIST_CARTA_COBERTURA: []});
            props.selecionarMaterialCartaCobertura({});
            props.zerarListComponenteItems(props.listComponenteItems);
        
    }, [])

    return (
        <></>
    )
}

const mapStateToProps = (state) => ({
    listComponenteItems: state.cartaCobertura.listComponenteItems,
});
  
const mapDispatchToProps = (dispatch) => ({
    selecionarPessoa: (pessoa) => dispatch(peopleActions.selecionarPessoa(pessoa)),
    selecionarOrcamento: (orcamento) => dispatch(orcamentoActions.selecionarOrcamento(orcamento)),
    selecionarClienteOrcamento: (clienteOrcamento) => dispatch(orcamentoActions.selecionarClienteOrcamento(clienteOrcamento)),
    selecionarMaterial: (material) => dispatch(materialActions.selecionarMaterial(material)),
    selecionarEquipamento: (equipamento) => dispatch(equipamentoActons.selecionarEquipamento(equipamento)),
    selecionarCusto: (custo) => dispatch(custoActions.selecionarCusto(custo)),
    selecionarCartaCoberturaEditar: (cartaCoberturaEditar) => dispatch(cartaCoberturaActions.selecionarCartaCoberturaEditar(cartaCoberturaEditar)),
    selecionarMaterialCartaCobertura: (material) => dispatch(cartaCoberturaActions.selecionarMaterialCartaCobertura(material)),
    zerarListComponenteItems: (listComponenteItems) => dispatch(cartaCoberturaActions.zerarListComponenteItems(listComponenteItems)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetTelas);
