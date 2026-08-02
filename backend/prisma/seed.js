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

  console.log('Seed complete.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())