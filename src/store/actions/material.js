export function recarregarMaterial(materialId, linkBackEnd) {
  return (dispatch) => {
    fetch(linkBackEnd + "/material/buscar?materialId=" + materialId, {
      method: "GET",
    })
      .then((responde) => responde.json())
      .then((data) => {
        dispatch({
          type: "RECARREGAR_MATERIAL_SELECIONADO_CONCLUIDA",
          material: data[0],
        });
      });
  };
}

export function selecionarMaterial(material) {
  return {
    type: "SELECIONAR_MATERIAL_BUSCA",
    material,
  };
}
