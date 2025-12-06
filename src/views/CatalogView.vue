<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search } from 'lucide-vue-next'
import ProductCard from '@/components/ProductCard.vue'
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue'
import type { Product } from '@/types'

interface Emits {
  (e: 'add-to-cart', product: Product): void
  (e: 'view-detail', product: Product): void
}

const emit = defineEmits<Emits>()

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = computed(() => {
  const cats = [...new Set(products.value.map(p => p.category))]
  return ['all', ...cats]
})

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch('https://fakestoreapi.com/products')
    
    if (!response.ok) {
      throw new Error('Error al cargar los productos')
    }
    
    const data = await response.json()
    products.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido'
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Search and Filters -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search Bar -->
        <div class="flex-1">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar productos..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
        
        <!-- Category Filter -->
        <div>
          <select
            v-model="selectedCategory"
            class="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
          >
            <option value="all">Todas las categorías</option>
            <option 
              v-for="category in categories.filter(c => c !== 'all')" 
              :key="category" 
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
      </div>
      
      <!-- Results Info -->
      <div v-if="!loading && filteredProducts.length > 0" class="mt-4 text-sm text-gray-600">
        Mostrando {{ filteredProducts.length }} producto{{ filteredProducts.length !== 1 ? 's' : '' }}
      </div>
    </div>

    <!-- Error Message -->
    <div 
      v-if="error" 
      class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between"
    >
      <span>{{ error }}</span>
      <button
        @click="fetchProducts"
        class="ml-4 underline hover:no-underline font-semibold"
      >
        Reintentar
      </button>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <!-- Loading Skeletons -->
      <template v-if="loading">
        <ProductCardSkeleton v-for="i in 8" :key="i" />
      </template>
      
      <!-- Products -->
      <template v-else-if="filteredProducts.length > 0">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="emit('add-to-cart', $event)"
          @view-detail="emit('view-detail', $event)"
        />
      </template>
      
      <!-- No Results -->
      <div 
        v-else 
        class="col-span-full text-center py-12"
      >
        <p class="text-gray-500 text-lg">No se encontraron productos</p>
        <button
          @click="searchQuery = ''; selectedCategory = 'all'"
          class="mt-4 text-blue-600 hover:text-blue-700 underline"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  </div>
</template>