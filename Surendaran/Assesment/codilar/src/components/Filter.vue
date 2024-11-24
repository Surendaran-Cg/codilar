<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Products',
  data() {
    return {
      selectedValues: '',
      searchParam: '',
    }
  },
  computed: {
    ...mapGetters('product', ['categoires']),
  },
  mounted() {
    this.getAllCategoires()
  },
  methods: {
    ...mapActions('product', ['getAllCategoires', 'getProductByCategory', 'getAllProducts']),
    selectFilter(value) {
      if (this.selectedValues === value) {
        this.selectedValues = null
        this.getAllProducts({ pageNo: 0, searchParam: '' })
      } else {
        this.searchParam = ''
        this.selectedValues = value
        this.getProductByCategory({ category: value, pageNo: 0 })
      }
    },
    searchProduct() {
      this.selectedValues = null
      this.getAllProducts({ pageNo: 0, searchParam: this.searchParam })
    },
  },
}
</script>
<template>
  <div class="col-12">
    <div class="container">
      <div class="row">
        <div class="col-9 d-flex">
          <input class="w-100 border-0 mr-2" v-model="searchParam" />
          <button class="btn btn-outline-dark w-25 btn-sm" @click="searchProduct">Search</button>
        </div>
        <div class="col-3">
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categoire
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li v-for="(categoire, index) in categoires" :key="categoire.name">
                <input
                  type="checkbox"
                  class="form-check-input"
                  :id="'checkbox-' + index"
                  :value="categoire.name"
                  :checked="selectedValues === categoire.name"
                  @click="selectFilter(categoire.name)"
                />
                <label class="form-check-label" :for="'checkbox-' + index">{{
                  categoire.name
                }}</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  text-align: end;
}
.dropdown-menu {
  max-height: 200px;
  overflow-y: auto;
  width: 200px;
  li {
    border-bottom: 1px solid black;
  }
  input {
    border: 1px solid black;
    margin: 5px;
  }
  label {
    margin: 1px 5px;
  }
  .form-check-input:checked {
    background-color: black;
  }
}
</style>
