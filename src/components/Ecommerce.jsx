import { useFilters } from '../hooks/useFilters'; // <-- esta línea es clave
import { Products } from './Products';
import { IS_DEVELOPMENT } from '../config';
import { Cart } from './Cart';

function Ecommerce({ products = [] }) {
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(products);

  return (
    <>
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT}
    </>
  );
}

export default Ecommerce;
