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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader className={props.estiloModalHeader}>
          <ModalTitle>{props.tituloModal}</ModalTitle>
        </ModalHeader>
        <ModalBody className={props.estiloModalBody}>
          {props.conteudoModal}
        </ModalBody>
        <ModalFooter className={props.estiloModalFooter}>
          {props.opcoesModal}
        </ModalFooter>
      </Modal>
    </>
  );
}
