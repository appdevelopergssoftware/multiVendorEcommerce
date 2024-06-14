import React from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TbCardsFilled } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { addFavProducts, removeFavProducts } from '../../../store/favPrductSlice';
import { useNavigate } from 'react-router';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favProducts } = useSelector((state) => state.favProduct);

  const isFav = favProducts.some(favItem => favItem.id === item.id);

  const addFavHandler = (favProductData) => {
    dispatch(addFavProducts(favProductData));
  };

  const removeFavHandler = (id) => {
    dispatch(removeFavProducts(id));
  };

  const images = item?.img?.[0]?.img || [];

  return (
    
      <div className="product-card">
        {isFav ? (
          <FaHeart className='heart-icon red-heart' onClick={() => removeFavHandler(item.id)} />
        ) : (
          <FaRegHeart className='heart-icon' onClick={() => addFavHandler(item)} />
        )}
        <TbCardsFilled className='same-product-icon'/>
        <div className="image-wrapper d-flex justify-content-center">
          {
            images.length > 1 ?
              <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
                {images.map((imgSrc, index) => (
                  <div key={index} onClick={() => navigate(`/single_product/${item.id}`)}>
                    <img
                      src={imgSrc}
                      alt=""
                      className='img-fluid'
                    />
                  </div>
                ))}
              </Carousel> :
              <img src={item?.img[0]?.img} alt="" className='img-fluid' onClick={() => navigate(`/single_product/${item.id}`)} />
          }
        </div>
        <div className="product-info">
          <h5>{item.brand}</h5>
          <p className='m-0 p-0'>{item.name}</p>
          <div className="price-section">
            <span>₹{item.price}</span>
            <span>₹{item.originalPrice}</span>
            <span>{item.offer}%</span>
          </div>
        </div>
      </div>
  );
};

export default ProductCard;
