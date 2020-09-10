export function validarDados(dadosValidacao) {
  const objAux = Object.assign({}, dadosValidacao);

  Object.keys(objAux).map((campo) => {
    objAux[campo].valido = false;
    if (objAux[campo].valor) {
      if (objAux[campo].formato) {
        if (objAux[campo].valor.toString().match(objAux[campo].formato)) {
          objAux[campo].valido = true;
        } else {
          objAux[campo].msgErro = "Formato inválido";
        }
      } else {
        objAux[campo].valido = true;
      }
    } else {
      if (!objAux[campo].requerido) {
        objAux[campo].valor = objAux[campo].valorPadrao;
        objAux[campo].valido = true;
      } else {
        objAux[campo].msgErro = "Preencha esta informação";
      }
    }
  });

  return objAux;
}

export const dadosCampo = {
  valor: "",
  valorPadrao: "",
  requerido: false,
  formato: "",
  msgErro: "",
  valido: false,
};
