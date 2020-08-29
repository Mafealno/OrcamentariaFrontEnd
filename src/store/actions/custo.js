export function recarregarCusto(custoId, linkBackEnd) {
  return (dispatch) => {
    fetch(linkBackEnd + "/custo/buscar?custoId=" + custoId, {
      method: "GET",
    })
      .then((responde) => responde.json())
      .then((data) => {
        dispatch({
          type: "RECARREGAR_CUSTO_SELECIONADO_CONCLUIDA",
          custo: data[0],
        });
      });
  };
}

export function selecionarCusto(custo) {
  return {
    type: "SELECIONAR_CUSTO_BUSCA",
    custo,
  };
}
