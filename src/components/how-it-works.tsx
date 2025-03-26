import { useEffect, useState } from "react";
import IconFuture from "./iconFuture";

export default function HowItWork({ language = "en" }) {
  const [howItWorksData, setHowItWorksData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiBaseUrl}/${language}/json/node/1`);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const howItWorksSection = data?.fields?.field_components_group
          ?.flatMap((group) => group.field_components || [])
          ?.find((component) => component.paragraph_type === "how_it_works");

        setHowItWorksData(howItWorksSection);
      } catch (error) {
        console.error("Error fetching How It Works data:", error);
      }
    };

    fetchData();
  }, [language]);

  if (!howItWorksData) return null;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
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
                  src={`${apiBaseUrl}${item?.field_icon?.[0]?.src}`}
                  alt={item.field_icon[0]?.label || "Icono"}
                />
              </div>
              <div className="container-iconFuture__title">
                <h5>{item.field_icon_title}</h5>
              </div>
              <div className="container-iconFuture__description">
                {item.field_icon_description
                  .replace(/<\/?[^>]+(>|$)/g, "")
                  .trim()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
