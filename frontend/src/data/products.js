export const CATEGORIES = [
  'Engine Parts', 'Suspension', 'Electrical', 'Body Parts',
  'Brakes', 'Filters', 'Lighting', 'Accessories',
]

export const MAKES_MODELS = {
  Toyota: ['Corolla', 'Yaris', 'Hilux'],
  Honda: ['Civic', 'City'],
  Suzuki: ['Cultus', 'Alto', 'Mehran'],
  Hyundai: ['Elantra', 'Tucson'],
  Kia: ['Sportage', 'Picanto'],
}

const BASE_ITEMS = [
  ['Brake Disc', 'Brakes'],
  ['Brake Pad Set', 'Brakes'],
  ['Shock Absorber', 'Suspension'],
  ['Control Arm', 'Suspension'],
  ['Alternator', 'Electrical'],
  ['Battery 12V', 'Electrical'],
  ['Oil Filter', 'Filters'],
  ['Air Filter', 'Filters'],
  ['Headlight Assembly', 'Lighting'],
  ['Taillight Assembly', 'Lighting'],
  ['Front Bumper', 'Body Parts'],
  ['Side Mirror', 'Body Parts'],
  ['Timing Belt Kit', 'Engine Parts'],
  ['Radiator', 'Engine Parts'],
  ['Floor Mat Set', 'Accessories'],
  ['Seat Cover Set', 'Accessories'],
]

const PART_BRANDS = ['Denso', 'Bosch', 'NGK', 'Genuine OEM', 'Setco', 'AISIN']
const CONDITIONS = ['New', 'New', 'New', 'Used', 'Refurbished'] // weighted toward New
const STOCK_STATES = ['In Stock', 'In Stock', 'In Stock', 'Limited Stock', 'Backorder']
const MAKE_KEYS = Object.keys(MAKES_MODELS)

// Placeholder generator — mirrors the shape a real /api/products response will use.
// imageUrl is null by default: no photo means no image block renders, ever.
function generateProducts(count) {
  const items = []
  for (let i = 0; i < count; i++) {
    const [name, category] = BASE_ITEMS[i % BASE_ITEMS.length]
    const variant = Math.floor(i / BASE_ITEMS.length) + 1
    const make = MAKE_KEYS[i % MAKE_KEYS.length]
    const models = MAKES_MODELS[make]
    const model = models[i % models.length]
    const yearFrom = 2012 + (i % 8)
    const retail = 500 + (i % 40) * 350
    const moq = [1, 1, 5, 10, 25, 50][i % 6]

    items.push({
      id: `p${i + 1}`,
      name: variant > 1 ? `${name} (Variant ${variant})` : name,
      partNo: `${category.slice(0, 3).toUpperCase()}-${1000 + i}`,
      category,
      partBrand: PART_BRANDS[i % PART_BRANDS.length],
      condition: CONDITIONS[i % CONDITIONS.length],
      stock: STOCK_STATES[i % STOCK_STATES.length],
      price: retail,
      wholesalePrice: Math.round(retail * 0.82),
      wholesaleMinQty: moq === 1 ? 10 : moq * 2,
      moq,
      unit: i % 5 === 0 ? 'box' : 'pcs',
      imageUrl: null, // populate once real product photos exist
      fitment: [{ make, model, yearFrom, yearTo: yearFrom + 4 }],
    })
  }
  return items
}

export const PRODUCTS = generateProducts(240)