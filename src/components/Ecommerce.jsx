import React from "react";
import { products as initialProducts } from '../mocks/products.json'
import { Products } from './Products.jsx'
import { IS_DEVELOPMENT } from '../config.js'
import { useFilters } from '../hooks/useFilters.js'
import { Cart } from './Cart.jsx'
import { CartProvider } from '../context/cart.jsx'

function Ecommerce () {
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(initialProducts)

  return (
    <CartProvider>
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <div>Development Mode</div>}
    </CartProvider>
  )
}

export default Ecommerce;