import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ConfirmationModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure?</p>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn ok-btn'>Ok</button>
                <button onClick={props.onHide} className='btn btn-light cancel-btn'>Cancel</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal