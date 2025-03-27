import { useEffect, useState } from "react";
import Banner from "./banner";
import { fetchBannerData } from "./banner";
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  EffectCoverflow,
  EffectFade,
  EffectCreative,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

import "swiper/swiper-bundle.css";

interface BannerData {
  imgSrc: string;
  subtitle: string;
  title: string;
  description: string;
}

export default function BannerSlider({ language = "es" }: { language?: string }) {
  const [effect, setEffect] = useState<"coverflow" | "fade" | "creative">("coverflow");
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      const data = await fetchBannerData(language);
      setBanners(Array.isArray(data) ? data : []);
    }
    loadData();
  }, [language]);

  const commonConfig = {
    modules: [Navigation, Pagination, A11y, Autoplay],
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
    loop: true,
    autoplay: { delay: 2600, disableOnInteraction: false },
    speed: 1000,
    onSlideChange: (swiper: SwiperType) => setCurrentIndex(swiper.realIndex),
  };

  const changeEffect = () => {
    setEffect(prevEffect => 
      prevEffect === "coverflow" ? "fade" : prevEffect === "fade" ? "creative" : "coverflow"
    );
  };

  return (
    <div className="container-bannerSlider">
      {banners.length > 0 ? (
        <Swiper
          {...commonConfig}
          modules={[
            ...commonConfig.modules,
            effect === "coverflow" ? EffectCoverflow : 
            effect === "fade" ? EffectFade : 
            EffectCreative
          ]}
          effect={effect}
          {...(effect === "coverflow" && {
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }
          })}
          {...(effect === "fade" && {
            fadeEffect: { crossFade: true }
          })}
          {...(effect === "creative" && {
            creativeEffect: {
              prev: { shadow: false, translate: ["-120%", 0, -500] },
              next: { shadow: false, translate: ["120%", 0, -500] },
            }
          })}
          onSlideChangeTransitionEnd={changeEffect}
          initialSlide={currentIndex}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <Banner 
                imgSrc={banner.imgSrc}
                subtitle={banner.subtitle}
                title={banner.title}
                description={banner.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
