import React from "react";
import "./RegCartaCoberturaSelecionada.css";
import DadosMaterialCartaCobertura from "./DadosMaterialCartaCobertura/DadosMaterialCartaCobertura";
import TabelaItensCartaCobertura from "./TabelaItensCartaCobertura/TabelaItensCartaCobertura";

export default function RegCartaCoberturaSelecionada() {
  return (
    <div id="containerRegCartaCoberturaSelecionada">
      <div id="dados-material-fabricante-carta-cobertura-selecionado">
        <DadosMaterialCartaCobertura />
      </div>
      <div id="tabela-itens-carta-cobertura-selecionado">
        <TabelaItensCartaCobertura />
      </div>
    </div>
  );
}
