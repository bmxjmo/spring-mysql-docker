import React, { useState } from 'react';
import { Button, ButtonToggle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ComponenteModal = (props) => {
  
  const {title, text, execute, buttonColor, buttonText} = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  
  return (
    <span>
      <ButtonToggle size="sm" color={buttonColor} onClick={toggle}>{buttonText}</ButtonToggle>
      <Modal isOpen={modal} modalTransition={{ timeout: 0 }} backdropTransition={{ timeout: 0 }}
        toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {text}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={execute}>Confirmar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </span>
  );
}

export default ComponenteModal;
