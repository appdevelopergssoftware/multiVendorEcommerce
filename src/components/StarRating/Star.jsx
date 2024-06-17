import React from 'react';
import './Star.css';
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";

const Star = ({star}) => {
    const ratingStar = Array.from({length: 5}, (element, index) => {
        let number = index + 0.5;

        return(
            <span key={index}>
                {
                    star >= index + 1 ? <FaStar/> : star >= number ? <FaStarHalfAlt/> : <FaRegStar/>
                }
            </span>
        )
    })
  return (
    <div className="star-wrapper">
        {ratingStar}
    </div>
  )
}

export default Star