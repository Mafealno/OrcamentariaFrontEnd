/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as validacaoDadosUtils from "../../../../../utils/validacaoDados";

import { connect } from "react-redux";

function DadosMaterialCartaCobertura(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [dadosCadastro, setDadosCadastro] = useState({
    materialIdCartaCobertura: {
      ...dadosCampo,
      valorPadrao: 0,
      requerido: true,
    },
    nomeMaterial: { ...dadosCampo },
    descricaoMaterial: { ...dadosCampo },
  });

  let [dadosFabricante, setDadosFabricante] = useState({
    pessoaId: { ...dadosCampo, requerido: true },
    nomePessoa: { ...dadosCampo },
  });

  useEffect(() => {
    if (props.materialCartaCoberturaEditar) {
      setDadosCadastro({
        materialIdCartaCobertura: {
          ...dadosCadastro.materialIdCartaCobertura,
          valor: props.materialCartaCoberturaEditar.MATERIAL_ID,
        },
        nomeMaterial: {
          ...dadosCadastro.nomeMaterial,
          valor: props.materialCartaCoberturaEditar.NOME_MATERIAL,
        },
        descricaoMaterial: {
          ...dadosCadastro.descricaoMaterial,
          valor: props.materialCartaCoberturaEditar.DESCRICAO_MATERIAL,
        },
      });

      setDadosFabricante({
        pessoaId: {
          ...dadosFabricante.pessoaId,
          valor: props.materialCartaCoberturaEditar.FABRICANTE.PESSOA_ID,
        },
        nomePessoa: {
          ...dadosFabricante.nomePessoa,
          valor: props.materialCartaCoberturaEditar.FABRICANTE.NOME_PESSOA,
        },
      });
    } else {
      limparCampos();
    }
  }, [props.materialCartaCoberturaEditar]);

  const limparCampos = () => {
    setDadosCadastro({
      materialIdCartaCobertura: {
        ...dadosCadastro.materialIdCartaCobertura,
        valor: dadosCadastro.materialIdCartaCobertura.valorPadrao,
      },
      nomeMaterial: {
        ...dadosCadastro.nomeMaterial,
        valor: dadosCadastro.nomeMaterial.valorPadrao,
      },
      descricaoMaterial: {
        ...dadosCadastro.descricaoMaterial,
        valor: dadosCadastro.descricaoMaterial.valorPadrao,
      },
    });

    setDadosFabricante({
      pessoaId: {
        ...dadosFabricante.pessoaId,
        valor: dadosFabricante.pessoaId.valorPadrao,
      },
      nomePessoa: {
        ...dadosFabricante.nomePessoa,
        valor: dadosFabricante.nomePessoa.valorPadrao,
      },
    });
  };

  return (
    <div id="cadastro-basico-carta-cobertura-aux" className="form-carta-cobertura">
      <div id="id-material">
        <label className="col-form-label">Código</label>
        <input
          type="text"
          className="form-control"
          name="materialIdCartaCobertura"
          id="campo-materialIdCartaCobertura"
          value={dadosCadastro.materialIdCartaCobertura.valor || ""}
          readOnly
        />
      </div>
      <div id="nome-material">
        <label className="col-form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          name="nomeMaterial"
          id="campo-nomeMaterial"
          value={dadosCadastro.nomeMaterial.valor}
          readOnly
        />
      </div>
      <div id="fabricante">
        <label className="col-form-label">Fabricante</label>
        <input
          type="text"
          className="form-control"
          name="nomePessoa"
          id="campo-nomePessoa"
          value={dadosFabricante.nomePessoa.valor}
          readOnly
        />
      </div>
      <div id="descricao-material">
        <label className="col-form-label">Descricao</label>
        <textarea
          className="form-control"
          name="descricaoMaterial"
          id="campo-descricaoMaterial"
          value={dadosCadastro.descricaoMaterial.valor}
          readOnly
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  materialCartaCoberturaEditar:
    state.cartaCobertura.cartaCoberturaEditar.MATERIAL,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DadosMaterialCartaCobertura);
