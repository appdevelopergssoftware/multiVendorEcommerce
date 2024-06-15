import React, { useState } from 'react';
import './Login.css';
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa"
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Login = ({setShowLogin}) => {
  const [inputValue, setInputValue] = useState({ user: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue);
  };
  return (
    // <div className='login-page'>
    //   <div className="login-form">
    //   <IoClose/>
    //     <h2>Welcome to Ecommerce</h2>
    //     <div className="input-fields">
    //       <div className="input-field">
    //         <AiOutlineMail/>
    //         <input type="email" placeholder='Email Adress'/>
    //       </div>
    //       <div className="input-field">
    //         <IoKeyOutline/>
    //         <input type="email" placeholder='Email Adress'/>
    //       </div>
    //       <button className='login-btn'>Login</button>
    //     </div>
    //   </div>
    // </div>
    <div className="pop-up-screen">
      <div className="login-container shadow">
        <IoClose
          className='close-icon'
          onClick={() => setShowLogin(false)}
        />
        <h2>Welcome User!</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <FaUser />
            <input
              type="text"
              placeholder="Username"
              value={inputValue.user}
              onChange={(e) =>
                setInputValue({ ...inputValue, user: e.target.value })
              }
            />
          </div>
          <div className="input-field">
            <FaKey />
            <input
              type="password"
              placeholder="Password"
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({ ...inputValue, password: e.target.value })
              }
            />
          </div>
          <p>
            If you not registered please <Link to="/registration">Register here</Link>
          </p>
          <div className="button-field">
            <button className="btn login-btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login