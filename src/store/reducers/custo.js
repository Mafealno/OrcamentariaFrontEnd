const ESTADO_INICIAL = {
  custoSelecionado: {},
};

export default function custo(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case "SELECIONAR_CUSTO_BUSCA":
      return {
        ...state,
        custoSelecionado: action.custo,
      };
    case "RECARREGAR_CUSTO_SELECIONADO_INICIADA":
      return {
        ...(state = Object.assign({}, state, {
          custoSelecionado: state.custoSelecionado,
        })),
      };
    case "RECARREGAR_CUSTO_SELECIONADO_CONCLUIDA":
      let custo = action.custo;
      return {
        ...(state = Object.assign({}, state, {
          custoSelecionado: custo,
        })),
      };
    default:
      return state;
  }
}
