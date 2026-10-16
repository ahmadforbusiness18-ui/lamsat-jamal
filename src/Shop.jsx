import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Tatreez, Wrap, Heading } from './Tatreez'
import { PRODUCTS } from './data'
import { Icon } from './Sections'

function Art({ p, className }) {
  return p.image
    ? <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
    : <Tatreez seed={p.seed} className={className} />
}

export function Featured({ fmt, onAdd, query = '' }) {
  const showcase = [
    { id: 'wedding-showcase', name: 'Custom Couple Embroidery Hoop', desc: 'Wedding keepsake', image: './photos/wedding-hoop.png', price: null },
    PRODUCTS[0], PRODUCTS[3],
    { id: 'pearl-showcase', name: 'Pearl & Rose Phone Charm', desc: 'Beaded accessory', image: './photos/pearl-rose-charm.png', price: null },
  ]
  const products = (query ? PRODUCTS.concat(showcase.filter(p => p.price === null)) : showcase).filter(p => `${p.name} ${p.desc}`.toLowerCase().includes(query.toLowerCase()))
  return <section id="shop" className="featured-section">
    <div className="featured-heading"><h2>Featured Products</h2><a href="#gallery">View All Pieces <Icon name="arrow" /></a></div>
    <div className="product-grid">{products.map(p => <article key={p.id} className="product-card">
      <div className="product-image"><Art p={p} className="w-1/3" /></div>
      <div className="product-details"><h3>{p.name}</h3>{p.price === null ? <><a href="#gallery">Explore this piece</a><a className="product-add" href="#gallery" aria-label={`Explore ${p.name}`}><Icon name="arrow" /></a></> : <><p>{fmt(p.price)}</p><button className="product-add" onClick={() => onAdd(p.id)} aria-label={`Add ${p.name} to cart`}><Icon name="bag" /></button></>}</div>
    </article>)}</div>
    {products.length === 0 && <p className="py-10 text-center">No featured pieces match “{query}”. Try another search.</p>}
  </section>
}
export function CartDrawer({ open, onClose, lines, setQty, onDone, fmt }) {
  const [step, setStep] = useState('bag')
  const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0)
  const close = () => { if (step === 'done') onDone(); setStep('bag'); onClose() }
  useEffect(() => {
    if (!open) return
    const k = e => e.key === 'Escape' && close()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  })
  const titles = { bag: 'Your cart', delivery: 'Delivery', pay: 'Payment', done: 'Thank you' }
  return (
    <AnimatePresence>
      {open && (<>
        <motion.div key="s" className="fixed inset-0 z-50 bg-ink/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
        <motion.aside key="d" role="dialog" aria-modal="true" aria-label="Shopping cart"
          className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-cream shadow-2xl flex flex-col"
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: .35 }}>
          <div className="flex items-center justify-between px-6 h-16 border-b border-forest/20">
            <h2 className="font-serif text-2xl font-bold text-crimson">{titles[step]}</h2>
            <button onClick={close} className="text-sm underline underline-offset-4" aria-label="Close cart">Close</button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {step === 'bag' && (lines.length === 0
              ? <div><p className="text-ink/70">Your cart is empty. Choose a piece to begin.</p><button className="btn mt-6" onClick={close}>Shop the collection</button></div>
              : <ul className="space-y-6">{lines.map(({ p, qty }) => (
                  <li key={p.id} className="flex gap-4">
                    <div className="linen w-20 h-24 grid place-items-center relative overflow-hidden shrink-0"><Art p={p} className="w-3/4" /></div>
                    <div className="flex-1">
                      <p className="font-serif text-xl font-bold text-crimson">{p.name}</p>
                      <p className="text-sm text-ink/70">{fmt(p.price)}</p>
                      <div className="mt-2 flex items-center gap-3 text-sm">
                        <button aria-label={`Decrease ${p.name}`} onClick={() => setQty(p.id, qty - 1)} className="border border-forest/40 w-8 h-8">−</button>
                        <span>{qty}</span>
                        <button aria-label={`Increase ${p.name}`} onClick={() => setQty(p.id, qty + 1)} className="border border-forest/40 w-8 h-8">+</button>
                        <button onClick={() => setQty(p.id, 0)} className="ml-3 underline underline-offset-4">Remove</button>
                      </div>
                    </div>
                  </li>))}</ul>)}
            {step === 'delivery' && (
              <form id="del" onSubmit={e => { e.preventDefault(); setStep('pay') }} className="space-y-5">
                {[['Full name','name','name'],['Email','email','email'],['Address','address','street-address'],['City','city','address-level2'],['Postcode','zip','postal-code']].map(([l, id, ac]) => (
                  <label key={id} className="block text-sm text-ink/70">{l}<input required name={id} type={id === 'email' ? 'email' : 'text'} autoComplete={ac} className="field mt-1 text-ink" /></label>))}
              </form>)}
            {step === 'pay' && (<div>
              <p className="text-ink/75 leading-relaxed">Review your total and pay securely. This is a demo checkout, so no payment is taken.</p>
              <button onClick={() => setStep('done')} className="mt-8 w-full bg-black text-white py-3.5 rounded-md text-lg" aria-label="Pay with Apple Pay">Pay with Apple Pay</button>
            </div>)}
            {step === 'done' && <p className="font-serif text-2xl font-bold text-crimson leading-snug">Your order is placed. We will stitch it with care and send you a note when it is on its way.</p>}
          </div>
          {lines.length > 0 && step !== 'done' && (
            <div className="border-t border-forest/20 px-6 py-5">
              <div className="flex justify-between mb-4"><span>Total</span><span className="font-serif text-2xl font-bold">{fmt(total)}</span></div>
              {step === 'bag' && <button className="btn w-full" onClick={() => setStep('delivery')}>Continue to delivery</button>}
              {step === 'delivery' && <button className="btn w-full" form="del" type="submit">Continue to payment</button>}
              {step !== 'bag' && <button className="mt-3 w-full text-sm underline underline-offset-4" onClick={() => setStep(step === 'pay' ? 'delivery' : 'bag')}>Back</button>}
            </div>)}
        </motion.aside>
      </>)}
    </AnimatePresence>
  )
}

