/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./ModalConfirm.css";
import ModalControl from "../ModalControl/ModalControl";

export default function ModalConfirm(props) {
  return (
    <div>
      <>
        <ModalControl
          {...props}
          tamanhoModal="sm"
          estiloModalHeader="backgroundModal tituloModal"
          estiloModalBody="backgroundModal"
          estiloModalFooter="backgroundModal"
          tituloModal={props.tituloModalConfirm}
          conteudoBody={
            <div className="row centralizar">
              <div className="col">
                <button
                  className="btn btn-danger"
                  onClick={() => props.onHide()}
                >
                  Cancelar
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-success"
                  onClick={() => props.acaoConfirmada(props.onHide())}
                >
                  Confirmar
                </button>
              </div>
            </div>
          }
        />
      </>
    </div>
  );
}
