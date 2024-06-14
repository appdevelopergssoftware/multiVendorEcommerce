import React from 'react';
import { dealsBanner } from '../../utils/data';

const DealSection = () => {
  return (
    <section className='deal-section pb-5'>
        <div className="container">
            <h2 className='text-center pb-3'>Hot Sale</h2>
            <hr />
            <div className="row g-4 pt-4">
                {
                    dealsBanner.map(item => {
                        return(
                            <div className="col-lg-4 col-md-6 upDownEffect" key={item.id}>
                                <img src={item.img} alt="" className='img-fluid'/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default DealSection