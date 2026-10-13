import { useMemo } from 'react'
import { motion } from 'framer-motion'
const PAL = [['#806026','#493A29','#30291F','#493A29'],['#493A29','#806026','#493A29','#30291F'],['#30291F','#806026','#806026','#493A29'],['#806026','#30291F','#493A29','#806026']]

export function Tatreez({ seed = 0, n = 9, animate = false, className = '' }) {
  const p = PAL[seed % PAL.length], c = (n - 1) / 2
  const cells = useMemo(() => {
    const a = []
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const dx = Math.abs(x - c), dy = Math.abs(y - c), d = dx + dy
      if (d === 4 || d === 2 || (d <= 4 && (dx === 0 || dy === 0)) || (dx === dy && d <= 6))
        a.push({ x, y, d, col: dx === dy && d > 0 ? p[3] : d <= 1 ? p[0] : d === 2 ? p[1] : p[2] })
    }
    return a
  }, [n, seed])
  return (
    <svg viewBox={`0 0 ${n * 10} ${n * 10}`} className={className} role="img" aria-label="Cross-stitch tatreez motif">
      {cells.map(({ x, y, d, col }) => {
        const path = <path d={`M${x*10+2} ${y*10+2}L${x*10+8} ${y*10+8}M${x*10+8} ${y*10+2}L${x*10+2} ${y*10+8}`} />
        const props = { stroke: col, strokeWidth: 2.2, strokeLinecap: 'round' }
        return animate
          ? <motion.g key={`${x}-${y}`} {...props} initial={{ opacity: 0, scale: .3 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: .3 + d * .14, duration: .5 }} style={{ transformOrigin: `${x*10+5}px ${y*10+5}px` }}>{path}</motion.g>
          : <g key={`${x}-${y}`} {...props}>{path}</g>
      })}
    </svg>
  )
}

export const Divider = () => (
  <div className="flex items-center justify-center gap-4 text-crimson" aria-hidden="true">
    <span className="w-16 border-t border-dashed border-crimson" />
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M11 2l9 9-9 9-9-9z" /><path d="M7 7l8 8M15 7l-8 8" /></svg>
    <span className="w-16 border-t border-dashed border-crimson" />
  </div>
)

export const Wrap = ({ id, className = '', children }) => (
  <section id={id} className={`mx-auto max-w-6xl px-6 py-14 md:py-20 scroll-mt-16 ${className}`}>{children}</section>
)

export const Heading = ({ title, sub }) => (
  <div className="mx-auto max-w-2xl text-center mb-10">
    <h2 className="font-serif text-4xl md:text-5xl text-crimson leading-tight">{title}</h2>
    {sub && <p className="mt-4 text-ink/70 leading-relaxed">{sub}</p>}
    <div className="mt-6"><Divider /></div>
  </div>
)

