import React, { useState, useEffect } from "react";
import "./ModalContact.css";
import ModalControl from "../ModalControl/ModalControl";

export default function ModelContact(props) {
  const [telefone, setTelefone] = useState(true);
  const [celular, setCelular] = useState(true);
  const [email, setEmail] = useState(true);
  const [tipoContato, setTipoContato] = useState("naoSelecionado");
  const [contato, setContato] = useState("");
  const [ddd, setDdd] = useState("");
  const [ramal, setRamal] = useState("");
  const [contatoPadrao, setContatoPadrao] = useState(false);

  const contatoId = !Boolean(props.contatoId) ? "" : props.contatoId;

  useEffect(() => {
    setTipoContato(props.tipoContato);
    setContato(props.contato);
    setDdd(props.ddd);
    setRamal(props.ramal);
    setContatoPadrao(props.contatoPadrao);
  }, [contatoId]);

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "tipoContato":
        if (event.target.value == "naoSelecionado") {
          setTipoContato(undefined);
        } else {
          setTipoContato(event.target.value);
        }
        break;
      case "contato":
        setContato(event.target.value);
        break;
      case "ddd":
        setDdd(event.target.value);
        break;
      case "ramal":
        setRamal(event.target.value);
        break;
      case "contatoPadrao":
        setContatoPadrao(event.target.value);
        break;
      default:
        break;
    }
  };

  function tipoContatoSeleciondo(event) {
    switch (event.target.value) {
      case "telefone":
        setTelefone(false);
        setCelular(false);
        setEmail(false);
        break;
      case "celular":
        setCelular(false);
        setTelefone(true);
        setEmail(false);
        break;
      case "email":
        setEmail(false);
        setCelular(true);
        setTelefone(true);
        break;
      default:
        setTelefone(true);
        setCelular(true);
        setEmail(true);
    }

    handleInputChange(event);
  }

  return (
    <>
      <ModalControl
        {...props}
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal"
        estiloModalFooter="backgroundModal"
        tituloModal="Novo contato"
        conteudoModal={
          <>
            <div className="form">
              <div className="container-form">
                <form>
                  <div className="form-group">
                    <div className="form-row">
                      <label className="col-form-label">Código:</label>
                      <input
                        value={contatoId}
                        type="text"
                        className="form-control-plaintext input-codigo"
                        id="form-contato-id"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-xl-4 div-tipo-contato">
                        <label>Tipo de contato</label>
                        <select
                          id="select-tipo-cadastro"
                          className="form-control"
                          value={tipoContato}
                          name="tipoContato"
                          onChange={(event) => tipoContatoSeleciondo(event)}
                        >
                          {tipoContato != undefined ? (
                            ""
                          ) : (
                            <>
                              {" "}
                              <option value="naoSelecionado">
                                Escolher...
                              </option>
                            </>
                          )}

                          <option value="celular">Celular</option>
                          <option value="telefone">Telefone</option>
                          <option value="email">Email</option>
                        </select>
                      </div>
                      <div className="col-xl-8">
                        <label>Contato</label>
                        <input
                          value={contato}
                          disabled={tipoContato != undefined ? false : email}
                          type="text"
                          name="contato"
                          className="form-control"
                          id="form-contato"
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-4">
                        <label>DDD</label>
                        <input
                          value={ddd}
                          disabled={
                            contatoId != null &&
                            (tipoContato == "telefone" ||
                              tipoContato == "celular")
                              ? false
                              : celular
                          }
                          name="ddd"
                          type="text"
                          id="form-ddd"
                          className="form-control"
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                      <div className="col-4">
                        <label>Ramal</label>
                        <input
                          value={ramal}
                          disabled={
                            contatoId != null && tipoContato == "telefone"
                              ? false
                              : telefone
                          }
                          name="ramal"
                          type="text"
                          id="form-ramal"
                          className="form-control"
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                      <div className="col-4 input-padrao">
                        <label>Padrão</label>
                        <input
                          checked={contatoPadrao}
                          disabled={tipoContato != undefined ? false : email}
                          name="contatoPadrao"
                          type="checkbox"
                          id="form-contato-padrao"
                          defaultValue={false}
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
