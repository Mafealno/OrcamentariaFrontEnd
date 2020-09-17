import React, { useState, useEffect } from "react";
import "./ItemCustoMaoObraOrcamento.css";
import * as validacaoDadosUtils from "../../../../../utils/validacaoDados";

export default function ItemCustoMaoObraOrcamento(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [dadosCadastro, setDadosCadastro] = useState({
    custoMaoObraId: { ...dadosCampo },
    nomeCusto: { ...dadosCampo },
    valorCusto: { ...dadosCampo },
    tipoCusto: { ...dadosCampo },
  });

  useEffect(() => {
    setDadosCadastro({
      custoMaoObraId: {
        ...dadosCadastro.custoMaoObraId,
        valor: props.dadosCustoMaoObra.CUSTO_ID,
      },
      nomeCusto: {
        ...dadosCadastro.nomeCusto,
        valor: props.dadosCustoMaoObra.NOME_CUSTO,
      },
      valorCusto: {
        ...dadosCadastro.valorCusto,
        valor: props.dadosCustoMaoObra.VALOR_CUSTO,
      },
      tipoCusto: {
        ...dadosCadastro.tipoCusto,
        valor: props.dadosCustoMaoObra.TIPO_CUSTO,
      },
    });
  }, [props.dadosCustoMaoObra.CUSTO_ID]);

  return (
    <div
      id="containerItemCustoMaoObraOrcamento"
      key={dadosCadastro.custoMaoObraId.valor}
    >
      <div id="nome-custo-mao-obra-orcamento">
        <label>{dadosCadastro.nomeCusto.valor}</label>
      </div>
      <div id="valor-custo-mao-obra-orcamento">
        <label>R$ {dadosCadastro.valorCusto.valor}</label>
      </div>
      <div id="tipo-custo-mao-obra-orcamento">
        <label>{dadosCadastro.tipoCusto.valor}</label>
      </div>
    </div>
  );
}
