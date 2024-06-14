import React from "react";
import Modal from 'react-bootstrap/Modal';
import paycardImg from '../../assets/01.jpg';



const CardPayModal = (props) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="cardpay-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enter card details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="card-input">
                    <div className="input-field">
                        <label htmlFor="">Card Number</label>
                        <input type="text" />
                    </div>
                    <div className="input-field my-3">
                        <label htmlFor="">Card holder</label>
                        <input type="text" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="">Expiry Date</label>
                        <select>
                            <option value="">Month</option>
                            <option value="january">1</option>
                            <option value="february">2</option>
                            <option value="march">3</option>
                            <option value="april">4</option>
                            <option value="may">5</option>
                            <option value="june">6</option>
                            <option value="july">7</option>
                            <option value="august">8</option>
                            <option value="september">9</option>
                            <option value="october">10</option>
                            <option value="november">11</option>
                            <option value="december">12</option>
                        </select>
                        <select>
                            <option value="">Year</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                            <option value="2031">2031</option>
                            <option value="2032">2032</option>
                            <option value="2033">2033</option>
                            <option value="2034">2034</option>
                            <option value="2035">2035</option>
                            <option value="2036">2036</option>
                            <option value="2037">2037</option>
                            <option value="2038">2038</option>
                            <option value="2039">2039</option>
                            <option value="2040">2040</option>
                            <option value="2041">2041</option>
                            <option value="2042">2042</option>
                            <option value="2043">2043</option>
                            <option value="2044">2044</option>
                        </select>
                    </div>
                </div>
                <div className="card-info">
                    <p className="p-0 mb-2">Please ensure that you enable your card for online payments from your bank’s app.</p>
                    <img src={paycardImg} alt="" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn enter-btn">Enter</button>
                <button onClick={props.onHide} className="btn cancel-btn light-btn">Cancel</button>
            </Modal.Footer>
        </Modal>
    )
}

export default CardPayModal