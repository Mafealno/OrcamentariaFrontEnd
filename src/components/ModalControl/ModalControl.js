import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

export default function ModalControl(props) {
  return (
    <>
      <Modal
        show={props.show}
        size={props.tamanhoModal ?? "lg"}
        aria-labelledby="contained-modal-title-vcenter"
        className={props.estiloModal}
        centered
      >
        <ModalHeader className={props.estiloModalHeader}>
          <ModalTitle>{props.tituloModal}</ModalTitle>
          {props.conteudoHeader}
        </ModalHeader>
        <ModalBody className={props.estiloModalBody}>
          {props.conteudoBody}
        </ModalBody>
        {props.conteudoFooter && (
          <>
            <ModalFooter className={props.estiloModalFooter}>
              {props.conteudoFooter}
            </ModalFooter>
          </>
        )}
      </Modal>
    </>
  );
}
