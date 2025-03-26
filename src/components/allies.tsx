import { useEffect, useState } from "react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Allies({ language = "en" }) {
  const [alliesData, setAlliesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiBaseUrl}/${language}/json/node/1`);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const alliesSection = data?.fields?.field_components_group
          ?.flatMap((group) => group.field_components || [])
          ?.find((component) => component.paragraph_type === "allies");

        setAlliesData(alliesSection);
      } catch (error) {
        console.error("Error fetching Allies data:", error);
      }
    };

    fetchData();
  }, [language]);

  if (!alliesData) return null;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
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
        {alliesData.field_allies_item?.map((item) => (
          <SwiperSlide key={item.paragraph_id}>
            <div className="container-img">
              <img
                src={`${apiBaseUrl}${item?.field_image?.[0]?.src}`}
                alt={item.field_image[0]?.label || "Aliado"}
                width="200"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
