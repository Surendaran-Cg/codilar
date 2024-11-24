import APIS from './../constants/api'
import axios from 'axios'

export default {
  getAllProducts(resultPerPage, pageNo, serachParam = '') {
    let queryParam =
      '/search?limit=' + resultPerPage + '&skip=' + pageNo * resultPerPage + '&q=' + serachParam
    return axios.get(APIS.PRODUCTS + queryParam)
  },
  getAllCategoires() {
    return axios.get(APIS.CATEGORIES)
  },
  getProductByCategory(data, resultPerPage, pageNo) {
    return axios.get(
      APIS.GETBYCATEGORY + data + '?limit=' + resultPerPage + '&skip=' + pageNo * resultPerPage,
    )
  },
}
