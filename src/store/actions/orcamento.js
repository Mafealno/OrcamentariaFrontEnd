export function selecionarClienteOrcamento(clienteOrcamento) {
  return {
    type: "SELCIONAR_CLIENTE_ORCAMENTO",
    clienteOrcamento,
  };
}

export function adicionarItemOrcamentoGeral(
  itensOrcamentoGeral,
  itemOrcamentoGeral
) {
  itensOrcamentoGeral.push(itemOrcamentoGeral);

  itensOrcamentoGeral = [...itensOrcamentoGeral];

  return {
    type: "ADICIONAR_ITEM_ORCAMENTO_GERAL",
    itensOrcamentoGeral,
  };
}

export function selecionarOrcamentoGeral(orcamentoGeral) {
  return {
    type: "SELCIONAR_ORCAMENTO_GERAL",
    orcamentoGeral,
  };
}

export function listarOrcamento(linkBackEnd) {
  return (dispatch) => {
    fetch(linkBackEnd + "/orcamento/", {
      method: "GET",
    })
      .then((responde) => responde.json())
      .then((data) => {
        dispatch({
          type: "LISTAR_ORCAMENTO_CONCLUIDA",
          listOrcamento: data,
        });
      });
  };
}
