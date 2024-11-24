<script>
import { mapGetters, mapActions } from 'vuex'
import { useToast } from 'vue-toastification'

export default {
  created() {
    this.toast = useToast()
  },
  computed: {
    ...mapGetters('cart', ['cartItems', 'cartDetails']),
  },
  methods: {
    ...mapActions('cart', ['addItem', 'reduceItem', 'removeItem']),
    increaseQty(data) {
      this.addItem(data)
      this.toast.success('Quantity added to cart')
    },
    decreaseQty(data) {
      this.reduceItem(data)
      this.toast.success('Quantity removed from cart')
    },
    roundToDecimals(number, decimals) {
      const factor = Math.pow(10, decimals)
      return Math.round(number * factor) / factor
    },
    removeProduct(data) {
      this.removeItem(data)
      this.toast.success('Product removed from cart')
    },
  },
}
</script>
<template>
  <div class="container py-4">
    <h1>Cart</h1>
    <div v-if="cartItems.length === 0">No Items in your cart.</div>
    <div v-else>
      <div>
        <table class="table text-center">
          <thead>
            <tr>
              <th scope="col">PRODUCT</th>
              <th scope="col">PRICE</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">TOTAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="cart-items">
            <tr v-for="item in cartItems">
              <th scope="row">
                <img class="" :src="item.thumbnail" alt="" />
              </th>
              <td>{{ item.price }}</td>
              <td>
                <div class="d-flex justify-content-center">
                  <p class="qty-change" @click="decreaseQty(item)">-</p>
                  <p class="qty">{{ item.buyQty }}</p>
                  <p class="qty-change" @click="increaseQty(item)">+</p>
                </div>
              </td>
              <td>{{ roundToDecimals(item.price * item.buyQty, 2) }}</td>
              <td @click="removeProduct(item)">
                <span class="remove-qty">X</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1>Cart Summary</h1>
      <div class="cart-summary row">
        <div class="col-12 col-md-6">
          <p>Total Products : {{ cartDetails.totalProduct }}</p>
          <p>Total Qty : {{ cartDetails.totalQty }}</p>
          <p>Total Amounts : {{ cartDetails.totalAmt }}</p>
        </div>
        <div class="col-12 col-md-6">
          <p>Address :</p>
          <p>Shipping Charge : Free</p>
          <p>Discount Applied :</p>
          <button class="btn btn-outline-dark w-100 btn-sm">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cart-items {
  img {
    height: 80px;
  }
  .qty-change {
    background: black;
    color: white;
    padding: 0;
    margin: 0;
    height: 28px;
    border-radius: 30px;
    width: 28px;
    text-align: center;
  }
  .qty {
    border: 1px solid black;
    width: 50px;
    border-radius: 20px;
    text-align: center;
    margin: 0px 10px;
  }
  td {
    align-content: center;
  }
  .remove-qty {
    background-color: black;
    color: white;
    padding: 4px 8px;
    border-radius: 30px;
  }
}
.cart-summary {
  background-color: white;
  padding: 20px;
}
</style>
