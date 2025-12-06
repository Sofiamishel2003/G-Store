<script setup lang="ts">
import { ref } from 'vue'
import { ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cartStore'
import CatalogView from '@/views/CatalogView.vue'
import DetailView from '@/views/DetailView.vue'
import CartView from '@/views/CartView.vue'
import SuccessModal from '@/components/SuccessModal.vue'
import type { Product, ViewType } from '@/types'

const cartStore = useCartStore()
const currentView = ref<ViewType>('catalog')
const selectedProduct = ref<Product | null>(null)
const showSuccessModal = ref(false)

const handleViewDetail = (product: Product) => {
  selectedProduct.value = product
  currentView.value = 'detail'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleAddToCart = (product: Product) => {
  cartStore.addItem(product)
}

const handleAddToCartAndNavigate = (product: Product) => {
  cartStore.addItem(product)
  setTimeout(() => {
    currentView.value = 'cart'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 300)
}

const handleBack = () => {
  currentView.value = 'catalog'
  selectedProduct.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleViewCart = () => {
  currentView.value = 'cart'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleCheckout = () => {
  showSuccessModal.value = true
  setTimeout(() => {
    showSuccessModal.value = false
    cartStore.clearCart()
    currentView.value = 'catalog'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 2500)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-md sticky top-0 z-40">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <button
            @click="handleBack"
            class="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2"
          >
            <span class="text-3xl">🛍️</span>
            <span>G-Store</span>
          </button>

          <!-- Cart Button -->
          <button
            @click="handleViewCart"
            class="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            :class="{ 'bg-gray-100': currentView === 'cart' }"
          >
            <ShoppingCart class="w-6 h-6 text-gray-700" />
            
            <!-- Cart Badge -->
            <span
              v-if="cartStore.totalItems > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse"
            >
              {{ cartStore.totalItems > 99 ? '99+' : cartStore.totalItems }}
            </span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <Transition name="fade" mode="out-in">
        <CatalogView
          v-if="currentView === 'catalog'"
          @add-to-cart="handleAddToCart"
          @view-detail="handleViewDetail"
        />
        
        <DetailView
          v-else-if="currentView === 'detail'"
          :product="selectedProduct"
          @back="handleBack"
          @add-to-cart="handleAddToCartAndNavigate"
        />
        
        <CartView
          v-else-if="currentView === 'cart'"
          @back="handleBack"
          @checkout="handleCheckout"
        />
      </Transition>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-12">
      <div class="container mx-auto px-4 py-6 text-center text-gray-600">
        <p>&copy; 2024 G-Store. Todos los derechos reservados.</p>
        <p class="text-sm mt-2">Desarrollado con ❤️ usando Vue 3 + TypeScript</p>
      </div>
    </footer>

    <!-- Success Modal -->
    <SuccessModal
      v-if="showSuccessModal"
      @close="showSuccessModal = false"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>