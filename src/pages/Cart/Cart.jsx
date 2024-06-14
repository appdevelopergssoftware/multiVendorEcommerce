import React from 'react';
import './Cart.css';
import { CiDiscount1 } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa6";
import { AiFillSafetyCertificate } from "react-icons/ai";
import deliveryIcon from '../../assets/deliveryIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegHeart } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { quantityDecrease, quantityIcrease, removeCartItem } from '../../store/cartSlice';
import { addFavProducts } from '../../store/favPrductSlice';
import { useNavigate } from 'react-router';
import emptyCartImg from '../../assets/empty-cart.png';
import { addCheckout } from '../../store/checkoutSlice';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cartItem);
  const [modalShow, setModalShow] = React.useState(false);

  const removeHandler = (id) => {
    //setModalShow(true)
    dispatch(removeCartItem(id));
  }
  const addWishListHandler = (item) => {
    dispatch(addFavProducts(item))
  }
  const quantityDecreaseHandler = (id) => {
    dispatch(quantityDecrease(id));
  }
  const quantityIncreaseHandler = (id) => {
    dispatch(quantityIcrease(id));
  }

  //cart amount calculation

  //this is the total original price amount
  const cartTotalAmount = Math.floor(cartItems.map(item => {
    return item.originalPrice * item.quantity
  }).reduce((total, value) => total + value, 0));

  //this is the total after discount amount
  const cartTotalDiscountAmount = Math.floor(cartItems.map(item => {
    return item.price * item.quantity
  }).reduce((total, value) => total + value, 0));

  //this total is discount amount
  const productDiscountAmount = cartTotalAmount - cartTotalDiscountAmount;

  const finalAmmount = cartTotalAmount + 29 - productDiscountAmount;

  const checkoutHandler = () => {
    const checkoutItems = {
      finalItems: cartItems,
      finalAmmount: finalAmmount,
      deliveryCharge: finalAmmount < 500 ? 80 : 0,
    }
    dispatch(addCheckout(checkoutItems));
    console.log(checkoutItems);
    navigate("/checkout");
  }

  return (
    <div className="cart-page">
      {/* <ConfirmationModal 
        show={modalShow}
        onHide={() => setModalShow(false)} 
      /> */}
      <div className="container">
        <h2 className='py-4'>My Cart</h2>
        {
          cartItems?.length > 0 ?
            <div className="row g-4">
              <div className="col-md-8">
                {
                  cartItems?.map(item => {
                    return (
                      <div className="each-cart-item mb-4" key={item.id}>
                        <div className="image-section h-100">
                          <img src={item?.image[0].img} alt="" onClick={() => navigate(`/single_product/${item.id}`)} />
                        </div>
                        <div className="product-info">
                          <div className="left">
                            <p className='p-0 m-0'>{item?.item}</p>
                            <span className='price-section'>
                              <p className='p-0 m-0'>₹{item?.price}</p>
                              <p className='p-0 m-0'>₹{item?.originalPrice}</p>
                              <p className='p-0 m-0'>₹{item?.originalPrice - item?.price} off</p>
                            </span>
                            <p className='m-0 p-0'>Color: {item.image[0].colour}</p>
                            <p className='m-0 p-0'>Size: {item.size}</p>
                            <div className="quantity-section mb-4">
                              <span onClick={() => quantityDecreaseHandler(item.id)}>-</span>
                              <input type="text" placeholder={item.quantity} readOnly />
                              <span onClick={() => quantityIncreaseHandler(item.id)}>+</span>
                            </div>
                            <div className="footer-section">
                              <span onClick={() => addWishListHandler(item)}><FaRegHeart /> Add to Wishlist</span>
                              <span onClick={() => removeHandler(item?.id)}><FaRegTrashCan /> Remove</span>
                            </div>
                          </div>
                          <div className="right">
                            <img src={deliveryIcon} alt="" className='me-2' />
                            <span>Delivery by</span>
                            <span>7th june</span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="col-md-4">
                <div className="delivery-adress mb-4">
                  <span><p className='m-0 p-0'>Delivery to</p> <p className='m-0 p-0'>Change</p></span>
                  <hr />
                  <p>Kolkata</p>
                  <button>Login to add Address</button>
                </div>
                <div className="coupon-section mb-4">
                  <div className="left">
                    <CiDiscount1 />
                    <p className='p-0 m-0'>Check for coupons</p>
                  </div>
                  <FaAngleRight />
                </div>
                <div className="total-price-section mb-4">
                  <div className="upper-section">
                    <span>
                      <p className='m-o p-0'>Cart Total</p>
                      <p className='m-o p-0'>₹{cartTotalAmount}</p>
                    </span>
                    <span><p className='m-o p-0'>Processing Fee</p> <p className='m-o p-0'>₹29</p></span>
                    <span><p className='m-o p-0'>Cart Subtotal</p> <p className='m-o p-0'>₹{cartTotalAmount + 29}</p></span>
                    <span><p className='m-o p-0'>Product Discount</p> <p className='m-o p-0'>₹{productDiscountAmount}</p></span>
                    <p className='m-o p-0 discount-msg'>You will save ₹{productDiscountAmount} on this order</p>
                  </div>
                  <div className="footer-section">
                    <div className="left">
                      <p className='m-0 p-0'>Total</p>
                      <p className='m-0 p-0'>₹{finalAmmount}</p>
                    </div>
                    <button className={`checkout-btn`} onClick={checkoutHandler}>Checkout</button>
                  </div>
                </div>
                <div className="secure-payment-info">
                  <AiFillSafetyCertificate /><span>Safe and secure payments. Easy returns. 100% Authentic products.</span>
                </div>
              </div>
            </div> :
            <div className="empty-cart-screen">
              <img src={emptyCartImg} alt="" className='img-fluid' />
              <h2>Your Cart Is Empty!</h2>
              <div className="buttons mt-2">
                <button onClick={() => navigate("/")}>Continue Shopping</button>
                <button onClick={() => navigate("/wishlist")}>View Wishlist</button>
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default Cart