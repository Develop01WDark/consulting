import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { FiltersProvider } from "./context/filters.jsx";
import { CartProvider } from "./context/cart";
import "./App.css";
import "./styles/index.scss";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import BannerSlider from "./components/banner/banner-slider";
import AboutUsServices from "./components/about-us-services";
import Certifications from "./components/certifications";
import ContactUsCourses from "./components/contact-us-courses";
import BannerDisruptivo from "./components/banner-disruptivo";
import HowItWork from "./components/how-it-works";
import ContactUs from "./components/contact-us";
import Allies from "./components/allies";
import Ecommerce from "./components/Ecommerce.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Consulting from "./img/506consulting_logo-Photoroom.png";

// URL para obtener los productos
const PRODUCTS_API_URL = "https://dev-506.pantheonsite.io/es/json/nodes?contenttype=products";

// Componente Loader
const Loader = () => (
  <div className="vertical-centered-box">
    <div className="content">
      <div className="loader-circle"></div>
      <div className="loader-line-mask">
        <div className="loader-line"></div>
      </div>
    </div>
    <div className="loader-image"><img src={Consulting} alt="consulting" /></div>
  </div>
);

// Componente Home con los componentes de la página principal
function Home() {
  return (
    <>
      <BannerSlider />
      <AboutUsServices />
      <Certifications />
      <ContactUsCourses />
      <BannerDisruptivo />
      <HowItWork />
      <ContactUs />
      <Allies />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);


  // Dentro de App.js, en el efecto useEffect para cargar productos

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const response = await fetch(PRODUCTS_API_URL);
  
        if (!response.ok) {
          throw new Error(`Error al cargar productos: ${response.status}`);
        }
  
        const data = await response.json();
  
        // ✅ El array de productos está en data.nodes
        if (!Array.isArray(data.nodes)) {
          console.error("El formato de datos no es válido:", data);
          throw new Error("El formato de datos no es válido");
        }
  
        // const productsData = data.nodes.map((node) => ({
        //   id: node.nid,
        //   title: node.title,
        //   brand: node.fields.field_brand,
        //   category: node.fields.field_category?.[0]?.label || null,
        //   description: node.fields.field_description,
        //   discountPercentage: parseFloat(node.fields.field_discountpercentage),
        //   images: node.fields.field_images?.map(img => img.src) || [],
        //   price: parseFloat(node.fields.field_price),
        //   rating: parseFloat(node.fields.field_rating),
        //   stock: parseInt(node.fields.field_stock, 10),
        //   thumbnail: node.fields.field_thumbnail?.[0]?.src || "",
        // }));
  
        // setProducts(productsData);
        setProductsError(null);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        // setProductsError(error.message);
      } finally {
        setProductsLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  // Efecto para cargar los productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const response = await fetch(PRODUCTS_API_URL);
        
        if (!response.ok) {
          throw new Error(`Error al cargar productos: ${response.status}`);
        }
        
        const data = await response.json();
        // Asumiendo que la estructura del JSON remoto tiene un campo 'products'
        // Si el JSON tiene otra estructura, ajusta esta línea
        const productsData = data.products || data;
        
        setProducts(productsData);
        setProductsError(null);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        // setProductsError(error.message);
        // Opcionalmente, cargar datos de respaldo si la API falla
        // import { products as fallbackProducts } from './mocks/products.json';
        // setProducts(fallbackProducts);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Efecto para el loader general de la aplicación
  useEffect(() => {
    // Asegurarse de que el contenido esté oculto inicialmente
    document.body.classList.add('loading');

    // Función para verificar si todas las imágenes y recursos están cargados
    const checkIfContentLoaded = () => {
      // Verificar si el documento está listo
      if (document.readyState === "complete") {
        // Dar tiempo extra para asegurar que React haya terminado de renderizar
        setTimeout(() => {
          setLoading(false);
          // Un pequeño retraso adicional antes de mostrar la app
          setTimeout(() => {
            document.body.classList.remove('loading');
            setAppReady(true);
          }, 200);
        }, 500); // Tiempo mayor para asegurar carga completa
        return;
      }

      // Observer para detectar cambios en el DOM
      const observer = new MutationObserver((mutations) => {
        if (document.readyState === "complete") {
          observer.disconnect();
          setTimeout(() => {
            setLoading(false);
            // Un pequeño retraso adicional antes de mostrar la app
            setTimeout(() => {
              document.body.classList.remove('loading');
              setAppReady(true);
            }, 200);
          }, 500);
        }
      });

      // Configurar observador
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // Respaldo por si el observer no detecta todo
      const timeoutId = setTimeout(() => {
        observer.disconnect();
        setLoading(false);
        // Un pequeño retraso adicional antes de mostrar la app
        setTimeout(() => {
          document.body.classList.remove('loading');
          setAppReady(true);
        }, 200);
      }, 5000); // Aumentado a 5 segundos para dar más tiempo

      // Limpieza
      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
      };
    };

    // Iniciar verificación
    checkIfContentLoaded();

    // Listener como respaldo adicional
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
          document.body.classList.remove('loading');
          setAppReady(true);
        }, 200);
      }, 1500);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      document.body.classList.remove('loading');
    };
  }, []);

  // Mostrar loader mientras cargan los productos también
  const isContentLoading = loading || productsLoading;

  return (
    <>
      {isContentLoading && <Loader />}
      {productsError && !isContentLoading && (
        <div className="error-message">
          Error al cargar productos: {productsError}. Por favor, intenta más tarde.
        </div>
      )}
      <div style={{ display: appReady && !productsLoading ? 'block' : 'none' }}>
        <Header />
        <main>
          <CartProvider>
            <FiltersProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ecommerce" element={<Ecommerce products={products} />} />
                <Route path="/product/:id" element={<ProductDetail products={products} />} />
              </Routes>
            </FiltersProvider>
          </CartProvider>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;