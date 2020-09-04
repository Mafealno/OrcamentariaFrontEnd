export function selecionarClienteOrcamento(clienteOrcamento) {
  return {
    type: "SELECIONAR_CLIENTE_ORCAMENTO",
    clienteOrcamento,
  };
}

export function adicionarItemOrcamentoGeral(
  listItensOrcamentoGeral,
  itemOrcamentoGeral
) {
  listItensOrcamentoGeral.push(itemOrcamentoGeral);

  listItensOrcamentoGeral = [...listItensOrcamentoGeral];

  return {
    type: "ADICIONAR_ITEM_ORCAMENTO_GERAL",
    listItensOrcamentoGeral,
  };
}

export function removerItemOrcamentoGeral(
  listItensOrcamentoGeral,
  itensOrcamentoId
) {
  const index = listItensOrcamentoGeral.findIndex(
    (elemento) => elemento.ITENS_ORCAMENTO_ID == itensOrcamentoId
  );

  listItensOrcamentoGeral.splice(index, 1);

  listItensOrcamentoGeral = [...listItensOrcamentoGeral];

  return {
    type: "REMOVER_ITEM_ORCAMENTO_GERAL",
    listItensOrcamentoGeral,
  };
}

export function adicionarItemOrcamentoIntumescente(
  itensOrcamentoIntumescente,
  itemOrcamentoIntumescente
) {
  itensOrcamentoIntumescente.push(itemOrcamentoIntumescente);

  itensOrcamentoIntumescente = [...itensOrcamentoIntumescente];

  return {
    type: "ADICIONAR_ITEM_ORCAMENTO_INTUMESCENTE",
    itensOrcamentoIntumescente,
  };
}

export function selecionarOrcamentoGeral(orcamentoGeral) {
  return (dispatch) => {
    dispatch({
      type: "SELECIONAR_ORCAMENTO_GERAL",
      orcamentoGeral,
    });
    dispatch({
      type: "SELECIONAR_ITENS_ORCAMENTO_GERAL",
      listItensOrcamentoGeral: orcamentoGeral.LIST_ITENS_ORCAMENTO_GERAL || [],
    });
  };
}

export function selecionarOrcamentoIntumescente(orcamentoIntumescente) {
  return {
    type: "SELECIONAR_ORCAMENTO_INTUMESCENTE",
    orcamentoIntumescente,
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

export function recarregarItensOrcamentoGeral(linkBackEnd, orcamentoId) {
  return (dispatch) => {
    fetch(
      linkBackEnd + "/itensOrcamentoGeral/buscar?orcamentoId=" + orcamentoId,
      {
        method: "GET",
      }
    )
      .then((responde) => responde.json())
      .then((data) => {
        dispatch({
          type: "RECARREGAR_ITENS_ORCAMENTO_GERAL_CONCLUIDA",
          listItensOrcamentoGeral: data,
        });
      });
  };
}
