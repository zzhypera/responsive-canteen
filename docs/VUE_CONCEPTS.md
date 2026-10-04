# Vue concepts used in Campus Canteen

Where each topic lives in the code.

## 1. Form handling
- `src/composables/useForm.js`: values, rules, errors, submit state, reset.
- Used by `views/auth/Login.vue`, `views/auth/Register.vue`, `views/Checkout.vue`, `views/admin/ProductForm.vue`.
- Pattern: `v-model="values.x"`, `@blur="validateField('x')"`, `@submit.prevent="handleSubmit"`, `novalidate` on the form so our own messages show.

## 2. Limiting events (debounce / throttle)
- `src/composables/useDebounce.js`: `debounce`, `throttle`, `useDebouncedRef`.
- Debounce: `components/SearchBar.vue` only tells the Menu page after you stop typing for 300 ms.
- Throttle: `components/Navbar.vue` runs the window `resize` handler at most every 150 ms.

## 3. Parent-child communication
- Props down, events up: `FoodCard` receives `product` and `favorite`, and emits `add` and `toggle-favorite`. It never touches the cart itself.
- Parents (`Menu`, `Home`, `Favorites`) listen with `@add` / `@toggle-favorite` (logic in `composables/useCatalogActions.js`).
- `v-model` on custom components: `SearchBar` (prop + `update:modelValue`) and `CategoryFilter` (`defineModel`).
- `CartItem` emits `increase` / `decrease` / `remove` to `Cart.vue`.

## 4. Route configuration (`src/router/index.js`)
- Nested routes with layouts, named routes, dynamic params (`:id`).
- `props: true` and `props: route => ...` (FoodDetails, OrderDetails, ProductForm, Menu).
- Lazy-loaded pages, `redirect`, catch-all 404 (`views/NotFound.vue`).
- Global guard (`beforeEach`), per-route guard (`beforeEnter` on product edit), `afterEach` sets the tab title from `meta.title`.
- `scrollBehavior` restores scroll on back/forward.
- Menu filters live in the URL: `/menu?q=rice&category=Meals`.

## 5. Composition API vs Options API
| | Composition API (`<script setup>`) | Options API |
| --- | --- | --- |
| State | `const count = ref(0)` | `data() { return { count: 0 } }` |
| Derived | `computed(() => ...)` | `computed: { ... }` |
| Actions | plain functions | `methods: { ... }` |
| Props / emits | `defineProps`, `defineEmits` | `props: {}`, `emits: []` |
| Reuse | composables | mixins |
| Lifecycle | `onMounted(...)` | `mounted() {}` |

Almost everything uses Composition API. `components/OrderCard.vue` is written in Options API on purpose so you can compare it with `views/OrderDetails.vue`.

## 6. Mixins and composables
- Mixin (Options API): `src/mixins/formatMixin.js`, used by `OrderCard.vue`.
- Composable (Composition API): `src/composables/useFormat.js`, same helpers, used by `OrderDetails.vue`.
- Other composables: `useLocalStorage`, `useForm`, `useDebounce`, `useToast`, `useCatalogActions`.
- Why composables win: you can see where each name comes from, no silent name clashes, and they can be reused with parameters.

## 7. localStorage
- `src/composables/useLocalStorage.js`: a ref that loads from and saves to localStorage.
- Used by the cart, orders, products (admin edits now persist), registered accounts, session user, favorites (`stores/favorites.js`), and last checkout choices.
- Wrapped in try/catch so a blocked or corrupted storage never crashes the app.

## New in the UI
Favorites page (`/favorites`) with heart buttons, toast messages, and a 404 page.
