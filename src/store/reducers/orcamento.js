const ESTADO_INICIAL = {
  clienteOrcamento: {},
  orcamentoGeral: {},
  itensOrcamentoGeral: [],
  listOrcamento: [],
};

export default function orcamento(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case "SELCIONAR_CLIENTE_ORCAMENTO":
      return {
        ...state,
        clienteOrcamento: action.clienteOrcamento,
      };
    case "ADICIONAR_ITEM_ORCAMENTO_GERAL":
      return {
        ...state,
        itensOrcamentoGeral: action.itensOrcamentoGeral,
      };
    case "SELCIONAR_ORCAMENTO_GERAL":
      return {
        ...state,
        orcamentoGeral: action.orcamentoGeral,
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
    default:
      return state;
  }
}
