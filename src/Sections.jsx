import { useState } from 'react'
import { Tatreez, Wrap, Heading } from './Tatreez'
import { BRAND, TAGLINE, CURRENCIES, TESTIMONIALS } from './data'

const LINKS = [['Home', '#top'], ['Collection', '#gallery'], ['Shop', '#shop'], ['About', '#about'], ['Contact', '#contact']]

function Currency({ cur, setCur }) {
  return (
    <div role="group" aria-label="Currency" className="flex border border-gold/40 text-sm">
      {Object.entries(CURRENCIES).map(([k, c]) => (
        <button key={k} aria-pressed={cur === k} aria-label={c.name} onClick={() => setCur(k)}
          className={`px-2.5 py-1.5 transition-colors ${cur === k ? 'bg-forest text-white font-medium' : 'text-forest/80 hover:text-forest'}`}>{c.sym}</button>))}
    </div>
  )
}

export function Navbar({ count, onCart, cur, setCur }) {
  const [m, setM] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-cream text-forest border-b border-gold/30">
      <div className="mx-auto max-w-6xl px-5 min-h-16 py-3 flex flex-wrap items-center justify-between gap-3">
        <a href="#top" className="font-serif text-2xl md:text-3xl font-bold whitespace-nowrap">{BRAND}</a>
        <nav aria-label="Main" className="hidden lg:flex gap-6 text-sm">
          {LINKS.map(([l, h]) => <a key={h} href={h} className="hover:text-crimson transition-colors">{l}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <Currency cur={cur} setCur={setCur} />
          <button onClick={onCart} className="border border-gold/60 px-3 py-1.5 text-sm hover:bg-white hover:text-forest transition-colors" aria-label={`Open cart, ${count} items`}>Cart ({count})</button>
          <button className="lg:hidden text-sm underline underline-offset-4 pl-1" aria-expanded={m} onClick={() => setM(!m)}>Menu</button>
        </div>
      </div>
      {m && <nav aria-label="Mobile" className="lg:hidden px-5 pb-4 flex flex-col gap-3">
        {LINKS.map(([l, h]) => <a key={h} href={h} onClick={() => setM(false)}>{l}</a>)}</nav>}
      <div className="band bg-cream" aria-hidden="true" />
    </header>
  )
}

export const Hero = () => (
  <div id="top" className="linen scroll-mt-16">
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="font-serif text-5xl md:text-7xl font-extrabold leading-[1.05] text-crimson">Small details. Beautiful stories.</h1>
        <p className="mt-6 max-w-md text-lg text-ink/80 leading-relaxed">From Palestinian embroidery to delicate beaded accessories. Thoughtful pieces that bring a little beauty to your everyday.</p>
        <a href="#gallery" className="btn mt-9 rounded-full">Shop the Collection</a>
      </div>
      <div className="relative max-w-sm w-full mx-auto p-3 border border-gold/50 rounded-t-full bg-cream shadow-xl">
        <img src="/photos/wedding-hoop.png" alt="Floral wedding embroidery hoop with a personalised date" fetchPriority="high" className="w-full rounded-t-full" />
        <p className="text-center text-xs uppercase tracking-[.22em] text-crimson py-4">Made with love · Lamsat Jamal</p>
      </div>
    </div>
  </div>
)

export const Story = () => (
  <Wrap id="about" className="grid md:grid-cols-2 gap-10 items-center">
    <h2 className="font-serif text-4xl md:text-5xl font-bold text-crimson leading-tight">A craft carried from hand to hand.</h2>
    <div className="text-ink/80 leading-relaxed space-y-4">
      <p>Tatreez is more than decoration. Each motif carries a village, a season, a memory. We make modern pieces for everyday life and keep the old way of making them: slowly, by hand, with respect.</p>
      <p>Every piece at {BRAND} is made by one pair of hands, so no two are exactly alike.</p>
    </div>
  </Wrap>
)

export const Craft = () => (
  <div className="bg-forest text-white">
    <Wrap id="craft">
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-10">Craftsmanship</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[['Counted by hand', 'Each motif is planned thread by thread on the weave of the linen.'],
          ['Colours with meaning', 'Deep red, forest green and black, paired by eye until the palette settles.'],
          ['Made in small batches', 'Fewer pieces, more time. A single motif can take many hours.']].map(([t, d], i) => (
          <div key={t} className="border border-dashed border-gold/40 p-7">
            <Tatreez seed={i} n={5} className="w-10 mb-4 bg-cream p-1" />
            <h3 className="font-serif text-2xl font-bold">{t}</h3>
            <p className="mt-2 text-white/80 leading-relaxed">{d}</p>
          </div>))}
      </div>
    </Wrap>
  </div>
)

export const Trust = () => (
  <div className="bg-white">
    <Wrap id="words">
      <Heading title="Kind words" />
      <div className="grid md:grid-cols-3 gap-10">
        {TESTIMONIALS.map(t => (
          <figure key={t.n} className="border-t-2 border-crimson pt-5">
            <blockquote className="font-serif text-xl leading-snug">“{t.q}”</blockquote>
            <figcaption className="mt-3 text-sm text-forest font-medium">{t.n}</figcaption>
          </figure>))}
      </div>
    </Wrap>
  </div>
)

export const Footer = () => (
  <footer id="contact" className="bg-ink text-white/80">
    <div className="band bg-cream" aria-hidden="true" />
    <div className="mx-auto max-w-6xl px-6 py-12 grid sm:grid-cols-3 gap-10">
      <div><p className="font-serif text-3xl font-bold text-white">{BRAND}</p><p className="mt-2 text-sm">{TAGLINE}</p></div>
      <nav aria-label="Footer"><p className="text-white font-medium mb-3">Quick links</p>
        <ul className="space-y-2 text-sm">{LINKS.slice(0, 3).map(([l, h]) => <li key={h}><a href={h} className="hover:text-white">{l}</a></li>)}</ul></nav>
      <div><p className="text-white font-medium mb-3">Contact</p>
        <ul className="space-y-2 text-sm"><li><a href="mailto:hello@lamsatjamal.com" className="hover:text-white">hello@lamsatjamal.com</a></li>
          <li><a href="#" className="hover:text-white">Instagram</a></li><li><a href="#" className="hover:text-white">WhatsApp</a></li></ul></div>
    </div>
    <p className="text-center text-xs text-white/50 pb-8">© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
  </footer>
)

