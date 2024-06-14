import React from 'react'
import { useNavigate } from 'react-router'

const CategoryCard = ({categoryData}) => {
  const navigate = useNavigate();
  return (
    <div className="category-card" onClick={() => navigate(`/product/${categoryData.name}`)}>
        <div className="image-wrapper">
            <img src={categoryData.img} alt="" />
        </div>
        <div className="card-footer">
            <span>{categoryData.name}</span>
        </div>
    </div>
  )
}

export default CategoryCard