<script setup lang="ts">
import { ref } from 'vue'
import { Star, Plus, Check } from 'lucide-vue-next'
import type { Product } from '@/types'

interface Props {
  product: Product
}

interface Emits {
  (e: 'add-to-cart', product: Product): void
  (e: 'view-detail', product: Product): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isAdding = ref(false)

const handleAddToCart = () => {
  isAdding.value = true
  emit('add-to-cart', props.product)
  setTimeout(() => {
    isAdding.value = false
  }, 600)
}

const handleViewDetail = () => {
  emit('view-detail', props.product)
}

const truncateTitle = (title: string, maxLength: number = 50) => {
  return title.length > maxLength ? title.substring(0, maxLength) + '...' : title
}
</script>

<template>
  <div 
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
  >
    <div @click="handleViewDetail" class="relative">
      <div class="w-full h-64 bg-gray-100 flex items-center justify-center p-4">
        <img
          :src="product.image"
          :alt="product.title"
          class="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>
      
      <div class="p-4">
        <h3 
          class="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors"
          :title="product.title"
        >
          {{ truncateTitle(product.title) }}
        </h3>
        
        <div class="flex items-center mb-2">
          <Star class="w-4 h-4 text-yellow-400 fill-current" />
          <span class="ml-1 text-sm text-gray-600">
            {{ product.rating.rate }} ({{ product.rating.count }})
          </span>
        </div>
        
        <p class="text-2xl font-bold text-green-600 mb-3">
          ${{ product.price.toFixed(2) }}
        </p>
        
        <span class="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
          {{ product.category }}
        </span>
      </div>
    </div>
    
    <div class="px-4 pb-4">
      <button
        @click.stop="handleAddToCart"
        :disabled="isAdding"
        class="w-full py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
        :class="isAdding 
          ? 'bg-green-500 text-white' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'"
      >
        <Check v-if="isAdding" class="w-5 h-5 mr-2" />
        <Plus v-else class="w-5 h-5 mr-2" />
        {{ isAdding ? '¡Agregado!' : 'Agregar al Carrito' }}
      </button>
    </div>
  </div>
</template>