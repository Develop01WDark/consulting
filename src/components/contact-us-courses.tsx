import IconFuture from "./iconFuture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMap, faFaceSmile, faStar } from "@fortawesome/free-solid-svg-icons";
export default function ContactUsCourses() {
  return (
    <div className="container-contactUsCourse">
      <div className="container-contactUsCourse-container">
        <div className="container-contactUsCourse--form">
          <form className="form-contactUs">
            <h4>Contáctanos!</h4>
            <div className="form-item">
              <input type="text" placeholder="Nombre Completop" />
            </div>
            <div className="form-item">
              <input type="email" placeholder="Correo electronico" />
            </div>
            <div className="form-item">
              <input type="number" placeholder="Telefono" />
            </div>
            <div className="submit">
              <input type="submit" value="Enviar" />
            </div>
          </form>
        </div>
        <div className="container-contactUsCourse--course-free">
          <div className="container-contactUsCourse--course-free__info">
            <h4>Cursos Gratuitos</h4>
            <p>Accesá a nuestros cursos gratuitos</p>
          </div>
          <div className="container-contactUsCourse--course-free__info__iconFuture">
            <div className="container-contactUsCourse--course-free__info__iconFuture--icon">
              <FontAwesomeIcon icon={faCopy} />
              <IconFuture title="12" description="Certificaciones Gratuitas" />
            </div>
            <div className="container-contactUsCourse--course-free__info__iconFuture--icon">
              <FontAwesomeIcon icon={faMap} />
              <IconFuture
                title="23"
                description="Certificaciones Internacionales"
              />
            </div>
            <div className="container-contactUsCourse--course-free__info__iconFuture--icon">
              <FontAwesomeIcon icon={faFaceSmile} />
              <IconFuture title="200" description="Estudiantes felices" />
            </div>
            <div className="container-contactUsCourse--course-free__info__iconFuture--icon">
              <FontAwesomeIcon icon={faStar} />
              <IconFuture
                title="23"
                description="Instructores Expertos y Certificados"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
