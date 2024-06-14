import React, { useState } from 'react';
import './Registration.css';

const Registration = () => {
  const [inputValue, setInputValue] = useState({ name: "", email: "", password: "", cnf_password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue)
  }
  return (
    <div className="registration-page">
      <div className="form-container">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <i className="fa-solid fa-user"></i>
            <input
              type="text"
              placeholder="Name"
              value={inputValue.name}
              onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
            />
          </div>
          <div className="input-field">
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={inputValue.email}
              onChange={(e) => setInputValue({ ...inputValue, email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <i className="fa-solid fa-key"></i>
            <input
              type="password"
              placeholder="Password"
              value={inputValue.password}
              onChange={(e) => setInputValue({ ...inputValue, password: e.target.value })}
            />
          </div>
          <div className="input-field">
            <i className="fa-solid fa-key"></i>
            <input
              type="password"
              placeholder="Confirm Password"
              value={inputValue.cnf_password}
              onChange={(e) => setInputValue({ ...inputValue, cnf_password: e.target.value })}
            />
          </div>
          <div className="button-field">
            <button className="btn registration-btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration