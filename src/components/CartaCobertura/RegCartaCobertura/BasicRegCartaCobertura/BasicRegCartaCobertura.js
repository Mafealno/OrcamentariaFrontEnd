/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./BasicRegCartaCobertura.css";
import { connect } from "react-redux";
import * as validacaoDadosUtils from "../../../../utils/validacaoDados";

function BasicRegCartaCobertura(props) {
  let dadosCampo = { ...validacaoDadosUtils.dadosCampo };

  let [dadosCadastro, setDadosCadastro] = useState({
    materialIdCartaCobertura: { ...dadosCampo, valorPadrao: 0 },
    nomeMaterial: { ...dadosCampo, requerido: true },
    descricaoMaterial: { ...dadosCampo },
    tipoMaterial: { ...dadosCampo, requerido: true },
  });

  let [dadosFabricante, setDadosFabricante] = useState({
    pessoaId: { ...dadosCampo, requerido: true },
    nomePessoa: { ...dadosCampo },
  });

  useEffect(() => {
    setDadosCadastro({
      materialIdCartaCobertura: {
        ...dadosCadastro.materialIdCartaCobertura,
        valor: props.materialCartaCoberturaSalvar.MATERIAL_ID,
      },
      nomeMaterial: {
        ...dadosCadastro.nomeMaterial,
        valor: props.materialCartaCoberturaSalvar.NOME_MATERIAL,
      },
      descricaoMaterial: {
        ...dadosCadastro.descricaoMaterial,
        valor: props.materialCartaCoberturaSalvar.DESCRICAO_MATERIAL,
      },
      tipoMaterial: {
        ...dadosCadastro.tipoMaterial,
        valor: props.materialCartaCoberturaSalvar.TIPO_MATERIAL,
      },
    });

    if (props.materialCartaCoberturaSalvar.MATERIAL_ID) {
      setDadosFabricante({
        pessoaId: {
          ...dadosFabricante.pessoaId,
          valor: props.materialCartaCoberturaSalvar.FABRICANTE.PESSOA_ID,
        },
        nomePessoa: {
          ...dadosFabricante.nomePessoa,
          valor: props.materialCartaCoberturaSalvar.FABRICANTE.NOME_PESSOA,
        },
      });
    } else {
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
    }
  }, [props.materialCartaCoberturaSalvar.MATERIAL_ID]);

  return (
    <div id="cadastro-basico-carta-cobertura-aux" className="form-carta-cobertura">
      <div id="id-material">
        <label className="col-form-label">Código</label>
        <input
          type="text"
          className="form-control"
          name="materialIdCartaCobertura"
          id="campo-materialIdCartaCobertura"
          value={dadosCadastro.materialIdCartaCobertura.valor}
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
  materialCartaCoberturaSalvar:
    state.cartaCobertura.materialCartaCoberturaSalvar,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicRegCartaCobertura);
