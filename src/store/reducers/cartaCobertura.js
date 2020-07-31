import ItensCartaCobertura from "../../components/CartaCobertura/ItensCartaCobertura/ItensCartaCobertura";

const ESTADO_INICIAL = {
  cartaCobertura: {
    materialCartaCobertura: {},
    ItensCartaCobertura: [],
  },
  listComponenteItems: [],
};

export default function cartaCobertura(state = ESTADO_INICIAL, action) {
  switch (action.type) {
    case "SELCIONAR_MATERIAL_CARTA_COBERTURA":
      var cartaCobertura = {
        materialCartaCobertura: action.materialCartaCobertura,
      };
      return {
        ...state,
        cartaCobertura: cartaCobertura,
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
    default:
      return state;
  }
}
