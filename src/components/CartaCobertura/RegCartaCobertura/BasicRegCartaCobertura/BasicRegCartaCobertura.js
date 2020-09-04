import React, { useState, useEffect } from "react";
import "./BasicRegCartaCobertura.css";
import { connect } from "react-redux";

function BasicRegCartaCobertura(props) {
  let [dadosCadastro, setDadosCadastro] = useState({
    materialId: "",
    nomeMaterial: "",
    descricaoMaterial: "",
    tipoMaterial: "",
  });

  let [dadosFabricante, setDadosFabricante] = useState({
    pessoaId: "",
    nomePessoa: "",
  });

  useEffect(() => {
    setDadosCadastro({
      materialId: props.materialCartaCoberturaSalvar.MATERIAL_ID || "",
      nomeMaterial: props.materialCartaCoberturaSalvar.NOME_MATERIAL || "",
      descricaoMaterial:
        props.materialCartaCoberturaSalvar.DESCRICAO_MATERIAL || "",
      tipoMaterial: props.materialCartaCoberturaSalvar.TIPO_MATERIAL || "",
    });

    if (props.materialCartaCoberturaSalvar.MATERIAL_ID) {
      setDadosFabricante({
        pessoaId: props.materialCartaCoberturaSalvar.FABRICANTE.PESSOA_ID,
        nomePessoa: props.materialCartaCoberturaSalvar.FABRICANTE.NOME_PESSOA,
      });
    } else {
      setDadosFabricante({
        pessoaId: "",
        nomePessoa: "",
      });
    }
  }, [props.materialCartaCoberturaSalvar.MATERIAL_ID]);

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
  materialCartaCoberturaSalvar:
    state.cartaCobertura.materialCartaCoberturaSalvar,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicRegCartaCobertura);
