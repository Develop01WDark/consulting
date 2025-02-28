import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconFuture from "./iconFuture";
import { faCubes, faBuildingColumns, faChild, faGraduationCap } from "@fortawesome/free-solid-svg-icons";


export default function HowItWork() {
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
          <h1>¿CÓMO FUNCIONA?</h1>
        </div>
        <div className="container-HowItWork--info--iconFuture">
          <div className="container-HowItWork--info--iconFuture--icon">
            <FontAwesomeIcon icon={faCubes} style={{color: "#973A4B"}}/>
            <IconFuture title="1. Facilidad" description="La mejor experiencia  al ingresar al programa de certificaciones"/>
          </div>
          <div className="container-HowItWork--info--iconFuture--icon">
            <FontAwesomeIcon icon={faBuildingColumns} style={{color: "#973A4B"}}/>
            <IconFuture title="2. E-Learning" description="Sé disruptive y aprendé desde cualquier dispositivo"/>
          </div>
          <div className="container-HowItWork--info--iconFuture--icon">
            <FontAwesomeIcon icon={faChild} style={{color: "#973A4B"}}/>
            <IconFuture title="3. Consultoría y Proyectos" description="Especializados en consutoría y gestión de proyectos."/>
          </div>
          <div className="container-HowItWork--info--iconFuture--icon">
          <FontAwesomeIcon icon={faGraduationCap} style={{color: "#973A4B"}}/>
            <IconFuture title="4. Certificaciones Internacionales" description="Los mejores profesionales son certificados en diferentes productos."/>
          </div>

        </div>
      </div>
    </div>
  );
}
