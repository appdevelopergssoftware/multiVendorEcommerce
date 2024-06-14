import React from 'react';
import Caroussel from '../../components/Caroussel/Caroussel';
import CategorySection from '../../components/Category/CategorySection';
import DealSection from '../../components/DealSection/DealSection';

const Home = () => {
  return (
    <main className='home-container'>
        <Caroussel/>
        <CategorySection/>
        <DealSection/>
    </main>
  )
}

export default Home