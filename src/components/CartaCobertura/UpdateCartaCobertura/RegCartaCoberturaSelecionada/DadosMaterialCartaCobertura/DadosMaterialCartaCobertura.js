import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

function DadosMaterialCartaCobertura(props) {
  let [dadosCadastro, setDadosCadastro] = useState({
    materialId: "",
    nomeMaterial: "",
    nomePessoa: "",
    descricaoMaterial: "",
  });

  let [dadosFabricante, setDadosFabricante] = useState({
    pessoaId: "",
    nomePessoa: "",
  });

  useEffect(() => {
    if (props.materialCartaCoberturaEditar) {
      setDadosCadastro({
        materialId: props.materialCartaCoberturaEditar.MATERIAL_ID,
        nomeMaterial: props.materialCartaCoberturaEditar.NOME_MATERIAL,
        descricaoMaterial:
          props.materialCartaCoberturaEditar.DESCRICAO_MATERIAL,
      });

      setDadosFabricante({
        pessoaId: props.materialCartaCoberturaEditar.FABRICANTE.PESSOA_ID,
        nomePessoa: props.materialCartaCoberturaEditar.FABRICANTE.NOME_PESSOA,
      });
    } else {
      setDadosCadastro({
        materialId: "",
        nomeMaterial: "",
        descricaoMaterial: "",
      });

      setDadosFabricante({
        pessoaId: "",
        nomePessoa: "",
      });
    }
  }, [props.materialCartaCoberturaEditar]);

  return (
    <div id="cadastro-basico-carta-cobertura-aux" className="form">
      <div id="id-material">
        <label className="col-form-label">Código</label>
        <input
          type="text"
          className="form-control"
          value={dadosCadastro.materialId}
          name="idMaterialCartaCobertura"
          readOnly
        />
      </div>
      <div id="nome-material">
        <label className="col-form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          name="NomeMaterialCartaCobertura"
          value={dadosCadastro.nomeMaterial}
          readOnly
        />
      </div>
      <div id="fabricante">
        <label className="col-form-label">Fabricante</label>
        <input
          type="text"
          className="form-control"
          name="fabricanteMaterialCartaCobertura"
          value={dadosFabricante.nomePessoa}
          id="inputFabricante"
          readOnly
        />
      </div>
      <div id="descricao-material">
        <label className="col-form-label">Descricao</label>
        <textarea
          className="form-control"
          value={dadosCadastro.descricaoMaterial}
          name="descricaoMaterialCartaCobertura"
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
