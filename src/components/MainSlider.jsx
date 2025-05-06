import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const MainSlider = () => {
  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Autoplay]} 
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={7000}
        effect="slide"
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }}
      >
        <SwiperSlide>
          <div className="slide-content">Слайд 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">Слайд 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">Слайд 3</div>
        </SwiperSlide>
      </Swiper>

      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};

export default MainSlider;
