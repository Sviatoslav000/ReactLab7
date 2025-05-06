import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import '../styles/home.css';
import MainSlider from '../components/MainSlider';

import slide1 from "../assets/img/slide1.jpg";
import slide2 from '../assets/img/slide2.jpg';
import slide3 from '../assets/img/slide3.jpg';

const Home = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  // Після першого рендеру
  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <>
      <section className="swiper">
        <div className="container">
          <div className="container-info">
            <h1><strong>VA</strong> Gallery</h1>
            <p>
              VA Gallery - це простір сучасного мистецтва.<br />
              Ціллю галереї є створити арт-простір, який буде представляти знаних художників і <strong>відкривати молоді таланти.</strong>
            </p>
            <a href="#next-section" className="more-info">Дізнатись більше</a>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={
            swiperReady
              ? {
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }
              : false
          }
          onSwiper={(swiper) => {
            if (swiperReady) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          className="swiper-container"
        >
          <SwiperSlide><img src={slide1} alt="Фото 1" /></SwiperSlide>
          <SwiperSlide><img src={slide2} alt="Фото 2" /></SwiperSlide>
          <SwiperSlide><img src={slide3} alt="Фото 3" /></SwiperSlide>

          {/* Стрілки */}
          <div className="swiper-button-prev" ref={prevRef}></div>
          <div className="swiper-button-next" ref={nextRef}></div>
        </Swiper>
      </section>

      <section className="container-advantages" id="next-section">
        <div className="text-center">
          <h1>
            <strong>VA</strong> Gallery — це онлайн-галерея, що надає <strong>простір</strong> для представлення мистецтва.
          </h1>
          <div className="blocks-text">
            <div className="block-text">
              <h2><strong>Оригінальний підхід</strong></h2>
              <p>
                Додавайте роботи, керуйте проєктами та діліться мистецтвом легко й зручно.
              </p>
            </div>
            <div className="block-text">
              <h2><strong>Віртуальна галерея</strong></h2>
              <p>
                Залучайте аудиторію через виставки, де кожен може оцінити та коментувати.
              </p>
            </div>
            <div className="block-text">
              <h2><strong>Захопливий досвід</strong></h2>
              <p>
                Розширюйте межі мистецтва — ваші роботи можуть побачити люди з усього світу.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
