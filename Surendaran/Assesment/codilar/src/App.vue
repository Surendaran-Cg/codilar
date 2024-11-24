<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Main Component',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('product', ['isLoading']),
    ...mapGetters('cart', ['cartItems']),
  },
  mounted() {},
}
</script>

<template>
  <nav class="navbar bg-light sticky-top">
    <div class="container-fluid">
      <span class="navbar-text"><RouterLink to="/">Logo</RouterLink></span>
      <span class="navbar-text ms-auto">
        <RouterLink class="no-underline" to="/about">
          <i class="bi bi-basket"></i>
          <span class="indicator" v-if="cartItems.length > 0">{{ cartItems.length }}</span>
        </RouterLink>
      </span>
    </div>
  </nav>
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
  <RouterView />
</template>

<style lang="scss">
.no-underline {
  text-decoration: none;
}
.indicator {
  margin-left: -7px;
  background-color: red;
  color: white;
  border-radius: 20px;
  font-size: 12px;
  padding: 2px 6px;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure it is above all other elements */
}

/* Spinner styles */
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3; /* Light gray */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Spinner animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
