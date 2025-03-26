import { useEffect, useState } from "react";

export default function Certifications({ language = "en" }) {
  const [certificationsData, setCertificationsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Intentar primero con el idioma especificado
        let data = await fetchDataForLanguage(language);
        
        // Si falla, intentar con inglés como respaldo
        if (!data && language !== 'en') {
          console.warn(`Fallback to English content for ${language}`);
          data = await fetchDataForLanguage('en');
        }

        // Procesar datos de certificaciones
        const certificationsSection = data?.fields?.field_components_group
          ?.flatMap((group) => group.field_components || [])
          ?.find((component) => component.paragraph_type === "certification");

        console.log("Extracted Certifications Section:", certificationsSection);
        
        setCertificationsData(certificationsSection || null);
        setError(null);
      } catch (error) {
        console.error("Detailed error fetching Certifications data:", {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDataForLanguage = async (lang) => {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      
      // Probar múltiples variaciones de URL
      const possibleUrls = [
        `${apiBaseUrl}${lang}/json/node/1`,
      ];

      for (const url of possibleUrls) {
        try {
          console.log(`Trying URL: ${url}`);
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
          });

          console.log(`Response status: ${response.status}`);

          if (response.ok) {
            const data = await response.json();
            console.log("Successful response data:", data);
            return data;
          }
        } catch (urlError) {
          console.log(`Failed URL: ${url}`, urlError);
        }
      }

      return null;
    };

    fetchData();
  }, [language]);

  // Manejo de errores en el render
  if (error) {
    return (
      <div>
        <h2>Error al cargar certificaciones</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  // Estado de carga
  if (loading) {
    return <div>Cargando...</div>;
  }
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  // Renderizado de certificaciones
  return (
    <div className="container-certifications">
      <h2>{certificationsData?.field_title || "Sin título"}</h2>
      <div className="container-certifications-infoImg">
        {certificationsData?.field_certification_item?.map((item) => (
          <div
            key={item.paragraph_id}
            className="container-certifications-infoImg_item"
          >
            <div className="container-certifications-infoImg_item--img">
              <img
                src= {`${apiBaseUrl}${item?.field_icon?.[0]?.src}`}
                alt={item?.field_icon?.[0]?.label || "Certificación"}
              />
            </div>
            <div className="container-certifications-infoImg_item--title">
              <h5>{item?.field_icon_title || "Sin título"}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}