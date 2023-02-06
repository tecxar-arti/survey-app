
import React, { useState } from 'react';
import { Mail } from 'react-feather';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import classnames from 'classnames';
import '../../../assets/scss/components/customizer.scss';

const Help = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className={classnames('customizer d-md-block')} >
      <div className="customizer-toggle" onClick={toggle}>
        <Mail className="open-icon" size={15} />
      </div>
      <div>
        <Modal isOpen={modal} toggle={toggle} centered={true}>
          <ModalHeader toggle={toggle}>Feedback</ModalHeader>
        
        </Modal>
      </div>
    </div>
  );
}

export default Help;
