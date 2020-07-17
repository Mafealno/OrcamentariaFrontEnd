import React, { useState, useEffect } from "react";
import "./ModalAddress.css";
import ModalControl from "../../../ModalControl/ModalControl";
import * as PeopleActions from "../../../../store/actions/people";
import { connect } from "react-redux";

function ModalAddress(props) {
  const [dadosCadastro, setDadosCadastro] = useState({
    pessoaId: "",
    enderecoId: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    uf: "",
    enderecoPadrao: false,
  });

  useEffect(() => {
    setDadosCadastro({
      pessoaId: props.pessoA_ID,
      enderecoId: props.enderecO_ID,
      cep: props.cep,
      logradouro: props.logradouro,
      numero: props.numerO_ENDERECO,
      complemento: props.complemento,
      bairro: props.bairro,
      cidade: props.cidade,
      estado: props.estado,
      uf: props.uf,
      enderecoPadrao: props.enderecO_PADRAO,
    });
  }, [
    props.pessoA_ID,
    props.enderecO_ID,
    props.cep,
    props.logradouro,
    props.numerO_ENDERECO,
    props.complemento,
    props.bairro,
    props.cidade,
    props.estado,
    props.uf,
    props.enderecO_PADRAO,
    props.show,
  ]);

  const editarEndereco = (objEnderecoAtualizar) => {
    fetch(props.linkBackEnd + "/endereco/" + props.enderecO_ID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objEnderecoAtualizar),
    }).then(() => {
      props.recarregarPessoa(objEnderecoAtualizar.pessoA_ID, props.linkBackEnd);
    });
  };

  const salvarEndereco = (objEnderecoNovo) => {
    fetch(props.linkBackEnd + "/endereco/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objEnderecoNovo),
    })
      .then((response) => response.json())
      .then((data) => {
        setDadosCadastro({
          pessoaId: objEnderecoNovo.pessoA_ID,
          enderecoId: data.enderecO_ID,
          cep: objEnderecoNovo.cep,
          logradouro: objEnderecoNovo.logradouro,
          numero: objEnderecoNovo.numerO_ENDERECO,
          complemento: objEnderecoNovo.complemento,
          bairro: objEnderecoNovo.bairro,
          cidade: objEnderecoNovo.cidade,
          estado: objEnderecoNovo.estado,
          uf: objEnderecoNovo.uf,
          enderecoPadrao: objEnderecoNovo.enderecO_PADRAO,
        });
      })
      .then(() => {
        props.recarregarPessoa(objEnderecoNovo.pessoA_ID, props.linkBackEnd);
      });
  };

  const montarObj = () => {
    return {
      pessoA_ID: props.pessoaSelecionada.pessoA_ID,
      endererO_ID: dadosCadastro.enderecoId,
      cep: dadosCadastro.cep,
      logradouro: dadosCadastro.logradouro,
      numerO_ENDERECO: dadosCadastro.numero,
      complemento: dadosCadastro.complemento,
      bairro: dadosCadastro.bairro,
      cidade: dadosCadastro.cidade,
      estado: dadosCadastro.estado,
      uf: document.querySelector("#form-uf option:checked").innerHTML,
      enderecO_PADRAO: document.querySelector("#form-endereco-padrao").checked,
    };
  };

  const limparCampos = () => {
    setDadosCadastro({
      pessoaId: "",
      enderecoId: undefined,
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      uf: "",
      enderecoPadrao: false,
    });
  };

  const handleInputChange = (event) => {
    setDadosCadastro({
      ...dadosCadastro,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <ModalControl
        {...props}
        tamanhoModal="xl"
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal"
        estiloModalFooter="backgroundModal"
        tituloModal="Novo endereço"
        conteudoHeader={
          <div className="close-modal-contact">
            <a href="#" onClick={() => props.onHide(limparCampos())}>
              <span className="fa fa-close close-select-people"></span>
            </a>
          </div>
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
                        value={dadosCadastro.enderecoId}
                        type="text"
                        className="form-control-plaintext input-codigo"
                        id="input-address-id"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-xl-3 div-margin-bottom">
                        <label>CEP</label>
                        <input
                          type="text"
                          name="cep"
                          id="form-cep"
                          className="form-control"
                          placeholder="000.00-000"
                          value={dadosCadastro.cep}
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                      <div className="col-xl-9">
                        <label>Logradouro</label>
                        <input
                          type="text"
                          name="logradouro"
                          placeholder="Rua Aristides Alves"
                          id="form-logradouro"
                          className="form-control"
                          value={dadosCadastro.logradouro}
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-4 col-xl-3 div-margin-bottom">
                        <label>Número</label>
                        <input
                          type="text"
                          name="numero"
                          placeholder="56"
                          id="form-numero"
                          className="form-control"
                          value={dadosCadastro.numero}
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                      <div className="col-8 col-xl">
                        <label>Complemento</label>
                        <input
                          type="text"
                          name="complemento"
                          placeholder="Perto do açougue"
                          id="form-complemento"
                          className="form-control"
                          value={dadosCadastro.complemento}
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                      <div className="col">
                        <label>Bairro</label>
                        <input
                          type="text"
                          name="bairro"
                          placeholder="Praça da Árvore"
                          id="form-bairro"
                          className="form-control"
                          value={dadosCadastro.bairro}
                          onChange={(event) => handleInputChange(event)}
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
                          name="cidade"
                          placeholder="São Paulo"
                          id="form-cidade"
                          className="form-control"
                          value={dadosCadastro.cidade}
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                      <div className="col div-margin-bottom">
                        <label>Estado</label>
                        <select
                          name="estado"
                          id="select-estado"
                          value={dadosCadastro.estado}
                          className="form-control"
                          onChange={(event) => handleInputChange(event)}
                        >
                          <option selected="" value="naoSelecionado">
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
                      </div>
                      <div className="col-4 col-xl-2">
                        <label>UF</label>
                        <select
                          id="form-uf"
                          name="uf"
                          value={dadosCadastro.estado}
                          className="form-control"
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
                      </div>
                      <div className="col-12 col-xl-1">
                        <label>Padrão</label>
                        <input
                          type="checkbox"
                          name="enderecoPadrao"
                          id="form-endereco-padrao"
                          value={false}
                          checked={dadosCadastro.enderecoPadrao}
                          className="form-control"
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        }
        opcoesFooter={
          <>
            {!dadosCadastro.enderecoId && (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={(objContatoNovo) => salvarEndereco(montarObj())}
                >
                  Salvar
                </button>
              </div>
            )}
            {dadosCadastro.enderecoId && (
              <div>
                <button
                  onClick={(objContatoAtualizar) => editarEndereco(montarObj())}
                  className="btn btn-success"
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
