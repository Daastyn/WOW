import { createRouter, createWebHistory } from 'vue-router';
import ProductHome from '../views/ProductHome.vue';
import ProductDetail from '../views/ProductDetail.vue';
import CartView from '../views/CartView.vue'; // Import corretto di CartView

const routes = [
  {
    path: '/',
    name: 'ProductHome',
    component: ProductHome
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/cart',
    name: 'CartView',
    component: CartView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
