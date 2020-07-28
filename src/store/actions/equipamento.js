export function recarregarEquipamento(equipamentoId, linkBackEnd) {
  return (dispatch) => {
    fetch(linkBackEnd + "/equipamento/buscar?equipamentoId=" + equipamentoId, {
      method: "GET",
    })
      .then((responde) => responde.json())
      .then((data) => {
        dispatch({
          type: "RECARREGAR_EQUIPAMENTO_SELECIONADO_CONCLUIDA",
          equipamento: data[0],
        });
      });
  };
}

export function selecionarEquipamento(equipamento) {
  return {
    type: "SELECIONAR_EQUIPAMENTO_BUSCA",
    equipamento,
  };
}
