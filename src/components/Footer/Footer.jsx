import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import paymentImg from '../../assets/01.jpg'

const Footer = () => {
  return (
    <>

      <footer className='mt-5'>
        <div className="custom-shape-divider-top-1718452074">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
        </div>
        <div className="container">
          <div className="row footer-container">
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
                <img src={paymentImg} alt="" className='mt-2 img-fluid' />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer