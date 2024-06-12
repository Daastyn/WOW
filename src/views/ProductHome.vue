<template>
  <div class="home">
    <h1>Menu Prodotti</h1>
    <div class="products">
      <div v-for="product in products" :key="product.id" class="product-item">
        <router-link :to="{ name: 'ProductDetail', params: { id: product.id }}">
          <img :src="product.image" alt="Immagine del prodotto" class="product-image">
          <p class="product-name">{{ product.name }}</p>
          <p class="product-price">€{{ product.price.toFixed(2) }}</p>
        </router-link>
      </div>
    </div>
    <button @click="showCart" class="btn btn-show-cart">Mostra Carrello ({{ cartlength }})</button>
  </div>
</template>

<script>
export default {
  name: 'ProductHome',
  computed: {
    products() {
      return this.$store.getters.products;
    },
    cartlength() {
      return this.$store.getters.cartItems.length;
    },
  },
  methods: {
    showCart() {
      this.$router.push({ name: 'CartView' });
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.product-item {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
}

.product-item:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.product-price {
  font-size: 18px;
  color: #000;
  margin-top: 5px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-show-cart {
  background-color: #007bff;
  color: #fff;
}

.btn-show-cart:hover {
  background-color: #0056b3;
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-show-cart:active {
  transform: translateY(0);
}
</style>
