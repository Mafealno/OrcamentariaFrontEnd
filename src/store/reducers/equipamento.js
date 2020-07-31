const ESTADO_INICIAL = {
  equipamentoSelecionado: {},
};

export default function equipamento(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case "SELECIONAR_EQUIPAMENTO_BUSCA":
      return {
        ...state,
        equipamentoSelecionado: action.equipamento,
      };
    case "RECARREGAR_EQUIPAMENTO_SELECIONADO_INICIADA":
      return {
        ...(state = Object.assign({}, state, {
          equipamentoSelecionado: state.equipamentoSelecionado,
        })),
      };
    case "RECARREGAR_EQUIPAMENTO_SELECIONADO_CONCLUIDA":
      let equipamento = action.equipamento;
      return {
        ...(state = Object.assign({}, state, {
          equipamentoSelecionado: equipamento,
        })),
      };
    default:
      return state;
  }
}
