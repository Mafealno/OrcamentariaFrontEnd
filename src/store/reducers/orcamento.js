const ESTADO_INICIAL = {
  orcamentoSelecionado: {},
  clienteOrcamento: {},
  materialOrcamentoIntumescente: {},
  totaisOrcamento: {},
  listItensOrcamentoGeral: [],
  listItensOrcamentoIntumescente: [],
  listMaoObraOrcamento: [],
  listCustoOrcamento: [],
  listEquipamentoOrcamento: [],
  listMaterialOrcamento: [],
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
      case "SELECIONAR_ITENS_ORCAMENTO_INTUMESCENTE":
        return {
          ...state,
          listItensOrcamentoIntumescente: action.listItensOrcamentoIntumescente,
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
      case "SELECIONAR_MATERIAL_ORCAMENTO":
        return {
          ...state,
          listMaterialOrcamento: action.listMaterialOrcamento,
        };
    case "SELECIONAR_CUSTO_ORCAMENTO":
      return {
        ...state,
        listCustoOrcamento: action.listCustoOrcamento,
      };
    case "SELECIONAR_TOTAIS_ORCAMENTO":
      return {
        ...state,
        totaisOrcamento: action.totaisOrcamento
      }
    case "ADICIONAR_ITEM_ORCAMENTO_GERAL":
      return {
        ...state,
        listItensOrcamentoGeral: action.listItensOrcamentoGeral,
      };
    case "ADICIONAR_ITEM_ORCAMENTO_INTUMESCENTE":
      return {
        ...state,
        listItensOrcamentoIntumescente: action.listItensOrcamentoIntumescente,
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
      case "ADICIONAR_ITEM_MATERIAL_ORCAMENTO":
        return {
          ...state,
          listMaterialOrcamento: action.listMaterialOrcamento,
        };
    case "ADICIONAR_ITEM_CUSTO_ORCAMENTO":
      return {
        ...state,
        listCustoOrcamento: action.listCustoOrcamento,
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
    case "REMOVER_ITEM_MATERIAL_ORCAMENTO":
      return {
        ...state,
        listMaterialOrcamento: action.listMaterialOrcamento,
      };
    case "REMOVER_ITEM_CUSTO_ORCAMENTO":
      return {
        ...state,
        listCustoOrcamento: action.listCustoOrcamento,
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
    case "RECARREGAR_ORCAMENTO_INTUMESCENTE_CONCLUIDA":
      return {
        ...(state = Object.assign({}, state, {
          orcamentoSelecionado: action.orcamentoSelecionado,
          clienteOrcamento: action.orcamentoSelecionado.CLIENTE_ORCAMENTO || {},
          materialOrcamentoIntumescente: action.orcamentoSelecionado.PRODUTO || {},
          listMaoObraOrcamento: action.orcamentoSelecionado.LIST_MAO_OBRA_ORCAMENTO || [],
          listMaterialOrcamento: action.orcamentoSelecionado.LIST_MATERIAL_ORCAMENTO || [],
          listEquipamentoOrcamento: action.orcamentoSelecionado.LIST_EQUIPAMENTO_ORCAMENTO || [],
          listCustoOrcamento: action.orcamentoSelecionado.LIST_CUSTO_ORCAMENTO || [],
          totaisOrcamento: action.orcamentoSelecionado.TOTAIS_ORCAMENTO || {}
        })),
      };
    case "RECARREGAR_ITENS_ORCAMENTO_GERAL_CONCLUIDA":
      return {
        ...(state = Object.assign({}, state, {
          listItensOrcamentoGeral: action.listItensOrcamentoGeral,
        })),
      };
    case "RECARREGAR_ITENS_EQUIPAMENTO_ORCAMENTO_CONCLUIDA":
      return {
        ...(state = Object.assign({}, state, {
          listEquipamentoOrcamento: action.listEquipamentoOrcamento,
        })),
      };
      case "RECARREGAR_ITENS_MATERIAL_ORCAMENTO_CONCLUIDA":
      return {
        ...(state = Object.assign({}, state, {
          listMaterialOrcamento: action.listMaterialOrcamento,
        })),
      };
      case "RECARREGAR_ITENS_CUSTO_ORCAMENTO_CONCLUIDA":
      return {
        ...(state = Object.assign({}, state, {
          listCustoOrcamento: action.listCustoOrcamento,
        })),
      };
      case "RECARREGAR_TOTAIS_ORCAMENTO_CONCLUIDA":
      return {
        ...(state = Object.assign({}, state, {
          totaisOrcamento: action.totaisOrcamento,
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
