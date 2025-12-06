<script setup lang="ts">
import { Plus, Minus, Trash2 } from 'lucide-vue-next'
import type { CartItem } from '@/types'

interface Props {
  item: CartItem
}

interface Emits {
  (e: 'increment', id: number): void
  (e: 'decrement', id: number): void
  (e: 'remove', id: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="flex items-center gap-4 border-b pb-4 hover:bg-gray-50 transition-colors p-2 rounded-lg">
    <img
      :src="item.image"
      :alt="item.title"
      class="w-20 h-20 object-contain flex-shrink-0"
    />
    
    <div class="flex-1 min-w-0">
      <h3 class="font-semibold text-gray-800 truncate">{{ item.title }}</h3>
      <p class="text-sm text-gray-500">{{ item.category }}</p>
      <p class="text-green-600 font-bold mt-1">${{ item.price.toFixed(2) }}</p>
    </div>
    
    <div class="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button
        @click="emit('decrement', item.id)"
        class="p-2 rounded hover:bg-white transition-colors"
        :disabled="item.quantity <= 1"
        :class="item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''"
      >
        <Minus class="w-4 h-4" />
      </button>
      
      <span class="w-10 text-center font-semibold">{{ item.quantity }}</span>
      
      <button
        @click="emit('increment', item.id)"
        class="p-2 rounded hover:bg-white transition-colors"
      >
        <Plus class="w-4 h-4" />
      </button>
    </div>
    
    <div class="text-right flex-shrink-0 w-24">
      <p class="font-bold text-lg">${{ (item.price * item.quantity).toFixed(2) }}</p>
    </div>
    
    <button
      @click="emit('remove', item.id)"
      class="p-2 text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0"
      title="Eliminar producto"
    >
      <Trash2 class="w-5 h-5" />
    </button>
  </div>
</template>