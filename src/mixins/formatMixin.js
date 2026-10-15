// Options API way to share helpers: a MIXIN. Its data/methods/computed are merged
// into every component that lists it in `mixins: [formatMixin]`.
// Drawbacks (why Vue 3 prefers composables): names can clash silently, and it is
// hard to see where `this.formatPrice` came from.
export default {
  methods: {
    formatPrice(value) {
      return `₱${Number(value || 0).toLocaleString()}`
    },
    formatDate(iso) {
      return new Date(iso).toLocaleString()
    },
    itemsSummary(items) {
      return items.map(i => `${i.name} × ${i.quantity}`).join(', ')
    }
  }
}
