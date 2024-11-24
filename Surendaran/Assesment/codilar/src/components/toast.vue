<template>
  <div>
    <button @click="showToast" class="btn btn-primary">Show Toast</button>
    <div v-show="visible" class="toast top-right">
      <div class="toast-body">This is a toast message!</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    showToast() {
      this.visible = true
      setTimeout(() => (this.visible = false), 5000) // Auto-hide after 5 seconds
    },
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1055;
  background-color: #198754;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
