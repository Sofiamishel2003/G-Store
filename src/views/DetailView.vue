<script setup lang="ts">
import { ArrowLeft, Star, Plus } from 'lucide-vue-next'
import type { Product } from '@/types'

interface Props {
  product: Product | null
}

interface Emits {
  (e: 'back'): void
  (e: 'add-to-cart', product: Product): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleAddToCart = () => {
  if (props.product) {
    emit('add-to-cart', props.product)
  }
}
</script>

<template>
  <div v-if="product">
    <!-- Back Button -->
    <button
      @click="emit('back')"
      class="flex items-center text-blue-600 hover:text-blue-700 mb-6 font-semibold transition-colors"
    >
      <ArrowLeft class="w-5 h-5 mr-2" />
      Volver al catálogo
    </button>

    <!-- Product Detail -->
    <div class="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Product Image -->
        <div class="flex items-center justify-center bg-gray-50 rounded-lg p-8">
          <img
            :src="product.image"
            :alt="product.title"
            class="max-h-96 max-w-full object-contain"
          />
        </div>

        <!-- Product Info -->
        <div class="space-y-4">
          <h1 class="text-3xl font-bold text-gray-900">
            {{ product.title }}
          </h1>

          <div class="flex items-center space-x-4 flex-wrap">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {{ product.category }}
            </span>
            
            <div class="flex items-center">
              <Star class="w-5 h-5 text-yellow-400 fill-current" />
              <span class="ml-1 font-semibold">
                {{ product.rating.rate }}
              </span>
              <span class="ml-1 text-gray-500">
                ({{ product.rating.count }} reseñas)
              </span>
            </div>
          </div>

          <p class="text-4xl font-bold text-green-600">
            ${{ product.price.toFixed(2) }}
          </p>

          <div class="border-t pt-4">
            <h2 class="text-xl font-semibold mb-2">Descripción</h2>
            <p class="text-gray-700 leading-relaxed">
              {{ product.description }}
            </p>
          </div>

          <div class="border-t pt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">ID del Producto:</span>
              <span class="font-semibold">{{ product.id }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Categoría:</span>
              <span class="font-semibold">{{ product.category }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Valoración:</span>
              <span class="font-semibold">{{ product.rating.rate }}/5</span>
            </div>
          </div>

          <button
            @click="handleAddToCart"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center mt-6"
          >
            <Plus class="w-5 h-5 mr-2" />
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="text-center py-12">
    <p class="text-gray-500 text-lg">Producto no encontrado</p>
  </div>
</template>