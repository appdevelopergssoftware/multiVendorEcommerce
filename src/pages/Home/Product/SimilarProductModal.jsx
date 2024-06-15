import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ProductCard from './ProductCard';
import { RiH4 } from 'react-icons/ri';

const SimilarProductModal = ({ show, onHide, similarProducts }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <p className='p-0 m-0'>Similar Products</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    {
                        similarProducts.length > 0 ? 
                        similarProducts.map((item) => {
                            return (
                                <div className="col-lg-3 col-md-6" key={item.id}>
                                    <ProductCard item={item} />
                                </div>
                            )
                        }) : 
                        (<h4>No similar products available</h4>)
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SimilarProductModal