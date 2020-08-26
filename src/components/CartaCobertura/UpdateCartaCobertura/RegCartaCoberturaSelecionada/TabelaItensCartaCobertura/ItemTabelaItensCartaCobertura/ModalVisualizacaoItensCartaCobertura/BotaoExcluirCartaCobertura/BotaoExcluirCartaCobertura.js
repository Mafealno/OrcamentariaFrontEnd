import React, { useState } from "react";
import "./BotaoExcluirCartaCobertura.css";
import ModalConfirm from "../../../../../../../ModalConfirm/ModalConfirm";

export default function BotaoExcluirCartaCobertura(props) {
  let [showModalConfirm, setShowModalConfirm] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowModalConfirm(true)}
        type="type"
        className="btn btn-danger btn-excluir-modal-visualizacao-itens-carta-cobertura"
      >
        Excluir
      </button>
      <div>
        <ModalConfirm
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          acaoConfirmada={() =>
            props.acaoDeletarItensCartaCobertura(props.tempoFogo)
          }
          tituloModalConfirm={
            "Deletar tempo " +
            props.tempoFogo +
            "? O dados não poderão ser recuperados."
          }
        />
      </div>
    </>
  );
}
