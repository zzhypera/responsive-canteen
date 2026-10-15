import { useCartStore } from '../stores/cart'
import { useFavoritesStore } from '../stores/favorites'
import { useToast } from './useToast'

// The parent page owns the "what happens" logic; FoodCard (child) only emits events.
export function useCatalogActions() {
  const cart = useCartStore()
  const favorites = useFavoritesStore()
  const { show } = useToast()

  function addToCart(product) {
    cart.addToCart(product)
    show(`${product.name} added to cart`)
  }

  function toggleFavorite(product) {
    const wasFavorite = favorites.isFavorite(product.id)
    favorites.toggle(product.id)
    show(wasFavorite ? 'Removed from favorites' : 'Saved to favorites')
  }

  return { favorites, addToCart, toggleFavorite }
}
