import React, { useState, useEffect, useMemo } from 'react';

export default function AboutUs({ language = 'en' }) {
  const [infoBlock, setInfoBlock] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoizar la URL para evitar cambios innecesarios
  const apiUrl = useMemo(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    return `${apiBaseUrl}/${language}/json/node/1`;
  }, [language]);

  useEffect(() => {
    const fetchTranslatedContent = async () => {
      try {
        console.log('Fetching URL:', apiUrl);

        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        console.log('Datos completos recibidos:', data);

        // Buscar el componente about_us_services y extraer field_info_block
        const aboutUsComponent = data?.fields?.field_components_group
          ?.flatMap(group => group.field_components || [])
          ?.find(component => component.paragraph_type === "about_us_services");

        const translatedInfoBlock = aboutUsComponent?.field_info_block || '';

        console.log('Info Block extraído:', translatedInfoBlock);

        setInfoBlock(translatedInfoBlock);
        setLoading(false);
      } catch (err) {
        console.error('Error completo:', err);

        setLoading(false);
      }
    };

    fetchTranslatedContent();
  }, [apiUrl]);



  return (
    <div className="container-about-us">
      <div className="container-about-us__citation">
        <div 
          dangerouslySetInnerHTML={{ __html: infoBlock }}
          className="about-us-content"
        />
      </div>
    </div>
  );
}
