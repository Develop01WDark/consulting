import { useContext } from 'react'
import { FiltersContext } from '../context/filters.jsx'

export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products) => {
    // Verificar que products es un array
    if (!Array.isArray(products)) {
      console.error('filterProducts recibió un valor que no es un array:', products)
      return []
    }
    
    return products.filter(product => {
      // Verificar que product es un objeto válido con las propiedades necesarias
      if (!product || typeof product !== 'object') {
        return false
      }
      
      // Verificar que price es un número
      const priceIsValid = typeof product.price === 'number'
      
      return (
        priceIsValid &&
        product.price >= filters.minPrice &&
        (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  return { filters, filterProducts, setFilters }
}