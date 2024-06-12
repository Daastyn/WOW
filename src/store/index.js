import { createStore } from 'vuex';

const Carrello = createStore({
  state: () => ({
    products : [
      { id: 1, name: 'Prodotto 1', image: require('../assets/prodotto1.png'),  description: 'Descrizione del Prodotto 1',quantity: 0 },
      { id: 2, name: 'Prodotto 2', image: require('../assets/prodotto2.png'),  description: 'Descrizione del Prodotto 2', quantity: 0 },
      { id: 3, name: 'Prodotto 3', image: require('../assets/prodotto3.png'),  description: 'Descrizione del Prodotto 3',quantity: 0 },
      { id: 4, name: 'Prodotto 4', image: require('../assets/prodotto4.png'),  description: 'Descrizione del Prodotto 4', quantity: 0 },
      { id: 5, name: 'Prodotto 5', image: require('../assets/prodotto5.png'),  description: 'Descrizione del Prodotto 5',quantity: 0 },
    ],
    cart: [],
  }),
  actions: {
    addToCart(state, product) {
      state.cart.push(product);
    }
  },
  getters: {
    cartItems: state => state.cart
  }
});

export default {Carrello};
