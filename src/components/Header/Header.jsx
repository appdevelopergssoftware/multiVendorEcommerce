import React, { useEffect, useState } from 'react';
import './Header.css';
import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Counter from '../Counter/Counter';
import { LiaAngleDownSolid } from "react-icons/lia";
import Dropdown from '../Dropdown/Dropdown';
import { productData } from '../../utils/data';
import SignupDropdown from '../SignupDropdown/SignupDropdown';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../pages/Login/Login';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [searchedProduct, setSearchProduct] = useState([]);
    const { favProducts } = useSelector(state => state.favProduct);
    const { cartItems } = useSelector(state => state.cartItem);
    const [showLogin, setShowLogin] = useState(false);

    const dynamicPlaceholders = ["products", "category", "brand"];
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [animateClass, setAnimateClass] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setAnimateClass("input-placeholder-animate");
            setTimeout(() => {
                setPlaceholderIndex((prevIndex) => (prevIndex + 1) % dynamicPlaceholders.length);
                setAnimateClass("");
            }, 500); // Match the duration of the CSS animation
        }, 3000); // Change placeholder every 3 seconds

        return () => clearInterval(intervalId);
    }, []);

    const searchHandler = (e) => {
        const searchVal = e.target.value;
        setSearchValue(searchVal);

        if (searchVal.trim() === "") {
            setSearchProduct([]);
            return;
        }

        const filteredSearchValue = productData.filter(item =>
            item.name.toLowerCase().includes(searchVal.toLowerCase()) || item.category.toLowerCase().includes(searchVal.toLowerCase()) || item.brand.toLowerCase().includes(searchVal.toLowerCase())
        ).slice(0, 6); // Limit the search results to 6 items
        setSearchProduct(filteredSearchValue);
    };

    const navigationHandler = (id) => {
        navigate(`/single_product/${id}`);
        setSearchProduct([]);
    };

    const uniqueCategories = Array.from(
        new Set(
            productData.map((item) => item.category)
        )
    );

    return (
        <header>
            <div className="container h-100 d-flex align-items-center justify-content-between">
                <div className="logo-section">
                    <span>E Commerce</span>
                </div>
                <div className="search-bar">
                    <IoIosSearch />
                    <input
                        type="text"
                        className={animateClass}
                        placeholder={`Search for ${dynamicPlaceholders[placeholderIndex]}`}
                        value={searchValue}
                        onChange={searchHandler}
                    />
                </div>
                <div className="right-header">
                    <ul className='m-0 p-0'>
                        <li className='category'>Categories <LiaAngleDownSolid /> <Dropdown dropdownData={uniqueCategories} type="category" /></li>
                        <li className='brand'>Brands <LiaAngleDownSolid /> <Dropdown dropdownData={uniqueCategories} type="brand" /></li>
                        <li className='sign-up'>Sign in / Sign up <SignupDropdown setShowLogin={setShowLogin} /></li>
                        <li onClick={() => navigate("/wishlist")}><FaRegHeart className='fav-icon' /><Counter counter={favProducts?.length} /></li>
                        <li onClick={() => navigate("/cart")}><FiShoppingCart className='cart-icon' /><Counter counter={cartItems?.length} /></li>
                    </ul>
                </div>
            </div>
            {
                searchedProduct.length > 0 &&
                <div className='search-result shadow'>
                    {
                        searchedProduct.map(item => (
                            <div className="each-product mb-2" onClick={() => navigationHandler(item.id)} key={item.id}>
                                <img src={item.img[0].img} alt="" width={"45px"} />
                                <h6 className='p-0 m-0'>{item.name}</h6>
                            </div>
                        ))
                    }
                </div>
            }
            {
                showLogin && <Login setShowLogin={setShowLogin} />
            }
        </header>
    );
};

export default Header;
