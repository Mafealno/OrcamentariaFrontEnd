export function calcularTotaisMaoObraOrcamento(
  listMaoObraOrcamento,
  diasTrabalhado
) {
  let valoresCalculados = {
    valorTotalSalario: 0,
    valorTotalCustos: 0,
  };

  //calcula valor total dos salarios pelos dias de trabalho
  const valorTotalSalario = listMaoObraOrcamento.reduce(
    (acumulador, itemAtual) => {
      return (
        acumulador + itemAtual.FUNCIONARIO.VALOR_DIA_TRABALHADO * diasTrabalhado
      );
    },
    0
  );

  //calcula valor total dos custos
  let valorTotalCustos = 0;

  listMaoObraOrcamento.forEach((elemento) => {
    let valorTotalCustosAux = elemento.LIST_CUSTO.reduce(
      (acumulador, itemAtualFilho) => {
        let fator = verificaTipoCusto(
          itemAtualFilho.TIPO_CUSTO,
          diasTrabalhado
        );

        return acumulador + itemAtualFilho.VALOR_CUSTO * fator;
      },
      0
    );

    valorTotalCustos += valorTotalCustosAux;
  });

  valoresCalculados.valorTotalSalario = valorTotalSalario;
  valoresCalculados.valorTotalCustos = valorTotalCustos;

  return valoresCalculados;
}

export function verificaTipoCusto(tipo, diasTrabalhado){
  let fator = 1;
  switch (tipo) {
    case "UNICO":
      fator = 1;
      break;
    case "ANUAL":
      fator = diasTrabalhado / 364;
      break;
    case "MENSAL":
      fator = diasTrabalhado / 30;
      break;
    case "SEMANAL":
      fator = diasTrabalhado / 7;
      break;
    case "DIARIO":
      fator = diasTrabalhado;
      break;
    default:
      fator = 1;
      break;
  }

  return Math.round(fator + 0.4);
};


export function calcularTotaisEquipamentosOrcamento(listEquipamentoOrcamento){
  let valoresCalculados = {
    totalValorEquipamentos: 0
  };

  //calcula valor total dos equipamentos
  valoresCalculados.totalValorEquipamentos = listEquipamentoOrcamento.reduce(
    (acumulador, itemAtual) => {
      return (
        acumulador + itemAtual.VALOR_UNITARIO_EQUIPAMENTO * itemAtual.QTDE_EQUIPAMENTO
      );
    },
    0
  );

  return valoresCalculados
}

export function calcularTotaisMaterialOrcamento(listMaterialOrcamento){
  let valoresCalculados = {
    totalValorMaterial: 0
  };

  //calcula valor total dos equipamentos
  valoresCalculados.totalValorMaterial = listMaterialOrcamento.reduce(
    (acumulador, itemAtual) => {
      return (
        acumulador + itemAtual.VALOR_UNITARIO_MATERIAL * itemAtual.QTDE_MATERIAL
      );
    },
    0
  );

  return valoresCalculados
}

export function calcularTotaisCustosOrcamento(listCustoOrcamento, diasTrabalhado){
  let valoresCalculados = {
    totalValorCustos: 0
  };

  valoresCalculados.totalValorCustos = listCustoOrcamento.reduce((acumulador, elemento) => {
        let fator = verificaTipoCusto(
          elemento.CUSTO_OBRA.TIPO_CUSTO,
          diasTrabalhado
        );

        return acumulador += elemento.VALOR_CUSTO * fator;
      },
      0
    );

    return valoresCalculados;
}