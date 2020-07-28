const ESTADO_INICIAL = {
  materialSelecionado: {},
};

export default function material(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case "SELECIONAR_MATERIAL_BUSCA":
      return {
        ...state,
        materialSelecionado: action.material,
      };
    case "RECARREGAR_MATERIAL_SELECIONADO_INICIADA":
      return {
        ...(state = Object.assign({}, state, {
          materialSelecionado: state.materialSelecionado,
        })),
      };
    case "RECARREGAR_MATERIAL_SELECIONADO_CONCLUIDA":
      var material = action.material;
      return {
        ...(state = Object.assign({}, state, {
          materialSelecionado: material,
        })),
      };
    default:
      return state;
  }
}
