/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./ModalAddress.css";
import ModalControl from "../../../ModalControl/ModalControl";
import * as PeopleActions from "../../../../store/actions/people";
import * as validacaoDadosUtils from "../../../../utils/validacaoDados";
import { connect } from "react-redux";

function ModalAddress(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [dadosCadastro, setDadosCadastro] = useState({
    pessoaId: { ...dadosCampo },
    enderecoId: { ...dadosCampo, valorPadrao: 0 },
    cep: { ...dadosCampo, formato: /^\d{3}\d{2}?\d{3}$/ },
    logradouro: { ...dadosCampo, requerido: true },
    numero: { ...dadosCampo, requerido: true },
    complemento: { ...dadosCampo },
    bairro: { ...dadosCampo },
    cidade: { ...dadosCampo, requerido: true },
    estado: { ...dadosCampo, requerido: true },
    uf: { ...dadosCampo },
    enderecoPadrao: { ...dadosCampo, valorPadrao: false },
  });

  useEffect(() => {
    setDadosCadastro({
      pessoaId: { ...dadosCadastro.pessoaId, valor: props.PESSOA_ID },
      enderecoId: { ...dadosCadastro.enderecoId, valor: props.ENDERECO_ID },
      cep: { ...dadosCadastro.cep, valor: props.CEP },
      logradouro: { ...dadosCadastro.logradouro, valor: props.LOGRADOURO },
      numero: { ...dadosCadastro.numero, valor: props.NUMERO_ENDERECO },
      complemento: { ...dadosCadastro.complemento, valor: props.COMPLEMENTO },
      bairro: { ...dadosCadastro.bairro, valor: props.BAIRRO },
      cidade: { ...dadosCadastro.cidade, valor: props.CIDADE },
      estado: { ...dadosCadastro.estado, valor: props.ESTADO },
      uf: { ...dadosCadastro.uf, valor: props.UF },
      enderecoPadrao: {
        ...dadosCadastro.enderecoPadrao,
        valor: props.ENDERECO_PADRAO,
      },
    });
  }, [props.show]);

  useEffect(() => {
    setDadosCadastro({
      pessoaId: {
        ...dadosCadastro.pessoaId,
        valor: dadosCadastro.pessoaId.valor,
      },
      enderecoId: { ...dadosCadastro.enderecoId, valor: props.novoEnderecoId },
      cep: { ...dadosCadastro.cep, valor: dadosCadastro.cep.valor },
      logradouro: {
        ...dadosCadastro.logradouro,
        valor: dadosCadastro.logradouro.valor,
      },
      numero: { ...dadosCadastro.numero, valor: dadosCadastro.numero.valor },
      complemento: {
        ...dadosCadastro.complemento,
        valor: dadosCadastro.complemento.valor,
      },
      bairro: { ...dadosCadastro.bairro, valor: dadosCadastro.bairro.valor },
      cidade: { ...dadosCadastro.cidade, valor: dadosCadastro.cidade.valor },
      estado: { ...dadosCadastro.estado, valor: dadosCadastro.estado.valor },
      uf: { ...dadosCadastro.uf, valor: dadosCadastro.uf.valor },
      enderecoPadrao: {
        ...dadosCadastro.enderecoPadrao,
        valor: dadosCadastro.enderecoPadrao.valor,
      },
    });
  }, [props.novoEnderecoId]);

  const montarObj = (obj) => {
    return {
      PESSOA_ID: props.pessoaSelecionada.PESSOA_ID,
      ENDERECO_ID: obj.enderecoId.valor,
      CEP: obj.cep.valor,
      LOGRADOURO: obj.logradouro.valor,
      NUMERO_ENDERECO: obj.numero.valor,
      COMPLEMENTO: obj.complemento.valor,
      BAIRRO: obj.bairro.valor,
      CIDADE: obj.cidade.valor,
      ESTADO: obj.estado.valor,
      UF: document.querySelector("#campo-uf option:checked").innerHTML,
      ENDERECO_PADRAO: document.querySelector("#campo-enderecoPadrao").checked,
    };
  };

  const exibirCamposErro = (dados, houveErro) => {
    Object.keys(dados).map((nomeCampo) => {
      if (!dados[nomeCampo].valido) {
        houveErro = true;

        if (document.getElementById("campo-" + nomeCampo)) {
          document.getElementById("erro-" + nomeCampo).innerHTML =
            dados[nomeCampo].msgErro;
          document
            .getElementById("campo-" + nomeCampo)
            .classList.add("is-invalid");
        }
      }
    });
    return houveErro;
  };

  const removerErro = (id) => {
    document.getElementById(id).classList.remove("is-invalid");
  };

  const salvarCadastro = () => {
    const dadosEndereco = validacaoDadosUtils.validarDados(dadosCadastro);

    let houveErro = false;

    houveErro = exibirCamposErro(dadosEndereco, houveErro);

    if (houveErro) {
      return;
    }

    props.salvarEndereco(montarObj(dadosEndereco));
  };

  const editarCadastro = () => {
    const dadosEndereco = validacaoDadosUtils.validarDados(dadosCadastro);

    let houveErro = false;

    houveErro = exibirCamposErro(dadosEndereco, houveErro);

    if (houveErro) {
      return;
    }

    props.editarEndereco(montarObj(dadosEndereco));
  };

  const handleInputChange = (event) => {
    setDadosCadastro({
      ...dadosCadastro,
      [event.target.name]: {
        ...dadosCadastro[event.target.name],
        valor: event.target.value,
      },
    });
  };

  return (
    <>
      <ModalControl
        {...props}
        tamanhoModal="xl"
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal modal-body-address"
        estiloModalFooter="backgroundModal"
        tituloModal={
          dadosCadastro.enderecoId.valor > 0
            ? "Editar Endereço"
            : "Novo Endereço"
        }
        conteudoBody={
          <>
            <div className="form">
              <div className="container-form">
                <form>
                  <div className="form-group">
                    <div className="form-row">
                      <label className="col-form-label">Código:</label>
                      <input
                        type="text"
                        id="campo-enderecoId"
                        className="form-control-plaintext input-codigo"
                        value={dadosCadastro.enderecoId.valor || ""}
                        readOnly
                      />
                      <span
                        className="invalid-feedback"
                        id="erro-enderecoId"
                      ></span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-xl-3 div-margin-bottom">
                        <label>CEP</label>
                        <input
                          type="text"
                          name="cep"
                          id="campo-cep"
                          className="form-control"
                          placeholder="000.00-000"
                          value={dadosCadastro.cep.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                        />
                        <span className="invalid-feedback" id="erro-cep"></span>
                      </div>
                      <div className="col-xl-9">
                        <label>Logradouro</label>
                        <input
                          type="text"
                          className="form-control"
                          name="logradouro"
                          id="campo-logradouro"
                          placeholder="Rua Aristides Alves"
                          value={dadosCadastro.logradouro.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                        />
                        <span
                          className="invalid-feedback"
                          id="erro-logradouro"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-4 col-xl-3 div-margin-bottom">
                        <label>Número</label>
                        <input
                          type="text"
                          className="form-control"
                          name="numero"
                          id="campo-numero"
                          placeholder="Ex: 56"
                          value={dadosCadastro.numero.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                        />
                        <span
                          className="invalid-feedback"
                          id="erro-numero"
                        ></span>
                      </div>
                      <div className="col-8 col-xl">
                        <label>Complemento</label>
                        <input
                          type="text"
                          className="form-control"
                          name="complemento"
                          id="campo-complemento"
                          placeholder="Perto do açougue"
                          value={dadosCadastro.complemento.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                        />
                        <span
                          className="invalid-feedback"
                          id="erro-complemento"
                        ></span>
                      </div>
                      <div className="col">
                        <label>Bairro</label>
                        <input
                          type="text"
                          className="form-control"
                          name="bairro"
                          id="campo-bairro"
                          placeholder="Praça da Árvore"
                          value={dadosCadastro.bairro.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-xl-4 div-margin-bottom">
                        <label>Cidade</label>
                        <input
                          type="text"
                          className="form-control"
                          name="cidade"
                          id="campo-cidade"
                          placeholder="São Paulo"
                          value={dadosCadastro.cidade.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                        />
                        <span
                          className="invalid-feedback"
                          id="erro-cidade"
                        ></span>
                      </div>
                      <div className="col div-margin-bottom">
                        <label>Estado</label>
                        <select
                          name="estado"
                          className="form-control"
                          id="campo-estado"
                          value={dadosCadastro.estado.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                        >
                          <option selected="" value="">
                            Selecione o Estado
                          </option>
                          <option value="Acre">Acre</option>
                          <option value="Alagoas">Alagoas</option>
                          <option value="Amapá">Amapá</option>
                          <option value="Amazonas">Amazonas</option>
                          <option value="Bahia">Bahia</option>
                          <option value="Ceará">Ceará</option>
                          <option value="Distrito Federal">
                            Distrito Federal
                          </option>
                          <option value="Espírito Santo">Espírito Santo</option>
                          <option value="Goiás">Goiás</option>
                          <option value="Maranhão">Maranhão</option>
                          <option value="Mato Grosso">Mato Grosso</option>
                          <option value="Mato Grosso do Sul">
                            Mato Grosso do Sul
                          </option>
                          <option value="Minas Gerais">Minas Gerais</option>
                          <option value="Pará">Pará</option>
                          <option value="Paraíba">Paraíba</option>
                          <option value="Paraná">Paraná</option>
                          <option value="Pernambuco">Pernambuco</option>
                          <option value="Piauí">Piauí</option>
                          <option value="Rio de Janeiro">Rio de Janeiro</option>
                          <option value="Rio Grande do Sul">
                            Rio Grande do Sul
                          </option>
                          <option value="Rio Grande do Norte">
                            Rio Grande do Norte
                          </option>
                          <option value="Rondônia">Rondônia</option>
                          <option value="Roraima">Roraima</option>
                          <option value="Santa Catarina">Santa Catarina</option>
                          <option value="São Paulo">São Paulo</option>
                          <option value="Sergipe">Sergipe</option>
                          <option value="Tocantins">Tocantins</option>
                        </select>
                        <span
                          className="invalid-feedback"
                          id="erro-estado"
                        ></span>
                      </div>
                      <div className="col-4 col-xl-2">
                        <label>UF</label>
                        <select
                          className="form-control"
                          name="uf"
                          id="campo-uf"
                          value={dadosCadastro.estado.valor}
                          readOnly
                        >
                          <option value="Acre">AC</option>
                          <option value="Alagoas">AL</option>
                          <option value="Amapá">AP</option>
                          <option value="Amazonas">AM</option>
                          <option value="Bahia">BA</option>
                          <option value="Ceará">CE</option>
                          <option value="Distrito Federal">DF</option>
                          <option value="Espírito Santo">ES</option>
                          <option value="Goiás">GO</option>
                          <option value="Maranhão">MA</option>
                          <option value="Mato Grosso">MT</option>
                          <option value="Mato Grosso do Sul">MS</option>
                          <option value="Minas Gerais">MG</option>
                          <option value="Pará">PA</option>
                          <option value="Paraíba">PB</option>
                          <option value="Paraná">PR</option>
                          <option value="Pernambuco">PE</option>
                          <option value="Piauí">PI</option>
                          <option value="Rio de Janeiro">RJ</option>
                          <option value="Rio Grande do Norte">RN</option>
                          <option value="Rio Grande do Sul">RS</option>
                          <option value="Rondônia">RO</option>
                          <option value="Roraima">RR</option>
                          <option value="Santa Catarina">SC</option>
                          <option value="São Paulo">SP</option>
                          <option value="Sergipe">SE</option>
                          <option value="Tocantins">TO</option>
                        </select>
                        <span className="invalid-feedback" id="erro-uf"></span>
                      </div>
                      <div className="col-12 col-xl-1">
                        <label>Padrão</label>
                        <input
                          type="checkbox"
                          className="form-control"
                          name="enderecoPadrao"
                          id="campo-enderecoPadrao"
                          value={false}
                          checked={dadosCadastro.enderecoPadrao.valor}
                          onChange={(event) => handleInputChange(event)}
                          onFocus={(event) => removerErro(event.target.id)}
                        />
                        <span
                          className="invalid-feedback"
                          id="erro-enderecoPadrao"
                        ></span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        }
        conteudoFooter={
          <>
            {!dadosCadastro.enderecoId.valor && (
              <div>
                <button
                  className="btn btn-primary btn-100-px"
                  onClick={() => salvarCadastro()}
                >
                  Salvar
                </button>
              </div>
            )}
            {dadosCadastro.enderecoId.valor > 0 && (
              <div>
                <button
                  onClick={() => editarCadastro()}
                  className="btn btn-success btn-100-px"
                >
                  Atualizar
                </button>
              </div>
            )}
          </>
        }
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  pessoaSelecionada: state.people.pessoaSelecionada,
  linkBackEnd: state.backEnd.link,
});

const mapDispatchToProps = (dispatch) => ({
  recarregarPessoa: (pessoaId, linkBackEnd) =>
    dispatch(PeopleActions.recarregarPessoa(pessoaId, linkBackEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddress);
