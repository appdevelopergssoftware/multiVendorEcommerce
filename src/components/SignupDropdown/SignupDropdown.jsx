import React from 'react';
import './SignupDropdown.css';
import { FaRegUserCircle } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { FaRegHeart, FaRegBell } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { Link } from 'react-router-dom';

const SignupDropdown = ({setShowLogin}) => {
  return (
    <div className='signup-dropdown shadow'>
        <ul>
            <li className='login-btn' onClick={() => setShowLogin(true)}>Login /Register</li>
            <li><FaRegUserCircle/> My Account</li>
            <li><IoBagHandle/> Order History</li>
            <Link to='/wishlist'><li><FaRegHeart/> My Wishlist</li></Link>
            <li><FaRegBell/> Alerts</li>
            <li><FiGift/> Gift Cards</li>
        </ul>
    </div>
  )
}

export default SignupDropdown