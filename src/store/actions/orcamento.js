/* eslint-disable eqeqeq */
export function selecionarClienteOrcamento(clienteOrcamento) {
  return {
    type: "SELECIONAR_CLIENTE_ORCAMENTO",
    clienteOrcamento,
  };
}

export function selecionarOrcamento(orcamento) {
  return (dispatch) => {
    dispatch({
      type: "SELECIONAR_ORCAMENTO",
      orcamentoSelecionado: orcamento,
    });

    dispatch({
      type: "SELECIONAR_MAO_OBRA_ORCAMENTO",
      listMaoObraOrcamento: orcamento.LIST_MAO_OBRA_ORCAMENTO || [],
    });

    dispatch({
      type: "SELECIONAR_EQUIPAMENTO_ORCAMENTO",
      listEquipamentoOrcamento: orcamento.LIST_EQUIPAMENTO_ORCAMENTO || [],
    });

    dispatch({
      type: "SELECIONAR_CUSTO_ORCAMENTO",
      listCustoOrcamento: orcamento.LIST_CUSTO_ORCAMENTO || [],
    });

    if (orcamento.TIPO_OBRA == "Geral") {
      dispatch({
        type: "SELECIONAR_ITENS_ORCAMENTO_GERAL",
        listItensOrcamentoGeral: orcamento.LIST_ITENS_ORCAMENTO_GERAL || [],
      });
    } else {
    }
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
export function adicionarItemEquipamentoOrcamento(
  listEquipamentoOrcamento,
  itemEquipamentoOrcamento
) {
  listEquipamentoOrcamento.push(itemEquipamentoOrcamento);

  listEquipamentoOrcamento = [...listEquipamentoOrcamento];

  return {
    type: "ADICIONAR_ITEM_EQUIPAMENTO_ORCAMENTO",
    listEquipamentoOrcamento,
  };
}

export function adicionarMaoObraOrcamento(
  listMaoObraOrcamento,
  maoObraOrcamento
) {
  listMaoObraOrcamento.push(maoObraOrcamento);

  listMaoObraOrcamento = [...listMaoObraOrcamento];

  return {
    type: "ADICIONAR_MAO_OBRA_ORCAMENTO",
    listMaoObraOrcamento,
  };
}

export function adicionarItemCustoOrcamento(
  listCustoOrcamento,
  itemCustoOrcamento
) {
  listCustoOrcamento.push(itemCustoOrcamento);

  listCustoOrcamento = [...listCustoOrcamento];

  return {
    type: "ADICIONAR_ITEM_CUSTO_ORCAMENTO",
    listCustoOrcamento,
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

export function adicionarItemCustoMaoObraOrcamento(
  listMaoObraOrcamento,
  maoObraOrcamentoId,
  itemCustoMaoObraOrcamento
) {
  let index = listMaoObraOrcamento.findIndex(
    (elemento) => elemento.MAO_OBRA_ORCAMENTO_ID == maoObraOrcamentoId
  );

  listMaoObraOrcamento[index].LIST_CUSTO.push(itemCustoMaoObraOrcamento);

  listMaoObraOrcamento = [...listMaoObraOrcamento];

  return {
    type: "ADICIONAR_ITEM_CUSTO_MAO_OBRA_ORCAMENTO",
    listMaoObraOrcamento,
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
export function removerItemEquipamentoOrcamento(
  listEquipamentoOrcamento,
  equipamentoOrcamentoId
) {
  const index = listEquipamentoOrcamento.findIndex(
    (elemento) => elemento.EQUIPAMENTO_ORCAMENTO_ID == equipamentoOrcamentoId
  );

  listEquipamentoOrcamento.splice(index, 1);

  listEquipamentoOrcamento = [...listEquipamentoOrcamento];

  return {
    type: "REMOVER_ITEM_EQUIPAMENTO_ORCAMENTO",
    listEquipamentoOrcamento,
  };
}

export function removerItemCustoOrcamento(
  listCustoOrcamento,
  custoOrcamentoId
) {
  const index = listCustoOrcamento.findIndex(
    (elemento) => elemento.CUSTO_ORCAMENTO_ID == custoOrcamentoId
  );

  listCustoOrcamento.splice(index, 1);

  listCustoOrcamento = [...listCustoOrcamento];

  return {
    type: "REMOVER_ITEM_CUSTO_ORCAMENTO",
    listCustoOrcamento,
  };
}

export function removerMaoObraOrcamento(
  listMaoObraOrcamento,
  maoObraOrcamentoId
) {
  const index = listMaoObraOrcamento.findIndex(
    (elemento) => elemento.MAO_OBRA_ORCAMENTO_ID == maoObraOrcamentoId
  );

  listMaoObraOrcamento.splice(index, 1);

  listMaoObraOrcamento = [...listMaoObraOrcamento];

  return {
    type: "REMOVER_MAO_OBRA_ORCAMENTO",
    listMaoObraOrcamento,
  };
}

export function removerItemCustoMaoObraOrcamento(
  listMaoObraOrcamento,
  maoObraOrcamentoId,
  custoId
) {
  const indexPai = listMaoObraOrcamento.findIndex(
    (elemento) => elemento.MAO_OBRA_ORCAMENTO_ID == maoObraOrcamentoId
  );

  let indexFilho = listMaoObraOrcamento[indexPai].LIST_CUSTO.findIndex(
    (elemento) => elemento.CUSTO_ID == custoId
  );

  listMaoObraOrcamento[indexPai].LIST_CUSTO.splice(indexFilho, 1);

  return {
    type: "REMOVER_ITEM_CUSTO_MAO_OBRA_ORCAMENTO",
    listMaoObraOrcamento,
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
export function recarregarItensEquipamentoOrcamento(linkBackEnd, orcamentoId) {
  return (dispatch) => {
    fetch(
      linkBackEnd + "/equipamentoOrcamento/buscar?orcamentoId=" + orcamentoId,
      {
        method: "GET",
      }
    )
      .then((responde) => responde.json())
      .then((data) => {
        dispatch({
          type: "RECARREGAR_ITENS_EQUIPAMENTO_ORCAMENTO_CONCLUIDA",
          listEquipamentoOrcamento: data,
        });
      });
  };
}

export function recarregarItensCustoOrcamento(linkBackEnd, orcamentoId) {
  return (dispatch) => {
    fetch(
      linkBackEnd + "/custoOrcamento/buscar?orcamentoId=" + orcamentoId,
      {
        method: "GET",
      }
    )
      .then((responde) => responde.json())
      .then((data) => {
        dispatch({
          type: "RECARREGAR_ITENS_CUSTO_ORCAMENTO_CONCLUIDA",
          listCustosOrcamento: data,
        });
      });
  };
}

export function montarListCustosMaoObraDisplay(
  listCustosMaoObraDisplay,
  listCustosMaoObraDisplayAux
) {
  listCustosMaoObraDisplay = [];
  listCustosMaoObraDisplay = [...listCustosMaoObraDisplayAux];

  return {
    type: "MONTAR_LIST_CUSTO_MAO_OBRA_DISPLAY",
    listCustosMaoObraDisplay,
  };
}

export function adicionarItemCustosMaoObraDisplay(
  listCustosMaoObraDisplay,
  itemCustoMaoObraDisplay
) {
  listCustosMaoObraDisplay.push(itemCustoMaoObraDisplay);
  listCustosMaoObraDisplay = [...listCustosMaoObraDisplay];

  return {
    type: "ADICIONAR_ITEM_CUSTO_MAO_OBRA_DISPLAY",
    listCustosMaoObraDisplay,
  };
}

export function removerItemCustosMaoObraDisplay(
  listCustosMaoObraDisplay,
  keyComponente
) {
  let index = listCustosMaoObraDisplay.findIndex(
    (elemento) => elemento.props.keyComponente == keyComponente
  );

  listCustosMaoObraDisplay.splice(index, 1);

  return {
    type: "REMOVER_ITEM_CUSTO_MAO_OBRA_DISPLAY",
    listCustosMaoObraDisplay,
  };
}

export function atualizarFuncionarioMaoObraOrcamento(
  listMaoObraOrcamento,
  objAtualizar,
  pessoaIdAnterior
) {
  const index = listMaoObraOrcamento.findIndex(
    (elemento) => elemento.FUNCIONARIO.PESSOA_ID == pessoaIdAnterior
  );

  listMaoObraOrcamento[index].FUNCIONARIO = objAtualizar.FUNCIONARIO;

  listMaoObraOrcamento = [...listMaoObraOrcamento];

  return {
    type: "ATUALIZAR_FUNCIONARIO_MAO_OBRA_ORCAMENTO",
    listMaoObraOrcamento,
  };
}

export function atualizarCustoMaoObraOrcamento(
  listMaoObraOrcamento,
  objAtualizar,
  custoIdAnterior
) {
  const index = listMaoObraOrcamento.findIndex(
    (elemento) =>
      elemento.MAO_OBRA_ORCAMENTO_ID == objAtualizar.MAO_OBRA_ORCAMENTO_ID
  );

  const indexFilho = listMaoObraOrcamento[index].LIST_CUSTO.findIndex(
    (elemento) => elemento.CUSTO_ID == custoIdAnterior
  );

  listMaoObraOrcamento[index].LIST_CUSTO[indexFilho] = objAtualizar;

  listMaoObraOrcamento = [...listMaoObraOrcamento];

  return {
    type: "ATUALIZAR_CUSTO_MAO_OBRA_ORCAMENTO",
    listMaoObraOrcamento,
  };
}

export function filtrarListOrcamentoEditar(
  listOrcamentoEditar,
  filtrarPor,
  stringFiltro
) {
  let listOrcamentoEditarAux = [...listOrcamentoEditar];

  switch (filtrarPor) {
    case "Orcamento":
      listOrcamentoEditarAux = listOrcamentoEditarAux.filter(
        (elemento) =>
          elemento.ORCAMENTO_ID.toString().indexOf(
            stringFiltro.toString()
          ) > -1
      );
      break;
    case "Cliente":
      listOrcamentoEditarAux = listOrcamentoEditarAux.filter(
        (elemento) =>
          elemento.CLIENTE_ORCAMENTO.NOME_PESSOA.toLowerCase().indexOf(
            stringFiltro.toLowerCase()
          ) > -1
      );
      break;
    default:
      listOrcamentoEditarAux = listOrcamentoEditarAux.filter(
        (elemento) =>
          elemento.ORCAMENTO_ID.toLowerCase().indexOf(
            stringFiltro.toLowerCase()
          ) > -1
      );
      break;
  }

    listOrcamentoEditar = [...listOrcamentoEditarAux];

  return {
    type: "FILTRAR_LIST_ORCAMENTO_EDITAR",
    listOrcamento: listOrcamentoEditar,
  };
}
