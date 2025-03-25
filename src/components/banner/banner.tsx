import Mha from "../../img/mha.jpg";
import Imagen2 from "../../img/demon.jpg";
import Imagen3 from "../../img/dragon.jpg";
import Imagen4 from "../../img/kengan.jpg";
import Imagen5 from "../../img/naruto.jpg";

// Array de datos para diferentes banners
export const bannerData = [
  {
    imgSrc: Mha,
    subtitle: "Sé dísruptivo",
    title: "Hagamos que las cosas funcionen",
    description: "Somos firma disruptiva con operaciones en Estado Unidos y Costa Rica para entrega de valor el mundo."
  },
  {
    imgSrc: Imagen2,
    subtitle: "Innovación constante",
    title: "Soluciones tecnológicas a medida",
    description: "Desarrollamos soluciones personalizadas que transforman la manera en que las empresas operan en el mercado global."
  },
  {
    imgSrc: Imagen3,
    subtitle: "Experiencia comprobada",
    title: "Más de 10 años creando valor",
    description: "Nuestro equipo de expertos ha ayudado a cientos de empresas a alcanzar sus objetivos de negocio a través de soluciones innovadoras."
  },
  {
    imgSrc: Imagen4,
    subtitle: "Compromiso con la excelencia",
    title: "Calidad que marca la diferencia",
    description: "Cada proyecto que desarrollamos cumple con los más altos estándares de calidad y eficiencia del mercado internacional."
  },
  {
    imgSrc: Imagen5,
    subtitle: "Alcance global",
    title: "Conectamos empresas con el mundo",
    description: "Nuestras soluciones permiten a las empresas expandirse y competir efectivamente en mercados internacionales."
  }
];

// Definir el tipo de props que recibe el componente Banner
interface BannerProps {
  imgSrc: string;
  subtitle: string;
  title: string;
  description: string;
}

// Componente Banner que recibe props individuales
export default function Banner({ imgSrc, subtitle, title, description }: BannerProps) {
  return (
    <div className="banner">
      <div className="banner--img">
        <img
          src={imgSrc}
          alt="banner"
          width="100%"
          className="banner-image"
        />
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