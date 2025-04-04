import React, { useState, useEffect, useMemo } from 'react';

// Interfaces para la estructura de datos
interface AboutUsComponent {
  paragraph_id: string;
  paragraph_type: string;
  field_info_block?: string;
  field_title?: string;
}

interface ComponentGroup {
  paragraph_id: string;
  paragraph_type: string;
  field_components?: AboutUsComponent[];
}

interface DrupalData {
  nid?: string;
  type?: string;
  title?: string;
  fields?: {
    field_components_group?: ComponentGroup[];
  };
}

interface AboutUsProps {
  language?: string;
}

export default function AboutUs({ language = 'en' }: AboutUsProps) {
  const [infoBlock, setInfoBlock] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

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

        const data: DrupalData = await response.json();
        
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
        
        // Manejar el error correctamente
        const errorMessage = err instanceof Error ? err : new Error('Unknown error');
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchTranslatedContent();
  }, [apiUrl]);

  // Mostrar indicador de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Mostrar mensaje de error si ocurrió alguno
  if (error) {
    return <div>Error al cargar el contenido: {error.message}</div>;
  }

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