import { useState } from 'react'
import { Tatreez } from './Tatreez'
import { BRAND, CURRENCIES } from './data'

export function Icon({ name, ...props }) {
  const paths = { bag: 'M5 7h14l1 14H4L5 7Zm3 0V5a4 4 0 0 1 8 0v2', search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0', arrow: 'M3 12h18m-6-6 6 6-6 6', gift: 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8C1 8 6-2 12 8Zm0 0c11 0 6-10 0 0', leaf: 'M5 22C5 12 12 4 20 2c1 10-5 16-13 15M5 22 16 7M6 13C-1 10 1 4 2 3c6 2 8 5 7 8', heart: 'M12 21 3 12C-3 5 6-2 12 5c6-7 15 0 9 7Z', star: 'm12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z' }
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.star} /></svg>
}
const links = [['Home', '#top'], ['Collection', '#gallery'], ['Shop', '#shop'], ['About', '#about'], ['Contact', '#contact']]
export function Navbar({ count, onCart, cur, setCur, query, setQuery }) {
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  return <header className="site-header">
    <div className="header-inner">
      <a className="brand" href="#top"><Tatreez className="brand-mark" /><span>{BRAND}<small>HANDCRAFTED STORIES</small></span></a>
      <nav className="desktop-nav" aria-label="Main">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="header-actions">
        <select aria-label="Currency" value={cur} onChange={e => setCur(e.target.value)}>{Object.entries(CURRENCIES).map(([key, val]) => <option key={key} value={key}>{val.sym} {key}</option>)}</select>
        <button className="icon-button" aria-label="Search products" aria-expanded={search} onClick={() => setSearch(!search)}><Icon name="search" /></button>
        <button className="header-cart" onClick={onCart}><Icon name="bag" /><span>Cart ({count})</span></button>
        <button className="mobile-menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>Menu</button>
      </div>
    </div>
    {menu && <nav className="mobile-nav" aria-label="Mobile">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}</nav>}
    {search && <form className="search-bar" onSubmit={e => { e.preventDefault(); document.getElementById('shop').scrollIntoView({ behavior: 'smooth' }) }}><label htmlFor="product-search">Find your little touch of beauty</label><div><input id="product-search" autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search the featured collection…" /><button type="submit">Search <Icon name="arrow" /></button></div></form>}
  </header>
}
export function Hero() {
  return <section id="top" className="editorial-hero">
    <img className="hero-photo" src="./photos/heritage-hero.png" alt="Personalised floral wedding embroidery displayed on a wooden stand" fetchPriority="high" />
    <div className="hero-wash" /><div className="heritage-border" aria-hidden="true">{[0,1,2,3,4].map(i => <Tatreez key={i} seed={i} />)}</div>
    <div className="hero-inner"><p className="eyebrow">HANDCRAFTED WITH PURPOSE</p><h1>Small details.<br /><span>Beautiful stories.</span></h1><p className="hero-description">From Palestinian embroidery to delicate beaded accessories.<br className="desktop-break" /> Thoughtful pieces that bring a little beauty to your everyday.</p><a href="#gallery" className="pill-button">Shop the Collection <Icon name="arrow" /></a></div>
    <p className="hero-note">EMBROIDERY<br />PEOPLE<br />MEMORIES<br />FOREVER<span /></p>
  </section>
}
export function Benefits() {
  return <div className="benefits"><div>{[['leaf','Handcrafted','with love'],['star','Inspired by','Palestinian heritage'],['gift','Thoughtful gifts','for every occasion'],['heart','Little details','lasting memories']].map(([icon,a,b]) => <div className="benefit" key={a}><Icon name={icon} /><p>{a}<br />{b}</p></div>)}</div></div>
}
export function Story() {
  const [expanded, setExpanded] = useState(false)
  return <section id="about" className="story-section">
    <div className="story-banner"><img src="./photos/heritage-story.png" alt="Palestinian embroidery craft, an illustrative artisan scene" loading="lazy" /><div className="story-wash" /><div className="story-copy"><p className="eyebrow">OUR STORY</p><h2>Crafted Heritage</h2><p>Each piece is a blend of tradition, creativity, and love — inspired by<br className="desktop-break" /> Palestinian culture and made to be part of your everyday story.</p><button className="pill-button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Close Our Story' : 'Read Our Story'}<Icon name="arrow" /></button></div><blockquote>“Tradition<br />in every stitch,<br />beauty in every detail.”<span>— Lamsat Jamal</span></blockquote></div>
    {expanded && <div className="story-expanded"><h3>A craft carried from hand to hand.</h3><p>Tatreez is more than decoration. Each motif carries a village, a season, a memory. We bring that heritage to keepsakes and everyday pieces, with thoughtful colours and details to treasure.</p></div>}
  </section>
}
export function Footer() {
  return <footer id="contact" className="site-footer"><div><a href="#top" className="footer-brand">{BRAND}</a><p>Handcrafted stories. Little moments of beauty.</p></div><nav aria-label="Footer">{links.slice(1,4).map(([label,href]) => <a key={href} href={href}>{label}</a>)}<a href="mailto:hello@lamsatjamal.com">Contact us</a></nav><small>© {new Date().getFullYear()} Lamsat Jamal</small></footer>
}

