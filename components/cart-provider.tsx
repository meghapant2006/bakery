"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

export type CartItem = {
  id: number | string
  cartItemId?: string // unique key for customized variations
  name: string
  price: number // INR
  image?: string
  quantity: number
  weight?: string
  isEggless?: boolean
  customMessage?: string
  addons?: string[]
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void
  removeItem: (idOrKey: CartItem["id"]) => void
  updateQuantity: (idOrKey: CartItem["id"], qty: number) => void
  clear: () => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  orderNotes: string
  setOrderNotes: (notes: string) => void
  selectedPincode: string
  setSelectedPincode: (pincode: string) => void
  deliveryDate: string
  setDeliveryDate: (date: string) => void
  deliverySlot: string
  setDeliverySlot: (slot: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const STORAGE_KEY = "cart.items.v2"
const NOTES_KEY = "cart.notes.v2"
const PINCODE_KEY = "cart.pincode.v2"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [orderNotes, setOrderNotes] = useState("")
  const [selectedPincode, setSelectedPincode] = useState("201301") // Default Noida Sector 18
  const [deliveryDate, setDeliveryDate] = useState("Today")
  const [deliverySlot, setDeliverySlot] = useState("Standard (3:00 PM - 6:00 PM)")

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
      const savedNotes = localStorage.getItem(NOTES_KEY)
      if (savedNotes) setOrderNotes(savedNotes)

      const savedPin = localStorage.getItem(PINCODE_KEY)
      if (savedPin) setSelectedPincode(savedPin)
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
    }
  }, [items, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem(NOTES_KEY, orderNotes)
      localStorage.setItem(PINCODE_KEY, selectedPincode)
    } catch (e) {
      console.error(e)
    }
  }, [orderNotes, selectedPincode, isHydrated])

  const api = useMemo<CartContextType>(() => ({
    items,
    isCartOpen,
    setIsCartOpen,
    orderNotes,
    setOrderNotes,
    selectedPincode,
    setSelectedPincode,
    deliveryDate,
    setDeliveryDate,
    deliverySlot,
    setDeliverySlot,
    addItem: (item, qty = 1) => {
      // Create a deterministic unique cart key for customized items
      const itemKey = item.cartItemId || `${item.id}-${item.weight || "std"}-${item.isEggless ? "eggless" : "egg"}-${item.customMessage || ""}`
      const fullItem: CartItem = {
        ...item,
        cartItemId: itemKey,
        quantity: qty,
      }

      setItems((prev) => {
        const idx = prev.findIndex((p) => (p.cartItemId || p.id) === itemKey)
        if (idx >= 0) {
          const copy = [...prev]
          copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty }
          return copy
        }
        return [...prev, fullItem]
      })
      // Auto open cart drawer on item addition for smooth user experience
      setIsCartOpen(true)
    },
    removeItem: (idOrKey) => {
      setItems((prev) => prev.filter((p) => (p.cartItemId || p.id) !== idOrKey && p.id !== idOrKey))
    },
    updateQuantity: (idOrKey, qty) => {
      setItems((prev) =>
        prev
          .map((p) => ((p.cartItemId || p.id) === idOrKey || p.id === idOrKey ? { ...p, quantity: qty } : p))
          .filter((p) => p.quantity > 0),
      )
    },
    clear: () => {
      setItems([])
    },
  }), [items, isCartOpen, orderNotes, selectedPincode, deliveryDate, deliverySlot])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
