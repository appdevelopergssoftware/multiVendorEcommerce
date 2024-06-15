import React from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TbCardsFilled } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { addFavProducts, removeFavProducts } from '../../../store/favPrductSlice';
import { useNavigate } from 'react-router';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SimilarProductModal from './SimilarProductModal';
import { productData } from '../../../utils/data';

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favProducts } = useSelector((state) => state.favProduct);
  const [modalShow, setModalShow] = React.useState(false);
  const [similarProducts, setSimilarProducts] = React.useState([]);

  const isFav = favProducts.some(favItem => favItem.id === item.id);

  const addFavHandler = (favProductData) => {
    dispatch(addFavProducts(favProductData));
  };

  const removeFavHandler = (id) => {
    dispatch(removeFavProducts(id));
  };

  const images = item?.img?.[0]?.img || [];

  const similarProductHandler = () => {
    const similarProduct = productData.filter(product => product.sub_category === item.sub_category && product.id !== item.id);
    setSimilarProducts(similarProduct);
    setModalShow(true);
  }

  return (
    <div className="product-card">
      {isFav ? (
        <FaHeart className='heart-icon red-heart shadow' onClick={() => removeFavHandler(item.id)} />
      ) : (
        <FaRegHeart className='heart-icon shadow' onClick={() => addFavHandler(item)} />
      )}
      <TbCardsFilled className='same-product-icon shadow' onClick={similarProductHandler} />
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
      <SimilarProductModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        similarProducts={similarProducts} 
      />
    </div>
  );
};

export default ProductCard;
