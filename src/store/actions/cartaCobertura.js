export function selecionarMaterialCartaCobertura(materialCartaCobertura) {
  return {
    type: "SELCIONAR_MATERIAL_CARTA_COBERTURA",
    materialCartaCobertura,
  };
}

export function adicionarCartaCoberturaSalvar(
  listCartaCoberturaSalvar,
  novoObjCartaCobertura
) {
  listCartaCoberturaSalvar = [
    ...listCartaCoberturaSalvar,
    novoObjCartaCobertura,
  ];

  return {
    type: "ADICIONAR_CARTA_COBERTURA_SALVAR",
    listCartaCoberturaSalvar,
  };
}

export function removerCartaCoberturaSalvar(
  listCartaCoberturaSalvar,
  ObjCartaCoberturaRemover
) {
  const indexComponente = listCartaCoberturaSalvar.indexOf(
    ObjCartaCoberturaRemover
  );

  listCartaCoberturaSalvar.splice(indexComponente, 1);

  listCartaCoberturaSalvar = [...listCartaCoberturaSalvar];

  return {
    type: "REMOVER_CARTA_COBERTURA_SALVAR",
    listCartaCoberturaSalvar,
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
  const componente = listComponenteItems.find(
    (elemento) => elemento.key == keyComponente
  );

  const indexComponente = listComponenteItems.indexOf(componente);

  listComponenteItems.splice(indexComponente, 1);

  listComponenteItems = [...listComponenteItems];

  return {
    type: "REMOVER_COMPONENTE_ITEM_LIST",
    listComponenteItems,
  };
}
