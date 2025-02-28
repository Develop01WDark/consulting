import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import { faFacebook } from "@fortawesome/free-solid-svg-icons";


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__connect">
          <h2 className="footer__connect-title">Conéctate con nosotros</h2>
          <ul className="footer__social-list">
            <li className="footer__social-item">
              <a href="#" className="footer__social-link">
                <FontAwesomeIcon icon={faSquareFacebook} style={{color: 'rgb(172, 172, 172)'}}/>
              </a>
            </li>
            <li className="footer__social-item">
              <a href="#" className="footer__social-link">
              <FontAwesomeIcon icon={faInstagram} style={{color: 'rgb(172, 172, 172)'}}/>
              </a>
            </li>
            <li className="footer__social-item">
              <a href="#" className="footer__social-link">
              <FontAwesomeIcon icon={faLinkedin} style={{color: 'rgb(172, 172, 172)'}}/>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__info">
          <div className="footer__contact">
            <h3 className="footer__contact-title">Contacto</h3>
            <p className="footer__contact-text">
              Agregamos valor al desarrollo del negocio y a la gestión
              empresarial, logrando que la estrategia de nuestros clientes ocurra.
            </p>
            <a
            
              href="mailto:info@506consulting.com"
              className="footer__contact-email"
            >
              <FontAwesomeIcon icon={faEnvelope} style={{color: 'rgb(151, 58, 75)'}} />
              info@506consulting.com
            </a>
          </div>

          <div className="footer__menu">
            <h3 className="footer__menu-title">Menú</h3>
            <ul className="footer__menu-list">
              <li className="footer__menu-item">
                <a href="#" className="footer__menu-link">
                  Educación
                </a>
              </li>
              <li className="footer__menu-item">
                <a href="#" className="footer__menu-link">
                  Proyectos
                </a>
              </li>
              <li className="footer__menu-item">
                <a href="#" className="footer__menu-link">
                  Servicios
                </a>
              </li>
              <li className="footer__menu-item">
                <a href="#" className="footer__menu-link">
                  Consultoría
                </a>
              </li>
              <li className="footer__menu-item">
                <a href="#" className="footer__menu-link">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__copyright">
          <p className="footer__copyright-text">
            © 506 Consulting. 2022 Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
