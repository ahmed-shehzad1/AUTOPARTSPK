const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const PART_TEMPLATES = [
  ['Brake Disc', 'Brakes', '1E5EA8'],
  ['Brake Pad Set', 'Brakes', '1E5EA8'],
  ['Shock Absorber', 'Suspension', '4A8BC2'],
  ['Control Arm', 'Suspension', '4A8BC2'],
  ['Alternator', 'Electrical', 'C9962B'],
  ['Battery 12V', 'Electrical', 'C9962B'],
  ['Oil Filter', 'Filters', '0FBFA8'],
  ['Air Filter', 'Filters', '0FBFA8'],
  ['Headlight Assembly', 'Lighting', 'FF5A1F'],
  ['Taillight Assembly', 'Lighting', 'FF5A1F'],
  ['Front Bumper', 'Body Parts', '5B6570'],
  ['Side Mirror', 'Body Parts', '5B6570'],
  ['Timing Belt Kit', 'Engine Parts', '141A21'],
  ['Radiator', 'Engine Parts', '141A21'],
  ['Floor Mat Set', 'Accessories', '1E5EA8'],
  ['Seat Cover Set', 'Accessories', '1E5EA8'],
]

const CONDITIONS = ['New', 'New', 'Used', 'Refurbished']
const STOCK_STATES = ['In Stock', 'In Stock', 'Limited Stock', 'Backorder']

function placeholderImage(text, hex) {
  const encoded = encodeURIComponent(text)
  return `https://placehold.co/600x450/EDF0F2/${hex}?text=${encoded}&font=roboto`
}

async function main() {
  const categories = await prisma.category.findMany()
  const models = await prisma.model.findMany()

  if (categories.length === 0 || models.length === 0) {
    console.log('No categories or vehicle models found — run the main seed.js first.')
    process.exit(1)
  }

  const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c.id]))

  let created = 0

  for (let i = 0; i < 20; i++) {
    const [name, categoryName, hex] = PART_TEMPLATES[i % PART_TEMPLATES.length]
    const variant = Math.floor(i / PART_TEMPLATES.length) + 1
    const displayName = variant > 1 ? `${name} (Variant ${variant})` : name
    const categoryId = categoryMap[categoryName]
    if (!categoryId) continue

    const retail = 500 + (i % 10) * 450
    const moq = [1, 1, 5, 10, 25][i % 5]
    const model = models[i % models.length]

    const partNo = `TEST-${1000 + i}`

    const existing = await prisma.product.findUnique({ where: { partNo } })
    if (existing) continue

    await prisma.product.create({
      data: {
        partNo,
        name: displayName,
        description: `Test placeholder listing for ${displayName}. Used to verify catalog, cart, and image rendering during development.`,
        partBrand: ['Bosch', 'Denso', 'NGK', 'Genuine OEM'][i % 4],
        condition: CONDITIONS[i % CONDITIONS.length],
        stock: STOCK_STATES[i % STOCK_STATES.length],
        price: retail,
        wholesalePrice: Math.round(retail * 0.82),
        wholesaleMinQty: moq === 1 ? 10 : moq * 2,
        moq,
        unit: i % 5 === 0 ? 'box' : 'pcs',
        rfqThreshold: 100,
        featured: i < 6, // first 6 marked featured, enough to test the carousel
        categoryId,
        images: {
          create: [
            { url: placeholderImage(displayName, hex) },
            { url: placeholderImage(`${displayName} - Alt`, '5B6570') },
          ],
        },
        fitments: {
          create: [{ modelId: model.id, yearFrom: 2015, yearTo: 2021 }],
        },
      },
    })
    created++
  }

  console.log(`Created ${created} test products (skipped any duplicates).`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())