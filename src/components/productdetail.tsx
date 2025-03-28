import { useParams } from "react-router-dom";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Lace up shoes Lerews beige",
    brand: "LEREW",
    price: "173.75€",
    rating: 4,
    reviews: 92,
    description: "Elegant lace-up shoes in beige, perfect for casual and formal wear.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: 'Slip-On Shoes "Olivia" Michael Kors white',
    brand: "MICHAEL KORS",
    price: "156.25€",
    rating: 4,
    reviews: 72,
    description: "Comfortable slip-on shoes in white, ideal for everyday use.",
    image: "https://via.placeholder.com/300",
  },
];

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [added, setAdded] = useState(false);

  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>{product.brand}</h1>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "10px" }} />
      <p style={{ fontSize: "18px", margin: "10px 0" }}>{product.description}</p>
      <p style={{ fontSize: "20px", fontWeight: "bold", color: "red" }}>{product.price}</p>
      <p>{"⭐".repeat(product.rating)} ({product.reviews} reviews)</p>
      <button 
        onClick={handleAddToCart} 
        style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}
      >
        {added ? "Añadido ✔" : "Añadir al carrito"}
      </button>
    </div>
  );
};

export default ProductDetail;
