import React, { useState } from 'react';
import './Dropdown.css';
import { useNavigate } from 'react-router';
import { productData } from '../../utils/data';
import { FaAngleLeft } from "react-icons/fa6";

const Dropdown = ({ dropdownData, type, brands }) => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [brand, setBrand] = useState([]);

  const handleMouseEnter = (category) => {
    const uniqueBrand = Array.from(
      new Set(
        productData
          .filter((item) => item.category === category)
          .map((item) => item.brand)
      )
    );
    setBrand(uniqueBrand);
    setHoveredCategory(category);
  };
  const handleNavigate = (brand) => {
    
  }

  return (
    <div className="drop-down-container shadow">
      {dropdownData.map((item, index) => (
        type === "category" ? (
          <ul key={index}>
            <li
              onClick={() => navigate(`/product/${item}`)}
            >
              {item}
            </li>
          </ul>
        ) : (
          <div className='brand-wrapper' key={index}>
            <ul>
              <li
                onMouseEnter={() => handleMouseEnter(item)}
              >
                {item}
                <FaAngleLeft/>
              </li>
            </ul>
            {hoveredCategory === item && (
              <div className="brand-container">
                <h6>Brands</h6>
                {/* Render all brands here */}
                {brand.map((brand, i) => (
                  <div key={i} onClick={() => handleNavigate(brand)} className="brand-item mb-2">{brand}</div>
                ))}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  );
};

export default Dropdown;
