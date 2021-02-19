/* eslint-disable eqeqeq */
export function selecionarMaterialCartaCobertura(materialCartaCoberturaSalvar) {
  return {
    type: "SELECIONAR_MATERIAL_CARTA_COBERTURA",
    materialCartaCoberturaSalvar,
  };
}

export function selecionarCartaCoberturaEditar(cartaCoberturaEditar) {
  return {
    type: "SELECIONAR_CARTA_COBERTURA_EDITAR",
    cartaCoberturaEditar,
  };
}

export function removerItemCartaCoberturaEditar(
  cartaCoberturaEditar,
  cartaCoberturaId
) {
  if (cartaCoberturaEditar.LIST_CARTA_COBERTURA.length == 1) {
    cartaCoberturaEditar = {
      LIST_CARTA_COBERTURA: [],
    };

    return {
      type: "SELECIONAR_CARTA_COBERTURA_EDITAR",
      cartaCoberturaEditar,
    };
  } else {
    const objCartaCobertura = cartaCoberturaEditar.LIST_CARTA_COBERTURA.find(
      (elemento) => elemento.CARTA_COBERTURA_ID == cartaCoberturaId
    );

    const indexComponente = cartaCoberturaEditar.LIST_CARTA_COBERTURA.indexOf(
      objCartaCobertura
    );

    cartaCoberturaEditar.LIST_CARTA_COBERTURA.splice(indexComponente, 1);

    cartaCoberturaEditar.LIST_CARTA_COBERTURA = [
      ...cartaCoberturaEditar.LIST_CARTA_COBERTURA,
    ];

    return {
      type: "REMOVER_ITEM_CARTA_COBERTURA_EDITAR",
      cartaCoberturaEditar,
    };
  }
}

export function adicionarCartaCoberturaSalvar(
  listCartaCoberturaSalvar,
  novoObjCartaCobertura
) {
  listCartaCoberturaSalvar.push(novoObjCartaCobertura);

  listCartaCoberturaSalvar = [...listCartaCoberturaSalvar];

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
  listComponenteItems.push(novoComponente);

  listComponenteItems = [...listComponenteItems];

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

export function alterarStatusComponente(
  listComponenteItems,
  keyComponente,
  statusAlteracao
) {
  listComponenteItems
    .find((elemento) => elemento.key == keyComponente)
    .props.statusComponente.splice(0, 1, statusAlteracao);

  listComponenteItems = [...listComponenteItems];

  return {
    type: "ALTERAR_STATUS_COMPONENTE",
    listComponenteItems,
  };
}

export function listarCartaCoberturaEditar(linkBackEnd) {
  return (dispatch) => {
    fetch(linkBackEnd + "/cartaCobertura/", {
      method: "GET",
    })
      .then((responde) => responde.json())
      .then((data) => {
        dispatch({
          type: "LISTAR_CARTA_COBERTURA_CONCLUIDA",
          listCartaCoberturaEditar: data,
        });
      });
  };
}

export function filtrarListCartaCoberturaEditar(
  listCartaCoberturaEditar,
  filtrarPor,
  stringFiltro
) {
  let listCartaCoberturaEditarAux = [...listCartaCoberturaEditar];

  switch (filtrarPor) {
    case "Material":
      listCartaCoberturaEditarAux = listCartaCoberturaEditarAux.filter(
        (elemento) =>
          elemento.MATERIAL.NOME_MATERIAL.toLowerCase().indexOf(
            stringFiltro.toLowerCase()
          ) > -1
      );
      break;
    case "Fabricante":
      listCartaCoberturaEditarAux = listCartaCoberturaEditarAux.filter(
        (elemento) =>
          elemento.MATERIAL.FABRICANTE.NOME_PESSOA.toLowerCase().indexOf(
            stringFiltro.toLowerCase()
          ) > -1
      );
      break;
    default:
      listCartaCoberturaEditarAux = listCartaCoberturaEditarAux.filter(
        (elemento) =>
          elemento.MATERIAL.NOME_MATERIAL.toLowerCase().indexOf(
            stringFiltro.toLowerCase()
          ) > -1
      );
      break;
  }

  listCartaCoberturaEditar = [...listCartaCoberturaEditarAux];
  return {
    type: "FILTRAR_LIST_CARTA_COBERTURA_EDITAR",
    listCartaCoberturaEditar,
  };
}
