import React, { Component,useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddParq from './AddParq'

function MosTModals() {
    const [showModal, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    return (
      <><div className="row justify-content-center">
        <div className="d-flex align-items-center justify-content-center" style={{ height: "10vh" }}>
          <Button variant="primary" onClick={handleShow}>
            AÑADIR NUEVO PUEDTO
          </Button>          
        </div>
        <div className="d-flex align-items-center justify-content-center" style={{ height: "10vh" }}>
          <Button variant="primary" onClick={handleShow}>
            AÑADIR NUEVO PUEDTO
          </Button>
        </div>
        </div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nuevo Puesto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <AddParq></AddParq>
          </Modal.Body>
        </Modal>
      </>
    );
}

export default MosTModals;