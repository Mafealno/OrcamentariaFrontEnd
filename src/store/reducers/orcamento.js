const ESTADO_INICIAL = {
  clienteOrcamento: {},
  orcamentoGeral: {},
  listItensOrcamentoGeral: [],
  orcamentoIntumescente: {},
  itensOrcamentoIntumescente: [],
  listMaoObraOrcamento: [],
  listCustosOrcamento: [],
  listEquipamentoOrcamento: [],
  listOrcamento: [],
};

export default function orcamento(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case "SELECIONAR_CLIENTE_ORCAMENTO":
      return {
        ...state,
        clienteOrcamento: action.clienteOrcamento,
      };
    case "ADICIONAR_ITEM_ORCAMENTO_GERAL":
      return {
        ...state,
        listItensOrcamentoGeral: action.listItensOrcamentoGeral,
      };
    case "REMOVER_ITEM_ORCAMENTO_GERAL":
      return {
        ...state,
        listItensOrcamentoGeral: action.listItensOrcamentoGeral,
      };
    case "ADICIONAR_ITEM_ORCAMENTO_INTUMESCENTE":
      return {
        ...state,
        itensOrcamentoIntumescente: action.itensOrcamentoIntumescente,
      };
    case "SELECIONAR_ORCAMENTO_GERAL":
      return {
        ...state,
        orcamentoGeral: action.orcamentoGeral,
      };
    case "SELECIONAR_ITENS_ORCAMENTO_GERAL":
      return {
        ...state,
        listItensOrcamentoGeral: action.listItensOrcamentoGeral,
      };
    case "SELECIONAR_ORCAMENTO_INTUMESCENTE":
      return {
        ...state,
        orcamentoIntumescente: action.orcamentoIntumescente,
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
    default:
      return state;
  }
}
