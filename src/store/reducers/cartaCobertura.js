const ESTADO_INICIAL = {
  materialCartaCoberturaSalvar: {},
  listCartaCoberturaSalvar: [],
  materialCartaCoberturaEditar: {},
  listCartaCoberturaEditar: [],
  cartaCoberturaEditar: {
    LIST_CARTA_COBERTURA: [],
  },
  listComponenteItems: [],
};

export default function cartaCobertura(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case "SELCIONAR_MATERIAL_CARTA_COBERTURA":
      return {
        ...state,
        materialCartaCoberturaSalvar: action.materialCartaCoberturaSalvar,
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
    case "ALTERAR_STATUS_COMPONENTE":
      return {
        ...state,
        listComponenteItems: action.listComponenteItems,
      };
    case "LISTAR_CARTA_COBERTURA_INICIADA":
      return {
        ...(state = Object.assign({}, state, {
          listCartaCoberturaEditar: state.listCartaCoberturaEditar,
        })),
      };
    case "LISTAR_CARTA_COBERTURA_CONCLUIDA":
      let listCartaCoberturaEditar = action.listCartaCoberturaEditar;
      return {
        ...(state = Object.assign({}, state, {
          listCartaCoberturaEditar: listCartaCoberturaEditar,
        })),
      };
    case "FILTRAR_LIST_CARTA_COBERTURA_EDITAR":
      return {
        ...state,
        listCartaCoberturaEditar: action.listCartaCoberturaEditar,
      };
    case "SELECIONAR_CARTA_COBERTURA_EDITAR":
      return {
        ...state,
        cartaCoberturaEditar: action.cartaCoberturaEditar,
      };
    case "REMOVER_ITEM_CARTA_COBERTURA_EDITAR":
      return {
        ...state,
        cartaCoberturaEditar: action.cartaCoberturaEditar,
      };
    default:
      return state;
  }
}
