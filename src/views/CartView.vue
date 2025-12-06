<script setup lang="ts">
import { ArrowLeft, ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cartStore'
import CartItem from '@/components/CartItem.vue'

interface Emits {
  (e: 'back'): void
  (e: 'checkout'): void
}

const emit = defineEmits<Emits>()
const cartStore = useCartStore()
</script>

<template>
  <div>
    <!-- Back Button -->
    <button
      @click="emit('back')"
      class="flex items-center text-blue-600 hover:text-blue-700 mb-6 font-semibold transition-colors"
    >
      <ArrowLeft class="w-5 h-5 mr-2" />
      Continuar comprando
    </button>

    <!-- Cart Content -->
    <div class="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
        Carrito de Compras
      </h1>

      <!-- Empty Cart -->
      <div v-if="cartStore.itemCount === 0" class="text-center py-12">
        <ShoppingCart class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p class="text-gray-500 text-lg mb-4">Tu carrito está vacío</p>
        <button
          @click="emit('back')"
          class="text-blue-600 hover:text-blue-700 font-semibold underline"
        >
          Explorar productos
        </button>
       </div>
<!-- Cart Items -->
  <div v-else>
    <div class="space-y-4 mb-6">
      <CartItem
        v-for="item in cartStore.items"
        :key="item.id"
        :item="item"
        @increment="cartStore.incrementQuantity"
        @decrement="cartStore.decrementQuantity"
        @remove="cartStore.removeItem"
      />
    </div>

    <!-- Cart Summary -->
    <div class="border-t pt-6 space-y-4">
      <div class="flex justify-between text-lg">
        <span class="text-gray-600">Subtotal:</span>
        <span class="font-semibold">${{ cartStore.totalAmount.toFixed(2) }}</span>
      </div>
      
      <div class="flex justify-between text-lg">
        <span class="text-gray-600">Envío:</span>
        <span class="font-semibold text-green-600">Gratis</span>
      </div>
      
      <div class="flex justify-between text-xl md:text-2xl font-bold border-t pt-4">
        <span>Total:</span>
        <span class="text-green-600">${{ cartStore.totalAmount.toFixed(2) }}</span>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          @click="cartStore.clearCart"
          class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-colors"
        >
          Vaciar Carrito
        </button>
        
        <button
          @click="emit('checkout')"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  </div>
</div>
</div>
</template>
