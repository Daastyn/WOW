<template>
  <div class="product-detail">
    <h1>Dettagli del Prodotto</h1>
    <div class="product-container">
      <img :src="product.image" alt="Immagine non disponibile" class="product-image">
      <div class="product-info">
        <p class="product-id">ID: {{ product.id }}</p>
        <p class="product-name">Nome: {{ product.name }}</p>
        <p class="product-description">Descrizione: {{ product.description }}</p>
        <p class="product-price">Prezzo: €{{ product.price.toFixed(2) }}</p>
        <button @click="addToCart(product)" class="btn btn-add-cart">Aggiungi al carrello</button>
        <button @click="goBack" class="btn btn-go-back">Torna indietro</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ProductDetail',
  computed: {
    product() {
      return this.$store.getters.products.find(product => product.id == this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', { product: product });
    }
  }
}
</script>

<style scoped>
.product-detail {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
}

.product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
}

.product-container:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.05);
}

.product-info {
  text-align: left;
  width: 100%;
}

.product-id {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.product-name {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
}

.product-description {
  margin: 10px 0;
  font-size: 16px;
  color: #555;
}

.product-price {
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
  color: #000;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  margin: 10px 5px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-add-cart {
  background-color: #28a745;
  color: #fff;
}

.btn-go-back {
  background-color: #007bff;
  color: #fff;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

.btn-add-cart:hover {
  background-color: #218838;
}

.btn-go-back:hover {
  background-color: #0056b3;
}
</style>
