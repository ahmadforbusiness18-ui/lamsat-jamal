import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { PRODUCTS, CURRENCIES } from './data'
import { Navbar, Hero, Story, Craft, Trust, Footer } from './Sections'
import { Featured, CartDrawer } from './Shop'
import Gallery from './Gallery'

export default function App() {
  const [cur, setCur] = useState('USD')
  const [cart, setCart] = useState({})
  const [open, setOpen] = useState(false)
  const c = CURRENCIES[cur]
  const fmt = n => `${c.sym}${Math.round(n * c.rate).toLocaleString('en-US')}`
  const add = id => { setCart(x => ({ ...x, [id]: (x[id] || 0) + 1 })); setOpen(true) }
  const setQty = (id, q) => setCart(x => { const n = { ...x }; q <= 0 ? delete n[id] : (n[id] = q); return n })
  const lines = Object.entries(cart).map(([id, qty]) => ({ p: PRODUCTS.find(p => p.id === id), qty }))
  const count = lines.reduce((s, l) => s + l.qty, 0)
  return (
    <MotionConfig reducedMotion="user">
      <Navbar count={count} onCart={() => setOpen(true)} cur={cur} setCur={setCur} />
      <main><Hero /><Gallery /><Featured fmt={fmt} onAdd={add} /><Story /><Craft /><Trust /></main>
      <Footer />
      <CartDrawer open={open} onClose={() => setOpen(false)} lines={lines} setQty={setQty} onDone={() => setCart({})} fmt={fmt} />
    </MotionConfig>
  )
}
