import React, { useState } from 'react';
import './Checkout.css';
import AdressFormModal from '../../components/AdressFormModal/AdressFormModal';
import CardPayModal from '../../components/CardPayModal/CardPayModal';
import paymentCard from '../../assets/01.jpg';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const [deliveryAddress, setDeliveryAddress] = useState("active");
    const [paymentMethod, setPaymentMethod] = useState("deactive");
    const [modalShow, setModalShow] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    //checkout items from store
    const { checkoutItems } = useSelector(state => state.checkoutItem);
    const adressDetails =
        JSON.parse(localStorage.getItem("delivery-address")) || [];
    console.log(adressDetails);

    const handleProceed = () => {
        if (selectedAddress != null) {
            setDeliveryAddress("deactive");
            setPaymentMethod("active");
        }
    };

    const handlePay = () => {
        console.log("Selected Address: ", selectedAddress);
        // Implement the payment logic here
    };

    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
    };
    return (
        <div className="checkout-page">
            <h2 className="text-center py-4">Checkout</h2>
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-8">
                        {deliveryAddress === "active" ? (
                            <>
                                <h5 className="active">1. Select a delivery address</h5>
                                <div className="adress-box">
                                    <h6 className="p-0 m-0">Your addresses</h6>
                                    <hr />
                                    <div className="adress mb-3">
                                        {adressDetails.length > 0 ? (
                                            adressDetails.map((item, index) => {
                                                return (
                                                    <div className="each-address mb-3" key={index}>
                                                        <input
                                                            type="radio"
                                                            name="adress-radio"
                                                            id={`radio${index}`}
                                                            onChange={() => handleAddressSelection(item)}
                                                        />
                                                        <label htmlFor={`radio${index}`}>
                                                            <span className="name">{item.fullName}</span>
                                                            <span>{item.address}</span>
                                                            <span>{item.townCity}</span>
                                                            <span>{item.state}</span>
                                                            <span>{item.pinCode}</span>
                                                            <span>{item.country}</span>
                                                        </label>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="empty-address">
                                                <p className="p-0 m-0">You have no address!</p>
                                            </div>
                                        )}
                                    </div>
                                    <p
                                        onClick={() => setModalShow(true)}
                                        className="p-0 m-0 add-adress"
                                    >
                                        <span>+</span>
                                        <span>Add new address</span>
                                    </p>
                                </div>
                                <AdressFormModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    setModalShow={setModalShow}
                                />
                            </>
                        ) : (
                            <div className="delivery-address">
                                <h5>1. Delivery Address</h5>
                                <div className="address-info">
                                    {selectedAddress ? (
                                        <>
                                            <p className="p-0 mb-1">{selectedAddress.fullName}</p>
                                            <p className="p-0 mb-1">{selectedAddress.address}</p>
                                            <p className="p-0 mb-1">{selectedAddress.townCity}</p>
                                            <p className="p-0 mb-1">
                                                {selectedAddress.state}, {selectedAddress.pinCode}
                                            </p>
                                            <p className="p-0 mb-1">{selectedAddress.country}</p>
                                        </>
                                    ) : (
                                        <p>No address selected</p>
                                    )}
                                </div>
                                <span>Change</span>
                            </div>
                        )}
                        <hr />
                        {paymentMethod === "deactive" ? (
                            <h5>2. Payment Method</h5>
                        ) : (
                            <>
                                <h5 className="active">2. Select Payment Method</h5>
                                <div className="payment-box">
                                    <div className="input-field">
                                        <input type="radio" id="pay-1" name="payment-method" />
                                        <label htmlFor="pay-1">
                                            <p className="p-0 mb-2 heading">Credit or Debit card</p>
                                            <div className="card-option">
                                                <img src={paymentCard} alt="" />
                                            </div>
                                            <p
                                                onClick={() => setModalShow(true)}
                                                className="enter-card p-0 m-0"
                                            >
                                                Enter card details
                                            </p>
                                        </label>
                                        <CardPayModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <input type="radio" id="pay-2" name="payment-method" />
                                        <label htmlFor="pay-2">
                                            <p className="p-0 mb-2 heading">Net Banking</p>
                                            <select>
                                                <option value="airtel">Airtel Payment Bank</option>
                                                <option value="state bank">State Bank of India</option>
                                                <option value="punjab bank">
                                                    Punjab National Bank
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="input-field">
                                        <input type="radio" id="pay-3" name="payment-method" />
                                        <label htmlFor="pay-3">
                                            <p className="heading p-0 mb-2">UPI</p>
                                            <div className="upi-option">
                                                <p className="p-0 mb-2">Please enter UPI ID</p>
                                                <div className="upi-input">
                                                    <input type="text" placeholder="123456@bankname" />
                                                    <button className="btn">Verify</button>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="input-field">
                                        <input type="radio" id="pay-4" name="payment-method" />
                                        <label htmlFor="pay-4">
                                            <p className="p-0 m-0 heading">Cash on delivery</p>
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}
                        <hr />
                        <h5>3. Items and delivery</h5>
                        <hr />
                    </div>
                    <div className="col-md-4">
                        {deliveryAddress === "active" ? (
                            <div className="order-box">
                                <p className="p-0 m-0 info">
                                    Choose a shipping address and payment method to calculate
                                    shipping, handling and tax.
                                </p>
                                <hr />
                                <h6 className="mb-3">Order Summary</h6>
                                <p>
                                    <span>Items:</span> <span>₹{checkoutItems.finalAmmount}</span>
                                </p>
                                <p>
                                    <span>Delivery:</span> <span>{checkoutItems.deliveryCharge === 0 ? "Free" : `₹${checkoutItems.deliveryCharge}`}</span>
                                </p>
                                <hr />
                                <h5>
                                    <span>Order Total</span> <span>₹{checkoutItems.finalAmmount + checkoutItems.deliveryCharge}</span>
                                </h5>
                                <hr />
                                <button onClick={handleProceed} className={`proceed-btn ${selectedAddress === null ? "disable" : ""}`}>
                                    Proceed
                                </button>
                            </div>
                        ) : (
                            <div className="order-box">
                                <p className="p-0 m-0 info">
                                    Choose a payment method to continue checking out. You will
                                    still have a chance to review and edit your order before it is
                                    final.
                                </p>
                                <hr />
                                <h6 className="mb-3">Order Summary</h6>
                                <p>
                                    <span>Items:</span> <span>₹{checkoutItems.finalAmmount}</span>
                                </p>
                                <p>
                                    <span>Delivery:</span> <span>{checkoutItems.deliveryCharge === 0 ? "Free" : `₹${checkoutItems.deliveryCharge}`}</span>
                                </p>
                                <p>
                                    <span>Total:</span> <span>₹{checkoutItems.finalAmmount + checkoutItems.deliveryCharge}</span>
                                </p>
                                <hr />
                                <h5>
                                    <span>Order Total</span> <span>₹{checkoutItems.finalAmmount + checkoutItems.deliveryCharge}</span>
                                </h5>
                                <hr />
                                <button onClick={handlePay} className="proceed-btn">
                                    Pay
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout