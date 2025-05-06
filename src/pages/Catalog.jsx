import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../styles/catalog.module.css";

import catalog1 from "../assets/img/catalog1.jpg";
import catalog2 from "../assets/img/catalog2.jpg";
import catalog3 from "../assets/img/catalog3.jpg";
import catalog4 from "../assets/img/catalog4.jpg";
import catalog5 from "../assets/img/catalog5.jpg";
import catalog6 from "../assets/img/catalog6.jpg";
import catalog7 from "../assets/img/catalog7.jpg";
import catalog8 from "../assets/img/catalog8.jpg";
import catalog9 from "../assets/img/catalog9.jpg";

const images = [
  { src: catalog1, width: 499, height: 421 },
  { src: catalog2, width: 499, height: 399 },
  { src: catalog3, width: 751, height: 601 },
  { src: catalog4, width: 499, height: 399 },
  { src: catalog5, width: 752, height: 602 },
  { src: catalog6, width: 499, height: 399 },
  { src: catalog7, width: 753, height: 602 },
  { src: catalog8, width: 608, height: 486 },
  { src: catalog9, width: 608, height: 486 },
];

export default function Catalog() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperModalRef = useRef(null);
  const swiperRef = useRef(null);

  const openModal = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const handleCloseModalClick = (e) => {
    if (e.target === swiperModalRef.current) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <section id="projects" className={styles.sectionContent}>
      <div className={styles.sectionHeading}>
        <h1>
          <strong>Каталог Робіт</strong>
        </h1>
        <p>
          Тут представлені роботи, доступні для покупки в галереї
          <br /> За додатковою інформацією звертайтесь за нашими контактами
        </p>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.contentPhoto}>
          <div className={styles.firstLeft}>
            <img
              src={catalog1}
              width={499}
              height={421}
              alt="catalog1"
              className={styles.galleryImg}
              loading="lazy"
              onClick={() => openModal(0)}
            />
            <img
              src={catalog2}
              width={499}
              height={399}
              alt="catalog2"
              className={styles.galleryImg}
              loading="lazy"
              onClick={() => openModal(1)}
            />
          </div>
          <div className={styles.firstRight}>
            <img
              src={catalog3}
              width={751}
              height={601}
              alt="catalog3"
              className={styles.galleryImg}
              loading="lazy"
              onClick={() => openModal(2)}
            />
          </div>
        </div>

        <div className={styles.contentPhoto}>
          <div className={styles.contentSecond}>
            <img
              src={catalog4}
              width={499}
              height={399}
              alt="catalog4"
              className={styles.galleryImg}
              loading="lazy"
              onClick={() => openModal(3)}
            />
           </div> 
           <img
              src={catalog5}
              width={752}
              height={602}
              alt="catalog5"
              className={styles.galleryImg}
              loading="lazy"
              onClick={() => openModal(4)}
            />
        </div>

        <div className={styles.contentPhoto}>
          <div className={styles.thirdLeft}>
            <img
              src={catalog6}
              width={499}
              height={399}
              alt="catalog6"
              className={styles.galleryImg}
              loading="lazy"
              onClick={() => openModal(5)}
            />
          </div>
          <div className={styles.thirdRight}>
            <img
              src={catalog7}
              width={753}
              height={602}
              alt="catalog7"
              className={styles.galleryImg}
              loading="lazy"
              onClick={() => openModal(6)}
            />
          </div>
        </div>

        <div className={styles.contentPhoto}>
          <div className={styles.fourthLeft}>
            <img
              src={catalog8}
              width={608}
              height={486}
              alt="catalog8"
              className={styles.galleryImg}
              loading="lazy"
              onClick={() => openModal(7)}
            />
          </div>
          <div className={styles.fourthRight}>
            <img
              src={catalog9}
              width={608}
              height={486}
              alt="catalog9"
              className={styles.galleryImg}
              loading="lazy"
              onClick={() => openModal(8)}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className={`${styles.swiperModalActive} ${!isOpen ? styles.swiperModalHidden : ""}`}
          ref={swiperModalRef}
          onClick={handleCloseModalClick}
        >
          <div className={styles.swiperContainer}>
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                swiper.slideTo(activeIndex, 0);
              }}
              navigation
              modules={[Navigation]}
              className={styles.swiperWrapper}
            >
              {images.map((img, i) => (
                <SwiperSlide key={i} className={styles.swiperSlide}>
                  <img src={img.src} alt={`catalog-${i + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={styles.swiperClose} onClick={closeModal}>
              ×
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

