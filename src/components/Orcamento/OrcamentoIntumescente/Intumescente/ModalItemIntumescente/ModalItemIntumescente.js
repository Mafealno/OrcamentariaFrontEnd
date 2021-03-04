/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import "./ModalItemIntumescente.css";
import ModalControl from "../../../../ModalControl/ModalControl";
import ResultSearchPerfil from "./ResultSearchPerfil/ResultSearchPerfil";
import ToastControl from "../../../../ToastControl/ToastControl";
import ModalConfirm from "../../../../ModalConfirm/ModalConfirm";
import * as validacaoDadosUtils from "../../../../../utils/validacaoDados";
import * as intumescenteUtils from "../../../../../utils/intumescente";

import { connect } from 'react-redux';

function ModalItemIntumescente(props) {
    let dadosCampo = { ...validacaoDadosUtils.dadosCampo };    

    let [stringBuscaPerfil, setStringBuscaPerfil] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [referenciaDisplay, setReferencia] = useState([]);
    const [showResultadoPerfil, setShowResultadoPerfil] = useState(false);
    const [dataPerfil, setDataPerfil] = useState([]);
    const [dadosCadastro, setDadosCadastro] = useState({
        orcamentoId: { ...dadosCampo, valorPadrao: 0 },
        itensOrcamentoId: { ...dadosCampo, valorPadrao: 0 },
        numeroLinha: { ...dadosCampo, valorPadrao: 0 },
        valorComprimento: {...dadosCampo, requerido: true },
        area: { ...dadosCampo, requerido: true },
        referencia: { ...dadosCampo, requerido: true, valorPadrao: "" },
        numeroFaces: { ...dadosCampo, requerido: true },
        valorHp: { ...dadosCampo, requerido: true },
        valorHpA: { ...dadosCampo, requerido: true },
        valorWD: { ...dadosCampo, requerido: true },
        qtde: { ...dadosCampo, requerido: true },
        valorEspessura: { ...dadosCampo, requerido: true },
        qtdeLitros: { ...dadosCampo, requerido: true },
      });

      const [dadosCadastroPerfil, setDadosCadastroPerfil] = useState({
        perfilId: { ...dadosCampo, requerido: true },
        nomePerfil: { ...dadosCampo },
        valorD: { ...dadosCampo },
        valorBf: {...dadosCampo },
        valorTw: { ...dadosCampo },
        valorTf: { ...dadosCampo },
        valorKgM: { ...dadosCampo },
        tipoPerfil: { ...dadosCampo },
      });

      const [dadosCadastroCartaCobertura, setDadosCadastroCartaCobertura] = useState({
        cartaCoberturaId: { ...dadosCampo, valorPadrao: 0 },
        referencia: { ...dadosCampo, valorPadrao: 0 },
        materialId: { ...dadosCampo, valorPadrao: 0 },
        itensCartaCoberturaId: {...dadosCampo, valorPadrao: 0 },
        valorHpA: {...dadosCampo, valorPadrao: 0 },
      });

      let [configToast, setConfigToast] = useState({
        estiloToast: "",
        estiloToastHeader: "",
        estiloToastBody: "",
        delayToast: 0,
        autoHideToast: false,
        hideToastHeader: true,
        conteudoHeader: "",
        conteudoBody: "",
        closeToast: {},
      });

      useEffect(() => {
        
        if(props.show && props.dados){
          setDadosCadastro({
            orcamentoId: { ...dadosCadastro.orcamentoId, valor: props.orcamentoSelecionado.ORCAMENTO_ID },
            itensOrcamentoId: { ...dadosCadastro.itensOrcamentoId, valor: props.dados.ITENS_ORCAMENTO_ID },
            numeroLinha: { ...dadosCadastro.numeroLinha, valor: props.dados.NUMERO_LINHA },
            valorComprimento: {...dadosCadastro.valorComprimento, valor: props.dados.VALOR_COMPRIMENTO },
            area: { ...dadosCadastro.area, valor: parseFloat(props.dados.AREA.toFixed(2)) },
            referencia: { ...dadosCadastro.referencia, valor: props.dados.REFERENCIA },
            numeroFaces: { ...dadosCadastro.numeroFaces, valor: props.dados.NUMERO_FACES },
            valorHp: { ...dadosCadastro.valorHp, valor: parseFloat(props.dados.VALOR_HP.toFixed(2)) },
            valorHpA: { ...dadosCadastro.valorHpA, valor: parseFloat(props.dados.VALOR_HP_A.toFixed(2)) },
            valorWD: { ...dadosCadastro.valorWD, valor: parseFloat(props.dados.VALOR_WD.toFixed(2)) },
            qtde: { ...dadosCadastro.qtde, valor: props.dados.QTDE },
            valorEspessura: { ...dadosCadastro.valorEspessura, valor: props.dados.VALOR_ESPESSURA },
            qtdeLitros: { ...dadosCadastro.qtdeLitros, valor: parseFloat(props.dados.QTDE_LITROS.toFixed(2)) },
          })
  
          setDadosCadastroPerfil({
            perfilId: { ...dadosCadastroPerfil.perfilId, valor: props.dados.PERFIL.PERFIL_ID },
            nomePerfil: { ...dadosCadastroPerfil.nomePerfil, valor: props.dados.PERFIL.NOME_PERFIL },
            valorD: { ...dadosCadastroPerfil.valorD, valor: props.dados.PERFIL.VALOR_D },
            valorBf: {...dadosCadastroPerfil.valorBf, valor: props.dados.PERFIL.VALOR_BF },
            valorTw: { ...dadosCadastroPerfil.valorTw, valor: props.dados.PERFIL.VALOR_TW },
            valorTf: { ...dadosCadastroPerfil.valorTf , valor: props.dados.PERFIL.VALOR_TF },
            valorKgM: { ...dadosCadastroPerfil.valorKgM , valor: props.dados.PERFIL.VALOR_KG_M },
            tipoPerfil: { ...dadosCadastroPerfil.tipoPerfil, valor: props.dados.PERFIL.TIPO_PERFIL },
          })
  
          setDadosCadastroCartaCobertura({
             cartaCoberturaId: { ...dadosCadastroCartaCobertura.cartaCoberturaId, valor: props.dados.CARTA_COBERTURA.CARTA_COBERTURA_ID },
             referencia: { ...dadosCadastroCartaCobertura.referencia, valor: props.dados.CARTA_COBERTURA.REFERENCIA },
             materialId: { ...dadosCadastroCartaCobertura.materialId, valor: props.dados.CARTA_COBERTURA.MATERIAL.MATERIAL_ID },
             itensCartaCoberturaId: {...dadosCadastroCartaCobertura.itensCartaCoberturaId, valor: [] },
             valorHpA: {...dadosCadastroCartaCobertura.valorHpA, valor: "" },
          })
        }else{
          limparCampos();
        }

      }, [props.show])

      useEffect(() => {
          setReferencia(intumescenteUtils.listReferencia.map((item) => {
            if(item == "naoSelecionado"){
                return <option value={item.substring(2, item.length)}>Não selecionado</option>
            }else{
                return <option value={item}>{item}</option>
            }
          }))
      }, []);

       useEffect(() => {

          if(props.orcamentoSelecionado.PRODUTO && dadosCadastro.valorHpA.valor 
            && (dadosCadastro.referencia.valor || dadosCadastro.referencia.valor != "naoSelecionado")
            && props.orcamentoSelecionado.TEMPO_RESISTENCIA_FOGO && props.show){
            const material  = props.orcamentoSelecionado.PRODUTO
            const trrf = props.orcamentoSelecionado.TEMPO_RESISTENCIA_FOGO;

            const caminho = "/cartaCobertura/buscar/" + material.MATERIAL_ID + "/" + dadosCadastro.referencia.valor 
            + "/" + dadosCadastro.valorHpA.valor + "/" + trrf

            fetch(props.linkBackEnd + caminho, {
              method: "GET",
            })
              .then((response) => response.json())
              .then((data) => {
                if(data.CARTA_COBERTURA_ID){
                  setDadosCadastroCartaCobertura({
                    ...dadosCadastroCartaCobertura,
                     cartaCoberturaId: { ...dadosCadastroCartaCobertura.cartaCoberturaId, valor: data.CARTA_COBERTURA_ID },
                     referencia: { ...dadosCadastroCartaCobertura.referencia, valor: data.REFERENCIA },
                     materialId: { ...dadosCadastroCartaCobertura.materialId, valor: data.MATERIAL.MATERIAL_ID },
                     itensCartaCoberturaId: {...dadosCadastroCartaCobertura.itensCartaCoberturaId, valor: data.LIST_ITENS_CARTA_COBERTURA[0] ? data.LIST_ITENS_CARTA_COBERTURA[0].ITENS_CARTA_COBERTURA_ID : 0 },
                     valorHpA: {...dadosCadastroCartaCobertura.valorHpA, valor: data.LIST_ITENS_CARTA_COBERTURA[0] ? data.LIST_ITENS_CARTA_COBERTURA[0].VALOR_HP_A : 0},
                  })

                  setDadosCadastro({
                    ...dadosCadastro,
                    valorEspessura: {...dadosCadastro.valorEspessura, valor: data.LIST_ITENS_CARTA_COBERTURA[0] ? data.LIST_ITENS_CARTA_COBERTURA[0].VALOR_ESPESSURA : 0 },
                  })
                }else{
                  setDadosCadastroCartaCobertura({
                    ...dadosCadastroCartaCobertura,
                     cartaCoberturaId: { ...dadosCadastroCartaCobertura.cartaCoberturaId, valor: 0 },
                     referencia: { ...dadosCadastroCartaCobertura.referencia, valor: "" },
                     materialId: { ...dadosCadastroCartaCobertura.materialId, valor: 0 },
                     itensCartaCoberturaId: {...dadosCadastroCartaCobertura.itensCartaCoberturaId, valor: 0 },
                     valorHpA: {...dadosCadastroCartaCobertura.valorHpA, valor: "" },
                  })

                  setDadosCadastro({
                    ...dadosCadastro,
                    valorEspessura: {...dadosCadastroCartaCobertura.valorEspessura, valor: "Não encontrado" },
                  })
                }
              });
          }
        }, [dadosCadastro.referencia.valor, 
          dadosCadastroPerfil.perfilId.valor,
          dadosCadastro.valorHpA.valor]);

      const calcularValores = () => {

        document.getElementById("campo-valorHp").classList.remove("is-invalid");
        document.getElementById("campo-valorWD").classList.remove("is-invalid");
        document.getElementById("campo-valorHpA").classList.remove("is-invalid");
        document.getElementById("campo-area").classList.remove("is-invalid");
        document.getElementById("campo-valorEspessura").classList.remove("is-invalid");
        document.getElementById("campo-qtdeLitros").classList.remove("is-invalid");

        if(dadosCadastro.valorComprimento.valor && dadosCadastro.qtde.valor && dadosCadastro.numeroFaces.valor 
          && dadosCadastroPerfil.perfilId.valor){
            
            const itemIntumescente = {
              VALOR_COMPRIMENTO: dadosCadastro.valorComprimento.valor,
              QTDE: dadosCadastro.qtde.valor,
              NUMERO_FACES: dadosCadastro.numeroFaces.valor,
            }
    
            const perfil = {
              VALOR_D: dadosCadastroPerfil.valorD.valor,
              VALOR_BF: dadosCadastroPerfil.valorBf.valor,
              VALOR_KG_M: dadosCadastroPerfil.valorKgM.valor,
            }
    
            const valoresCalculados = intumescenteUtils.calcularValoresItemIntumescente(itemIntumescente, perfil, dadosCadastro.valorEspessura.valor);
    
            setDadosCadastro({
              ...dadosCadastro,
              valorHp: { ...dadosCadastro.valorHp, valor: valoresCalculados.Hp },
              valorHpA: { ...dadosCadastro.valorHpA, valor: valoresCalculados.HpA },
              valorWD: { ...dadosCadastro.valorWD, valor: valoresCalculados.WD },
              qtdeLitros: { ...dadosCadastro.valorHp, valor: valoresCalculados.TotalLitros },
              area: { ...dadosCadastro.area, valor: valoresCalculados.Area },
            })
          }else{
            exibirTost("erro", "Preencha todos os campos para calcular")
            setDadosCadastro({
              ...dadosCadastro,
              valorHp: { ...dadosCadastro.valorHp, valor: "" },
              valorHpA: { ...dadosCadastro.valorHpA, valor: "" },
              valorWD: { ...dadosCadastro.valorWD, valor: "" },
              qtdeLitros: { ...dadosCadastro.valorHp, valor: "" },
              area: { ...dadosCadastro.area, valor: "" },
              valorEspessura : { ...dadosCadastro.valorEspessura, valor: "" },
            })
          }
      }

      const selecionarPerfilItemOrcamentoIntumescente = (perfil) => {
          setDadosCadastroPerfil({
            ...dadosCadastroPerfil,
            perfilId: { ...dadosCadastroPerfil.perfilId, valor: perfil.PERFIL_ID },
            nomePerfil: { ...dadosCadastroPerfil.nomePerfil, valor: perfil.NOME_PERFIL },
            valorD: { ...dadosCadastroPerfil.valorD, valor: perfil.VALOR_D },
            valorBf: {...dadosCadastroPerfil.valorBf, valor: perfil.VALOR_BF },
            valorTw: { ...dadosCadastroPerfil.valorTw, valor: perfil.VALOR_TW },
            valorTf: { ...dadosCadastroPerfil.valorTf , valor: perfil.VALOR_TF },
            valorKgM: { ...dadosCadastroPerfil.valorKgM , valor: perfil.VALOR_KG_M },
            tipoPerfil: { ...dadosCadastroPerfil.tipoPerfil, valor: perfil.TIPO_PERFIL },
          })
      }

      const buscarPerfil = () => {
        if (showResultadoPerfil) {
            return;
          }
          if (!stringBuscaPerfil) {
            fetch(props.linkBackEnd + "/perfil/", {
              method: "GET",
            })
              .then((response) => response.json())
              .then((data) => {
                setDataPerfil(data);
                setShowResultadoPerfil(true);
              });
          } else {
                stringBuscaPerfil = "buscar?nomePerfil=" + stringBuscaPerfil;
            fetch(props.linkBackEnd + "/perfil/" + stringBuscaPerfil, {
              method: "GET",
            })
              .then((response) => response.json())
              .then((data) => {
                setDataPerfil(data);
                setShowResultadoPerfil(true);
              });
          }
      }

      const montarObj = (obj) => {
        return {
          ITENS_ORCAMENTO_ID: dadosCadastro.itensOrcamentoId.valor || 0,
          ORCAMENTO_ID: props.orcamentoSelecionado.ORCAMENTO_ID,
          NUMERO_LINHA: parseInt(obj.numeroLinha.valor),
          VALOR_COMPRIMENTO: parseFloat(obj.valorComprimento.valor),
          AREA: parseFloat(obj.area.valor),
          REFERENCIA: obj.referencia.valor,
          NUMERO_FACES: parseInt(obj.numeroFaces.valor),
          VALOR_HP: parseFloat(obj.valorHp.valor),
          VALOR_HP_A: parseFloat(obj.valorHpA.valor),
          VALOR_WD: parseFloat(obj.valorWD.valor),
          QTDE: parseInt(obj.qtde.valor),
          VALOR_ESPESSURA: parseFloat(obj.valorEspessura.valor),
          QTDE_LITROS: parseFloat(obj.qtdeLitros.valor),
          PERFIL : {
            PERFIL_ID: parseInt(obj.perfil.perfilId.valor),
            NOME_PERFIL: obj.perfil.nomePerfil.valor,
            VALOR_D: parseFloat(obj.perfil.valorD.valor),
            VALOR_BF: parseFloat(obj.perfil.valorBf.valor),
            VALOR_TW: parseFloat(obj.perfil.valorTw.valor),
            VALOR_TF: parseFloat(obj.perfil.valorTf.valor),
            VALOR_KG_M: parseFloat(obj.perfil.valorKgM.valor),
            TIPO_PERFIL: obj.perfil.tipoPerfil.valor,
          },
          CARTA_COBERTURA: {
            CARTA_COBERTURA_ID: parseInt(obj.cartaCobertura.cartaCoberturaId.valor),
            REFERENCIA: "",
            MATERIAL: {},
            LIST_ITENS_CARTA_COBERTURA: [],
          }
        }
      }

      const fazerAposCadastrar = (objCadastrado) => {
        setDadosCadastro({
          ...dadosCadastro,
          itensOrcamentoId: {
            ...dadosCadastro.itensOrcamentoId,
            valor: objCadastrado.ITENS_ORCAMENTO_ID,
          },
          numeroLinha: {
            ...dadosCadastro.numeroLinha,
            valor: objCadastrado.NUMERO_LINHA,
          },
        });
      };

      const salvarItemOrcamentoIntumescente = () => {
        const dadosItemOrcamentoIntumescente = validacaoDadosUtils.validarDados(dadosCadastro);
        const dadosPerfilItemOrcamentoIntumescente = validacaoDadosUtils.validarDados(dadosCadastroPerfil);
        
        let houveErro = false;
        
        houveErro = exibirCamposErro(dadosItemOrcamentoIntumescente, houveErro);
        houveErro = exibirCamposErro(dadosPerfilItemOrcamentoIntumescente, houveErro);

        if (houveErro) {
          const msgErro = "Houveram erros na validação dos campos";
          exibirTost("erro", msgErro);
          return;
        }
    
        dadosItemOrcamentoIntumescente.perfil = dadosPerfilItemOrcamentoIntumescente;
        dadosItemOrcamentoIntumescente.cartaCobertura = dadosCadastroCartaCobertura;
    
        props.salvarItemOrcamentoIntumescente(montarObj(dadosItemOrcamentoIntumescente), fazerAposCadastrar);
      };


      const atualizarItemOrcamentoIntumescente = () => {
        const dadosItemOrcamentoIntumescente = validacaoDadosUtils.validarDados(dadosCadastro);
        const dadosPerfilItemOrcamentoIntumescente = validacaoDadosUtils.validarDados(dadosCadastroPerfil);
        
        let houveErro = false;
        
        houveErro = exibirCamposErro(dadosItemOrcamentoIntumescente, houveErro);
        houveErro = exibirCamposErro(dadosPerfilItemOrcamentoIntumescente, houveErro);

        if (houveErro) {
          const msgErro = "Houveram erros na validação dos campos";
          exibirTost("erro", msgErro);
          return;
        }
    
        dadosItemOrcamentoIntumescente.perfil = dadosPerfilItemOrcamentoIntumescente;
        dadosItemOrcamentoIntumescente.cartaCobertura = dadosCadastroCartaCobertura;
    
        props.atualizarItemOrcamentoIntumescente(montarObj(dadosItemOrcamentoIntumescente));
      };

      const exibirTost = (tipo, mensagem) => {
        switch (tipo) {
          case "sucesso":
            setConfigToast({
              estiloToast: "",
              estiloToastHeader: "estiloToastSucesso",
              estiloToastBody: "estiloToastSucesso",
              delayToast: 3000,
              autoHideToast: true,
              hideToastHeader: false,
              conteudoHeader: "",
              conteudoBody: mensagem,
              closeToast: () => setShowToast(),
            });
            setShowToast(true);
            break;
          case "erro":
            setConfigToast({
              estiloToast: "",
              estiloToastHeader: "estiloToastErro",
              estiloToastBody: "estiloToastErro",
              delayToast: 6000,
              autoHideToast: true,
              hideToastHeader: false,
              conteudoHeader: "",
              conteudoBody: mensagem,
              closeToast: () => setShowToast(),
            });
            setShowToast(true);
            break;
          default:
            break;
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

      const limparCampos = () => {

        setStringBuscaPerfil("");

        setDadosCadastro({
          orcamentoId: { ...dadosCadastro.orcamentoId, valor: 0 },
          itensOrcamentoId: { ...dadosCadastro.itensOrcamentoId, valor: 0 },
          numeroLinha: { ...dadosCadastro.numeroLinha, valor: 0 },
          valorComprimento: {...dadosCadastro.valorComprimento, valor: ""},
          area: { ...dadosCadastro.area, valor: "" },
          referencia: { ...dadosCadastro.referencia, valor: "" },
          numeroFaces: { ...dadosCadastro.numeroFaces, valor: "" },
          valorHp: { ...dadosCadastro.valorHp, valor: "" },
          valorHpA: { ...dadosCadastro.valorHpA, valor: "" },
          valorWD: { ...dadosCadastro.valorWD, valor: "" },
          qtde: { ...dadosCadastro.qtde, valor: "" },
          valorEspessura: { ...dadosCadastro.valorEspessura, valor: "" },
          qtdeLitros: { ...dadosCadastro.qtdeLitros, valor: "" },
        })

        setDadosCadastroPerfil({
          perfilId: { ...dadosCadastroPerfil.perfilId, valor: 0 },
          nomePerfil: { ...dadosCadastroPerfil.nomePerfil, valor: "" },
          valorD: { ...dadosCadastroPerfil.valorD, valor: ""},
          valorBf: {...dadosCadastroPerfil.valorBf, valor: "" },
          valorTw: { ...dadosCadastroPerfil.valorTw, valor: "" },
          valorTf: { ...dadosCadastroPerfil.valorTf , valor: "" },
          valorKgM: { ...dadosCadastroPerfil.valorKgM , valor: "" },
          tipoPerfil: { ...dadosCadastroPerfil.tipoPerfil, valor: "" },
        })

        setDadosCadastroCartaCobertura({
           cartaCoberturaId: { ...dadosCadastroCartaCobertura.cartaCoberturaId, valor: 0 },
           referencia: { ...dadosCadastroCartaCobertura.referencia, valor: "" },
           materialId: { ...dadosCadastroCartaCobertura.materialId, valor: 0 },
           itensCartaCoberturaId: {...dadosCadastroCartaCobertura.itensCartaCoberturaId, valor: 0 },
           valorHpA: {...dadosCadastroCartaCobertura.valorHpA, valor: "" },
        })
      }

      const pressEnter = (event) => {
        if (event.key == "Enter") {
          buscarPerfil();
        }
      };

      const listenerClick = () => {
        setShowResultadoPerfil(false);
      };
    
      if (showResultadoPerfil) {
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
        <>
      <ModalControl
        {...props}
        estiloModalHeader="backgroundModal tituloModal"
        estiloModalBody="backgroundModal modal-body-item-orcamento-geral"
        estiloModalFooter="backgroundModal"
        tituloModal="Informações do item"
        conteudoBody={
          <>
            <div className="form form-modal-item-orcamento-geral">
              <div className="container-form">
                <div className="form-group">
                  <div className="form-row">
                    <div className="col">
                        <label>Linha:</label>
                        <input
                        type="text"
                        value={dadosCadastro.numeroLinha.valor || ""}
                        id="campo-orcamentoId"
                        className="form-control-plaintext input-numero-linha"
                        readOnly
                        />
                        <span className="invalid-feedback" id="erro-numeroLinha"></span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-lg-6 col-12">
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col">
                                    <label>Referência</label>
                                    <select
                                        type="text"
                                        className="form-control"
                                        name="referencia"
                                        id="campo-referencia"
                                        value={dadosCadastro.referencia.valor}
                                        onChange={(event) => handleInputChange(event)}
                                        onFocus={(event) => removerErro(event.target.id)}
                                    >
                                        {referenciaDisplay}
                                    </select>
                                    <span className="invalid-feedback" id="erro-referencia"></span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col">
                                    <label>Faces</label>
                                    <input 
                                        type="number"
                                        name="numeroFaces"
                                        className="form-control"
                                        id="campo-numeroFaces"
                                        value={dadosCadastro.numeroFaces.valor} 
                                        onChange={(event) => handleInputChange(event)}
                                        onFocus={(event) => removerErro(event.target.id)}/>
                                    <span className="invalid-feedback" id="erro-numeroFaces"></span>
                                </div>
                                <div className="col">
                                    <label>Quantidade</label>
                                    <input 
                                        type="text"
                                        name="qtde"
                                        className="form-control"
                                        id="campo-qtde"
                                        value={dadosCadastro.qtde.valor} 
                                        onChange={(event) => handleInputChange(event)}
                                        onFocus={(event) => removerErro(event.target.id)}/>
                                    <span className="invalid-feedback" id="erro-qtde"></span>
                                </div>
                                <div className="col">
                                    <label>Comprimento</label>
                                    <input 
                                        type="text"
                                        name="valorComprimento"
                                        className="form-control"
                                        id="campo-valorComprimento"
                                        value={dadosCadastro.valorComprimento.valor} 
                                        onChange={(event) => handleInputChange(event)}
                                        onFocus={(event) => removerErro(event.target.id)}/>
                                    <span className="invalid-feedback" id="erro-valorComprimento"></span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group col-mobile-esconder">
                            <div className="form-row">
                              <div className="col-12" id="margin-top-button-calcular-modal-item-intumescente">
                                <button type="button" className="btn btn-orcamentaria w-100-pc" onClick={()=> calcularValores()}>Calcular</button>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <fieldset id="campo-perfilId" className="fieldset-perfil-modal-item-intumescente">
                            <div id="container-search-perfil-modal-orcamento-intumescente">
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-12">
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="search-perfil-modal-itens-intumescente"
                                            name="stringPesquisa"
                                            placeholder="Buscar perfil"
                                            value={stringBuscaPerfil}
                                            onKeyDown={(event) => pressEnter(event)}
                                            onChange={(event) => setStringBuscaPerfil(event.target.value)}
                                            onFocus={() => removerErro("campo-perfilId")}
                                            />
                                        </div> 
                                    </div>
                                </div>
                                <div className="form-group mb-0">
                                    <div className="row">
                                        <div className="col position-initial">
                                            <ResultSearchPerfil
                                            show={showResultadoPerfil}
                                            resultados={dataPerfil}
                                            selecionarPerfilItemOrcamentoIntumescente={(perfil) => selecionarPerfilItemOrcamentoIntumescente(perfil)}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-12">
                                        <label>Perfil</label>
                                        <input 
                                            type="text"
                                            name="nomePerfil"
                                            className="form-control"
                                            id="campo-nomePerfil"
                                            value={dadosCadastroPerfil.nomePerfil.valor} 
                                            readOnly/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-lg col-4">
                                        <label>D</label>
                                        <input 
                                            type="text"
                                            name="valorD"
                                            className="form-control"
                                            id="campo-valorD"
                                            value={dadosCadastroPerfil.valorD.valor} 
                                            readOnly/>
                                        <span className="invalid-feedback" id="erro-valorD"></span>
                                    </div>
                                    <div className="col-lg col-4">
                                        <label>BF</label>
                                        <input 
                                            type="text"
                                            name="valorBf"
                                            className="form-control"
                                            id="campo-valorBf"
                                            value={dadosCadastroPerfil.valorBf.valor} 
                                            readOnly/>
                                        <span className="invalid-feedback" id="erro-valorBf"></span>
                                    </div>
                                    <div className="col-lg col-4">
                                        <label>TW</label>
                                        <input 
                                            type="text"
                                            name="valorTw"
                                            className="form-control"
                                            id="campo-valorTw"
                                            value={dadosCadastroPerfil.valorTw.valor}
                                            onChange={(event) => "#"}
                                            onFocus={(event) => "#"} 
                                            readOnly/>
                                        <span className="invalid-feedback" id="erro-valorTw"></span>
                                    </div>
                                    <div className="col-lg col-6">
                                        <label>TF</label>
                                        <input 
                                            type="text"
                                            name="valorTf"
                                            className="form-control"
                                            id="campo-valorTf"
                                            value={dadosCadastroPerfil.valorTf.valor} 
                                            readOnly/>
                                        <span className="invalid-feedback" id="erro-valorTf"></span>
                                    </div>
                                    <div className="col-lg col-6">
                                        <label>KG/M</label>
                                        <input 
                                            type="text"
                                            name="valorKgM"
                                            className="form-control"
                                            id="campo-valorKgM"
                                            value={dadosCadastroPerfil.valorKgM.valor} 
                                            readOnly/>
                                        <span className="invalid-feedback" id="erro-valorKgM"></span>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <span className="invalid-feedback" id="erro-perfilId"></span>
                    </div>
                  </div>
                </div>
                <div className="form-group col-laptop-esconder">
                    <div className="form-row">
                      <div className="col-12" id="margin-top-button-calcular-modal-item-intumescente">
                        <button type="button" className="btn btn-orcamentaria w-100-pc" onClick={()=> calcularValores()}>Calcular</button>
                      </div>
                    </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col">
                        <label>HP (m)</label>
                        <input 
                            type="text"
                            name="valorHp"
                            className="form-control"
                            id="campo-valorHp"
                            value={dadosCadastro.valorHp.valor} 
                            readOnly/>
                        <span className="invalid-feedback" id="erro-valorHp"></span>
                    </div>
                    <div className="col">
                        <label>W/D</label>
                        <input 
                            type="text"
                            name="valorWD"
                            className="form-control"
                            id="campo-valorWD"
                            value={dadosCadastro.valorWD.valor} 
                            readOnly/>
                        <span className="invalid-feedback" id="erro-valorWD"></span>
                    </div>
                    <div className="col">
                        <label>HP/A (m-1)</label>
                        <input 
                            type="text"
                            name="valorHpA"
                            className="form-control"
                            id="campo-valorHpA"
                            value={dadosCadastro.valorHpA.valor}
                            readOnly/>
                        <span className="invalid-feedback" id="erro-valorHpA"></span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                  <div className="col">
                        <label>Área</label>
                        <div className="input-group mb-5 position-initial">
                          <input 
                              type="text"
                              name="area"
                              className="form-control"
                              id="campo-area"
                              value={dadosCadastro.area.valor} 
                              readOnly/>
                            <div className="input-group-append">
                                <span className="input-group-text">m²</span>
                            </div>
                        </div>
                        <span className="invalid-feedback" id="erro-area"></span>
                    </div>
                    <div className="col">
                        <label>Espessura</label>
                        <div className="input-group mb-5 position-initial">
                          <input 
                              type="text"
                              name="valorEspessura"
                              className="form-control"
                              id="campo-valorEspessura"
                              value={dadosCadastro.valorEspessura.valor} 
                              readOnly/>
                              <div className="input-group-append">
                                  <span className="input-group-text">mm</span>
                              </div>
                          </div>
                        <span className="invalid-feedback" id="erro-valorEspessura"></span>
                    </div>
                    <div className="col-lg col-12">
                        <label>Total de Litros</label>
                        <input 
                            type="text"
                            name="qtdeLitros"
                            className="form-control"
                            id="campo-qtdeLitros"
                            value={dadosCadastro.qtdeLitros.valor}
                            readOnly/>
                        <span className="invalid-feedback" id="erro-qtdeLitros"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        conteudoFooter={
          <>
            {!dadosCadastro.itensOrcamentoId.valor && (
              <div>
                <button
                  type="submit"
                  className="btn btn-primary btn-100-px"
                  onClick={() => salvarItemOrcamentoIntumescente()}
                >
                  Salvar
                </button>
              </div>
            )}
            {dadosCadastro.itensOrcamentoId.valor > 0 && (
              <div>
                <button
                  onClick={() => setShowModalConfirm(true)}
                  className="btn btn-orcamentaria btn-100-px"
                >
                  Excluir
                </button>
                <button
                  type="submit"
                  onClick={() => atualizarItemOrcamentoIntumescente()}
                  className="btn btn-success btn-100-px"
                >
                  Atualizar
                </button>
              </div>
            )}
          </>
        } 
      />
      <div>
        <ToastControl
          showToast={showToast}
          closeToast={configToast.closeToast}
          delayToast={configToast.delayToast}
          autoHideToast={configToast.autoHideToast}
          estiloToastHeader={configToast.estiloToastHeader}
          estiloToastBody={configToast.estiloToastBody}
          hideToastHeader={configToast.hideToastHeader}
          conteudoHeader={configToast.conteudoHeader}
          conteudoBody={configToast.conteudoBody}
        ></ToastControl>
      </div>
      <div>
        <ModalConfirm
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          acaoConfirmada={() => props.deletarItemOrcamentoIntumescente(dadosCadastro.itensOrcamentoId.valor)}
          tituloModalConfirm={"Confirma exclusão? O dados não poderão ser recuperados"}
        />
      </div>
    </>
    )
}

const mapStateToProps = (state) => ({
    linkBackEnd: state.backEnd.link,
    orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
  });
  
  const mapDispatchToProps = (dispatch) => ({});
  
  export default connect(mapStateToProps, mapDispatchToProps)(ModalItemIntumescente);
