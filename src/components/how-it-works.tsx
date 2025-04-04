import { useEffect, useState } from "react";

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

interface ComponentGroup extends ParagraphBase {
  field_components: ParagraphBase[];
}

interface IconTitleDescription extends ParagraphBase {
  field_icon: MediaItem[];
  field_icon_title: string;
  field_icon_description: string;
}

interface HowItWorksSection extends ParagraphBase {
  field_how_it_works_item: IconTitleDescription[];
  field_title: string;
}

interface HowItWorkProps {
  language?: string;
}

export default function HowItWork({ language = "en" }: HowItWorkProps) {
  const [howItWorksData, setHowItWorksData] = useState<HowItWorksSection | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
        const response = await fetch(`${apiBaseUrl}/${language}/json/node/1`);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        // Usamos tipos explícitos para los parámetros de las funciones de callback
        const howItWorksSection = data?.fields?.field_components_group
          ?.flatMap((group: ComponentGroup) => group?.field_components || [])
          ?.find((component: ParagraphBase) => component?.paragraph_type === "how_it_works");

        setHowItWorksData(howItWorksSection as HowItWorksSection);
      } catch (error) {
        console.error("Error fetching How It Works data:", error);
      }
    };

    fetchData();
  }, [language]);

  if (!howItWorksData) return null;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
  
  return (
    <div className="container-HowItWork">
      <div className="container-HowItWork--img">
        <div
          style={{
            background:
              'url("https://506consulting.com/sites/default/files/gbb-uploads/bg-5.jpg")',
          }}
        ></div>
      </div>
      <div className="container-HowItWork--info">
        <div className="container-HowItWork--info--title">
          <h1>{howItWorksData.field_title}</h1>
        </div>
        <div className="container-HowItWork--info--iconFuture">
          {howItWorksData.field_how_it_works_item?.map((item) => (
            <div
              key={item.paragraph_id}
              className="container-HowItWork--info--iconFuture--icon"
            >
              <div className="container-iconFuture__icon">
                <img
                  src={`${apiBaseUrl}${item.field_icon[0]?.src || ''}`}
                  alt={item.field_icon[0]?.label || "Icono"}
                />
              </div>
              <div className="container-iconFuture__title">
                <h5>{item.field_icon_title}</h5>
              </div>
              <div className="container-iconFuture__description">
                {item.field_icon_description
                  ? item.field_icon_description.replace(/<\/?[^>]+(>|$)/g, "").trim()
                  : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}