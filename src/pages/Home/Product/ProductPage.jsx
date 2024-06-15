import React, { useEffect, useState } from 'react';
import './ProductPage.css';
import { useParams } from 'react-router';
import { productData } from '../../../utils/data';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const ProductPage = () => {
  const { category, brand } = useParams();  // Get both category and brand from URL parameters

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(brand || "");  // Initialize with URL brand
  const [selectedSubcat, setSelectedSubcat] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);
  const [customMinPrice, setCustomMinPrice] = useState("");
  const [customMaxPrice, setCustomMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState(""); // State for sorting option
  const [searchVal, setSearchVal] = useState({
    subCat: "",
    brand: "",
    color: "",
  });

  // Filter products when category or brand changes
  useEffect(() => {
    setSelectedSubcat("");
    setSelectedPriceRange([0, Infinity]);
    setCustomMinPrice("");
    setCustomMaxPrice("");
    setSortOption(""); // Reset sorting option

    const filteredData = productData.filter(
      (item) => item.category === category && (selectedBrand ? item.brand === selectedBrand : true)
    );
    setFilteredProducts(filteredData);
  }, [category, selectedBrand]);

  // Filter products based on selected filters
  useEffect(() => {
    let filteredData = productData.filter(
      (item) =>
        item.category === category &&
        (selectedBrand ? item.brand === selectedBrand : true) &&
        (selectedSubcat ? item.sub_category === selectedSubcat : true) &&
        item.price >= selectedPriceRange[0] &&
        item.price <= selectedPriceRange[1]
    );

    // Sort the filtered data
    if (sortOption) {
      filteredData = sortProducts(filteredData, sortOption);
    }

    setFilteredProducts(filteredData);
  }, [category, selectedBrand, selectedSubcat, selectedPriceRange, sortOption]);

  // Get unique brands of the selected category
  const uniqueBrands = Array.from(
    new Set(
      productData
        .filter((item) => item.category === category)
        .map((item) => item.brand)
    )
  );

  // Get unique subcategories of the selected category
  const uniqueSubCategory = Array.from(
    new Set(
      productData
        .filter((item) => item.category === category)
        .map((item) => item.sub_category)
    )
  );

  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
  };

  const handleSubcatFilter = (subcategory) => {
    setSelectedSubcat(subcategory);
  };

  const handlePriceFilter = (min, max) => {
    setSelectedPriceRange([min, max]);
    setCustomMinPrice("");
    setCustomMaxPrice("");
  };

  const handleCustomPriceFilter = () => {
    const min = customMinPrice ? parseFloat(customMinPrice) : 0;
    const max = customMaxPrice ? parseFloat(customMaxPrice) : Infinity;
    setSelectedPriceRange([min, max]);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Sort products based on the selected option
  const sortProducts = (products, option) => {
    switch (option) {
      case "price-high-to-low":
        return products.sort((a, b) => b.price - a.price);
      case "price-low-to-high":
        return products.sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  // Reset all filters
  const handleReset = () => {
    setSelectedBrand("");
    setSelectedSubcat("");
    setSelectedPriceRange([0, Infinity]);
    setCustomMinPrice("");
    setCustomMaxPrice("");
    setSortOption("");
  };

  return (
    <div className='product-page'>
      <h2 className='text-center my-5'>{category} Section</h2>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-3 mb-4 mb-md-0">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {category}
                </li>
              </ol>
            </nav>
            <div className="filter-container pt-3">
              <div className="header">
                <p className="m-0 p-0 heading">Filters</p>
                <p className="m-0 p-0 reset-btn" onClick={handleReset}>
                  Clear All
                </p>
              </div>
              <hr />
              <p className="category-filter">{category}</p>
              <hr />
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Sub-Category
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="input-field">
                        <input
                          type="text"
                          placeholder="Search sub-category"
                          value={searchVal.subCat}
                          onChange={(e) =>
                            setSearchVal({
                              ...searchVal,
                              subCat: e.target.value,
                            })
                          }
                        />
                        <IoIosSearch />
                      </div>
                      <ul className="m-0 ps-3">
                        {uniqueSubCategory
                          .filter((item) =>
                            item
                              .toLowerCase()
                              .includes(searchVal.subCat.toLowerCase())
                          )
                          .map((item, index) => (
                            <li
                              key={index}
                              style={{
                                cursor: "pointer",
                                color:
                                  selectedSubcat === item ? "blue" : "black",
                              }}
                            >
                              <input type="radio" name='radio' id={`cat-radio${index}`} /> <label onClick={() => handleSubcatFilter(item)} htmlFor={`cat-radio${index}`}>{item}</label>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h5 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Brand
                    </button>
                  </h5>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="input-field">
                        <input
                          type="text"
                          placeholder="Search brand"
                          value={searchVal.brand}
                          onChange={(e) =>
                            setSearchVal({
                              ...searchVal,
                              brand: e.target.value,
                            })
                          }
                        />
                        <IoIosSearch />
                      </div>
                      <ul className="m-0 ps-3">
                        {uniqueBrands
                          .filter((item) =>
                            item
                              .toLowerCase()
                              .includes(searchVal.brand.toLowerCase())
                          )
                          .map((item, index) => (
                            <li
                              key={index}
                              style={{
                                cursor: "pointer",
                                color:
                                  selectedBrand === item ? "blue" : "black",
                              }}
                            >
                              <input type="radio" name='radio' id={`brand-radio${index}`} /> <label onClick={() => handleBrandFilter(item)} htmlFor={`brand-radio${index}`}>{item}</label>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Price
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul className="m-0 ps-3">
                        <li
                          style={{ cursor: "pointer" }}
                        >
                          <input type="radio" name='radio' id={`price-radio1`} /> <label onClick={() => handlePriceFilter(0, 500)} htmlFor={`price-radio1`}>₹0 - ₹500</label>
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                        >
                          <input type="radio" name='radio' id={`price-radio2`} /> <label onClick={() => handlePriceFilter(501, 1000)} htmlFor={`price-radio2`}>₹501 - ₹1000</label>
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                        >
                          <input type="radio" name='radio' id={`price-radio3`} /> <label onClick={() => handlePriceFilter(1001, 1500)} htmlFor={`price-radio3`}>₹1001 - ₹1500</label>
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                        >
                          <input type="radio" name='radio' id={`price-radio4`} /> <label onClick={() => handlePriceFilter(1501, 2000)} htmlFor={`price-radio4`}>₹1501 - ₹2000</label>
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                        >
                          <input type="radio" name='radio' id={`price-radio5`} /> <label onClick={() => handlePriceFilter(2001, 39999)} htmlFor={`price-radio5`}>₹2001 - ₹39999</label>
                        </li>
                      </ul>
                      <div className="custom-price-filter">
                        <input
                          type="text"
                          placeholder="Min Price"
                          value={customMinPrice}
                          onChange={(e) => setCustomMinPrice(e.target.value)}
                        />
                        <span>-</span>
                        <input
                          type="text"
                          placeholder="Max Price"
                          value={customMaxPrice}
                          onChange={(e) => setCustomMaxPrice(e.target.value)}
                        />
                        <span
                          className="apply-btn"
                          onClick={handleCustomPriceFilter}
                        >
                          <FaAngleRight />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row g-4">
              <div className="sort-selection">
                <select onChange={handleSortChange} value={sortOption}>
                  <option value="">Sort By</option>
                  <option value="price-high-to-low">Price High to Low</option>
                  <option value="price-low-to-high">Price Low to High</option>
                </select>
              </div>
              {
                filteredProducts.map(item => {
                  return (
                    <div className='col-lg-3 col-md-6 col-6' key={item.id}>
                      <ProductCard item={item} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage;
