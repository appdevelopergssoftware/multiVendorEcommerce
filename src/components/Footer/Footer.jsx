import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import paymentImg from '../../assets/01.jpg'

const Footer = () => {
  return (
    <footer className='mt-5'>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <p>Market Place</p>
            <ul className='m-0 p-0'>
              <Link><li>About Us</li></Link>
              <Link><li>Careers</li></Link>
              <Link><li>Sell With Us</li></Link>
              <Link><li>Terms of Use</li></Link>
              <Link><li>Privacy Policy</li></Link>
              <Link><li>Affiliates</li></Link>
              <Link><li>Sitemap</li></Link>
            </ul>
          </div>
          <div className="col-md-3">
            <p>Customer Service</p>
            <ul className='m-0 p-0'>
              <Link><li>Shopping</li></Link>
              <Link><li>Offers & Promotions</li></Link>
              <Link><li>Payments</li></Link>
              <Link><li>Cancellation</li></Link>
              <Link><li>Returns & Refunds</li></Link>
              <Link><li>Electronics Return PolicyReturn To Store</li></Link>
              <Link><li>Contact Us</li></Link>
              <Link><li>Reviews Guidelines</li></Link>
              <Link><li>Replacement Policy</li></Link>
            </ul>
          </div>
          <div className="col-md-3">
            <p>My Details</p>
            <ul className='m-0 p-0'>
              <Link><li>My Account</li></Link>
              <Link><li>My Orders</li></Link>
              <Link><li>My Cart</li></Link>
              <Link><li>My Wishlist</li></Link>
            </ul>
          </div>
          <div className="col-md-3">
            <p>Offerings</p>
            <div className="content">
              <Link>Watches for Men</Link>
              <span>|</span>
              <Link>Campus Shoes</Link>
              <span>|</span>
              <Link>Sandals for Men</Link>
              <span>|</span>
              <Link>Sneakers for Men</Link>
              <span>|</span>
              <Link>Wallets for Men</Link>
              <span>|</span>
              <Link>Boots for Women</Link>
              <span>|</span>
              <Link>Skechers</Link>
              <span>|</span>
              <Link>Nike</Link>
              <span>|</span>
              <Link>Puma</Link>
              <span>|</span>
              <Link>Asics</Link>
              <span>|</span>
              <br />
              <br />
              <span className='p-0 m-0'>Supported payment systems:</span>
              <br />
              <img src={paymentImg} alt="" className='mt-2'/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer