import api from './../../services/api'

const productModule = {
  namespaced: true,
  state() {
    return {
      products: [{}],
      pageNo: 0,
      resultPerPage: 12,
      categoires: [{}],
      isCategoryFilter: '',
      isLoading: false,
    }
  },
  mutations: {
    products(state, data) {
      state.products = data
      state.pageNo = data.skip / state.resultPerPage
    },
    categoires(state, data) {
      state.categoires = data
    },
    selectedCategory(state, data) {
      state.isCategoryFilter = data
    },
    setLoading(state, flag) {
      state.isLoading = flag
    },
  },
  actions: {
    async getAllProducts({ commit, state }, { pageNo, searchParam }) {
      commit('setLoading', true)
      await api
        .getAllProducts(state.resultPerPage, pageNo, searchParam)
        .then((res) => commit('products', res.data))
        .catch((err) => console.log(err))
        .finally(() => commit('setLoading', false))
    },
    async getAllCategoires({ commit }) {
      commit('setLoading', true)
      await api
        .getAllCategoires()
        .then((res) => commit('categoires', res.data))
        .catch((err) => console.log(err))
        .finally(() => commit('setLoading', false))
    },
    async getProductByCategory({ commit, state }, data) {
      commit('setLoading', true)
      commit('selectedCategory', data.category)
      await api
        .getProductByCategory(data.category, state.resultPerPage, data.pageNo)
        .then((res) => commit('products', res.data))
        .catch((err) => console.log(err))
        .finally(() => commit('setLoading', false))
    },
  },
  getters: {
    products(state) {
      return state.products.products
    },
    productsInfo(state) {
      return {
        totalPages: Math.ceil(state.products.total / state.resultPerPage),
        currentPage: state.pageNo,
      }
    },
    categoires(state) {
      return state.categoires
    },
    isCategoryFilter(state) {
      return state.isCategoryFilter
    },
    isLoading(state) {
      return state.isLoading
    },
  },
}

export default productModule
