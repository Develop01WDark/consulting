import { useEffect, useState } from "react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Interfaces necesarias
interface MediaItem {
  id: string;
  type: string;
  bundle: string;
  label: string;
  src: string;
}

interface ParagraphBase {
  paragraph_id: string;
  paragraph_type: string;
  content_translation_changed?: string;
}

interface AlliesItem extends ParagraphBase {
  field_image: MediaItem[];
}

interface AlliesSection extends ParagraphBase {
  field_allies_item: AlliesItem[];
}

interface ComponentGroup extends ParagraphBase {
  field_components: ParagraphBase[];
}

interface AlliesProps {
  language?: string;
}

export default function Allies({ language = "en" }: AlliesProps) {
  const [alliesData, setAlliesData] = useState<AlliesSection | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
        const response = await fetch(`${apiBaseUrl}/${language}/json/node/1`);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        // Usamos tipos explícitos para los parámetros de las funciones de callback
        const alliesSection = data?.fields?.field_components_group
          ?.flatMap((group: ComponentGroup) => group?.field_components || [])
          ?.find((component: ParagraphBase) => component?.paragraph_type === "allies");

        setAlliesData(alliesSection as AlliesSection);
      } catch (error) {
        console.error("Error fetching Allies data:", error);
      }
    };

    fetchData();
  }, [language]);

  if (!alliesData) return null;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
  
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
                src={`${apiBaseUrl}${item.field_image[0]?.src || ''}`}
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