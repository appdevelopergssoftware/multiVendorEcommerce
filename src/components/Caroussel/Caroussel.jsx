import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { carousselImages } from '../../utils/data';
import image from '../../assets/slide1.webp';

const Caroussel = () => {
    return (
        <div className='container-fluid'>
            <Carousel>
                {
                    carousselImages.map((item) => {
                        return (
                            <Carousel.Item key={item.id}>
                                <img src={item.image} alt="slider" width={"100%"}/>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Caroussel