import React, { useState, useEffect } from "react";
import "./ItemMaoObraOrcamento.css";
import ItemCustoMaoObraOrcamento from "./ItemCustoMaoObraOrcamento/ItemCustoMaoObraOrcamento";
import ModalMaoObraOrcamento from "../ModalMaoObraOrcamento/ModalMaoObraOrcamento";
import * as validacaoDadosUtils from "../../../../utils/validacaoDados";

export default function ItemMaoObraOrcamento(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [showModalMaoObraOrcamento, setShowModalMaoObraOrcamento] = useState(
    false
  );

  let [dadosCadastro, setDadosCadastro] = useState({
    maoObraOrcametoId: { ...dadosCampo },
    nomePessoa: { ...dadosCampo },
    cargo: { ...dadosCampo },
    valorDiario: { ...dadosCampo },
  });

  let [
    itemCustoMaoObraOrcamentoDisplay,
    setItemCustoMaoObraOrcamentoDisplay,
  ] = useState([]);

  useEffect(() => {
    setDadosCadastro({
      maoObraOrcametoId: {
        ...dadosCadastro.maoObraOrcametoId,
        valor: props.dadosMaoObra.MAO_OBRA_ORCAMENTO_ID,
      },
      nomePessoa: {
        ...dadosCadastro.maoObraOrcametoId,
        valor: props.dadosMaoObra.FUNCIONARIO.NOME_PESSOA,
      },
      cargo: {
        ...dadosCadastro.maoObraOrcametoId,
        valor: props.dadosMaoObra.FUNCIONARIO.CARGO_FUNCIONARIO,
      },
      valorDiario: {
        ...dadosCadastro.maoObraOrcametoId,
        valor: props.dadosMaoObra.FUNCIONARIO.VALOR_DIA_TRABALHADO,
      },
      listCustoMaoObra: {
        ...dadosCadastro.maoObraOrcametoId,
        valor: props.dadosMaoObra.LIST_CUSTO,
      },
    });

    if (props.dadosMaoObra.LIST_CUSTO.length > 0) {
      setItemCustoMaoObraOrcamentoDisplay([]);
      setItemCustoMaoObraOrcamentoDisplay(
        props.dadosMaoObra.LIST_CUSTO.map((elemento) => (
          <ItemCustoMaoObraOrcamento
            key={elemento.CUSTO_ID}
            dadosCustoMaoObra={elemento}
          />
        ))
      );
    } else {
      setItemCustoMaoObraOrcamentoDisplay([]);
    }
  }, [
    props.dadosMaoObra.LIST_CUSTO.length,
    props.dadosMaoObra.LIST_CUSTO,
    props.dadosMaoObra.FUNCIONARIO.NOME_PESSOA,
  ]);

  const adicionarItemCustoMaoObraOrcamento = (itemCustoMaoObraOrcamento) => {
    props.dadosMaoObra.LIST_CUSTO.push(itemCustoMaoObraOrcamento);

    props.dadosMaoObra.LIST_CUSTO = [...props.dadosMaoObra.LIST_CUSTO];
  };

  return (
    <>
      <div
        id="containertItemMaoObraOrcamento"
        data-toggle="collapse"
        data-target={"#opcoes-" + props.dadosMaoObra.MAO_OBRA_ORCAMENTO_ID}
        aria-expanded={"opcoes-" + props.dadosMaoObra.MAO_OBRA_ORCAMENTO_ID}
        aria-controls={"opcoes-" + props.dadosMaoObra.MAO_OBRA_ORCAMENTO_ID}
      >
        <div id="cadastro-funcionario">
          <div className="form-row">
            <div className="col titulo-item-mao-obra-orcamento center">
              <label>{dadosCadastro.nomePessoa.valor}</label>
            </div>
          </div>
          <div className="row">
            <div className="col-xl col center">
              <label className="titulo-item-mao-obra-orcamento">Cargo</label>
            </div>
            <div className="col-xl col center">
              <label className="titulo-item-mao-obra-orcamento">
                Valor diário (R$)
              </label>
            </div>
          </div>
          <div className="row margin-bottom-0">
            <div className="col-xl col center">
              <label>{dadosCadastro.cargo.valor}</label>
            </div>
            <div className="col-xl col center">
              <label>{dadosCadastro.valorDiario.valor}</label>
            </div>
          </div>
        </div>
        <div id="list-custos-funcionario">
          {itemCustoMaoObraOrcamentoDisplay}
        </div>
      </div>
      <div
        id={"opcoes-" + props.dadosMaoObra.MAO_OBRA_ORCAMENTO_ID}
        className="collapse opcoes-item-orcamento-geral"
      >
        <button
          className="btn btn-success btn-modal-item-mao-obra-orcamento btn-width-100"
          onClick={() => setShowModalMaoObraOrcamento(true)}
        >
          Selecionar
        </button>
      </div>
      <div>
        <ModalMaoObraOrcamento
          dadosMaoObraOrcamento={props.dadosMaoObra}
          show={showModalMaoObraOrcamento}
          onHide={() => setShowModalMaoObraOrcamento(false)}
          deletarCadastro={(maoObraOrcamentoId) =>
            props.deletarCadastro(maoObraOrcamentoId)
          }
          salvarCadastro={(objMaoObraOrcamento) =>
            props.salvarCadastro(objMaoObraOrcamento)
          }
          editarCadastro={(
            objMaoObraOrcamento,
            pessoaIdAnterior,
            fazerAposAtualizar
          ) =>
            props.editarCadastro(
              objMaoObraOrcamento,
              pessoaIdAnterior,
              fazerAposAtualizar
            )
          }
          adicionarItemCustoMaoObraOrcamento={(itemCustoMaoObraOrcamento) =>
            adicionarItemCustoMaoObraOrcamento(itemCustoMaoObraOrcamento)
          }
          montarItemDisplay={() => props.montarItemDisplay()}
        />
      </div>
    </>
  );
}
