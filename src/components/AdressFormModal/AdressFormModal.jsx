import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
];

const AdressFormModal = (props) => {
    const [formValue, setFormValue] = useState({
        country: "India",
        state: "",
        fullName: "",
        mobileNumber: "",
        pinCode: "",
        address: "",
        area: "",
        landmark: "",
        townCity: "",
    });
    const [submittedValues, setSubmittedValues] = useState([]);
    useEffect(() => {
        // Save submitted values to local storage whenever it changes
        localStorage.setItem("delivery-address", JSON.stringify(submittedValues));
    }, [submittedValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValue);
        // You can add any additional logic here, like sending form data to an API
        setSubmittedValues((prevValues) => [...prevValues, formValue]);
        toast.success("Successfuly added");
        setTimeout(() => {
            props.onHide();
        }, 2000);
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="adressform-modal"
        >
            <ToastContainer />
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enter a new delivery address
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <h5 className="mb-3">Add New Address</h5>
                    <div className="select-field">
                        <div className="input-field">
                            <label htmlFor="country">Country/Region</label>
                            <select
                                name="country"
                                value={formValue.country}
                                onChange={handleChange}
                                id="country"
                            >
                                <option value="India">India</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Bhutan">Bhutan</option>
                            </select>
                        </div>
                        <div className="input-field">
                            <label htmlFor="state">State</label>
                            <select
                                name="state"
                                value={formValue.state}
                                onChange={handleChange}
                                id="state"
                            >
                                <option value="">Choose a state</option>
                                {indianStates.map((state, index) => (
                                    <option value={state} key={index}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fullName">Full name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formValue.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="mobileNumber">Mobile number</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formValue.mobileNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="pinCode">Pin Code</label>
                        <input
                            type="text"
                            name="pinCode"
                            placeholder="6 digits [0 - 9] Pin Code"
                            value={formValue.pinCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="address">
                            Flat, House no., Building, Company, Apartment
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formValue.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="area">Area, Street, Sector, Village</label>
                        <input
                            type="text"
                            name="area"
                            value={formValue.area}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="landmark">Landmark</label>
                        <input
                            type="text"
                            name="landmark"
                            placeholder="Example: near any school"
                            value={formValue.landmark}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="townCity">Town/City</label>
                        <input
                            type="text"
                            name="townCity"
                            value={formValue.townCity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="button-field">
                        <button className="btn mt-3" type="submit">
                            Add
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default AdressFormModal