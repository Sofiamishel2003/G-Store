import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/cartStore'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 'test',
  image: 'test.jpg',
  rating: { rate: 4.5, count: 100 }
}

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('should start with empty cart', () => {
    const cart = useCartStore()
    expect(cart.items).toEqual([])
    expect(cart.totalItems).toBe(0)
    expect(cart.totalAmount).toBe(0)
  })

  it('should add item to cart', () => {
    const cart = useCartStore()
    cart.addItem(mockProduct)
    
    expect(cart.items.length).toBe(1)
    expect(cart.items[0].id).toBe(mockProduct.id)
    expect(cart.items[0].quantity).toBe(1)
  })

  it('should increment quantity when adding existing item', () => {
    const cart = useCartStore()
    cart.addItem(mockProduct)
    cart.addItem(mockProduct)
    
    expect(cart.items.length).toBe(1)
    expect(cart.items[0].quantity).toBe(2)
  })

  it('should calculate total items correctly', () => {
    const cart = useCartStore()
    cart.addItem(mockProduct)
    cart.addItem(mockProduct)
    
    expect(cart.totalItems).toBe(2)
  })

  it('should calculate total amount correctly', () => {
    const cart = useCartStore()
    cart.addItem(mockProduct)
    cart.addItem(mockProduct)
    
    expect(cart.totalAmount).toBe(199.98)
  })

  it('should remove item from cart', () => {
    const cart = useCartStore()
    cart.addItem(mockProduct)
    cart.removeItem(mockProduct.id)
    
    expect(cart.items.length).toBe(0)
  })

  it('should update quantity', () => {
    const cart = useCartStore()
    cart.addItem(mockProduct)
    cart.updateQuantity(mockProduct.id, 5)
    
    expect(cart.items[0].quantity).toBe(5)
  })

  it('should increment quantity', () => {
    const cart = useCartStore()
    cart.addItem(mockProduct)
    cart.incrementQuantity(mockProduct.id)
    
    expect(cart.items[0].quantity).toBe(2)
  })

  it('should decrement quantity', () => {
    const cart = useCartStore()
    cart.addItem(mockProduct)
    cart.addItem(mockProduct)
    cart.decrementQuantity(mockProduct.id)
    
    expect(cart.items[0].quantity).toBe(1)
  })

  it('should not decrement quantity below 1', () => {
    const cart = useCartStore()
    cart.addItem(mockProduct)
    cart.decrementQuantity(mockProduct.id)
    
    expect(cart.items[0].quantity).toBe(1)
  })

  it('should clear cart', () => {
    const cart = useCartStore()
    cart.addItem(mockProduct)
    cart.clearCart()
    
    expect(cart.items.length).toBe(0)
  })

  it('should get item by id', () => {
    const cart = useCartStore()
    cart.addItem(mockProduct)
    const item = cart.getItem(mockProduct.id)
    
    expect(item).toBeDefined()
    expect(item?.id).toBe(mockProduct.id)
  })
})