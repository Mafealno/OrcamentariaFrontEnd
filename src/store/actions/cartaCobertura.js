export function selecionarMaterialCartaCobertura(materialCartaCobertura) {
  return {
    type: "SELCIONAR_MATERIAL_CARTA_COBERTURA",
    materialCartaCobertura,
  };
}

export function adicionarComponenteItems(listComponenteItems, novoComponente) {
  listComponenteItems = [...listComponenteItems, novoComponente];

  return {
    type: "ADICIONAR_COMPONENTE_ITEM_LIST",
    listComponenteItems,
  };
}
export function removerComponenteItems(listComponenteItems, keyComponente) {
  const c = listComponenteItems.find(
    (elemento) => elemento.key == keyComponente
  );

  const indexComponente = listComponenteItems.indexOf(c);

  listComponenteItems.splice(indexComponente, 1);

  listComponenteItems = [...listComponenteItems];

  return {
    type: "REMOVER_COMPONENTE_ITEM_LIST",
    listComponenteItems,
  };
}
