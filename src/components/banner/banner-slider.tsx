import React, { useState } from "react";
import Banner, { bannerData } from "./banner";
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  EffectCreative,
  EffectFade,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";

export default function BannerSlider() {
  // Elegir un efecto al azar para comenzar
  const [effect, setEffect] = useState("coverflow");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Configuración común para todos los efectos
  const commonConfig = {
    modules: [Navigation, Pagination, A11y, Autoplay],
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
    loop: true,
    autoplay: { delay: 2600, disableOnInteraction: false },
    speed: 1000,
    onSlideChange: (swiper) => {
      setCurrentIndex(swiper.realIndex);
    }
  };
  
  // Cambiar al siguiente efecto
  const changeEffect = () => {
    if (effect === "coverflow") {
      setEffect("fade");
    } else if (effect === "fade") {
      setEffect("creative");
    } else {
      setEffect("coverflow");
    }
  };

  // Renderizar el slider actual según el efecto
  const renderCurrentSlider = () => {
    const renderSlides = () => {
      return bannerData.map((banner, index) => (
        <SwiperSlide key={index}>
          <Banner 
            imgSrc={banner.imgSrc}
            subtitle={banner.subtitle}
            title={banner.title}
            description={banner.description}
          />
        </SwiperSlide>
      ));
    };

    switch (effect) {
      case "coverflow":
        return (
          <Swiper
            {...commonConfig}
            modules={[...commonConfig.modules, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            onSlideChangeTransitionEnd={() => changeEffect()}
            initialSlide={currentIndex}
          >
            {renderSlides()}
          </Swiper>
        );
      case "fade":
        return (
          <Swiper
            {...commonConfig}
            modules={[...commonConfig.modules, EffectFade]}
            effect="fade"
            fadeEffect={{
              crossFade: true
            }}
            onSlideChangeTransitionEnd={() => changeEffect()}
            initialSlide={currentIndex}
          >
            {renderSlides()}
          </Swiper>
        );
      case "creative":
        return (
          <Swiper
            {...commonConfig}
            modules={[...commonConfig.modules, EffectCreative]}
            effect="creative"
            creativeEffect={{
              prev: { shadow: false, translate: ["-120%", 0, -500] },
              next: { shadow: false, translate: ["120%", 0, -500] },
            }}
            onSlideChangeTransitionEnd={() => changeEffect()}
            initialSlide={currentIndex}
          >
            {renderSlides()}
          </Swiper>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-bannerSlider">
      {renderCurrentSlider()}
    </div>
  );
}