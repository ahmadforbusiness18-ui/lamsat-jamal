import { useRef, useState } from 'react'
import { Wrap, Heading } from './Tatreez'

const pieces = [
  ['wedding-hoop', 'Wedding keepsake hoop', 'Embroidery'],
  ['gold-shell-charm', 'Golden shell phone charm', 'Accessories'],
  ['palestine-frame', 'Framed Palestinian embroidery', 'Embroidery'],
  ['pearl-rose-charm', 'Pearl and rose phone charm', 'Accessories'],
  ['heritage-cushion', 'Personalised heritage cushion', 'Embroidery'],
  ['gold-crystal-charm', 'Golden crystal phone charm', 'Accessories'],
  ['embroidered-bookmarks', 'Hand-stitched bookmarks', 'Embroidery'],
  ['aqua-flower-charm', 'Aqua flower phone charm', 'Accessories'],
  ['lavender-charm', 'Lavender flower phone charm', 'Accessories'],
  ['turquoise-charm', 'Turquoise beaded charm', 'Accessories'],
]

export default function Gallery() {
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const dialog = useRef(null)
  const open = piece => { setSelected(piece); dialog.current.showModal() }
  return (
    <Wrap id="gallery">
      <Heading title="A little touch of beauty" sub="Embroidery, keepsakes and delicate accessories. Explore the details of our collection." />
      <div className="flex flex-wrap justify-center gap-3 mb-10" role="group" aria-label="Filter collection">
        {['All', 'Embroidery', 'Accessories'].map(item => (
          <button key={item} onClick={() => setCategory(item)} aria-pressed={category === item}
            className={`rounded-full border px-6 py-2.5 text-sm transition-colors ${category === item ? 'bg-forest border-forest text-white' : 'border-gold/50 text-forest hover:bg-gold/10'}`}>{item}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {pieces.filter(piece => category === 'All' || piece[2] === category).map(piece => (
          <button key={piece[0]} onClick={() => open(piece)} className="group text-left rounded-2xl overflow-hidden border border-gold/25 bg-cream shadow-sm hover:shadow-lg transition-shadow" aria-label={`View ${piece[1]}`}>
            <div className="aspect-[3/4] bg-[#F1EBE0] p-2">
              <img src={`./photos/${piece[0]}.png`} alt={piece[1]} loading="lazy" decoding="async" className="w-full h-full object-contain rounded-xl" />
            </div>
            <div className="px-5 py-5"><p className="text-xs uppercase tracking-[.18em] text-crimson mb-2">{piece[2]}</p><h3 className="font-serif text-xl text-forest">{piece[1]}</h3><p className="text-sm text-ink/60 mt-2">View details ↗</p></div>
          </button>
        ))}
      </div>
      <dialog ref={dialog} className="photo-dialog rounded-2xl bg-cream p-4 text-ink" aria-label={selected?.[1] || 'Collection photo'} onClick={e => { if (e.target === dialog.current) dialog.current.close() }}>
        <div className="flex items-center justify-between gap-4 mb-3"><h2 className="font-serif text-lg">{selected?.[1]}</h2><button autoFocus onClick={() => dialog.current.close()} className="btn-ghost rounded-full">Close</button></div>
        {selected && <img src={`./photos/${selected[0]}.png`} alt={selected[1]} className="max-h-[75vh] w-full object-contain" />}
      </dialog>
    </Wrap>
  )
}
