/* eslint-disable no-unused-expressions */
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
import ModalItemIntumescente from "./ModalItemIntumescente/ModalItemIntumescente";
import ItemOrcamentoIntumescente from "./ItemOrcamentoIntumescente/ItemOrcamentoIntumescente";
import ToastControl from "../../../ToastControl/ToastControl";
import * as orcamentoActions from "../../../../store/actions/orcamento";
import { connect } from "react-redux";

function Intumescente(props) {

    let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

    const [showResultadoMaterial, setShowResultadoMaterial] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showModalItemIntumescente, setShowModalItemIntumescente] = useState(false);
    const [itensOrcamentoIntumescenteValoresAtualizados, setItensOrcamentoIntumescenteValoresAtualizados] = useState([]);
    const [dataMaterial, setDataMaterial] = useState([]);
    const [grupoDisplay, setGrupoDisplay] = useState([]);
    const [ocupacaoUsoDisplay, setOcupacaoUsoDisplay] = useState([]);
    const [divisaoDisplay, setDivisaoDisplay] = useState([]);
    const [trrf, setTrrfDisplay] = useState([]);
    const [itensOrcamentoIntumescenteDisplay, setItensOrcamentoIntumescenteDisplay] = useState([]);
    const [stringBuscaMaterial, setStringBuscaMaterial] = useState("");

    const [dadosCadastro, setDadosCadastro] = useState({
        orcamentoId: { ...dadosCampo, valorPadrao: 0 },
        grupo : { ...dadosCampo, requerido: true, valorPadrao: "A"},
        ocupacaoUso: { ...dadosCampo, requerido: true, valorPadrao: "naoSelecionado"},
        divisao: { ...dadosCampo, requerido: true, valorPadrao: "naoSelecionado"},
        classe: { ...dadosCampo },
        trrf: { ...dadosCampo, requerido: true, valorPadrao: 30 },
        qtdeLitrosTotal: { ...dadosCampo, valorPadrao: 0 },
        percentualPerda: { ...dadosCampo, valorPadrao: 0 },
        qtdeBaldes: { ...dadosCampo, valorPadrao: 0 },
        qtdeBaldesReal: { ...dadosCampo, valorPadrao: 0 },
        areaTotal: { ...dadosCampo, valorPadrao: 0 },
        valorUnitarioIntumescente: { ...dadosCampo, valorPadrao: 0 },
        valorBaldeIntumescente: { ...dadosCampo, valorPadrao: 0 },
        valorTotalMaoObra: { ...dadosCampo, valorPadrao: 0 },
        valorTotalProduto: { ...dadosCampo, valorPadrao: 0 },
    });

    const [dadosCadastroMaterial, setDadosCadastroMaterial] = useState({
        materialIdOrcamentoIntumescente: { ...dadosCampo, requerido: true },
        nomeMaterial: { ...dadosCampo },
        pessoaId: { ...dadosCampo },
        nomePessoa: { ...dadosCampo },
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
        montarComponenteItensIntumescente(props.listItensOrcamentoIntumescente);
      }, [dadosCadastroMaterial.materialIdOrcamentoIntumescente.valor,
          dadosCadastro.trrf.valor,
          props.listItensOrcamentoIntumescente]);

      useEffect(() => {
          if(props.orcamentoSelecionado.PRODUTO){
              setDadosCadastro({
                  ...dadosCadastro,
                  grupo: {...dadosCadastro.grupo, valor: props.orcamentoSelecionado.GRUPO},
                  ocupacaoUso: {...dadosCadastro.ocupacaoUso, valor: props.orcamentoSelecionado.OCUPACAO_USO},
                  divisao: {...dadosCadastro.divisao, valor: props.orcamentoSelecionado.DIVISAO},
                  classe: {...dadosCadastro.classe, valor: props.orcamentoSelecionado.CLASSE},
                  trrf: {...dadosCadastro.trrf, valor: props.orcamentoSelecionado.TEMPO_RESISTENCIA_FOGO},
                  qtdeLitrosTotal: {...dadosCadastro.qtdeLitrosTotal, valor: props.orcamentoSelecionado.QTDE_LITROS_TOTAL},
                  percentualPerda: {...dadosCadastro.percentualPerda, valor: props.orcamentoSelecionado.PERCENTUAL_PERDA},
                  qtdeBaldes: {...dadosCadastro.qtdeBaldes, valor: props.orcamentoSelecionado.QTDE_BALDES},
                  qtdeBaldesReal: {...dadosCadastro.qtdeBaldesReal, valor: props.orcamentoSelecionado.QTDE_BALDES_REAL},
                  valorUnitarioIntumescente: {...dadosCadastro.valorUnitarioIntumescente, valor: props.orcamentoSelecionado.VALOR_UNITARIO_INTUMESCENTE},
                  valorBaldeIntumescente: {...dadosCadastro.valorBaldeIntumescente, valor: props.orcamentoSelecionado.VALOR_BALDE_INTUMESCENTE},
              })

              setDadosCadastroMaterial({
                  ...dadosCadastroMaterial,
                  materialIdOrcamentoIntumescente: { ...dadosCadastroMaterial.materialIdOrcamentoIntumescente, valor: props.materialOrcamentoIntumescente.MATERIAL_ID },
                  nomeMaterial: { ...dadosCadastroMaterial.nomeMaterial, valor: props.materialOrcamentoIntumescente.NOME_MATERIAL},
                  pessoaId: { ...dadosCadastroMaterial.pessoaId, valor: props.materialOrcamentoIntumescente.FABRICANTE.PESSOA_ID},
                  nomePessoa: { ...dadosCadastroMaterial.nomePessoa, valor: props.materialOrcamentoIntumescente.FABRICANTE.NOME_PESSOA},
              })
          }
      }, [props.orcamentoSelecionado, props.materialOrcamentoIntumescente])
    
    useEffect(() => {
        setGrupoDisplay(intumescenteUtils.listGrupo.map((item) => (montarOption(item))))
        setOcupacaoUsoDisplay(intumescenteUtils.listOcupacaoUso.map((item) => (montarOption(item))))
        setTrrfDisplay(intumescenteUtils.listTrrf.map((item) => (montarOption(item))))
    }, [])

    useEffect(() => {
        setDivisaoDisplay(filtrarDivisao(dadosCadastro.grupo.valor, intumescenteUtils.listDivisao).map((item) => (montarOptionDivisao(item))));
    }, [dadosCadastro.grupo.valor]);

    const montarComponenteItensIntumescente = (listItensOrcamentoIntumescente) => {
      if(listItensOrcamentoIntumescente.length > 0){
        setItensOrcamentoIntumescenteValoresAtualizados([]);
        calcularValoresIntumescente(listItensOrcamentoIntumescente).then((listItensIntumescente)=>{
          if(listItensIntumescente){
            setItensOrcamentoIntumescenteValoresAtualizados(listItensIntumescente);
            setItensOrcamentoIntumescenteDisplay(listItensIntumescente.map((item) => (
              <ItemOrcamentoIntumescente 
                ItemOrcamentoIntumescente={item}
                salvarItemOrcamentoIntumescente={(itemOrcamentoIntumescente, fazerAposCadastrar)=> 
                  salvarItemOrcamentoIntumescente(itemOrcamentoIntumescente, fazerAposCadastrar)}
                deletarItemOrcamentoIntumescente={(itensOrcamentoId)=>
                  deletarItemOrcamentoIntumescente(itensOrcamentoId)}
                atualizarItemOrcamentoIntumescente={(itemOrcamentoIntumescente)=>
                  atualizarItemOrcamentoIntumescente(itemOrcamentoIntumescente)} />
              )))
            }
        });
      }
    }

    useEffect(() => {
      calcularTotaisIntumescente();
    }, [itensOrcamentoIntumescenteValoresAtualizados,
        dadosCadastro.trrf.valor,
        dadosCadastro.valorUnitarioIntumescente.valor,
        dadosCadastro.valorBaldeIntumescente.valor,
        dadosCadastro.percentualPerda.valor,
        dadosCadastroMaterial.materialIdOrcamentoIntumescente.valor])

    const montarObjIntumescente = (obj) => {
        return {
          ORCAMENTO_ID: 0,
          NOME_OBRA: "",
          REFERENCIA: "",
          PRAZO_ENTREGA: "",
          DIAS_TRABALHADO: 0,
          DATA_CRIACAO_ORCAMENTO: new Date(),
          A_C: "",
          TIPO_OBRA: "Intumescente",
          GRUPO: obj.grupo.valor,
          OCUPACAO_USO: obj.ocupacaoUso.valor,
          DIVISAO: obj.divisao.valor,
          CLASSE: obj.classe.valor,
          TEMPO_RESISTENCIA_FOGO: obj.trrf.valor,
          QTDE_LITROS_TOTAL: parseFloat(obj.qtdeLitrosTotal.valor),
          PERCENTUAL_PERDA: parseFloat(obj.percentualPerda.valor),
          QTDE_BALDES: parseFloat(obj.qtdeBaldes.valor),
          QTDE_BALDES_REAL: parseFloat(obj.qtdeBaldesReal.valor),
          VALOR_UNITARIO_INTUMESCENTE: parseFloat(obj.valorUnitarioIntumescente.valor),
          VALOR_BALDE_INTUMESCENTE: parseFloat(obj.valorBaldeIntumescente.valor),
          TOTAIS_ORCAMENTO: {},
          CLIENTE_ORCAMENTO: {
            PESSOA_ID: 0,
            NOME_CLIENTE: "",
            RG: "",
            CPF: "",
            CNPJ: "",
            TIPO_CADASTRO: "",
            TIPO_PESSOA: "",
            LIST_ENDERECO: [
              {
                PESSOA_ID: 0,
                ENDERECO_ID: 0,
                CEP: "",
                LOGRADOURO: "",
                NUMERO_ENDERECO: "",
                COMPLEMENTO: "",
                BAIRRO: "",
                CIDADE: "",
                ESTADO: "",
                UF: "",
                ENDERECO_PADRAO: false,
              },
            ],
            LIST_CONTATO: [],
          },
          PRODUTO: {
            MATERIAL_ID: obj.produto.materialIdOrcamentoIntumescente.valor,
            NOME_MATERIAL: obj.produto.nomeMaterial.valor,
            DESCRICAO_MATERIAL: "",
            TIPO_MATERIAL: "",
            FABRICANTE: {
              PESSOA_ID: obj.produto.pessoaId.valor,
              NOME_PESSOA: "",
              RG: "",
              CPF: "",
              CNPJ: "",
              TIPO_CADASTRO: "",
              TIPO_PESSOA: "",
              LIST_ENDERECO: [],
              LIST_CONTATO: [],
            },
          },
          LIST_MAO_OBRA_ORCAMENTO: [],
          LIST_CUSTO_ORCAMENTO: [],
          LIST_EQUIPAMENTO_ORCAMENTO: [],
          LIST_MATERIAL_ORCAMENTO: [],
          LIST_ITENS_ORCAMENTO_INTUMESCENTE: []
        };
      };

      const calcularTotaisIntumescente = () =>{
        if(itensOrcamentoIntumescenteValoresAtualizados.length && dadosCadastro.valorUnitarioIntumescente.valor 
          && dadosCadastro.percentualPerda.valor && dadosCadastro.valorBaldeIntumescente.valor){
        
          const valoresCalculados = intumescenteUtils.calcularTotaisIntumescente(itensOrcamentoIntumescenteValoresAtualizados, 
            dadosCadastro.valorUnitarioIntumescente.valor, dadosCadastro.percentualPerda.valor, dadosCadastro.valorBaldeIntumescente.valor)
  
          setDadosCadastro({
            ...dadosCadastro,
            qtdeLitrosTotal: { ...dadosCadastro.qtdeLitrosTotal, valor: valoresCalculados.QtdeLitros },
            qtdeBaldes: { ...dadosCadastro.qtdeBaldes, valor: valoresCalculados.QtdeBaldes },
            qtdeBaldesReal: { ...dadosCadastro.qtdeBaldesReal, valor: valoresCalculados.QtdeBaldesPerda },
            areaTotal: { ...dadosCadastro.areaTotal, valor: valoresCalculados.AreaTotal },
            valorTotalMaoObra: { ...dadosCadastro.valorTotalMaoObra, valor: valoresCalculados.ValorTotalMaoObra },
            valorTotalProduto: { ...dadosCadastro.valorTotalProduto, valor: valoresCalculados.ValorTotalProduto },
          })
        }
      }

      const calcularValoresIntumescente = async (listItensOrcamentoIntumescente) => {

        if(props.orcamentoSelecionado.PRODUTO){
          
          let orcamentoSelecionado = { ...props.orcamentoSelecionado }
  
          orcamentoSelecionado.PRODUTO.MATERIAL_ID = parseInt(dadosCadastroMaterial.materialIdOrcamentoIntumescente.valor)
          orcamentoSelecionado.TEMPO_RESISTENCIA_FOGO = dadosCadastro.trrf.valor
          orcamentoSelecionado.LIST_ITENS_ORCAMENTO_INTUMESCENTE = listItensOrcamentoIntumescente
  
          return await fetch(props.linkBackEnd + "/orcamentoIntumescente/valoresIntumescente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orcamentoSelecionado),
          })
            .then((response) => response.json())
            .then((data) => {
              return data.LIST_ITENS_ORCAMENTO_INTUMESCENTE
            })
            .catch((error) => {
              return error
            });
        }

      }

    const filtrarDivisao = (grupo, listDivisao) => {
        return listDivisao.filter((item) => item.substring(0, 1) === grupo)
    }

    const montarOption = (item) => {
        if(item == "naoSelecionado"){
            return <option value={item.substring(2, item.length)}>Não selecionado</option>
        }else{
            return <option value={item}>{item}</option>
        }
    }

    const montarOptionDivisao = (item) => {
        if(item.substring(2, item.length) == "naoSelecionado"){
            return <option value={item.substring(2, item.length)}>Não selecionado</option>
        }else{
            return <option value={item.substring(2, item.length)}>{item.substring(2, item.length)}</option>
        }
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

      const atualizarCadastro = () => {
        const dadosOrcamento = validacaoDadosUtils.validarDados(dadosCadastro);
        const dadosMaterial = validacaoDadosUtils.validarDados(dadosCadastroMaterial);
    
        let houveErro = false;
    
        houveErro = exibirCamposErro(dadosOrcamento, houveErro);
        houveErro = exibirCamposErro(dadosMaterial, houveErro);
    
        if (houveErro) {
          const msgErro = "Houveram erros na validação dos campos";
          exibirTost("erro", msgErro);
          return;
        }
    
        dadosOrcamento.produto = dadosCadastroMaterial;

        const objOrcamento = montarObjIntumescente(dadosOrcamento)
    
        fetch(props.linkBackEnd + "/orcamentoIntumescente/" + props.orcamentoSelecionado.ORCAMENTO_ID, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(objOrcamento),
        }).then((data) => {
          if (data.ok) {

            props.recarregarOrcamentoIntumescente(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);
            props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);
            
            objOrcamento.CLIENTE_ORCAMENTO = props.clienteOrcamento;
    
            const msg = "Cadastro atualizado com sucesso";
    
            exibirTost("sucesso", msg);
          } else {
            const msg = "Erro ao efetuar atualização";
    
            exibirTost("erro", msg);
          }
        });
      };

      const salvarItemOrcamentoIntumescente = (itemOrcamentoIntumescente, fazerAposCadastrar) => {
        fetch(props.linkBackEnd + "/itensOrcamentoIntumescente/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemOrcamentoIntumescente),
        })
          .then((response) => response.json())
          .then((data) => {
            
            props.adicionarItemOrcamentoIntumescente(props.listItensOrcamentoIntumescente, data);
    
            props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);
    
            const msg = "Cadastro efetuado com sucesso";
            exibirTost("sucesso", msg);
    
            if (fazerAposCadastrar) {
              fazerAposCadastrar(data);
            }
          })
          .catch(() => {
            const msg = "Erro ao efetuar cadastro";
    
            exibirTost("erro", msg);
          });
      };
    
      const deletarItemOrcamentoIntumescente = (itensOrcamentoId) => {
        fetch(
          props.linkBackEnd +
            "/itensOrcamentoIntumescente/deletar?itensOrcamentoId=" +
            itensOrcamentoId,
          {
            method: "DELETE",
          }
        ).then((data) => {
          if (data.ok) {
            
            props.removerItemOrcamentoIntumescente(props.listItensOrcamentoIntumescente, itensOrcamentoId);
            props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);
  
            const msg = "Exclusão efetuada com sucesso";
    
            exibirTost("sucesso", msg);
          } else {
            const msg = "Erro ao efetuar exclusão";
    
            exibirTost("erro", msg);
          }
        });
      };
    
      const atualizarItemOrcamentoIntumescente = (itemOrcamentoIntumescente) => {
        fetch(
          props.linkBackEnd + "/itensOrcamentoIntumescente/" + itemOrcamentoIntumescente.ITENS_ORCAMENTO_ID,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemOrcamentoIntumescente),
          }
        ).then((data) => {
          if (data.ok) {
    
            props.recarregarTotaisOrcamento(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);
            
            props.recarregarItensOrcamentoIntumescente(props.linkBackEnd, props.orcamentoSelecionado.ORCAMENTO_ID);
    
            const index = props.listItensOrcamentoIntumescente.findIndex((elemento) => 
              elemento.ITENS_ORCAMENTO_ID == itemOrcamentoIntumescente.ITENS_ORCAMENTO_ID
            );
    
            props.listItensOrcamentoIntumescente[index] = itemOrcamentoIntumescente;

            montarComponenteItensIntumescente(props.listItensOrcamentoIntumescente);
    
            const msg = "Atualização efetuada com sucesso";
            exibirTost("sucesso", msg);
          } else {
            const msg = "Erro ao efetuar atualização";
    
            exibirTost("erro", msg);
          }
        });
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

      const listenerClick = () => {
        setShowResultadoMaterial(false);
      };
    
      if (showResultadoMaterial) {
        window.addEventListener("click", listenerClick);
      } else {
        window.removeEventListener("click", listenerClick);
      }

    const handleInputChange = (event) => {

        if(event.target.name == "grupo"){
            setDadosCadastro({
                ...dadosCadastro,
                [event.target.name]: {
                  ...dadosCadastro[event.target.name],
                  valor: event.target.value,
                },
                divisao: {...dadosCadastro.divisao, valor : ""}
              });
        }else{
            setDadosCadastro({
              ...dadosCadastro,
              [event.target.name]: {
                ...dadosCadastro[event.target.name],
                valor: event.target.value,
              },
            });
        }

      };

    return (
        <div id="containerIntumescente">
            <div id="cadastro-intumescente-basico">
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-6 col-sm-12 position-initial">
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-lg-5 col-sm-2 mb-15 position-initial">
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
                                        <span className="invalid-feedback msg-erro-grupo" id="erro-grupo"></span>
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
                                        <span className="invalid-feedback msg-erro-ocupacaoUso" id="erro-ocupacaoUso"></span>
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
                                        <span className="invalid-feedback msg-erro-divisao" id="erro-divisao"></span>
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
                                                maxLength={dadosCadastro.classe.tamanhoMax}
                                                onChange={(event) => handleInputChange(event)}
                                                onFocus={(event) => removerErro(event.target.id)}/>
                                            <div className="input-group-append">
                                                <span className="input-group-text">m/h</span>
                                            </div>
                                        </div>
                                        <span className="invalid-feedback msg-erro-classe" id="erro-classe"></span>
                                    </div>
                                    <div className="col-6 position-initial">
                                        <label>TRRF</label>
                                        <select
                                            id="campo-trrf"
                                            className="form-control"
                                            name="trrf"
                                            value={dadosCadastro.trrf.valor}
                                            onChange={(event) => handleInputChange(event)}
                                            onFocus={(event) => removerErro(event.target.id)} >
                                            {trrf}
                                        </select>
                                        <span className="invalid-feedback msg-erro-trrf" id="erro-trrf"></span>
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
                        <span className="invalid-feedback msg-erro-materialIdOrcamentoIntumescente" id="erro-materialIdOrcamentoIntumescente"></span>
                    </div>
                </div>
            </div>
        </div>
        <div id="cadastro-list-perfil">
          {props.orcamentoSelecionado.PRODUTO && props.orcamentoSelecionado.TEMPO_RESISTENCIA_FOGO && (
            <>
              <button type="button" className="btn" onClick={()=> setShowModalItemIntumescente(true)}>
                  Adicionar perfil
              </button>
            </>
          )}
            <div id="list-perfil">
              {itensOrcamentoIntumescenteDisplay}
            </div>
            <div className="form-group">
                <div className="form-row">
                    <div className="col-lg-6 col-12 position-initial">
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-lg-3 col-6 position-initial">
                                    <label>Perda</label>
                                    <div className="input-group mb-5 position-initial">
                                        <input
                                            type="number"
                                            name="percentualPerda"
                                            id="campo-percentualPerda"
                                            className="form-control position-initial"
                                            value={dadosCadastro.percentualPerda.valor}
                                            onChange={(event) => handleInputChange(event)}
                                            onFocus={(event) => removerErro(event.target.id)}/>
                                        <div className="input-group-append">
                                            <span className="input-group-text">%</span>
                                        </div>
                                        <span className="invalid-feedback msg-erro-percentualPerda" id="erro-percentualPerda"></span>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6 position-initial">
                                    <label>Valor balde</label>
                                    <div className="input-group mb-5 position-initial">
                                        <div className="input-group-append">
                                          <span className="input-group-text">R$</span>
                                        </div>
                                      <input
                                          type="number"
                                          name="valorBaldeIntumescente"
                                          id="campo-valorBaldeIntumescente"
                                          className="form-control position-initial"
                                          value={dadosCadastro.valorBaldeIntumescente.valor}
                                          onChange={(event) => handleInputChange(event)}
                                          onFocus={(event) => removerErro(event.target.id)}/>
                                      </div>
                                    <span className="invalid-feedback msg-erro-valorBaldeIntumescente" id="erro-valorBaldeIntumescente"></span>
                                </div>
                                <div className="col-lg-3 col-12 position-initial">
                                    <label>Mão obra</label>
                                    <div className="input-group mb-5 position-initial">
                                        <div className="input-group-append">
                                          <span className="input-group-text">R$</span>
                                        </div>
                                      <input
                                          type="number"
                                          name="valorUnitarioIntumescente"
                                          id="campo-valorUnitarioIntumescente"
                                          className="form-control position-initial"
                                          value={dadosCadastro.valorUnitarioIntumescente.valor}
                                          onChange={(event) => handleInputChange(event)}
                                          onFocus={(event) => removerErro(event.target.id)}/>
                                    </div>
                                    <span className="invalid-feedback msg-erro-valorUnitarioIntumescente" id="erro-valorUnitarioIntumescente"></span>
                                </div>
                                <div className="col-lg-3 col-12 position-initial d-flex flex-column justify-content-end">
                                    <button type="button" className="btn btn-orcamentaria btn-intumescente-recalcular w-100-pc" onClick={()=> calcularTotaisIntumescente()}>Recalcular</button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-lg-6 col-12 position-initial">
                                    <label>Qtde de litros</label>
                                        <input
                                            type="text"
                                            name="qtdeLitrosTotal"
                                            id="campo-qtdeLitrosTotal"
                                            className="form-control position-initial"
                                            value={dadosCadastro.qtdeLitrosTotal.valor}
                                            readOnly/>
                                        <span className="invalid-feedback msg-erro-qtdeLitrosTotal" id="erro-qtdeLitrosTotal"></span>
                                </div>
                                <div className="col-lg-6 col-12 position-initial">
                                    <label>Quantidade de baldes</label>
                                        <input
                                            type="text"
                                            name="qtdeBaldes"
                                            id="campo-qtdeBaldes"
                                            className="form-control position-initial"
                                            value={dadosCadastro.qtdeBaldes.valor}
                                            readOnly/>
                                        <span className="invalid-feedback msg-erro-qtdeBaldes" id="erro-qtdeBaldes"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12 position-initial">
                        <div id="totais-intumescente">
                            <div className="form-row h-100-pc">
                              <div className="col-lg-4 col-12 position-initial d-flex flex-column align-items-center justify-content-center">
                                <div className="titulo-totais-intumescente">Total de Baldes + Perda</div>
                                <div>{dadosCadastro.qtdeBaldesReal.valor}</div>
                              </div>
                              <div className="col-lg-4 col-12 position-initial d-flex flex-column align-items-center justify-content-center">
                                <div className="titulo-totais-intumescente">Subtotal mão obra</div>
                                <div>{"R$ " + dadosCadastro.valorTotalMaoObra.valor}</div>
                              </div>
                              <div className="col-lg-4 col-12 position-initial d-flex flex-column align-items-center justify-content-center">
                                <div className="titulo-totais-intumescente">Subtotal produto</div>
                                <div>{"R$ " + dadosCadastro.valorTotalProduto.valor}</div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="form-row">
                    <div className="col-12 position-initial d-flex justify-content-end">
                        <button type="button" className="btn btn-success w-100-px" onClick={()=>atualizarCadastro()}>Atualizar</button>
                    </div>
                </div>
            </div>
        </div>        
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
          <ModalItemIntumescente 
          show={showModalItemIntumescente}
          onHide={()=>setShowModalItemIntumescente(false)} 
          salvarItemOrcamentoIntumescente={(itemOrcamentoIntumescente, fazerAposCadastrar)=> 
            salvarItemOrcamentoIntumescente(itemOrcamentoIntumescente, fazerAposCadastrar)}
          deletarItemOrcamentoIntumescente={(itensOrcamentoId)=>
            deletarItemOrcamentoIntumescente(itensOrcamentoId)}
          atualizarItemOrcamentoIntumescente={(itemOrcamentoIntumescente)=>
            atualizarItemOrcamentoIntumescente(itemOrcamentoIntumescente)}
          />
          
      </div>
    </div>
    )
}

const mapStateToProps = (state) => ({
    linkBackEnd: state.backEnd.link,
    listItensOrcamentoIntumescente: state.orcamento.listItensOrcamentoIntumescente,
    orcamentoSelecionado: state.orcamento.orcamentoSelecionado,
    materialOrcamentoIntumescente: state.orcamento.materialOrcamentoIntumescente
  });
  
  const mapDispatchToProps = (dispatch) => ({
    recarregarTotaisOrcamento : (linkBackEnd, orcamentoId) => 
      dispatch(orcamentoActions.recarregarTotaisOrcamento(linkBackEnd, orcamentoId)),
    recarregarOrcamentoIntumescente : (linkBackEnd, orcamentoId) => 
      dispatch(orcamentoActions.recarregarOrcamentoIntumescente(linkBackEnd, orcamentoId)),
    adicionarItemOrcamentoIntumescente : (listItensOrcamentoIntumescente, itemOrcamentoIntumescente) => 
      dispatch(orcamentoActions.adicionarItemOrcamentoIntumescente(listItensOrcamentoIntumescente, itemOrcamentoIntumescente)),
    removerItemOrcamentoIntumescente: (listItensOrcamentoIntumescente, itensOrcamentoId) => 
      dispatch(orcamentoActions.removerItemOrcamentoIntumescente(listItensOrcamentoIntumescente, itensOrcamentoId)),
    recarregarItensOrcamentoIntumescente : (linkBackEnd, orcamentoId) =>
      dispatch(orcamentoActions.recarregarItensOrcamentoIntumescente(linkBackEnd, orcamentoId))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Intumescente);