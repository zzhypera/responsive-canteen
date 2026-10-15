import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useProductsStore } from '../stores/products'

// Layouts stay eager (they are needed on first paint).
import MainLayout from '../layouts/MainLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// Pages are LAZY-LOADED: each `() => import(...)` becomes its own JS file that the
// browser downloads only when the route is first visited.
const Home = () => import('../views/Home.vue')
const Menu = () => import('../views/Menu.vue')
const FoodDetails = () => import('../views/FoodDetails.vue')
const Favorites = () => import('../views/Favorites.vue')
const Cart = () => import('../views/Cart.vue')
const Checkout = () => import('../views/Checkout.vue')
const OrderSuccess = () => import('../views/OrderSuccess.vue')
const Orders = () => import('../views/Orders.vue')
const OrderDetails = () => import('../views/OrderDetails.vue')
const Profile = () => import('../views/Profile.vue')
const NotFound = () => import('../views/NotFound.vue')
const Login = () => import('../views/auth/Login.vue')
const Register = () => import('../views/auth/Register.vue')

const Dashboard = () => import('../views/admin/Dashboard.vue')
const AdminOrders = () => import('../views/admin/Orders.vue')
const Products = () => import('../views/admin/Products.vue')
const ProductForm = () => import('../views/admin/ProductForm.vue')
const Categories = () => import('../views/admin/Categories.vue')
const Customers = () => import('../views/admin/Customers.vue')

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: Home, meta: { title: 'Home' } },
      {
        path: 'menu',
        name: 'menu',
        component: Menu,
        meta: { title: 'Menu' },
        // Route -> props: ?q=rice&category=Meals reaches the page as normal props
        props: route => ({
          initialSearch: String(route.query.q || ''),
          initialCategory: String(route.query.category || 'All')
        })
      },
      // props: true -> :id arrives as a prop, so the page does not need useRoute()
      { path: 'menu/:id', name: 'food-details', component: FoodDetails, props: true, meta: { title: 'Food details' } },
      { path: 'favorites', name: 'favorites', component: Favorites, meta: { title: 'Favorites' } },
      { path: 'cart', name: 'cart', component: Cart, meta: { title: 'Cart' } },
      { path: 'checkout', name: 'checkout', component: Checkout, meta: { requiresAuth: true, title: 'Checkout' } },
      { path: 'order-success', name: 'order-success', component: OrderSuccess, meta: { requiresAuth: true, title: 'Order placed' } },
      { path: 'orders', name: 'orders', component: Orders, meta: { requiresAuth: true, title: 'My orders' } },
      { path: 'orders/:id', name: 'order-details', component: OrderDetails, props: true, meta: { requiresAuth: true, title: 'Order details' } },
      { path: 'profile', name: 'profile', component: Profile, meta: { requiresAuth: true, title: 'Profile' } },
      // Redirects and aliases
      { path: 'home', redirect: { name: 'home' } },
      { path: 'my-orders', redirect: { name: 'orders' } },
      // 404: matches anything nothing else matched (keep this LAST)
      { path: ':pathMatch(.*)*', name: 'not-found', component: NotFound, meta: { title: 'Page not found' } }
    ]
  },
  { path: '/login', name: 'login', component: Login, meta: { guestOnly: true, title: 'Login' } },
  { path: '/register', name: 'register', component: Register, meta: { guestOnly: true, title: 'Create account' } },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', name: 'admin-dashboard', component: Dashboard, meta: { title: 'Dashboard' } },
      { path: 'orders', name: 'admin-orders', component: AdminOrders, meta: { title: 'Manage orders' } },
      { path: 'products', name: 'admin-products', component: Products, meta: { title: 'Products' } },
      { path: 'products/create', name: 'admin-product-create', component: ProductForm, meta: { title: 'Add product' } },
      {
        path: 'products/:id/edit',
        name: 'admin-product-edit',
        component: ProductForm,
        props: true,
        meta: { title: 'Edit product' },
        // Per-route guard: unknown product ids go back to the list
        beforeEnter: to => {
          if (!useProductsStore().getProduct(to.params.id)) return { name: 'admin-products' }
        }
      },
      { path: 'categories', name: 'admin-categories', component: Categories, meta: { title: 'Categories' } },
      { path: 'customers', name: 'admin-customers', component: Customers, meta: { title: 'Customers' } }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'router-link-active',
  // Back/forward restores the old scroll position; new pages start at the top
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// Global guard: login / admin / guest-only checks
router.beforeEach(to => {
  const auth = useAuthStore()
  const needsAuth = to.matched.some(r => r.meta.requiresAuth)
  const needsAdmin = to.matched.some(r => r.meta.requiresAdmin)
  const guestOnly = to.matched.some(r => r.meta.guestOnly)

  if (needsAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (needsAdmin && !auth.isAdmin) return { name: 'menu' }
  if (guestOnly && auth.isAuthenticated) return { name: auth.isAdmin ? 'admin-dashboard' : 'menu' }
})

// Set the browser tab title from meta.title
router.afterEach(to => {
  document.title = to.meta.title ? `${to.meta.title} · Campus Canteen` : 'Campus Canteen'
})

export default router
