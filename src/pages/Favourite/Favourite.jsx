import React from 'react';
import './Favourite.css';
import ProductCard from '../Home/Product/ProductCard';
import emptyBag from '../../assets/emptybag.png';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Favourite = () => {
  const { favProducts } = useSelector(state => state.favProduct);
  const navigate = useNavigate();

  return (
    <div className='favorite-page'>
      {
        favProducts.length > 0 && <h2 className='text-center my-5'>Favourite Products</h2>
      }
      <div className="container">
        <div className="product-container row g-4">
          {
            favProducts?.length > 0 ?
              favProducts?.map(item => {
                return (
                  <div className='col-lg-2 col-md-4 col-6'>
                    <ProductCard item={item} key={item.id} />
                  </div>
                )
              }) :
              <div className='empty-bag w-100 d-flex align-items-center flex-column'>
                <img src={emptyBag} alt="" />
                <h5 className='mb-4'>You did not add any product!</h5>
                <button className='continue-shopping-btn' onClick={() => navigate("/")}>Continue Shopping</button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Favourite