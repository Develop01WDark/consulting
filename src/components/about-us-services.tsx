import AboutUs from "./about-us-courses";
// import ContactUsCourses from "./contact-us-courses"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChalkboardUser,
  faEarthAmericas,
  faLightbulb,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import IconFuture from "./iconFuture";
// import AboutUs from "./about-us-services"

export default function AboutUsServices() {
  return (
    <div className="container-about-us-services">
      {/* <ContactUsCourses/> */}
      <AboutUs />
      <div className="container-about-us-services__icon-future">
        <h2>Queremos que nuestros cursos te inspiren!</h2>
        <div className="container-about-us-services__icon-future__container">
          <div className="container-about-us-services__icon-future__info">
            <FontAwesomeIcon icon={faSchool} style={{color: '#973a4b'}} />
            <IconFuture
              title="Hazlo tu mismo"
              description="Aprende a organizar tu tiempo de estudio, implica investigar a fondo aplicando la tecnología. en los cursos."
            />
          </div>
          <div className="container-about-us-services__icon-future__info">
            <FontAwesomeIcon icon={faEarthAmericas} style={{color: '#973a4b'}} />
            <IconFuture
              title="Online learning"
              description="Decidí tu mismo, cuando y donde estudiar."
            />
          </div>
          <div className="container-about-us-services__icon-future__info">
            <FontAwesomeIcon icon={faLightbulb} style={{color: '#973a4b'}} />
            <IconFuture
              title="Networking"
              description="Ampliá tu red de contactos."
            />
          </div>
          <div className="container-about-us-services__icon-future__info">
          <FontAwesomeIcon icon={faChalkboardUser} style={{color: '#973a4b'}} />
            <IconFuture
              title="Certificación Internacional"
              description="Certificate en Metodologías Ágiles, Ciberseguridad, Marketing Digital, Lean Six Sigma y sé un profesional más competitivo."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
