import { useEffect, useState } from "react";
import AboutUs from "./about-us-courses";

export default function AboutUsServices({ language = "en" }) {
  const [aboutUsData, setAboutUsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiBaseUrl}/${language}/json/node/1`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const aboutUsSection = data?.fields?.field_components_group
          ?.flatMap(group => group.field_components || [])
          ?.find(component => component.paragraph_type === "about_us_services");

        setAboutUsData(aboutUsSection);
      } catch (error) {
        console.error("Error fetching About Us Services data:", error);
      }
    };

    fetchData();
  }, [language]);

  if (!aboutUsData) return null;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  return (
    <div className="container-about-us-services">
      <AboutUs/>
      <div className="container-about-us-services__icon-future">
        <h2>{aboutUsData.field_title}</h2>
        <div className="container-about-us-services__icon-future__container">
          {aboutUsData.field_about_us_services_item?.map((item) => (
            <div key={item.paragraph_id} className="container-about-us-services__icon-future__info">
              <img 
                src={`${apiBaseUrl}${item?.field_icon?.[0]?.src}`}
                alt={item.field_icon[0]?.label || "Icono"} 
                width={50} 
                height={50} 
              />
              <div className="icon-future__content">
                <h3>{item.field_icon_title}</h3>
                <div dangerouslySetInnerHTML={{ __html: item.field_icon_description }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
