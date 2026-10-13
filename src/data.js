export const BRAND = 'Lamsat Jamal'
export const TAGLINE = 'Palestinian embroidery, stitched by hand.'
// Prices are in USD. Update the rates below whenever you like.
export const CURRENCIES = {
  USD: { sym: '$', rate: 1, name: 'US dollars' },
  GBP: { sym: '£', rate: 0.78, name: 'British pounds' },
  EGP: { sym: 'E£', rate: 48, name: 'Egyptian pounds' },
}
// Real photos: put files in public/photos/ and add image: '/photos/name.jpg'
export const PRODUCTS = [
  { id:'heritage-cushion', name:'Heritage Cushion', price:110, image:'/photos/heritage-cushion.png', seed:0, desc:'A cushion cover embroidered by hand across the front.' },
  { id:'star-pouch', name:'Eight-Point Star Pouch', price:46, seed:1, desc:'Linen pouch with a cross-stitched star in red and green.' },
  { id:'linked-chain', name:'Hand-Linked Chain', price:62, seed:2, desc:'Fine hand-linked chain with a stitched charm.' },
  { id:'framed-motif', name:'Framed Tatreez Motif', price:125, image:'/photos/palestine-frame.png', seed:3, desc:'One large motif, framed and ready to hang.' },
]
export const TESTIMONIALS = [ // sample text: replace with real customer words
  { q:'The stitching is even and careful. It feels like a piece that belongs to a family.', n:'Layla, London' },
  { q:'I bought the pouch as a gift and kept looking at it. The colours are exactly right.', n:'Hannah, Cairo' },
  { q:'It arrived wrapped like something precious, and it is.', n:'Samira, Dubai' },
]

