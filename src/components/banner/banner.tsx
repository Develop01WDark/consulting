import { useEffect, useState } from "react";

// Función para obtener los datos del banner
export async function fetchBannerData(language = "en") {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await fetch(`${apiBaseUrl}/${language}/json/node/1`);
    if (!response.ok) throw new Error("Error fetching data");

    const data = await response.json();

    // Buscar el grupo de componentes con "banner_slider"
    const bannerComponent = data.fields.field_components_group.find((group) =>
      group.field_components.some(
        (component) => component.paragraph_type === "banner_slider"
      )
    );

    if (bannerComponent) {
      return bannerComponent.field_components
        .filter((component) => component.paragraph_type === "banner_slider")
        .map((banner) => ({
          imgSrcs: banner.field_image?.map((img) => img.src) || [],
          subtitle: banner.field_subtitle || "",
          title: banner.field_title || "",
          description: banner.field_description?.replace(/<[^>]*>?/gm, "") || "",
        }));
    }
  } catch (error) {
    console.error("Error fetching banner data:", error);
  }
  return [];
}

// Componente Banner
export default function Banner({ language = "en" }: { language?: string }) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [banners, setBanners] = useState<
    { imgSrcs: string[]; subtitle: string; title: string; description: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBannerData(language);
      setBanners(data);
    };
    loadData();
  }, [language]);

  // Cambia la imagen automáticamente cada 3 segundos
  useEffect(() => {
    if (banners.length > 0 && banners[0].imgSrcs.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % banners[0].imgSrcs.length
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  if (banners.length === 0) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="banner">
      <div className="banner--img">
        <img
          src={`${apiBaseUrl}${banners[0].imgSrcs[currentIndex]}`}
          alt="banner"
          width="100%"
          className="banner-image"
        />
      </div>
      <div className="banner--info">
        <div className="banner--info--subtitle">
          <h4>{banners[0].subtitle}</h4>
        </div>
        <div className="banner--info--title">
          <h1>{banners[0].title}</h1>
        </div>
        <div className="banner--info--description">
          <p>{banners[0].description}</p>
        </div>
      </div>
    </div>
  );
}
