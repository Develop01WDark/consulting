
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Allies() {
  return (
    <div className="container-allies">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={10}
        slidesPerView={5}
        autoplay={{ delay: 0 }}
        loop={true}
        speed={3000}
      >
      <SwiperSlide>
        <div className="container-img">
            <img src="https://506consulting.com/sites/default/files/CertiProf-Logo-Full-Color-768x172%20(1).png" alt="img1" width="200" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="container-img">
            <img src="https://506consulting.com/sites/default/files/Comptia-logo.svg%20(1).png" alt="img1" width="200" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="container-img">
            <img src="https://506consulting.com/sites/default/files/Comptia-logo.svg%20(1).png" alt="img1" width="200" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="container-img">
            <img src="https://506consulting.com/sites/default/files/3195-VMEdu.jpeg" alt="img1" width="200" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="container-img">
            <img src="https://506consulting.com/sites/default/files/techruptive-logo_color.a8e2980f.png" alt="img1" width="200" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="container-img">
            <img src="https://506consulting.com/sites/default/files/Acquia_logo%20copy.png" alt="img1" width="200" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="container-img">
            <img src="https://506consulting.com/sites/default/files/Acquia_logo%20copy.png" alt="img1" width="200" />
        </div>
      </SwiperSlide>

      </Swiper>
    </div>
  );
}
