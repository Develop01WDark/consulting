import { useEffect, useState } from "react";
import AboutUs from "./about-us-courses";

// Interfaces
interface AboutUsServicesProps {
  language?: string;
}

interface IconMedia {
  id: string;
  type: string;
  bundle: string;
  label: string;
  src: string;
}

interface IconTitleDescription {
  paragraph_id: string;
  paragraph_type: string;
  field_icon: IconMedia[];
  field_icon_description: string;
  field_icon_title: string;
}

interface AboutUsSection {
  paragraph_id: string;
  paragraph_type: string;
  field_about_us_services_item: IconTitleDescription[];
  field_info_block?: string;
  field_title: string;
}

// Interfaces para el manejo de grupos y componentes en la estructura de datos
interface Component {
  paragraph_id: string;
  paragraph_type: string;
  [key: string]: any; // Para otros campos dinámicos
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

export default function AboutUsServices({ language = "en" }: AboutUsServicesProps) {
  const [aboutUsData, setAboutUsData] = useState<AboutUsSection | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiBaseUrl}/${language}/json/node/1`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data: NodeData = await response.json();

        const aboutUsSection = data?.fields?.field_components_group
          ?.flatMap((group: Group) => group.field_components || [])
          ?.find((component: Component) => component.paragraph_type === "about_us_services") as AboutUsSection | undefined;

        if (aboutUsSection) {
          setAboutUsData(aboutUsSection);
        }
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
      <AboutUs />
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