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

const verificaTipoCusto = (tipo, diasTrabalhado) => {
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

  return Math.round(fator + 0, 5);
};
