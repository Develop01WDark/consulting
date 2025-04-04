import { useEffect, useState, useRef } from "react";
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
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [effect, setEffect] = useState<"coverflow" | "fade" | "creative">("coverflow");
  
  // Contador para controlar los cambios de efecto
  const effectChangeCountRef = useRef(0);
  const swiperRef = useRef<SwiperType | null>(null);
  
  // Carga los datos del banner
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchBannerData(language);
        setBanners(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar datos del banner:", error);
        setBanners([]);
      }
    } 
    loadData();
  }, [language]);

  // Gestiona el cambio de efecto cada cierto número de transiciones
  useEffect(() => {
    // Resetear contador si el efecto cambió
    effectChangeCountRef.current = 0;
  }, [effect]);

  // Controla el cambio de efecto sin interrumpir el flujo del slider
  const handleSlideChangeTransitionEnd = () => {
    // Incrementa el contador
    effectChangeCountRef.current += 1;
    
    // Cambia el efecto cada 3 transiciones completas para evitar problemas
    if (effectChangeCountRef.current >= 3) {
      effectChangeCountRef.current = 0;
      setEffect(prevEffect => 
        prevEffect === "coverflow" ? "fade" : 
        prevEffect === "fade" ? "creative" : "coverflow"
      );
    }
  };

  // Todos los módulos necesarios cargados desde el inicio
  const allModules = [
    Navigation, 
    Pagination, 
    A11y, 
    Autoplay, 
    EffectCoverflow, 
    EffectFade, 
    EffectCreative
  ];

  // Determina la configuración del efecto actual
  const getEffectConfig = () => {
    if (effect === "coverflow") {
      return {
        effect: "coverflow" as const,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }
      };
    } else if (effect === "fade") {
      return {
        effect: "fade" as const,
        fadeEffect: { 
          crossFade: true 
        }
      };
    } else {
      return {
        effect: "creative" as const,
        creativeEffect: {
          prev: { shadow: false, translate: ["-120%", 0, -500] },
          next: { shadow: false, translate: ["120%", 0, -500] },
        }
      };
    }
  };

  // Configuración común del slider
  const commonConfig = {
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
    loop: true,
    autoplay: { 
      delay: 2600, 
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    speed: 1000,
    onSlideChange: (swiper: SwiperType) => {
      setCurrentIndex(swiper.realIndex);
    },
    onSwiper: (swiper: SwiperType) => {
      swiperRef.current = swiper;
    }
  };

  // Verificación de seguridad - reiniciar el slider si se detecta un problema
  useEffect(() => {
    const checkSwiperState = setInterval(() => {
      // Si el swiper existe pero no tiene slides visibles, intentar reiniciarlo
      if (swiperRef.current && 
          banners.length > 0 && 
          (!swiperRef.current.slides || swiperRef.current.slides.length === 0)) {
        console.log("Detectado estado anómalo en el slider, reiniciando...");
        swiperRef.current.update();
        swiperRef.current.slideToLoop(currentIndex, 0);
      }
    }, 3000);

    return () => {
      clearInterval(checkSwiperState);
    };
  }, [banners.length, currentIndex]);

  return (
    <div className="container-bannerSlider">
      {banners.length > 0 ? (
        <Swiper
          {...commonConfig}
          {...getEffectConfig()}
          modules={allModules}
          onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
          initialSlide={currentIndex}
          key={`slider-${effect}`} // Key para forzar recreación al cambiar el efecto
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={`slide-${index}`}>
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
        <div className="banner-loading">
          <p>Cargando banners...</p>
        </div>
      )}
    </div>
  );
}