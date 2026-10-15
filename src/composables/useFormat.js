// Composition API way to share helpers: a plain function that returns what you need.
// (The Options API way is src/mixins/formatMixin.js.)
export function useFormat() {
  const formatPrice = value => `₱${Number(value || 0).toLocaleString()}`
  const formatDate = iso => new Date(iso).toLocaleString()
  const itemsSummary = items => items.map(i => `${i.name} × ${i.quantity}`).join(', ')
  return { formatPrice, formatDate, itemsSummary }
}
