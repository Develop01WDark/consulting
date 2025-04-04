import "./productdetail.css";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart.js"; // Asegúrate de que la ruta sea correcta
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons.jsx";

function ProductDetail({ products }) {
  const { addToCart, removeFromCart, cart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  const isProductInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="product-detail">
      <div className="product-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
      </div>
      <div className="product-actions">
        <img src={product.thumbnail} alt={product.title} />
        <p className="product-price" >${product.price}</p>
        <button
          className="add-to-cart"
          style={{ backgroundColor: isProductInCart ? "red" : "#09f" }}
          onClick={() => {
            isProductInCart ? removeFromCart(product) : addToCart(product);
          }}
        >
          {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
          {isProductInCart ? " Quitar del carrito" : " Agregar al carrito"}
        </button>

        <button
          className="back-to-store"
          onClick={() => navigate("/ecommerce")}
        >
          Volver a la tienda
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
