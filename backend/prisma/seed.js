const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const CATEGORIES = [
  'Engine Parts', 'Suspension', 'Electrical', 'Body Parts',
  'Brakes', 'Filters', 'Lighting', 'Accessories',
]

const MAKES_MODELS = {
  Toyota: ['Corolla', 'Yaris', 'Hilux'],
  Honda: ['Civic', 'City'],
  Suzuki: ['Cultus', 'Alto', 'Mehran'],
  Hyundai: ['Elantra', 'Tucson'],
  Kia: ['Sportage', 'Picanto'],
}

async function main() {
  for (const name of CATEGORIES) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }

  for (const [makeName, models] of Object.entries(MAKES_MODELS)) {
    const make = await prisma.make.upsert({
      where: { name: makeName },
      update: {},
      create: { name: makeName },
    })
    for (const modelName of models) {
      await prisma.model.upsert({
        where: { makeId_name: { makeId: make.id, name: modelName } },
        update: {},
        create: { name: modelName, makeId: make.id },
      })
    }
  }

  await prisma.companyInfo.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      name: 'Al Madina Autos',
      tagline: 'Wholesale & Retail Auto Spare Parts',
      phone1Label: 'Sales',
      phone1Number: '0333 6466645',
      phone2Label: 'Support',
      phone2Number: '0333 6466647',
      address: null,
      regionWholesale: 'South Punjab',
      regionRetail: 'Nationwide (Pakistan)',
      deliveryNote: 'Delivery charges apply on orders shipped outside South Punjab.',
    },
  })

  const statDefaults = [
    { label: 'Catalog SKUs', value: '27,000+', order: 1 },
    { label: 'Workshop Partners', value: '500+', order: 2 },
    { label: 'Cities Covered', value: '120+', order: 3 },
    { label: 'Years in Business', value: '15+', order: 4 },
  ]
  for (const stat of statDefaults) {
    const existing = await prisma.siteStat.findFirst({ where: { label: stat.label } })
    if (!existing) await prisma.siteStat.create({ data: stat })
  }

  console.log('Seed complete.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())