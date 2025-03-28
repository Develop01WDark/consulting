import ProductCard from "./productcard";

const products = [
  { id: "1", name: "Lerew", price: 173.75, image: "https://via.placeholder.com/300" },
  { id: "2", name: "Michael Kors", price: 156.25, image: "https://via.placeholder.com/300" },
];

export default function ProductList() {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
