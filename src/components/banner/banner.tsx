import { useEffect, useState } from "react";

// Interfaces para la estructura de datos del JSON
interface ImageMedia {
  id: string;
  type: string;
  bundle: string;
  label: string;
  src: string;
}

interface BannerSliderItem {
  paragraph_id: string;
  paragraph_type: string;
  content_translation_changed?: string;
  field_description: string;
  field_image: ImageMedia[];
  field_subtitle: string;
  field_title: string;
}

interface BannerComponent {
  paragraph_id: string;
  paragraph_type: string;
  field_banner_slider_item: BannerSliderItem[];
}

interface Component {
  paragraph_id: string;
  paragraph_type: string;
  field_banner_slider_item?: BannerSliderItem[];
  [key: string]: any;
}

interface Group {
  paragraph_id: string;
  paragraph_type: string;
  field_components: Component[];
}

interface NodeData {
  nid: string;
  type: string;
  title: string;
  fields: {
    path: {
      langcode: string;
    };
    field_components_group: Group[];
  };
}

// Interfaz para el banner procesado que utilizará el componente
interface BannerData {
  imgSrc: string;
  subtitle: string;
  title: string;
  description: string;
}

// Función para obtener los datos del banner
export async function fetchBannerData(language = "en"): Promise<BannerData[]> {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${apiBaseUrl}/${language}/json/node/1`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);

    const data: NodeData = await response.json();

    if (!data.fields?.field_components_group) {
      console.warn("⚠ No se encontraron datos de banner.");
      return [];
    }

    const bannerComponent = data.fields.field_components_group
      .flatMap((group: Group) => group.field_components)
      .find((component: Component) => component.paragraph_type === "banner_slider") as BannerComponent | undefined;

    if (!bannerComponent || !bannerComponent.field_banner_slider_item) {
      console.warn("⚠ No hay elementos en 'field_banner_slider_item'.");
      return [];
    }

    const banners: BannerData[] = bannerComponent.field_banner_slider_item.map((item: BannerSliderItem) => ({
      imgSrc: `${apiBaseUrl}${item.field_image?.[0]?.src || ""}`,
      subtitle: item.field_subtitle || "",
      title: item.field_title || "",
      description: item.field_description?.replace(/<[^>]*>?/gm, "") || "",
    }));

    return banners;
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return [];
  }
}

// Interfaz para las props del componente Banner
interface BannerProps {
  imgSrc: string;
  subtitle: string;
  title: string;
  description: string;
}

// Componente Banner con tipos definidos
export default function Banner({ imgSrc, subtitle, title, description }: BannerProps) {
  return (
    <div className="banner">
      <div className="banner--img">
        <img src={imgSrc} alt="banner" width="100%" className="banner-image" />
      </div>
      <div className="banner--info">
        <div className="banner--info--subtitle">
          <h4>{subtitle}</h4>
        </div>
        <div className="banner--info--title">
          <h1>{title}</h1>
        </div>
        <div className="banner--info--description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}