import React, { useState, useEffect } from "react";
import "./ModalAddress.css";
import ModalControl from "../../../ModalControl/ModalControl";

export default function ModalAddress(props) {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [uf, setUf] = useState("");
  const [enderecoPadrao, setEnderecoPadrao] = useState(false);

  const enderecoId = !Boolean(props.enderecoId) ? "" : props.enderecoId;

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "cep":
        setCep(event.target.value);
        break;
      case "logradouro":
        setLogradouro(event.target.value);
        break;
      case "numero":
        setNumero(event.target.value);
        break;
      case "complemento":
        setComplemento(event.target.value);
        break;
      case "bairro":
        setBairro(event.target.value);
        break;
      case "cidade":
        setCidade(event.target.value);
        break;
      case "estado":
        setEstado(event.target.value);
        setUf(event.target.value);
        break;
      case "enderecoPadrao":
        if (enderecoPadrao) {
          setEnderecoPadrao(false);
        } else {
          setEnderecoPadrao(true);
        }

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setCep(props.cep);
    setLogradouro(props.logradouro);
    setNumero(props.numeroEndereco);
    setComplemento(props.complemento);
    setBairro(props.bairro);
    setCidade(props.cidade);
    setEstado(props.estado);
    setUf(props.estado);
    setEnderecoPadrao(props.enderecoPadrao);
  }, [enderecoId]);

  return (
    <>
      <ModalControl
        {...props}
        tamanhoModal="xl"
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal"
        estiloModalFooter="backgroundModal"
        tituloModal="Novo endereço"
        conteudoModal={
          <>
            <div className="form">
              <div className="container-form">
                <form>
                  <div className="form-group">
                    <div className="form-row">
                      <label className="col-form-label">Código:</label>
                      <input
                        value={enderecoId}
                        type="text"
                        className="form-control-plaintext input-codigo"
                        id="form-contato-id"
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
                          value={cep}
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
                          value={logradouro}
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
                          value={numero}
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                      <div className="col-8 col-xl">
                        <label>Complemento</label>
                        <input
                          type="text"
                          name="complemento"
                          placeholder={enderecoId ? "Perto do açougue" : ""}
                          id="form-complemento"
                          className="form-control"
                          value={complemento}
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
                          value={bairro}
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
                          value={cidade}
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                      <div className="col div-margin-bottom">
                        <label>Estado</label>
                        <select
                          name="estado"
                          id="select-estado"
                          value={estado}
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
                          name="uf"
                          value={estado}
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
                          id="form-enderecoPadrao"
                          value={true}
                          checked={enderecoPadrao}
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
        opcoesModal={
          <>
            <div>
              <button onClick={props.onHide} className="btn btn-danger">
                Fechar
              </button>
            </div>
            <div>
              <button className="btn btn-success">Salvar</button>
            </div>
          </>
        }
      />
    </>
  );
}
