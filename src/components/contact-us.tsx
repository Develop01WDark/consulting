import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactUs() {
  return (
    <div className="container-contactUs">
      <div className="container-contactUs__info">
        <div className="container-contactUs--title">
          <h2>Contáctanos!</h2>
        </div>
        <div className="container-contactUs--title-icon">
          <span>
            <FontAwesomeIcon icon={faEnvelope} style={{color: "#973A4B"}}/>
          </span>
        </div>
        <div className="container-contactUs--title-description">
          <p>Déjanos tus datos y en menos de 24 horas nos comunicamos</p>
        </div>
      </div>
      <div className="container-contactUs__form">
        <form action="">
          <div className="form-item">
            <label htmlFor="">Nombre</label>
            <input type="text" placeholder="Nombre Completo"/>
          </div>
          <div className="form-item">
            <label htmlFor="">Correo electrónico</label>
            <input type="text" placeholder="Correo electrónico"/>
          </div>
          <div className="form-item">
            <label htmlFor="">Télefono</label>
            <input type="text" placeholder="Télefono"/>
          </div>
          <div className="form-item">
            <label htmlFor="">Asunto</label>
            <input type="text" placeholder=""/>
          </div>
          <div className="form-item">
            <label htmlFor="">Mensaje</label>
            <textarea name="" id=""></textarea>
          </div>
          <div className="form-item enviar">
            <input type="submit" value="Enviar" className="submit"/>
          </div>
        </form>
        <div className="container-contactUs__form--img">
          <div style={{background: 'url("https://506consulting.com/sites/default/files/gbb-uploads/bg-3.jpg") left/cover no-repeat'}}></div>
        </div>
      </div>
    </div>
  );
}
