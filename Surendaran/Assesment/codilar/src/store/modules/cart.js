import api from './../../services/api'

const cartModule = {
  namespaced: true,
  state() {
    return {
      items: [],
      cartItems: [],
      cartDetails: [],
    }
  },
  mutations: {
    updateCart(state, data) {
      state.cartItems = data
    },
  },
  actions: {
    addItem({ commit, state }, data) {
      let index = state.cartItems.findIndex((e) => e.id === data.id)
      let dataState = state.cartItems
      if (index >= 0) {
        dataState[index].buyQty += 1
      } else {
        data.buyQty = 1
        dataState.push(data)
      }
      commit('updateCart', dataState)
    },
    reduceItem({ commit, state }, data) {
      let dataState = state.cartItems
      let index = state.cartItems.findIndex((e) => e.id === data.id)
      if (dataState[index].buyQty === 1) {
        dataState.splice(index, 1)
      } else {
        dataState[index].buyQty -= 1
      }
      commit('updateCart', dataState)
    },
    removeItem({ commit, state }, data) {
      let dataState = state.cartItems
      let index = state.cartItems.findIndex((e) => e.id === data.id)
      dataState.splice(index, 1)
      commit('updateCart', dataState)
    },
  },
  getters: {
    cartItems(state) {
      return state.cartItems
    },
    cartDetails(state) {
      let buyQty = 0
      let buyAmt = 0
      state.cartItems.forEach((element) => {
        buyQty += element.buyQty
        buyAmt += element.buyQty * element.price
      })
      return {
        totalProduct: state.cartItems.length,
        totalQty: buyQty,
        totalAmt: buyAmt,
      }
    },
  },
}

export default cartModule
