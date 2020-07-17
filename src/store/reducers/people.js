const ESTADO_INICIAL = {
  pessoaSelecionada: {},
};

export default function people(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case "SELECIONAR_PESSOA_BUSCA":
      return {
        ...state,
        pessoaSelecionada: action.pessoa,
      };
    case "RECARREGAR_PESSOA_SELECIONADA_INICIADA":
      return {
        ...(state = Object.assign({}, state, {
          pessoaSelecionada: state.pessoaSelecionada,
        })),
      };
    case "RECARREGAR_PESSOA_SELECIONADA_CONCLUIDA":
      var pessoa = action.pessoa;
      return {
        ...(state = Object.assign({}, state, {
          pessoaSelecionada: pessoa,
        })),
      };
    default:
      return state;
  }
}
