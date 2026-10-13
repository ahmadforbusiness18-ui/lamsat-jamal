import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Tatreez, Wrap, Heading } from './Tatreez'
import { PRODUCTS } from './data'

function Art({ p, className }) {
  return p.image
    ? <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
    : <Tatreez seed={p.seed} className={className} />
}

export function Featured({ fmt, onAdd }) {
  return (
    <Wrap id="shop">
      <Heading title="Featured pieces" sub="Small collection, each piece stitched to order." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {PRODUCTS.map(p => (
          <article key={p.id} className="group">
            <div className="linen stitch-frame relative aspect-[4/5] overflow-hidden grid place-items-center">
              <Art p={p} className="w-3/5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" />
            </div>
            <h3 className="mt-4 font-serif text-2xl font-bold text-crimson">{p.name}</h3>
            <p className="mt-1 text-sm text-ink/70 leading-relaxed">{p.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-serif text-xl font-bold">{fmt(p.price)}</span>
              <button onClick={() => onAdd(p.id)} className="btn-ghost" aria-label={`Add ${p.name} to cart`}>Add to cart</button>
            </div>
          </article>
        ))}
      </div>
    </Wrap>
  )
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
