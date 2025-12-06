<script setup lang="ts">
import { Check } from 'lucide-vue-next'

interface Emits {
  (e: 'close'): void
}

defineEmits<Emits>()
</script>

<template>
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click="$emit('close')"
  >
    <div 
      class="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center transform transition-all scale-100 animate-bounce-in"
      @click.stop
    >
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check class="w-10 h-10 text-green-600" />
      </div>
      
      <h2 class="text-2xl font-bold mb-2 text-gray-900">¡Compra Exitosa!</h2>
      <p class="text-gray-600">Tu pedido ha sido procesado correctamente</p>
      
      <div class="mt-6">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-in {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>