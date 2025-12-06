import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, CartItem } from '@/types'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([])
  const isLoaded = ref(false)

  // Load from localStorage on initialization
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('gstore-cart')
      if (stored) {
        items.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    }
    isLoaded.value = true
  }

  // Save to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem('gstore-cart', JSON.stringify(items.value))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }

  // Getters
  const totalItems = computed(() => 
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalAmount = computed(() => 
    items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  )

  const itemCount = computed(() => items.value.length)

  // Actions
  const addItem = (product: Product) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    
    saveToStorage()
  }

  const removeItem = (productId: number) => {
    items.value = items.value.filter(item => item.id !== productId)
    saveToStorage()
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
      saveToStorage()
    }
  }

  const incrementQuantity = (productId: number) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity++
      saveToStorage()
    }
  }

  const decrementQuantity = (productId: number) => {
    const item = items.value.find(item => item.id === productId)
    if (item && item.quantity > 1) {
      item.quantity--
      saveToStorage()
    }
  }

  const clearCart = () => {
    items.value = []
    saveToStorage()
  }

  const getItem = (productId: number) => {
    return items.value.find(item => item.id === productId)
  }

  // Initialize
  if (!isLoaded.value) {
    loadFromStorage()
  }

  return {
    // State
    items,
    // Getters
    totalItems,
    totalAmount,
    itemCount,
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getItem
  }
})