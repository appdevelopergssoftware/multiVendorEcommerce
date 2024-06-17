import React, { useEffect, useState } from 'react';
import './SingleProductPage.css';
import { useNavigate, useParams } from 'react-router';
import { productData } from '../../../utils/data';
import deliveryIcon from '../../../assets/deliveryIcon.svg';
import { TfiAngleRight } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TbCardsFilled } from "react-icons/tb";
import { addFavProducts, removeFavProducts } from '../../../store/favPrductSlice';
import ReactImageMagnify from 'react-image-magnify';
import { addCheckout } from '../../../store/checkoutSlice';
import SimilarProductModal from '../Product/SimilarProductModal';
import ReviewSection from './ReviewSection';
import ProductCard from '../Product/ProductCard';

const SingleProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleProduct = productData.find(item => item.id == id);
  const [isAddedtoCart, setAddedtoCart] = useState(false);

  // Initialize activeColor with the first color of the product
  const [activeColor, setActiveColor] = useState(singleProduct?.img[0].color);
  // Initialize productImages with the images of the first color
  const [productImages, setProductImages] = useState(singleProduct?.img[0].img);
  // Initialize productImage with the first image of the selected color
  const [productImage, setProductImage] = useState(singleProduct?.img[0].img[0]);
  const [activeSize, setActiveSize] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  const addCartHandler = (item) => {
    if (item.size && !selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    const cartData = {
      id: item?.id,
      item: item?.name,
      brand: item?.brand,
      image: [{ colour: activeColor, img: productImage }],
      price: item?.price,
      originalPrice: item?.originalPrice,
      offer: item?.offer,
      size: selectedSize,
      description: item?.description,
      quantity: quantity
    };
    toast.success("Successfully Added");
    setAddedtoCart(true);
    dispatch(addToCart(cartData));
  }

  const colorSelectHandler = (color) => {
    const selectedColor = singleProduct.img.find(item => item.color === color);
    if (selectedColor) {
      setActiveColor(color);
      setProductImages(selectedColor.img);
      setProductImage(selectedColor.img[0]);
    }
  }

  const sizeSelection = (size) => {
    if (singleProduct.size.includes(size)) {
      setSelectedSize(size);
      setActiveSize(size);
    } else {
      setSelectedSize(null);
    }
  }

  useEffect(() => {
    const info = { activeColor, activeSize };
    localStorage.setItem('extra-info', JSON.stringify(info));
  }, [activeColor, activeSize]);

  const { favProducts } = useSelector((state) => state.favProduct);
  const isFav = favProducts.some(favItem => favItem.id === singleProduct.id);

  const addFavHandler = () => {
    dispatch(addFavProducts(singleProduct));
  };
  const removeFavHandler = () => {
    dispatch(removeFavProducts(singleProduct.id));
  };

  const handleProductImage = (image) => {
    setProductImage(image);
  }

  //product quantity handle
  const quantityDecreaseHandler = () => {
    if (quantity > 1) {
      setQuantity(prevQuant => (prevQuant - 1))
    }
  }
  const quantityIncreaseHandler = () => {
    if (quantity < 5) {
      setQuantity(prevQuant => (prevQuant + 1))
    }
  }

  //buy now direct navigate to checkout page
  const buyNowHandler = () => {
    if (singleProduct.size && !selectedSize) {
      toast.error("Please select a size before buying.");
      return;
    }
    const checkoutItems = {
      finalItems: singleProduct,
      finalAmmount: singleProduct.price * quantity,
      deliveryCharge: singleProduct.price * quantity < 500 ? 80 : 0,
    }
    dispatch(addCheckout(checkoutItems));
    navigate("/checkout");
  }

  //similar product handling
  const similarProductHandler = () => {
    const similarProduct = productData.filter(product => product.sub_category === singleProduct.sub_category && product.id !== singleProduct.id);
    setSimilarProducts(similarProduct);
    setModalShow(true);
  }

  //filter by brand
  const similarBrandProduct = productData.filter(item => item.brand === singleProduct.brand && item.category === singleProduct.category && item.id != singleProduct.id);

  const similarProductsData = productData.filter(product => product.sub_category === singleProduct.sub_category && product.id !== singleProduct.id);
  return (
    <div className='single-product-page'>
      <ToastContainer />
      <div className="container">
        <div className="row py-md-5">
          <div className="col-md-5 mb-4 d-flex justify-content-start align-items-center flex-column">
            <div className="image-wrapper d-flex justify-content-between gap-3">
              {isFav ? (
                <FaHeart className='heart-icon red shadow' onClick={removeFavHandler} />
              ) : (
                <FaRegHeart className='heart-icon shadow' onClick={addFavHandler} />
              )}
              <TbCardsFilled className='same-product-icon shadow' onClick={similarProductHandler} />
              <div className="product-image-selection-container">
                {
                  productImages.map((item, index) => {
                    return (
                      <img
                        onClick={() => handleProductImage(item)}
                        key={index} src={item} alt=""
                        className={productImage === item ? "active" : ""}
                      />
                    )
                  })
                }
              </div>

              <ReactImageMagnify {...{
                smallImage: {
                  alt: 'Product images',
                  isFluidWidth: true,
                  src: productImage,
                  sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                },
                largeImage: {
                  src: productImage,
                  width: 1200,
                  height: 1800
                },
                enlargedImageContainerDimensions: {
                  width: '180%',
                  height: '100%'
                },
                shouldUsePositiveSpaceLens: true
              }} />

            </div>
            <div className="buttons mt-4">
              <button onClick={buyNowHandler}>Buy Now</button>
              {
                isAddedtoCart ? <button onClick={() => navigate('/cart')}>Go to Cart</button> : <button onClick={() => addCartHandler(singleProduct)}>Add To Cart</button>
              }
            </div>
          </div>
          <div className="col-md-7">
            <div className="product-info-container">
              <h6>{singleProduct.brand}</h6>
              <p className='product-name'>{singleProduct.name}</p>
              <div className="price-section mb-4">
                <span>₹{singleProduct.price}</span>
                <span>₹{singleProduct.originalPrice}</span>
                <span>{singleProduct.offer}% off</span>
              </div>
              <div className="color-selection mb-4">
                {
                  activeColor === "" ? <></> :
                    <>
                      <p className='p-0 m-0 mb-2'>Color: {activeColor}</p>
                      <div className="color-wrapper">
                        {
                          singleProduct.img?.map((item, index) => {
                            return (
                              <img
                                key={index}
                                src={item.colorIcon}
                                alt=""
                                className={activeColor === item.color ? "active" : ""}
                                onClick={() => colorSelectHandler(item.color)}
                              />
                            )
                          })
                        }
                      </div>
                    </>
                }
              </div>
              {
                singleProduct.size === "" ? <></> :
                  <div className="size-selection mb-4">
                    <p className='p-0 mb-2'>Select Size:</p>
                    <div className="wrapper">
                      {
                        ["S", "M", "L", "XL", "XXL"].map((size, index) => {
                          return (
                            <span className={`${singleProduct.size.includes(size) ? "available" : "disable"} ${selectedSize === size ? "active" : ""}`} key={index} onClick={() => sizeSelection(size)}>{size}</span>
                          )
                        })
                      }
                    </div>
                  </div>
              }
              <div className="quantity-wrapper">
                <p className='p-0 mb-2'>Select Quantity:</p>
                <div className="quantity-handler mb-4">
                  <span onClick={quantityDecreaseHandler}>-</span>
                  <input type="text" placeholder={quantity} readOnly />
                  <span onClick={quantityIncreaseHandler}>+</span>
                </div>
              </div>
              <div className="shiping-info mb-4">
                <p className='p-0 mb-2'>Ship to</p>
                <div className="wrapper mb-4">
                  <input type="text" placeholder='Enter Pin' />
                  <span>Submit</span>
                </div>
                <div className="ship-date d-flex">
                  <img src={deliveryIcon} alt="" className='me-2' />
                  <span className='me-1'>Delivery by</span> <span>7th June</span>
                </div>
              </div>
              <div className="seller-info mb-4">
                <span className='m-0 p-0'>Sold By 1 ADI SPORTS INDIA PVT. LTD</span>
                <TfiAngleRight />
              </div>
              <div className="description">
                <p className='p-0 mb-2'>Product Details</p>
                <p className='p-0 m-0'>{singleProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <ReviewSection />
        <h4 className='mb-3'>More from {singleProduct.brand}</h4>
        <div className="product-caroussel mb-5">
          <div className="row g-4">

            {
              similarBrandProduct.map(item => {
                return (
                  <div className="col-lg-2 col-md-3" key={item.id}>
                    <ProductCard item={item}/>
                  </div>
                )
              })
            }
          </div>
        </div>
        <h4 className='mb-3'>Similar Products</h4>
        <div className="product-caroussel">
          <div className="row g-4">
            {similarProductsData.map(item => {
              return(
                <div className="col-lg-2 col-md-3" key={item.id}>
                  <ProductCard item={item}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <SimilarProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        similarProducts={similarProducts}
      />
    </div>
  )
}

export default SingleProductPage;
