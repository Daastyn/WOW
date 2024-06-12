<template>
  <div class="cart">
    <h1>Carrello</h1>
    <div v-if="isCartItemsEmpty" class="empty-cart">
      <p>Il carrello è vuoto.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.product.image" alt="Ops non carico" class="cart-item-image">
        <div class="cart-item-info">
          <p class="cart-item-name">{{ item.product.name }}</p>
          <p class="cart-item-description">{{ item.product.description }}</p>
          <p class="cart-item-price">Prezzo: €{{ item.product.price.toFixed(2) }}</p>
          <p class="cart-item-quantity">Quantità: {{ item.quantity }}</p>
          <div class="button-group">
            <button @click="incrementItem(item)" class="btn increment">+</button>
            <button @click="decrementItem(item)" class="btn btn-decrement" :disabled="item.quantity === 1">-</button>
            <button @click="removeItem(item)" class="btn remove">Rimuovi</button>
          </div>
        </div>
      </div>
    </div>
    <div class="back-button-container">
      <button @click="goBack" class="btn btn-go-back">Torna alla Home</button>
    </div>

    <!-- Modal per il pagamento -->
    <div v-if="isPaymentModalOpen" class="modal">
      <div class="modal-content">
        <span @click="closePaymentModal" class="close">&times;</span>
        <h2>Inserisci i Dati di Pagamento</h2>
        <form @submit.prevent="processPayment">
          <div class="form-group">
            <label for="cardNumber">Numero della Carta</label>
            <input type="text" id="cardNumber" v-model="paymentDetails.cardNumber" placeholder="Inserisci il numero della carta" required>
          </div>
          <div class="form-group">
            <label for="cardHolder">Intestatario</label>
            <input type="text" id="cardHolder" v-model="paymentDetails.cardHolder" placeholder="Inserisci il nome dell'intestatario" required>
          </div>
          <div class="form-group">
            <label for="expiryDate">Data di Scadenza</label>
            <input type="text" id="expiryDate" v-model="paymentDetails.expiryDate" placeholder="Inserisci la data di scadenza (MM/YY)" required>
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" v-model="paymentDetails.cvv" placeholder="Inserisci il codice di sicurezza" required>
          </div>
          <button type="submit" class="btn btn-submit">Invia Pagamento</button>
        </form>
      </div>
    </div>

    <!-- Notifica pop-up per il pagamento riuscito -->
    <div v-if="paymentSuccess" class="popup">
      <div class="popup-content">
        <span class="close-popup" @click="closePopup">&times;</span>
        <p class="popup-message">Pagamento riuscito!</p>
      </div>
    </div>
    
    <!-- Totale e pulsante di pagamento sulla destra -->
    <div class="cart-summary-container">
      <div class="total-container">
        <p class="total">Totale: €{{ calculateTotal().toFixed(2) }}</p>
        <button @click="openPaymentModal" class="btn btn-pay">Procedi al Pagamento</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'CartView',
  data() {
    return {
      cartItems: [],
      intervalId: 0,
      isPaymentModalOpen: false,
      paymentDetails: {
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
      },
      paymentSuccess: false
    }
  },
  mounted(){
    this.updateCartItems();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  computed: {
      isCartItemsEmpty() {
        return this.cartItems.length === 0;
      },

  },
  methods: {
    incrementItem(item) {
      this.$store.dispatch('incrementItem', item);
      console.log(item.quantity);
      console.log(this.$store.getters.cartItems)
    },
    decrementItem(item) {
      this.$store.dispatch('decrementItem', item);
      console.log(item.quantity);
      console.log(this.$store.getters.cartItems)
    },
    removeItem(item) {
      this.$store.dispatch('removeItem', item);
      console.log(this.$store.getters.cartItems)
    },
    goBack() {
        this.$router.go(-1);
      },
    updateCartItems(){
      this.intervalId = setInterval(function(){
        this.cartItems=[];
        this.cartItems = this.$store.getters.cartItems;
      }.bind(this), 100);
    },
    // Calcola il totale del carrello
    calculateTotal() {
      return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },
    // Apre il modal per i dati di pagamento
    openPaymentModal() {
      this.isPaymentModalOpen = true;
    },
    // Chiude il modal per i dati di pagamento
    closePaymentModal() {
      this.isPaymentModalOpen = false;
    },
    // Processa il pagamento
    processPayment() {
      // Effettua qui il processo di pagamento (ad es. chiamata API)
      // Se il pagamento ha successo, imposta paymentSuccess a true
      this.paymentSuccess = true;
      this.closePaymentModal();
      alert("Pagamento riuscito!");
  // Svuota il carrello
  this.$store.dispatch('emptyCart');

  // Reindirizza l'utente alla home
  this.$router.push('/');
    },
    // Chiude la notifica pop-up
    closePopup() {
      this.paymentSuccess = false;
    }
  },
}
</script>
<style scoped>
.cart {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column; /* Imposta la direzione dei figli come colonna */
}
h1 {
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
}

.empty-cart {
  font-size: 18px;
  color: #555;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
}

.cart-item:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;
}

.cart-item-info {
  text-align: left;
  flex-grow: 1;
}

.cart-item-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.cart-item-description {
  margin: 10px 0;
  font-size: 16px;
  color: #555;
}

.cart-item-price {
  margin: 10px 0;
  font-size: 18px;
  font-weight: bold;
  color: #000;
}

.cart-item-quantity {
  font-size: 16px;
  color: #777;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.increment {
  background-color: #28a745;
  color: #fff;
}

.decrement {
  background-color: #dc3545;
  color: #fff;
}

.remove {
  background-color: #ffc107;
  color: #fff;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

.increment:hover {
  background-color: #218838;
}

.decrement:hover {
  background-color: #c82333;
}

.remove:hover {
  background-color: #e0a800;
}

.back-button-container {
  margin-top: auto; }

.btn-go-back {
  background-color: #007bff;
  color: #fff;
}

.btn-go-back:hover {
  background-color: #0056b3;
}
/* Stili per il modal */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  max-width: 500px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.btn-submit {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #0056b3;
}

/* Stili per la notifica pop-up */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.popup-content {
  text-align: center;
}

.close-popup {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 18px;
  cursor: pointer;
  color: #333; /* Colore del testo per il pulsante di chiusura */
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.popup-content {
  text-align: center;
}

.close-popup {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 18px;
  cursor: pointer;
  color: #333; /* Colore del testo per il pulsante di chiusura */
}

.popup-message {
  font-size: 18px;
  color: #333; /* Colore del testo del messaggio */
  margin-bottom: 10px;
}
/* Nuovi stili per il riepilogo del carrello */
.cart-summary-container {
  margin-top: auto; /* Spinge il contenuto verso il basso */
  align-self: flex-end; /* Allinea il contenuto alla fine del contenitore */
}

</style>