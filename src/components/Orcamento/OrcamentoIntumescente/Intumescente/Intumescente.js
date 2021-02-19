/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import "./Intumescente.css";
import * as validacaoDadosUtils from "../../../../utils/validacaoDados";
import * as intumescenteUtils from "../../../../utils/intumescente";
import ResultSearchMaterial from "./ResultSearchMaterial/ResultSearchMaterial"
import { connect } from "react-redux";

function Intumescente(props) {

    let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

    const [showResultadoMaterial, setShowResultadoMaterial] = useState(false);
    const [dataMaterial, setDataMaterial] = useState([]);
    const [grupoDisplay, setGrupoDisplay] = useState([]);
    const [ocupacaoUsoDisplay, setOcupacaoUsoDisplay] = useState([]);
    const [divisaoDisplay, setDivisaoDisplay] = useState([]);
    const [trrf, setTrrfDisplay] = useState([]);
    const [stringBuscaMaterial, setStringBuscaMaterial] = useState("");

    const [dadosCadastro, setDadosCadastro] = useState({
        orcamentoId: { ...dadosCampo, valorPadrao: 0 },
        grupo : { ...dadosCampo, requerido: true, valorPadrao: "A"},
        ocupacaoUso: { ...dadosCampo, requerido: true, valorPadrao: "RESIDENCIAL"},
        divisao: { ...dadosCampo, requerido: true, valorPadrao: "1 - HABITAÇÕES UNIFAMILIARES"},
        classe: { ...dadosCampo },
        trrf: { ...dadosCampo, requerido: true, valorPadrao: 30 }
    });

    const [dadosCadastroMaterial, setDadosCadastroMaterial] = useState({
        materialIdOrcamentoIntumescente: { ...dadosCampo, requerido: true },
        nomeMaterial: { ...dadosCampo },
        pessoaId: { ...dadosCampo },
        nomePessoa: { ...dadosCampo },
      });
    
    useEffect(() => {
        
        setGrupoDisplay(intumescenteUtils.listGrupo.map((item) => (<option value={item}>{item}</option>)))
        setOcupacaoUsoDisplay(intumescenteUtils.listOcupacaoUso.map((item) => (<option value={item}>{item}</option>)))
        setDivisaoDisplay(filtrarDivisao(dadosCadastro.grupo.valorPadrao, intumescenteUtils.listDivisao).map((item) => (<option value={item.substring(2, item.length)}>{item.substring(2, item.length)}</option>)))
        setTrrfDisplay(intumescenteUtils.listTrrf.map((item) => (<option value={item}>{item}</option>)))

    }, [])

    useEffect(() => {
        if(dadosCadastro.grupo.valor){
            setDivisaoDisplay(filtrarDivisao(dadosCadastro.grupo.valor, intumescenteUtils.listDivisao).map((item) => (<option value={item.substring(2, item.length)}>{item.substring(2, item.length)}</option>)))
        }
    }, [dadosCadastro.grupo.valor])

    const filtrarDivisao = (grupo, listDivisao) => {
        return listDivisao.filter((item) => item.substring(0, 1) === grupo)
    }

    const selecionarMaterialOrcamentoIntumescente = (material) => {
        setDadosCadastroMaterial({
            materialIdOrcamentoIntumescente: { ...dadosCadastroMaterial, valor: material.MATERIAL_ID },
          nomeMaterial: { ...dadosCadastroMaterial, valor: material.NOME_MATERIAL },
          pessoaId: { ...dadosCadastroMaterial, valor: material.FABRICANTE.PESSOA_ID },
          nomePessoa: { ...dadosCadastroMaterial, valor: material.FABRICANTE.NOME_PESSOA },
        });
    };

    const buscarMaterial = () => {
        if (showResultadoMaterial) {
          return;
        }
        if (!stringBuscaMaterial) {
          fetch(props.linkBackEnd + "/material/", {
            method: "GET",
          })
            .then((response) => response.json())
            .then((data) => {
              setDataMaterial(data);
              setShowResultadoMaterial(true);
            });
        } else {
          if (stringBuscaMaterial.match(/\d/)) {
            stringBuscaMaterial = "buscar?materialId=" + stringBuscaMaterial;
          } else {
            stringBuscaMaterial = "buscar?nomeMaterial=" + stringBuscaMaterial;
          }
    
          fetch(props.linkBackEnd + "/material/" + stringBuscaMaterial, {
            method: "GET",
          })
            .then((response) => response.json())
            .then((data) => {
              setDataMaterial(data);
              setShowResultadoMaterial(true);
            });
        }
      };

      const pressEnter = (event) => {
        if (event.key == "Enter") {
          buscarMaterial();
        }
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

      const listenerClick = () => {
        setShowResultadoMaterial(false);
      };
    
      if (showResultadoMaterial) {
        window.addEventListener("click", listenerClick);
      } else {
        window.removeEventListener("click", listenerClick);
      }

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
            <div id="cadastro-intumescente-basico">
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-6 col-sm-12 position-initial">
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-lg-3 col-sm-2 mb-15 position-initial">
                                        <label>Grupo</label>
                                        <select
                                            id="campo-grupo"
                                            className="form-control"
                                            name="grupo"
                                            value={dadosCadastro.grupo.valor}
                                            onChange={(event) => handleInputChange(event)}
                                            onFocus={(event) => removerErro(event.target.id)} >
                                            {grupoDisplay}
                                        </select>
                                        <span className="invalid-feedback msg-erro-grupo" id="erro-orcamento"></span>
                                    </div>
                                    <div className="col-lg col-sm-10 position-initial">
                                        <label>Ocupação de uso</label>
                                        <select
                                            id="campo-ocupacaoUso"
                                            className="form-control"
                                            name="ocupacaoUso"
                                            value={dadosCadastro.ocupacaoUso.valor}
                                            onChange={(event) => handleInputChange(event)}
                                            onFocus={(event) => removerErro(event.target.id)} >
                                            {ocupacaoUsoDisplay}
                                        </select>
                                        <span className="invalid-feedback msg-erro-ocupacaoUso" id="erro-orcamento"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col position-initial">
                                        <label>Divisão</label>
                                        <select
                                            id="campo-divisao"
                                            className="form-control"
                                            name="divisao"
                                            value={dadosCadastro.divisao.valor}
                                            onChange={(event) => handleInputChange(event)}
                                            onFocus={(event) => removerErro(event.target.id)} >
                                            {divisaoDisplay}
                                        </select>
                                        <span className="invalid-feedback msg-erro-divisao" id="erro-orcamento"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-6 position-initial">
                                        <label>Classe</label>
                                        <div className="input-group mb-5 position-initial">
                                            <input
                                                type="number"
                                                name="classe"
                                                id="campo-classe"
                                                className="form-control position-initial"
                                                value={dadosCadastro.classe.valor}
                                                onChange={(event) => handleInputChange(event)}
                                                onFocus={(event) => removerErro(event.target.id)}/>
                                            <div className="input-group-append">
                                                <span className="input-group-text">m/h</span>
                                            </div>
                                        </div>
                                        <span className="invalid-feedback msg-erro-classe" id="erro-orcamento"></span>
                                    </div>
                                    <div className="col-6 position-initial">
                                        <label>TRRF</label>
                                        <select
                                            id="campo-rttf"
                                            className="form-control"
                                            name="trrf"
                                            value={dadosCadastro.trrf.valor}
                                            onChange={(event) => handleInputChange(event)}
                                            onFocus={(event) => removerErro(event.target.id)} >
                                            {trrf}
                                        </select>
                                        <span className="invalid-feedback msg-erro-trrf" id="erro-orcamento"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="col-lg-6 col-sm-12 position-initial">    
                        <fieldset id="campo-materialIdOrcamentoIntumescente" className="fieldset-search-material-intumescente">
                            <div id="material-aba-intumescente">
                                <div id="search-material">
                                    <div className="form-group">
                                        <div className="form-row espacamento-search-intumescente">
                                            <div className="col position-initial">
                                                <input 
                                                    type="text" 
                                                    name="" 
                                                    className="form-control" 
                                                    placeholder="Buscar material"
                                                    onChange={(event) => setStringBuscaMaterial(event.target.value)}
                                                    onKeyDown={(event) => pressEnter(event)}
                                                    onFocus={() => removerErro("campo-materialIdOrcamentoIntumescente")}/>
                                            </div>
                                            <div className="col-4 d-none d-md-block position-initial">
                                                <button 
                                                    type="button" 
                                                    className="btn btn-orcamentaria w-100-pc" 
                                                    onClick={()=>buscarMaterial()}
                                                    onFocus={() => removerErro("campo-materialIdOrcamentoIntumescente")}
                                                    >Buscar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-0">
                                        <div className="row">
                                            <div className="col position-initial">
                                            <ResultSearchMaterial
                                                show={showResultadoMaterial}
                                                resultados={dataMaterial}
                                                selecionarMaterialOrcamentoIntumescente={(material) => selecionarMaterialOrcamentoIntumescente(material)}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="dados-material-intumescente">
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col-lg-3 col-sm-2 position-initial">
                                                <label className="label-material-intumescente">Código</label>
                                                <input
                                                type="text"
                                                className="form-control"
                                                name="materialIdCartaCobertura"
                                                id="campo-materialIdCartaCobertura"
                                                value={dadosCadastroMaterial.materialIdOrcamentoIntumescente.valor || ""}
                                                readOnly
                                                />
                                            </div>
                                            <div className="col">
                                                <label className="label-material-intumescente">Nome</label>
                                                <input
                                                type="text"
                                                className="form-control"
                                                name="nomeMaterial"
                                                id="campo-nomeMaterial"
                                                value={dadosCadastroMaterial.nomeMaterial.valor}
                                                readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <label>Fabricante</label>
                                                <input
                                                type="text"
                                                className="form-control"
                                                name="nomeMaterial"
                                                id="campo-nomeMaterial"
                                                value={dadosCadastroMaterial.nomeMaterial.valor}
                                                readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
        <div id="cadastro-list-perfil">
                <button
                type="button"
                className="btn"
                //onClick={() => setShowModalMaoObraOrcamento(true)}
                >
                Adicionar perfil
                </button>
            <div id="list-perfil">
                
            </div>
        </div>
        <div id="cadastro-intumescente-avancado"></div>
        <div id="totais-intumescente"></div>
    </div>
    )
}

const mapStateToProps = (state) => ({
    linkBackEnd: state.backEnd.link,
    listItensOrcamentoGeral: state.orcamento.listItensOrcamentoGeral,
    orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
  });
  
  const mapDispatchToProps = (dispatch) => ({});
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Intumescente);