import React from 'react';
import Star from '../../../components/StarRating/Star';
import userImg from '../../../assets/profile.png';
import revImage1 from '../../../assets/Review Images/nike_shoe1.png';
import revImage2 from '../../../assets/Review Images/nike_shoe2.png';
import revImage3 from '../../../assets/Review Images/nike_shoe3.png';
import { MdVerified } from "react-icons/md";

const ReviewSection = () => {
    return (
        <div className="review-section my-5">
            <div className="row g-5">
                <div className="col-md-4">
                    <h4>Customer Reviews</h4>
                    <div className="star-rating-wrapper">
                        <Star star={4.5} /> <p className='p-0 m-0'>4.5 out of 5</p>
                    </div>
                    <div className="rating-bars my-3">
                        <span>5 star <progress value={60} max={100} />60%</span>
                        <span>4 star <progress value={20} max={100} />20%</span>
                        <span>3 star <progress value={8} max={100} />8%</span>
                        <span>2 star <progress value={4} max={100} />4%</span>
                        <span>1 star <progress value={8} max={100} />8%</span>
                    </div>
                    <hr />
                    <h5>Review this product</h5>
                    <p className='p-0 mb-3'>Share your thoughts with other customers</p>
                    <button className='btn btn-light rev-btn'>Write a review</button>
                </div>
                <div className="col-md-8">
                    <select className='mb-3'>
                        <option value="top">Top Reviews</option>
                        <option value="recent">Recent Reviews</option>
                    </select>
                    <h5 className='mb-2'>Top Reviews</h5>
                    <div className="each-review">
                        <div className="user-profile">
                            <img src={userImg} alt="avatar" />
                            <span>Anjan</span>
                            <MdVerified/>
                        </div>
                        <Star star={4.5} />
                        <p className='p-0 mb-2 review-date'>Reviewed on 16 June 2024</p>
                        <p className='p-0 mb-4'>
                            Well this product is worth purchasing.The sound quality is impressive . The bass is punchy, the mids are clear, and the highs are well-defined. They offer an immersive listening experience, whether you're listening to music, podcasts, or watching videos.The noise cancellation is tremendously outstanding.It offers decent battery life as mentioned (7-8 hours)providing hours of playback on a single charge.The wireless connectivity, and pairing system with devices is quick and easy.Overall, realme Earpods offer good value for money, with their combination of design, sound quality, and battery life.

                            I am fully satisfied with the purchase so will be the ones who will purchase it.
                            Great launch Realme 😇👏🏻
                        </p>
                        <div className="review-image-container">
                            <img src={revImage1} alt="" />
                            <img src={revImage2} alt="" />
                            <img src={revImage3} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewSection