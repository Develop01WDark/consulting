import { useEffect, useState } from "react";


export async function fetchBannerData(language = "en") {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${apiBaseUrl}/${language}/json/node/1`;



  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);

    const data = await response.json();


    if (!data.fields?.field_components_group) {
      console.warn("⚠ No se encontraron datos de banner.");
      return [];
    }


    const bannerComponent = data.fields.field_components_group
      .flatMap(group => group.field_components)
      .find(component => component.paragraph_type === "banner_slider");

    if (!bannerComponent || !bannerComponent.field_banner_slider_item) {
      console.warn("⚠ No hay elementos en 'field_banner_slider_item'.");
      return [];
    }


    const banners = bannerComponent.field_banner_slider_item.map(item => ({
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


export default function Banner({ imgSrc, subtitle, title, description }) {
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
