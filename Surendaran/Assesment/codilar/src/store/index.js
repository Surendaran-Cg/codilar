import { createStore } from 'vuex'
import productModule from './modules/products'
import cartModule from './modules/cart'

const store = createStore({
  modules: {
    product: productModule,
    cart: cartModule,
  },
})

export default store
