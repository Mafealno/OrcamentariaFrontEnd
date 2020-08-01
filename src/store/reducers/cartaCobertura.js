const ESTADO_INICIAL = {
  materialCartaCobertura: {},
  listCartaCoberturaSalvar: [],
  listComponenteItems: [],
};

export default function cartaCobertura(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case "SELCIONAR_MATERIAL_CARTA_COBERTURA":
      return {
        ...state,
        materialCartaCobertura: action.materialCartaCobertura,
      };
    case "ADICIONAR_COMPONENTE_ITEM_LIST":
      return {
        ...state,
        listComponenteItems: action.listComponenteItems,
      };
    case "REMOVER_COMPONENTE_ITEM_LIST":
      return {
        ...state,
        listComponenteItems: action.listComponenteItems,
      };
    case "ADICIONAR_CARTA_COBERTURA_SALVAR":
      return {
        ...state,
        listCartaCoberturaSalvar: action.listCartaCoberturaSalvar,
      };
    case "REMOVER_CARTA_COBERTURA_SALVAR":
      return {
        ...state,
        listCartaCoberturaSalvar: action.listCartaCoberturaSalvar,
      };
    default:
      return state;
  }
}
