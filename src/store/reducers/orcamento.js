const ESTADO_INICIAL = {
  clienteOrcamento: {},
  orcamentoSelecionado: {},
  listItensOrcamentoGeral: [],
  itensOrcamentoIntumescente: [],
  listMaoObraOrcamento: [],
  listCustosOrcamento: [],
  listEquipamentoOrcamento: [],
  listOrcamento: [],
  listCustosMaoObraDisplay: [],
};

export default function orcamento(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case "SELECIONAR_ORCAMENTO":
      return {
        ...state,
        orcamentoSelecionado: action.orcamentoSelecionado,
      };
    case "SELECIONAR_CLIENTE_ORCAMENTO":
      return {
        ...state,
        clienteOrcamento: action.clienteOrcamento,
      };
    case "SELECIONAR_ITENS_ORCAMENTO_GERAL":
      return {
        ...state,
        listItensOrcamentoGeral: action.listItensOrcamentoGeral,
      };
    case "SELECIONAR_MAO_OBRA_ORCAMENTO":
      return {
        ...state,
        listMaoObraOrcamento: action.listMaoObraOrcamento,
      };
    case "SELECIONAR_EQUIPAMENTO_ORCAMENTO":
      return {
        ...state,
        listEquipamentoOrcamento: action.listEquipamentoOrcamento,
      };
    case "ADICIONAR_ITEM_ORCAMENTO_GERAL":
      return {
        ...state,
        listItensOrcamentoGeral: action.listItensOrcamentoGeral,
      };
    case "ADICIONAR_ITEM_ORCAMENTO_INTUMESCENTE":
      return {
        ...state,
        itensOrcamentoIntumescente: action.itensOrcamentoIntumescente,
      };
    case "ADICIONAR_MAO_OBRA_ORCAMENTO":
      return {
        ...state,
        listMaoObraOrcamento: action.listMaoObraOrcamento,
      };
    case "ADICIONAR_ITEM_CUSTO_MAO_OBRA_ORCAMENTO":
      return {
        ...state,
        listMaoObraOrcamento: action.listMaoObraOrcamento,
      };
    case "ADICIONAR_ITEM_EQUIPAMENTO_ORCAMENTO":
      return {
        ...state,
        listEquipamentoOrcamento: action.listEquipamentoOrcamento,
      };
    case "ADICIONAR_ITEM_CUSTO_MAO_OBRA_DISPLAY":
      return {
        ...state,
        listCustosMaoObraDisplay: action.listCustosMaoObraDisplay,
      };
    case "REMOVER_ITEM_ORCAMENTO_GERAL":
      return {
        ...state,
        listItensOrcamentoGeral: action.listItensOrcamentoGeral,
      };
    case "REMOVER_ITEM_CUSTO_MAO_OBRA_DISPLAY":
      return {
        ...state,
        listCustosMaoObraDisplay: action.listCustosMaoObraDisplay,
      };
    case "REMOVER_MAO_OBRA_ORCAMENTO":
      return {
        ...state,
        listMaoObraOrcamento: action.listMaoObraOrcamento,
      };
    case "REMOVER_ITEM_EQUIPAMENTO_ORCAMENTO":
      return {
        ...state,
        listEquipamentoOrcamento: action.listEquipamentoOrcamento,
      };
    case "REMOVER_ITEM_CUSTO_MAO_OBRA_ORCAMENTO":
      return {
        ...state,
        listMaoObraOrcamento: action.listMaoObraOrcamento,
      };
    case "LISTAR_ORCAMENTO_INICIADA":
      return {
        ...(state = Object.assign({}, state, {
          listOrcamento: state.listOrcamento,
        })),
      };
    case "LISTAR_ORCAMENTO_CONCLUIDA":
      return {
        ...(state = Object.assign({}, state, {
          listOrcamento: action.listOrcamento,
        })),
      };
    case "RECARREGAR_ITENS_ORCAMENTO_GERAL_INICIADA":
      return {
        ...(state = Object.assign({}, state, {
          listItensOrcamentoGeral: state.listItensOrcamentoGeral,
        })),
      };
    case "RECARREGAR_ITENS_ORCAMENTO_GERAL_CONCLUIDA":
      return {
        ...(state = Object.assign({}, state, {
          listItensOrcamentoGeral: state.listItensOrcamentoGeral,
        })),
      };
    case "RECARREGAR_ITENS_EQUIPAMENTO_ORCAMENTO_INICIADA":
      return {
        ...(state = Object.assign({}, state, {
          listEquipamentoOrcamento: state.listEquipamentoOrcamento,
        })),
      };
    case "RECARREGAR_ITENS_EQUIPAMENTO_ORCAMENTO_CONCLUIDA":
      return {
        ...(state = Object.assign({}, state, {
          listEquipamentoOrcamento: state.listEquipamentoOrcamento,
        })),
      };
      case "FILTRAR_LIST_ORCAMENTO_EDITAR":
      return {
        ...state,
        listOrcamento: action.listOrcamento,
      };
    case "MONTAR_LIST_CUSTO_MAO_OBRA_DISPLAY":
      return {
        ...state,
        listCustosMaoObraDisplay: action.listCustosMaoObraDisplay,
      };
    case "ATUALIZAR_FUNCIONARIO_MAO_OBRA_ORCAMENTO":
      return {
        ...state,
        listMaoObraOrcamento: action.listMaoObraOrcamento,
      };
    case "ATUALIZAR_CUSTO_MAO_OBRA_ORCAMENTO":
      return {
        ...state,
        listMaoObraOrcamento: action.listMaoObraOrcamento,
      };
    default:
      return state;
  }
}
