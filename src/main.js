import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex';
import router from './router'

const store = createStore({
  state: () => ({
    products : [
      { id: 1, name: 'Prodotto 1', image: require('./assets/prodotto1.png'),  description: 'Descrizione del Prodotto 1', price: 10.99 },
      { id: 2, name: 'Prodotto 2', image: require('./assets/prodotto2.png'),  description: 'Descrizione del Prodotto 2', price: 12.99 },
      { id: 3, name: 'Prodotto 3', image: require('./assets/prodotto3.png'),  description: 'Descrizione del Prodotto 3', price: 8.99 },
      { id: 4, name: 'Prodotto 4', image: require('./assets/prodotto4.png'),  description: 'Descrizione del Prodotto 4', price: 15.49 },
      { id: 5, name: 'Prodotto 5', image: require('./assets/prodotto5.png'),  description: 'Descrizione del Prodotto 5', price: 9.99 },
    ],
    cart: [], // Struttura: { id: 1, name: 'Prodotto', quantity: 1 }
  }),
  mutations: {
    addToCart(state, product) {
      let cartItem;
      let productTaken=false;
      //console.log(product.product.id)
      for (let index = 0; index < state.cart.length; index++) {
        //console.log('///')
       // console.log(product.product.id)
        //console.log(state.cart[index].product.id)
        //console.log(product.product.id==state.cart[index].product.id)
        //console.log('///')
        if(product.product.id==state.cart[index].product.id){
          productTaken=true
          cartItem=state.cart[index]
          break;
        }
        
      }
       // console.log(productTaken)
        //console.log(cartItem)
       if (productTaken==false) {
        const newCartItem = {...product, quantity:1
        };
        state.cart.push(newCartItem);
      } else {
       this.commit('incrementItem',cartItem);
       // console.log(cartItem.name)
      }
    },
    removeItem(state, product) {
      //console.log(state.cart)
      state.cart = state.cart.filter(item => item.product.id !== product.product.id);
    },
    incrementItem(state, matchingCartItem) {
      //console.log(matchingCartItem)
      let newStateCart = state.cart;
      let cartItem = newStateCart.find(item => item.product.id === matchingCartItem.product.id);
      //console.log(cartItem)
      if (cartItem !== undefined) {
        cartItem.quantity++;
        state.cart = newStateCart;
       // console.log(cartItem.quantity);
      }
    },
    decrementItem(state, product) {
      let cartItem = state.cart.find(item => item.product.id === product.product.id);
      if (cartItem !== undefined && cartItem.quantity > 0) {
        cartItem.quantity--;
        //console.log(cartItem.quantity);
      }
    },
    emtpyCart(state){
        state.cart=[];
        console.log(state.cart)
    }
  },
  actions: {
    addToCart(context, product) {
      context.commit('addToCart', product);
    },
    removeItem(context, product) {
      context.commit('removeItem', product);
    },
    incrementItem(context, product) {
      context.commit('incrementItem', product);
    },
    decrementItem(context, product) {
      context.commit('decrementItem', product);
    },
    emptyCart(context){
      context.commit('emtpyCart');
    }
  },
  getters: {
    cartItems: state => state.cart,
    products: state => state.products
  }
});

createApp(App).use(store).use(router).mount('#app');
