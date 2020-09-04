import React from "react";
import ReactDOM from "react-dom";
import "./ToastControl.css";
import Toast from "react-bootstrap/Toast";
import ToastHeader from "react-bootstrap/ToastHeader";
import ToastBody from "react-bootstrap/ToastBody";

export default function ToastControl(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <Toast
            className={props.estiloToast || "estiloPadraoToast"}
            onClose={() => props.closeToast(false)}
            show={props.showToast || false}
            delay={props.delayTost}
            autohide={props.autoHideToast}
          >
            {props.hideToastHeader && (
              <>
                <ToastHeader className={props.estiloToastHeader}>
                  {props.conteudoHeader}
                </ToastHeader>
              </>
            )}
            <ToastBody className={props.estiloToastBody}>
              {props.conteudoBody}
            </ToastBody>
          </Toast>
        </>,
        document.getElementsByTagName("body")[0]
      )}
    </>
  );
}
