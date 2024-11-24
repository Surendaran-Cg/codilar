<script>
import { mapGetters, mapActions } from 'vuex'
import FilterComponent from './../components/Filter.vue'
import { useToast } from 'vue-toastification'

export default {
  name: 'Products',
  data() {
    return {}
  },
  components: {
    FilterComponent,
  },
  computed: {
    ...mapGetters('product', ['products', 'productsInfo', 'isCategoryFilter', 'isLoading']),
  },
  created() {
    this.toast = useToast()
  },
  mounted() {
    this.getAllProducts({ pageNo: 0, searchParam: '' })
    this.getAllCategoires()
  },
  methods: {
    ...mapActions('product', ['getAllProducts', 'getAllCategoires', 'getProductByCategory']),
    ...mapActions('cart', ['addItem']),
    addToCart(product) {
      this.addItem(product)
      this.showCustomToast()
    },
    showCustomToast() {
      this.toast.success('Product added to cart')
    },
    changePage(index) {
      if (this.isCategoryFilter) {
        this.getProductByCategory({
          category: this.isCategoryFilter,
          pageNo: this.productsInfo.currentPage + index,
        })
      } else {
        this.getAllProducts({ pageNo: this.productsInfo.currentPage + index, searchParam: '' })
      }
    },
  },
}
</script>

<template>
  <main>
    <div class="container-fluid mt-5">
      <div class="row">
        <FilterComponent></FilterComponent>
        <div class="col-12">
          <div class="row" v-if="products">
            <div v-for="product in products" class="col-lg-3 col-md-4 col-6 p-4">
              <div class="card h-100 product-card border-0">
                <img :src="product.thumbnail" alt="Shirt" class="card-img-top" />
                <div class="card-body">
                  <h6 class="card-title">{{ product.title }}</h6>
                </div>
                <div class="card-footer bg-white border-0">
                  <p class="card-text">{{ product.price }}</p>
                  <button class="btn btn-outline-dark w-100 btn-sm" @click="addToCart(product)">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div class="text-center" v-if="!isLoading">
              <div class="d-flex text-center mb-3 justify-content-center">
                <button
                  class="btn btn-outline-dark btn-sm"
                  :disabled="productsInfo.currentPage === 0"
                  @click="changePage(-1)"
                >
                  Prev
                </button>
                <button class="btn">
                  {{ productsInfo.currentPage + 1 }} / {{ productsInfo.totalPages }}
                </button>
                <button
                  class="btn btn-outline-dark btn-sm"
                  :disabled="productsInfo.currentPage + 1 >= productsInfo.totalPages"
                  @click="changePage(+1)"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.product-card {
  img {
    height: 266px;
  }
  @media screen and (max-width: 756px) {
    img {
      height: 133px;
    }
  }
  hr {
    margin: 0px;
  }
  .card-body {
    padding-bottom: 0px;
  }
}
</style>
