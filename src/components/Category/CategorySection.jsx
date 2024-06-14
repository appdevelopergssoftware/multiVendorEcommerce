import React from 'react';
import './CategorySection.css';
import { categorySectionData} from '../../utils/data'
import CategoryCard from './CategoryCard'
//import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
//import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';

const CategorySection = () => {

  return (
    <section className='category-section container-fluid my-5 pb-2'>
      {
            categorySectionData.map((item, index) => {
                return(
                    <CategoryCard key={index} categoryData={item}/>
                )
            })
        }
      {/* <div className="container">
        <Swiper

          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1400: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
          }}
          // navigation={true}
          modules={Navigation}
          className="mySwiper"
        >
          {
            categorySectionData.map((item, index) => {
              return (
                <SwiperSlide>
                  <CategoryCard key={index} categoryData={item} />
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div> */}

    </section>
  )
}

export default CategorySection