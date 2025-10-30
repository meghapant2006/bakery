"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

export type CartItem = {
  id: number | string
  name: string
  price: number // INR
  image?: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void
  removeItem: (id: CartItem["id"]) => void
  updateQuantity: (id: CartItem["id"], qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const STORAGE_KEY = "cart.items.v1"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
    }
    // Mark as hydrated after loading
    setIsHydrated(true)
  }, [])

  // Save to localStorage whenever items change (only after hydration)
  useEffect(() => {
    if (!isHydrated) return // Don't save until we've loaded from localStorage
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
    }
  }, [items, isHydrated])

  const api = useMemo<CartContextType>(() => ({
    items,
    addItem: (item, qty = 1) => {
      setItems((prev) => {
        const idx = prev.findIndex((p) => p.id === item.id)
        if (idx >= 0) {
          const copy = [...prev]
          copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty }
          return copy
        }
        return [...prev, { ...item, quantity: qty }]
      })
    },
    removeItem: (id) => {
      setItems((prev) => prev.filter((p) => p.id !== id))
    },
    updateQuantity: (id, qty) => {
      setItems((prev) =>
        prev
          .map((p) => (p.id === id ? { ...p, quantity: qty } : p))
          .filter((p) => p.quantity > 0),
      )
    },
    clear: () => {
      setItems([])
    },
  }), [items])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
