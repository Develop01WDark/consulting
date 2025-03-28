import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUserGraduate, faDiagramProject, faScrewdriverWrench, faComment, faEnvelope, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [clickMenu, setClickMenu] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Simulación de actualización del carrito
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  }, []);

  return ( 
    <header ref={headerRef}>
      <div className="container-header">
        <div className="container-header__img">
          <img
            src="https://506consulting.com/sites/default/files/crcs_logo_Mesa%20de%20trabajo%201%20copy%204.png"
            alt="logo"
          />
        </div>
        <div className="container-header__info">
          <div className={`container-header__info--links ${clickMenu ? 'active' : ''}`}>
            <ul>
              <li> <FontAwesomeIcon icon={faUserGraduate} /> Educación</li>
              <li> <FontAwesomeIcon icon={faDiagramProject} /> Proyectos</li>
              <li> <FontAwesomeIcon icon={faScrewdriverWrench} /> Servicios</li>
              <li> <FontAwesomeIcon icon={faComment} /> Consultorías</li>
              <li> <FontAwesomeIcon icon={faEnvelope} /> Contacto</li>
              <li onClick={() => navigate('/ecommerce')} style={{ cursor: 'pointer' }}>E-commerce</li>
            </ul>
          </div>
          <div className="container-header__info--icons">
            {/* Carrito de Compras */}
            <div className="cart-icon" onClick={() => navigate('/cart')} style={{ cursor: 'pointer', position: 'relative' }}>
              <FontAwesomeIcon icon={faShoppingCart} style={{ color: "#973A4B" }} />
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </div>
            {/* Barra de Búsqueda */}
            <div className="container-header__info--search">
              <form className={`container-header__info--search--form ${search ? 'active' : ''}`}>
                <input type="text" className="text"/>
                <input type="submit" value='Buscar' className="search"/>
              </form>
              <div className="container-header__info--search--icon" onClick={()=>{setSearch(prev => !prev)}}>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#973A4B"}} />
              </div>
            </div>
          </div>
          {/* Menú Hamburguesa */}
          <div className={`hamburger is-lg ${clickMenu ? 'is-active' : ''}`} onClick={()=>{setClickMenu(state => !state)}}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
