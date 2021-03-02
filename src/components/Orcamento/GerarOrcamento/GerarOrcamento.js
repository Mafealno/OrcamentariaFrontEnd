import React, { useState } from 'react'
import ArquivoOrcamento from "./ArquivoOrcamento/ArquivoOrcamento";

function GerarOrcamento() {

  const [configuracaoGerarOrcamento, setConfiguracaoGerarOrcamento] = useState({

  })

  const gerarOrcamento = (configuracaoGerarOrcamento) => {
    window.open("orcamentoPDF", "_blank")
  }
  

    return (
      <div id="containerGerarOrcamento">
        <button onClick={() => gerarOrcamento()}>BUTAO</button>
      </div>
      
    )
}

export default GerarOrcamento