import React, { useState, useEffect } from 'react';
import "./Intumescente.css";
import * as validacaoDadosUtils from "../../../../utils/validacaoDados";
import * as intumescenteUtils from "../../../../utils/intumescente";

function Intumescente() {

    let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

    const [grupo, setGrupo] = useState({
        display: []
    });
    const [ocupacaoUso, setOcupacaoUso] = useState({
        display: []
    });
    const [divisao, setDivisao] = useState({
        display: []
    });

    const [dadosCadastro, setDadosCadastro] = useState({
        orcamentoId: { ...dadosCampo, valorPadrao: 0 },
        grupo : { ...dadosCampo, requerido: true, valorPadrao: "A"},
        ocupacaoUso: { ...dadosCampo, requerido: true, valorPadrao: "RESIDENCIAL"},
        divisao: { ...dadosCampo, requerido: true, valorPadrao: "1 - HABITAÇÕES UNIFAMILIARES"},
        classe: { ...dadosCampo },
    });
    
    useEffect(() => {
        setGrupo({
            display: intumescenteUtils.listGrupo.map((item) => (<option value={item}>{item}</option>))
        })
        setOcupacaoUso({
            display: intumescenteUtils.listOcupacaoUso.map((item) => (<option value={item}>{item}</option>))
        })
        setDivisao({
            display: filtrarDivisao(dadosCadastro.grupo.valorPadrao, intumescenteUtils.listDivisao).map((item) => (<option value={item.substring(2, item.length)}>{item.substring(2, item.length)}</option>))
        })

    }, [])

    useEffect(() => {
        if(dadosCadastro.grupo.valor){
            setDivisao({
                display: filtrarDivisao(dadosCadastro.grupo.valor, intumescenteUtils.listDivisao).map((item) => (<option value={item.substring(2, item.length)}>{item.substring(2, item.length)}</option>))
            })
        }
    }, [dadosCadastro.grupo.valor])

    const filtrarDivisao = (grupo, listDivisao) => {
        return listDivisao.filter((item) => item.substring(0, 1) === grupo)
    }

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
        <div id="containerIntumescente">
            <div id="cadastro-intumescente">
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-1 col-sm-2 position-initial">
                            <label>Grupo</label>
                            <select
                                id="campo-grupo"
                                className="form-control"
                                name="grupo"
                                value={dadosCadastro.grupo.valor}
                                onChange={(event) => handleInputChange(event)}
                                onFocus={(event) => removerErro(event.target.id)} >
                                {grupo.display}
                            </select>
                            <span className="invalid-feedback msg-erro-grupo" id="erro-orcamento"></span>
                        </div>
                        <div className="col-lg-3 col-sm-10 position-initial">
                            <label>Ocupação de uso</label>
                            <select
                                id="campo-ocupacaoUso"
                                className="form-control"
                                name="ocupacaoUso"
                                value={dadosCadastro.ocupacaoUso.valor}
                                onChange={(event) => handleInputChange(event)}
                                onFocus={(event) => removerErro(event.target.id)} >
                                {ocupacaoUso.display}
                            </select>
                            <span className="invalid-feedback msg-erro-ocupacaoUso" id="erro-orcamento"></span>
                        </div>
                        <div className="col-lg col-sm-12 position-initial">
                            <label>Divisão</label>
                            <select
                                id="campo-divisao"
                                className="form-control"
                                name="divisao"
                                value={dadosCadastro.divisao.valor}
                                onChange={(event) => handleInputChange(event)}
                                onFocus={(event) => removerErro(event.target.id)} >
                                {divisao.display}
                            </select>
                            <span className="invalid-feedback msg-erro-divisao" id="erro-orcamento"></span>
                        </div>
                        <div className="col-lg-2 col-sm-12 position-initial">
                            <label>Classe</label>
                            <div className="input-group mb-5">
                                <input
                                    type="number"
                                    name="classe"
                                    id="campo-classe"
                                    className="form-control"
                                    value={dadosCadastro.classe.valor}
                                    onChange={(event) => handleInputChange(event)}
                                    onFocus={(event) => removerErro(event.target.id)}/>
                                    <div class="input-group-append">
                                        <span class="input-group-text">m/h</span>
                                </div>
                                </div>
                            <span className="invalid-feedback msg-erro-classe" id="erro-orcamento"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="cadastro-list-perfil">
            </div>
            <div id="totais-intumescente">
            </div>
        </div>
    )
}

export default Intumescente