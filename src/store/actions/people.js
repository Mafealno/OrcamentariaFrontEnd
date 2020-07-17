export function recarregarPessoa(pessoaId, linkBackEnd) {
  return (dispatch) => {
    fetch(linkBackEnd + "/pessoas/buscar?pessoaId=" + pessoaId, {
      method: "GET",
    })
      .then((responde) => responde.json())
      .then((data) => {
        dispatch({
          type: "RECARREGAR_PESSOA_SELECIONADA_CONCLUIDA",
          pessoa: data[0],
        });
      });
  };
}

export function selecionarPessoa(pessoa) {
  return {
    type: "SELECIONAR_PESSOA_BUSCA",
    pessoa,
  };
}
